<script setup lang="ts">
import ArtistList from './components/ArtistList.vue';
import TrackList from './components/TrackList.vue';
import Player from './components/Player.vue';

import { useMusikcubeStore } from './stores/musikcube.ts';

useMusikcubeStore();

</script>

<template>
  <div class="layout">
    <fieldset class="artistList border">
      <legend>artists</legend>
      <ArtistList />
    </fieldset>
    <fieldset class="titleInfo border">
      <legend>tracks</legend>
      <TrackList />
    </fieldset>
    <fieldset class="playInfo border">
      <legend>playing</legend>
      <Player />
    </fieldset>
  </div>
</template>

<style scoped>
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

.artistList {
  grid-area: artistList;
  margin-top: 20px;
  margin-left: 20px;
  overflow: scroll;
  padding: 0;
}

.titleInfo {
  grid-area: titleInfo;
  margin-top: 20px;
  margin-right: 20px;
  padding: 0;
  overflow: scroll;
}

.playInfo {
  grid-area: playInfo;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
