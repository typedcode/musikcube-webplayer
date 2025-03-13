import { computed, ref, type Component } from 'vue'
import { defineStore } from 'pinia'
import TrackList from '@/components/TrackList.vue';
import PlayQueue from '@/components/PlayQueue.vue';
import ArtistList from '@/components/ArtistList.vue';
import PlaylistList from '@/components/PlaylistList.vue';

export const useUiStateStore = defineStore('uiState', () => {
  type possibleTrackListElements = "TrackList" | "PlayQueue";
  type possibleCategoryListElements = "ArtistList" | "PlaylistList";

  const currentTrackListElement = ref<possibleTrackListElements>("TrackList");
  const currentCategoryListElement = ref<possibleCategoryListElements>("ArtistList");

  const trackListElementMap: Record<possibleTrackListElements, Component> = {
    "TrackList": TrackList,
    "PlayQueue": PlayQueue
  }

  const categoryListElementMap: Record<possibleCategoryListElements, Component> = {
    "ArtistList": ArtistList,
    "PlaylistList": PlaylistList
  }

  const trackListUiElement = computed(() => trackListElementMap[currentTrackListElement.value]);
  const categoryListUiElement = computed(() => categoryListElementMap[currentCategoryListElement.value]);

  const setTrackListUiElement = (uiElement: possibleTrackListElements) => {
    currentTrackListElement.value = uiElement;
  }

  const setCategoryListUiElement = (uiElement: possibleCategoryListElements) => {
    currentCategoryListElement.value = uiElement;
  }

  return {
    trackListUiElement,
    setTrackListUiElement,
    categoryListUiElement,
    setCategoryListUiElement
  }
})

