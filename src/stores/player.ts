import { ref, watch, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { usePlayQueueStore } from '@/stores/playQueue';
import delay from '@/delay';
import { useCacheStore } from '@/stores/cache';
import secondsToTime from '@/common/secondsToTime';

export const usePlayerStore = defineStore('player', () => {
  const playQueueStore = usePlayQueueStore();
  const { currentTrack } = storeToRefs(playQueueStore);
  const cacheStore = useCacheStore();
  const state = ref<'loading' | 'playing' | 'paused' | 'stopped'>();
  let elapsedTimeTimer: ReturnType<typeof setInterval>;

  const currentPlayer = ref<AudioBufferSourceNode | undefined>(undefined);
  const calculateElapsedTime = () => {
    elapsedTime.value = secondsToTime((Date.now() - trackStartTime.value) / 1000);
  };

  watch(currentTrack, async (newTrack) => {
    if (currentPlayer.value !== undefined) {
      currentPlayer.value.removeEventListener("ended", ended);
      currentPlayer.value.stop();
      clearInterval(elapsedTimeTimer);
    }

    if (newTrack === undefined) {
      state.value = 'stopped';
      return;
    }

    console.log("Player: " + JSON.stringify(newTrack));
    if (!cacheStore.isCached(newTrack.external_id)) {
      state.value = 'loading';
    }

    const cacheEntry = await cacheStore.getTrack(newTrack.external_id);
    const trackPlayer: AudioBufferSourceNode = cacheEntry.ctx.createBufferSource()
    trackPlayer.buffer = cacheEntry.audioBuffer;
    trackPlayer.connect(cacheEntry.ctx.destination);
    trackPlayer.addEventListener('ended', ended);
    trackPlayer.start();
    trackStartTime.value = Date.now();
    elapsedTimeTimer = setInterval(calculateElapsedTime, 1000);

    state.value = 'playing';
    duration.value = secondsToTime(cacheEntry.audioBuffer.duration);
    currentPlayer.value = trackPlayer;

    if (playQueueStore.currentPlaylistItem?.nextTrack !== undefined) {
      cacheStore.getTrack(playQueueStore.currentPlaylistItem.nextTrack.track.external_id);
    }
  });

  const ended = async () => {
    clearInterval(elapsedTimeTimer);
    await delay(2000);
    playQueueStore.setNextTrack();
  }

  const trackStartTime = ref<number>(0);
  const title = computed(() => currentTrack.value?.title ?? undefined);
  const artist = computed(() => currentTrack.value?.artist ?? undefined);
  const album = computed(() => currentTrack.value?.album ?? undefined);
  const duration = ref();
  const elapsedTime = ref();

  return {
    title,
    artist,
    album,
    state,
    duration,
    elapsedTime
  }
});

