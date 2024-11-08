import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Track } from '@/types/Track';

type PlayQueueItem = {
  track: Track,
  previousTrack: PlayQueueItem | undefined,
  nexrTrack: PlayQueueItem | undefined
}

export const usePlayerStore = defineStore('playQueue', () => {
  const currentTrack = computed(() => {
    if (currentPlaylistItem.value === undefined) {
      return undefined;
    }

    return currentPlaylistItem.value.track;
  });

  const firstPlaylistItem = ref<PlayQueueItem | undefined>(undefined);
  const lastPlaylistItem = ref<PlayQueueItem | undefined>(undefined);
  const currentPlaylistItem = ref<PlayQueueItem | undefined>(undefined);

  const setCurrentTrack = (newTrack: Track) => {
    currentPlaylistItem.value = {
      track: newTrack,
      previousTrack: undefined,
      nexrTrack: undefined
    }
  };

  const setQueue = (tracks: Track[], trackToPlay: Track) => {
    firstPlaylistItem.value = {
      track: tracks[0],
      previousTrack: undefined,
      nexrTrack: undefined
    };

    if (firstPlaylistItem.value.track.external_id === trackToPlay.external_id) {
      currentPlaylistItem.value = firstPlaylistItem.value;
    }

    lastPlaylistItem.value = firstPlaylistItem.value;

    for (let i = 1; i < tracks.length; i++) {
      const current: PlayQueueItem = {
        track: tracks[i],
        previousTrack: lastPlaylistItem.value,
        nexrTrack: undefined
      }

      lastPlaylistItem.value.nexrTrack = current;

      lastPlaylistItem.value = current;

      if (current.track.external_id === trackToPlay.external_id) {
        currentPlaylistItem.value = current;
      }
    }
  };

  const setNextTrack = () => {
    currentPlaylistItem.value = currentPlaylistItem.value?.nexrTrack;
  };

  return {
    setCurrentTrack,
    currentTrack,
    setQueue,
    setNextTrack
  }
})
