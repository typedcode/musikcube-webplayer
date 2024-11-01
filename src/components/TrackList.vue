<script setup lang="ts">

import { useMusikcubeStore } from '../stores/musikcube';

const musikcubeStore = useMusikcubeStore();

</script>

<template>
  <table>
    <tbody>
      <tr v-for="track in musikcubeStore.tracks">
        <td>{{ track.track }}</td>
        <td>{{ track.title }}</td>
        <td>len</td>
        <td>.....</td>
        <td>{{ track.artist }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
