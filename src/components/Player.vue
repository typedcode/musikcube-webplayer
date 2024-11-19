<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/player';

const playerStore = usePlayerStore();

const { title, artist, album, state, duration, elapsedTime } = storeToRefs(playerStore);

const stateClicked = () => {
  switch (state.value) {
    case 'playing': {
      playerStore.pauseTrack();
      return;
    }
    case 'paused': {
      playerStore.resumeTrack();
      return;
    }
  }
}

</script>

<template>
  <div v-if="title !== undefined">
    <div>
      <span :class="state !== 'loading' ? 'cursor' : ''" @click="stateClicked">{{ state }}</span> <span
        class="highlight">{{ title }}</span> by <span class="highlight">{{ artist
        }}</span> from <span class="highlight">{{ album }}</span>
    </div>
    <div v-if="state !== 'loading'">
      {{ elapsedTime }} / {{ duration }}
    </div>
  </div>
</template>

<style scoped>
.highlight {
  color: #afd700;
  font-weight: bold;
}

.cursor {
  cursor: pointer;
}
</style>
