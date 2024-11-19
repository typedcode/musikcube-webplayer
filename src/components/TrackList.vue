<script setup lang="ts">

import { usePlayQueueStore } from '../stores/playQueue';
import { useMusikcubeStore } from '../stores/musikcube';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import type { Track } from '@/types/Track';

const musikcubeStore = useMusikcubeStore();
const playQueueStore = usePlayQueueStore();

const headlineNeedsToBePrinted = (index: number) => {
  if (index === 0) {
    return true;
  }

  return musikcubeStore.tracks[index].album !== musikcubeStore.tracks[index - 1].album;
}

const setTrack = (track: number) => {
  console.log("track: " + track);
  playQueueStore.setQueue(musikcubeStore.tracks, musikcubeStore.tracks[track]);
}

const playAlbum = (albumId: number) => {
  const albumTracks = musikcubeStore.tracks.filter((track: Track) => track.album_id === albumId);

  playQueueStore.setQueue(albumTracks, albumTracks[0]);
}

const { currentTrack } = storeToRefs(playQueueStore);
const currentyPlayingTrack = ref<HTMLTableRowElement | undefined>(undefined);

watch(currentTrack, async (newTrack) => {
  if (currentyPlayingTrack.value !== undefined) {
    currentyPlayingTrack.value.classList.remove("activeRow");
  }

  if (newTrack === undefined) {
    return;
  }

  const newElement = document.getElementById(newTrack.external_id) as HTMLTableRowElement;

  newElement.classList.add('activeRow');

  currentyPlayingTrack.value = newElement;
});

</script>

<template>
  <table>
    <tbody>
      <template v-for="( track, index ) in musikcubeStore.tracks">
        <tr v-if="headlineNeedsToBePrinted(index)">
          <th @click="playAlbum(track.album_id)" colspan="5">{{ track.album }}</th>
        </tr>
        <tr :id="track.external_id" @click="setTrack(index)"
          :class="track.external_id === currentTrack?.external_id ? 'trackRow activeRow' : 'trackRow'">
          <td class="trackNumber">{{ track.track }}</td>
          <td class="trackName">{{ track.title }}</td>
          <td class="trackLength"></td>
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

th:hover {
  cursor: pointer;
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
