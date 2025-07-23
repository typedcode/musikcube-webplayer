<script setup lang="ts">
import { onMounted, useTemplateRef, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";
import secondsToTime from "@/common/secondsToTime";
import { useMediaSessionStore } from "@/stores/mediaSession";

const playerStore = usePlayerStore();
const { title, artist, album, duration, state } = storeToRefs(playerStore);
const audioElement = useTemplateRef<HTMLAudioElement>("audioElement");
const wheel = (event: any) => {
    if (event.deltaY > 0) {
        playerStore.decreaseVolume();
    } else {
        playerStore.increaseVolume();
    }
};
</script>

<template>
    <div class="volLayout" @wheel.precent="wheel">
        <div class="infoText">vol.</div>
        <div class="lower" @click.prevent="playerStore.decreaseVolume">-</div>
        <div class="volume">{{ playerStore.volume() }}%</div>
        <div class="higher" @click.prevent="playerStore.increaseVolume">+</div>
    </div>
</template>

<style scoped>
.volLayout {
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;
}

.infoText {
    width: 30px;
    text-align: center;
    flex-shrink: 0;
}

.lower,
.higher {
    width: 10px;
    text-align: center;
    flex-shrink: 0;
    cursor: pointer;
}

.volume {
    width: 40px;
    text-align: center;
    flex-shrink: 0;
}
</style>
