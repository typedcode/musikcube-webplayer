<script setup lang="ts">
import { ref } from 'vue';
import { useMusikcubeStore } from '../stores/musikcube';

const selectedArtistDiv = ref<HTMLDivElement>(undefined);
const musikcubeStore = useMusikcubeStore();

const selectArtist = (event: PointerEvent, artistId: number) => {
  if (selectedArtistDiv.value !== undefined) {
    selectedArtistDiv.value.classList.remove("selected");
  }

  const target = event.target as HTMLDivElement;
  target.classList.add("selected");

  selectedArtistDiv.value = target;
}
</script>

<template>
  <div class="artistListContainer">
    <ul>
      <li v-for="artist in musikcubeStore.artists">
        <div @click="(event) => selectArtist(event, artist.id)">{{ artist.value }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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
