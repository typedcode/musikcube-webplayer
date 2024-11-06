<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/player';
import { ref, watch } from 'vue';
import { useCacheStore } from '../stores/cache';

const cacheStore = useCacheStore();
const playerStore = usePlayerStore();

const { currentTrack } = storeToRefs(playerStore);

const currentPlayer = ref<AudioBufferSourceNode | undefined>(undefined);

watch(currentTrack, async (newTrack) => {
  if (currentPlayer.value !== undefined) {
    currentPlayer.value.stop();
  }

  if (newTrack === undefined) {
    return;
  }

  console.log("Player: " + JSON.stringify(newTrack));
  const trackPlayer = await cacheStore.getTrack(newTrack.external_id);
  trackPlayer.start();
  currentPlayer.value = trackPlayer;
});

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
