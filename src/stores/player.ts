import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref<string | undefined>(undefined);

  const setCurrentTrack = (externalId: string) => {
    console.log("Set current " + externalId);
    currentTrack.value = externalId;
  }

  return {
    setCurrentTrack,
    currentTrack
  }
})
