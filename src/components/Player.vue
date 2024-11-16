<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/player';

const playerStore = usePlayerStore();

const { title, artist, album, state, duration, elapsedTime } = storeToRefs(playerStore);

</script>

<template>
  <div v-if="title !== undefined">
    <div>
      {{ state }} <span class="highlight">{{ title }}</span> by <span class="highlight">{{ artist
        }}</span> from <span class="highlight">{{ album }}</span>
    </div>
    <div>
      {{ elapsedTime }} / {{ duration }}
    </div>
  </div>
</template>

<style scoped>
.highlight {
  color: #afd700;
  font-weight: bold;
}
</style>
