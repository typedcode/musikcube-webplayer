<script setup lang="ts">
import Player from './components/Player.vue';
import { useMusikcubeStore } from './stores/musikcube';
import { usePlayerStore } from '@/stores/player';
import { useUiStateStore } from './stores/uiState';

useMusikcubeStore();
usePlayerStore();
const uiStateStore = useUiStateStore();

</script>

<template>
  <div class="layout">
    <component :is="uiStateStore.categoryListUiElement" />
    <component :is="uiStateStore.trackListUiElement" />
    <Player />
  </div>
</template>

<style>
.layout {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto 100px;
  grid-template-areas:
    "artistList titleInfo"
    "playInfo   playInfo";
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  width: auto;
  height: 100%;
}

.border {
  border-color: #c6c6c6;
  border-style: solid;
  border-radius: 3px;
  border-width: 2px;
  border-left-style: dashed;
  border-right-style: dashed;
}

.border:hover {
  border-color: #d75f5f;
}

.pointer {
  cursor: pointer;
}
</style>
