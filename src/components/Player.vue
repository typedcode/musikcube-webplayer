<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/player';
import { ref, watch } from 'vue';
import { useCacheStore } from '../stores/cache';

const cacheStore = useCacheStore();
const playerStore = usePlayerStore();

const { currentTrack } = storeToRefs(playerStore);

const currentPlayer = ref<AudioBufferSourceNode | undefined>(undefined);

watch(currentTrack, async (newId) => {
  if (currentPlayer.value !== undefined) {
    currentPlayer.value.stop();
  }

  const trackPlayer = await cacheStore.getTrack(newId);
  trackPlayer.start();
  currentPlayer.value = trackPlayer;
});

</script>

<template>

</template>

<style scoped></style>
