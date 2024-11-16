<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/player';

const playQueueStore = usePlayerStore();

const { title, artist, album, state } = storeToRefs(playQueueStore);

</script>

<template>
  <div v-if="title !== undefined">
    {{ state }} <span class="highlight">{{ title }}</span> by <span class="highlight">{{ artist
      }}</span> from <span class="highlight">{{ album }}</span>
  </div>
</template>

<style scoped>
.highlight {
  color: #afd700;
  font-weight: bold;
}
</style>
