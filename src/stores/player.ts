import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { usePlayQueueStore } from '@/stores/playQueue';
import delay from '@/delay';
import { useCacheStore } from '@/stores/cache';

export const usePlayerStore = defineStore('player', () => {
  const playQueueStore = usePlayQueueStore();
  const { currentTrack } = storeToRefs(playQueueStore);
  const cacheStore = useCacheStore();

  const currentPlayer = ref<AudioBufferSourceNode | undefined>(undefined);

  watch(currentTrack, async (newTrack) => {
    if (currentPlayer.value !== undefined) {
      currentPlayer.value.removeEventListener("ended", ended);
      currentPlayer.value.stop();
    }

    if (newTrack === undefined) {
      return;
    }

    console.log("Player: " + JSON.stringify(newTrack));
    const cacheEntry = await cacheStore.getTrack(newTrack.external_id);
    const trackPlayer: AudioBufferSourceNode = cacheEntry.ctx.createBufferSource()
    trackPlayer.buffer = cacheEntry.audioBuffer;
    trackPlayer.connect(cacheEntry.ctx.destination);
    trackPlayer.addEventListener('ended', ended);
    trackPlayer.start();
    currentPlayer.value = trackPlayer;

    if (playQueueStore.currentPlaylistItem?.nextTrack !== undefined) {
      cacheStore.getTrack(playQueueStore.currentPlaylistItem.nextTrack.track.external_id);
    }
  });

  const ended = async () => {
    await delay(2000);
    playQueueStore.setNextTrack();
  }

  return {
    currentTrack,
  }
});

