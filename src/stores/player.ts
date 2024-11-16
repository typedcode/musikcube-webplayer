import { ref, watch, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { usePlayQueueStore } from '@/stores/playQueue';
import delay from '@/delay';
import { useCacheStore } from '@/stores/cache';

export const usePlayerStore = defineStore('player', () => {
  const playQueueStore = usePlayQueueStore();
  const { currentTrack } = storeToRefs(playQueueStore);
  const cacheStore = useCacheStore();
  const state = ref<'loading' | 'playing' | 'paused' | 'stopped'>();

  const currentPlayer = ref<AudioBufferSourceNode | undefined>(undefined);

  watch(currentTrack, async (newTrack) => {
    if (currentPlayer.value !== undefined) {
      currentPlayer.value.removeEventListener("ended", ended);
      currentPlayer.value.stop();
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
    state.value = 'playing';
    currentPlayer.value = trackPlayer;

    if (playQueueStore.currentPlaylistItem?.nextTrack !== undefined) {
      cacheStore.getTrack(playQueueStore.currentPlaylistItem.nextTrack.track.external_id);
    }
  });

  const ended = async () => {
    await delay(2000);
    playQueueStore.setNextTrack();
  }

  const title = computed(() => currentTrack.value?.title ?? undefined);
  const artist = computed(() => currentTrack.value?.artist ?? undefined);
  const album = computed(() => currentTrack.value?.album ?? undefined);

  return {
    title,
    artist,
    album,
    state
  }
});

