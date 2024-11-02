<script setup lang="ts">

import { useMusikcubeStore } from '../stores/musikcube';
import { ref } from 'vue';

const musikcubeStore = useMusikcubeStore();

const headlineNeedsToBePrinted = (index: number) => {
  if (index === 0) {
    return true;
  }

  return musikcubeStore.tracks[index].album !== musikcubeStore.tracks[index - 1].album;
}

</script>

<template>
  <table>
    <tbody>
      <template v-for="( track, index ) in musikcubeStore.tracks">
        <tr v-if="headlineNeedsToBePrinted(index)">
          <th colspan="5">{{ track.album }}</th>
        </tr>
        <tr>
          <td>{{ track.track }}</td>
          <td>{{ track.title }}</td>
          <td>len</td>
          <td>.....</td>
          <td>{{ track.artist }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
th {
  color: #afd700;
}
</style>
