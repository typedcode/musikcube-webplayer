import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref<any | undefined>(undefined);

  const setCurrentTrack = (newTrack: any) => {
    currentTrack.value = newTrack;
  }

  return {
    setCurrentTrack,
    currentTrack
  }
})
