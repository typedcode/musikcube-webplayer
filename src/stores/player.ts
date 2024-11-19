import { ref, watch, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { usePlayQueueStore } from '@/stores/playQueue';
import delay from '@/delay';
import { useCacheStore, type CacheEntry } from '@/stores/cache';
import secondsToTime from '@/common/secondsToTime';

export const usePlayerStore = defineStore('player', () => {
  const playQueueStore = usePlayQueueStore();
  const { currentTrack } = storeToRefs(playQueueStore);
  const cacheStore = useCacheStore();
  const state = ref<'loading' | 'playing' | 'paused' | 'stopped'>();
  let elapsedTimeTimer: ReturnType<typeof setInterval>;
  let pausedAt = 0;
  let currentTrackCacheEntry: CacheEntry | undefined = undefined;

  const currentPlayer = ref<AudioBufferSourceNode | undefined>(undefined);
  const calculateElapsedTime = () => {
    elapsedTime.value = Date.now() - trackStartTime.value + pausedAt;
  };

  watch(currentTrack, async (newTrack) => {
    elapsedTime.value = 0;
    pausedAt = 0;
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

    currentTrackCacheEntry = await cacheStore.getTrack(newTrack.external_id);
    const trackPlayer: AudioBufferSourceNode = currentTrackCacheEntry.ctx.createBufferSource()
    trackPlayer.buffer = currentTrackCacheEntry.audioBuffer;
    trackPlayer.connect(currentTrackCacheEntry.ctx.destination);
    trackPlayer.addEventListener('ended', ended);
    trackPlayer.start();
    trackStartTime.value = Date.now();
    elapsedTimeTimer = setInterval(calculateElapsedTime, 1000);

    state.value = 'playing';
    duration.value = secondsToTime(currentTrackCacheEntry.audioBuffer.duration);
    currentPlayer.value = trackPlayer;

    if (playQueueStore.currentPlaylistItem?.nextTrack !== undefined) {
      cacheStore.getTrack(playQueueStore.currentPlaylistItem.nextTrack.track.external_id);
    }
  });

  const ended = async () => {
    clearInterval(elapsedTimeTimer);
    pausedAt = 0;
    await delay(2000);
    playQueueStore.setNextTrack();
  }

  const pauseTrack = () => {
    if (state.value !== 'playing') {
      console.error(`pause track was called when track was not in 'playing' mode. mode: ${state.value} `);
      return;
    }

    calculateElapsedTime();
    pausedAt = elapsedTime.value;
    currentPlayer.value!.removeEventListener('ended', ended);
    currentPlayer.value!.stop();
    clearInterval(elapsedTimeTimer);

    currentPlayer.value = currentTrackCacheEntry!.ctx.createBufferSource()
    currentPlayer.value.buffer = currentTrackCacheEntry!.audioBuffer;
    currentPlayer.value.connect(currentTrackCacheEntry!.ctx.destination);
    currentPlayer.value.addEventListener('ended', ended);

    state.value = 'paused';
  }

  const resumeTrack = () => {
    if (state.value !== 'paused') {
      console.error(`resume track was called when track was not in 'paused' mode. mode: ${state.value} `);
      return;
    }

    currentPlayer.value!.start(0, pausedAt / 1000);
    trackStartTime.value = Date.now();
    elapsedTimeTimer = setInterval(calculateElapsedTime, 1000);

    state.value = 'playing';
  }

  const trackStartTime = ref<number>(0);
  const title = computed(() => currentTrack.value?.title ?? undefined);
  const artist = computed(() => currentTrack.value?.artist ?? undefined);
  const album = computed(() => currentTrack.value?.album ?? undefined);
  const duration = ref();
  const elapsedTime = ref(0);

  return {
    title,
    artist,
    album,
    state,
    duration,
    elapsedTime: computed(() => secondsToTime(elapsedTime.value / 1000) ?? '0'),
    pauseTrack,
    resumeTrack
  }
});

