<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { usePlayQueueStore } from '../stores/playQueue';
import { ref, watch } from 'vue';
import { useCacheStore } from '../stores/cache';

const cacheStore = useCacheStore();
const playQueueStore = usePlayQueueStore();

const { currentTrack } = storeToRefs(playQueueStore);

const currentPlayer = ref<AudioBufferSourceNode | undefined>(undefined);

watch(currentTrack, async (newTrack) => {
  if (currentPlayer.value !== undefined) {
    currentPlayer.value.removeEventListener("ended", ended);
    currentPlayer.value.stop();
  }

  if (newTrack === undefined) {
    return;
  }

  console.log("Player: " + JSON.stringify(newTrack));
  const cacheEntry = await cacheStore.getTrack(newTrack.external_id);
  const trackPlayer: AudioBufferSourceNode = cacheEntry.ctx.createBufferSource()
  trackPlayer.buffer = cacheEntry.audioBuffer;
  trackPlayer.connect(cacheEntry.ctx.destination);
  trackPlayer.addEventListener('ended', ended);
  trackPlayer.start();
  currentPlayer.value = trackPlayer;
});

const ended = () => {
  playQueueStore.setNextTrack();
}

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
