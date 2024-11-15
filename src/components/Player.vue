<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/player';

const playQueueStore = usePlayerStore();

const { currentTrack } = storeToRefs(playQueueStore);

</script>

<template>
  <div v-if="currentTrack !== undefined">
    playing <span class="highlight">{{ currentTrack.title }}</span> by <span class="highlight">{{ currentTrack.artist
      }}</span> from <span class="highlight">{{ currentTrack.album }}</span>
  </div>
</template>

<style scoped>
.highlight {
  color: #afd700;
  font-weight: bold;
}
</style>
