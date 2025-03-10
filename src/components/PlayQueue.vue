<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { usePlayQueueStore, type PlayQueueItem } from '@/stores/playQueue';
import type { Track } from '@/types/Track';
import secondsToTime from '@/common/secondsToTime';
import { useUiStateStore } from '@/stores/uiState';

const playQueue = usePlayQueueStore();
const uiStateStore = useUiStateStore();

const tracks = computed(() => {
  const result: PlayQueueItem[] = [];

  let currentItem: PlayQueueItem | undefined = playQueue.firstPlaylistItem;

  while (currentItem !== undefined) {
    result.push(currentItem);
    currentItem = currentItem.nextTrack;
  }

  return result;
});

const { currentTrack } = storeToRefs(playQueue);

const currentyPlayingTrack = ref<HTMLTableRowElement | undefined>(undefined);

watch(currentTrack, async (newTrack) => {
  if (currentyPlayingTrack.value !== undefined) {
    currentyPlayingTrack.value.classList.remove("active");
  }

  if (newTrack === undefined) {
    return;
  }

  const newElement = document.getElementById(newTrack.external_id) as HTMLTableRowElement;

  newElement.classList.add('active');

  currentyPlayingTrack.value = newElement;

});

const playTrackFromQueue = (track: Track) => {
  console.log("track: " + track);
  playQueue.playTrackFromQueue(track);
}

const changeTrackList = () => {
  uiStateStore.setTrackListUiElement("TrackList");
}
</script>

<template>
  <fieldset class="titleInfo border">
    <legend class="pointer" @click="changeTrackList()">play queue</legend>
    <table>
      <tbody>
        <template v-for="( track, index ) in tracks">
          <tr @click="playTrackFromQueue(track.track)"
            :class="track.track.external_id === currentTrack?.external_id ? 'activeRow' : 'trackRow'"
            :id="track.track.external_id">
            <td class="trackNumber">{{ index + 1 }}</td>
            <td class="trackName">{{ track.track.title }}</td>
            <td class="">{{ track.track.album }} <span>- Disc {{ track.track.disc }}</span></td>
            <td class="trackLength">{{ secondsToTime(track.track.duration) }}</td>
            <td class="trackArtist">{{ track.track.artist }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </fieldset>
</template>

<style scoped>
.titleInfo {
  grid-area: titleInfo;
  margin-top: 20px;
  margin-right: 20px;
  padding: 0;
  overflow: auto;
}

legend {
  margin-left: 10px;
}

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

.activeRow:hover {
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
  padding-right: 50px;
  text-align: right;
  width: 80px;
}

.trackArtist {
  width: 200px;
}

.trackRow span {
  color: #595f3f;
}

.activeRow:hover span {
  color: #595f3f;
}
</style>
