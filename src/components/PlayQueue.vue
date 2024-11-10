<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { usePlayQueueStore, type PlayQueueItem } from '@/stores/playQueue';

const playQueue = usePlayQueueStore();

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
</script>

<template>
  <table>
    <tbody>
      <template v-for="( track, index ) in tracks">
        <tr :class="track.track.external_id === currentTrack?.external_id ? 'trackRow active' : 'trackRow'"
          :id="track.track.external_id">
          <td class="trackNumber">{{ index + 1 }}</td>
          <td class="trackName">{{ track.track.title }}</td>
          <td class="">{{ track.track.album }}</td>
          <td class="trackLength">len</td>
          <td class="trackArtist">{{ track.track.artist }}</td>
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

.active {
  color: #d7d75f;
  background-color: #585858;
}
</style>
