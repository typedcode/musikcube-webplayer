import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Track } from '@/types/track';

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref<Track | undefined>(undefined);

  const setCurrentTrack = (newTrack: Track) => {
    currentTrack.value = newTrack;
  }

  return {
    setCurrentTrack,
    currentTrack
  }
})
