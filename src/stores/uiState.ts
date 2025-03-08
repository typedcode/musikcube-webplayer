import { computed, ref, type Component } from 'vue'
import { defineStore } from 'pinia'
import TrackList from '@/components/TrackList.vue';
import PlayQueue from '@/components/PlayQueue.vue';

export const useUiStateStore = defineStore('uiState', () => {
  type possibleTrackListElements = "TrackList" | "PlayQueue";
  const currentTrackListElement = ref<possibleTrackListElements>("TrackList");

  const trackListElementMap: Record<"TrackList" | "PlayQueue", Component> = {
    "TrackList": TrackList,
    "PlayQueue": PlayQueue
  }

  const trackListUiElement = computed(() => trackListElementMap[currentTrackListElement.value]);

  const setTrackListUiElement = (uiElement: possibleTrackListElements) => {
    currentTrackListElement.value = uiElement;
  }

  return {
    trackListUiElement,
    setTrackListUiElement
  }
})

