<script setup lang="ts">
import { onMounted, useTemplateRef, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";
import secondsToTime from "@/common/secondsToTime";
import { useMediaSessionStore } from "@/stores/mediaSession";
import VolumeControle from "@/components/VolumeControle.vue";

const playerStore = usePlayerStore();
const { title, artist, album, duration, state } = storeToRefs(playerStore);
const audioElement = useTemplateRef<HTMLAudioElement>("audioElement");

onMounted(() => {
    const element = audioElement.value! as HTMLAudioElement;
    playerStore.init(element);
    useMediaSessionStore().init(element);
});

const elapsedTimeTimer = ref<ReturnType<typeof setInterval>>();

watch(state, (newState) => {
    if (newState === "playing") {
        elapsedTimeTimer.value = setInterval(setElapsedTime, 1000);
    } else {
        clearInterval(elapsedTimeTimer.value);
    }
});

const setElapsedTime = () => {
    elapsedTime.value = secondsToTime(audioElement.value!.currentTime);
};

const elapsedTime = ref("0:00");

const stateClicked = () => {
    switch (state.value) {
        case "playing": {
            playerStore.pauseTrack();
            return;
        }
        case "paused": {
            playerStore.resumeTrack();
            return;
        }
    }
};
</script>

<template>
    <fieldset class="playInfo border">
        <legend>current track</legend>
        <audio id="hiddenAudio" ref="audioElement" hidden />
        <div class="layout">
            <div class="trackInfo">
                <div v-if="title !== undefined">
                    <span
                        :class="state !== 'loading' ? 'cursor' : ''"
                        @click="stateClicked"
                    >
                        {{ state }}
                    </span>
                    <span class="highlight">&nbsp;{{ title }}</span> by
                    <span class="highlight">{{ artist }}</span> from
                    <span class="highlight">{{ album }}</span>
                </div>
                <div v-else>No track selected yet</div>
            </div>
            <div class="trackTime">{{ elapsedTime }} / {{ duration }}</div>
            <VolumeControle class="volumeControle" />
        </div>
    </fieldset>
</template>

<style scoped>
.playInfo {
    grid-area: playInfo;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 10px;
}

.layout {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto;
    grid-template-areas:
        "trackInfo volumeControle"
        "trackTime playlistControle";
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    width: auto;
    height: auto;
}

.trackInfo {
    grid-area: trackInfo;
}

.trackTime {
    grid-area: trackTime;
}

.volumeControle {
    grid-area: volumeControle;
    justify-self: end;
}

.highlight {
    color: #afd700;
    font-weight: bold;
}

.cursor {
    cursor: pointer;
}
</style>
