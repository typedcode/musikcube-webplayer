<script setup lang="ts">

import { usePlayerStore } from '../stores/player.ts';
import { useMusikcubeStore } from '../stores/musikcube';
import { ref } from 'vue';

const musikcubeStore = useMusikcubeStore();
const playerStore = usePlayerStore();

const headlineNeedsToBePrinted = (index: number) => {
  if (index === 0) {
    return true;
  }

  return musikcubeStore.tracks[index].album !== musikcubeStore.tracks[index - 1].album;
}

const setTrack = (track: string) => {
  playerStore.setCurrentTrack(track);
}

</script>

<template>
  <table>
    <tbody>
      <template v-for="( track, index ) in musikcubeStore.tracks">
        <tr v-if="headlineNeedsToBePrinted(index)">
          <th colspan="5">{{ track.album }}</th>
        </tr>
        <tr @click="setTrack(track.external_id)" class="trackRow">
          <td class="trackNumber">{{ track.track }}</td>
          <td class="trackName">{{ track.title }}</td>
          <td class="trackLength">len</td>
          <td class="trackArtist">{{ track.artist }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
}

.trackRow:hover {
  background-color: #afd700;
  color: #373d1f;
  cursor: pointer;
}

td {
  padding: 0;
  margin: 0;
  padding-top: 2px;
  padding-bottom: 2px;
}

tr {
  padding-top: 2px;
  padding-bottom: 2px;
}

th {
  color: #afd700;
  text-align: start;
  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.trackNumber {
  width: 30px;
  text-align: end;
}

.trackName {
  padding-left: 10px;
}

.trackLength {
  width: 50px;
}

.trackArtist {
  width: 200px;
}
</style>
