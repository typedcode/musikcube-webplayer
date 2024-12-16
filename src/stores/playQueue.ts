import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Track } from '@/types/Track';

export type PlayQueueItem = {
  track: Track,
  previousTrack: PlayQueueItem | undefined,
  nextTrack: PlayQueueItem | undefined
}

export const usePlayQueueStore = defineStore('playQueue', () => {
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
      nextTrack: undefined
    }
  };

  const playTrackFromQueue = (trackToPlay: Track) => {
    let current = firstPlaylistItem.value;

    while (current !== undefined) {
      if (current.track.external_id === trackToPlay.external_id) {
        currentPlaylistItem.value = current;
      }

      current = current.nextTrack;
    }
  }

  const addToQueue = (trackToAdd: Track) => {
    const newItem: PlayQueueItem = {
      track: trackToAdd,
      previousTrack: lastPlaylistItem.value,
      nextTrack: undefined
    };

    lastPlaylistItem.value!.nextTrack = newItem;

    lastPlaylistItem.value = newItem;
  }

  const setQueue = (tracks: Track[], trackToPlay: Track) => {
    firstPlaylistItem.value = {
      track: tracks[0],
      previousTrack: undefined,
      nextTrack: undefined
    };

    if (firstPlaylistItem.value.track.external_id === trackToPlay.external_id) {
      currentPlaylistItem.value = firstPlaylistItem.value;
    }

    lastPlaylistItem.value = firstPlaylistItem.value;

    for (let i = 1; i < tracks.length; i++) {
      const current: PlayQueueItem = {
        track: tracks[i],
        previousTrack: lastPlaylistItem.value,
        nextTrack: undefined
      }

      lastPlaylistItem.value.nextTrack = current;

      lastPlaylistItem.value = current;

      if (current.track.external_id === trackToPlay.external_id) {
        currentPlaylistItem.value = current;
      }
    }
  };

  const setNextTrack = () => {
    currentPlaylistItem.value = currentPlaylistItem.value?.nextTrack;
  };

  return {
    setCurrentTrack,
    currentTrack,
    setQueue,
    setNextTrack,
    firstPlaylistItem,
    currentPlaylistItem,
    playTrackFromQueue,
    addToQueue
  }
})
