<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useMusikcubeStore } from '../stores/musikcube';
import { usePlayQueueStore } from '@/stores/playQueue';
import { useUiStateStore } from '@/stores/uiState';

const selectedArtistDiv = ref<HTMLDivElement | undefined>(undefined);
const musikcubeStore = useMusikcubeStore();
const uiStateStore = useUiStateStore();

const selectArtist = (event: MouseEvent, artistId: number) => {
  if (selectedArtistDiv.value !== undefined) {
    selectedArtistDiv.value.classList.remove("selected");
  }

  const target = event.target as HTMLDivElement;
  target.classList.add("selected");

  selectedArtistDiv.value = target;
  uiStateStore.setTrackListUiElement('TrackList');
  musikcubeStore.loadTracksForArtist(artistId);
}

const playQueue = usePlayQueueStore();

const { currentTrack } = storeToRefs(playQueue);
const currentyPlayingTrack = ref<HTMLDivElement | undefined>(undefined);

watch(currentTrack, async (newTrack) => {
  if (currentyPlayingTrack.value !== undefined) {
    currentyPlayingTrack.value.classList.remove("activeRow");
  }

  if (newTrack === undefined) {
    return;
  }

  const newElement = document.getElementById("artistId" + newTrack.visual_artist_id) as HTMLDivElement;

  newElement.classList.add('activeRow');

  currentyPlayingTrack.value = newElement;

});

</script>

<template>
  <fieldset class="artistList border">
    <legend>artists</legend>
    <div class="artistListContainer">
      <ul>
        <li v-for="artist in musikcubeStore.artists">
          <div :id="'artistId' + artist.id" @click="(event) => selectArtist(event, artist.id)">{{ artist.value }}</div>
        </li>
      </ul>
    </div>
  </fieldset>
</template>

<style scoped>
.artistList {
  grid-area: artistList;
  margin-top: 20px;
  margin-left: 20px;
  overflow: auto;
  padding: 0;
}

legend {
  margin-left: 10px;
}

ul {
  margin: 0;
  width: 100%;
  padding: 0;
  height: 100%;
}

li {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration-line: none;
}

li div {
  font: inherit;
  display: block;
  padding: 2px 5px 2px 5px;
  font: inherit;
  color: #c6c6c6
}

li div:hover {
  color: #373d1f;
  background-color: #afd700;
  cursor: pointer;
}

.selected {
  color: #373d1f;
  background-color: #afd700;
}

.artistListContainer {
  height: 100%;
  width: 100%;
}
</style>
