<script setup lang="ts">
import { onMounted, useTemplateRef, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";
import secondsToTime from "@/common/secondsToTime";
import { useMediaSessionStore } from "@/stores/mediaSession";

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

const elapsedTime = ref("");

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
        <div v-if="title !== undefined">
            <div>
                <span
                    :class="state !== 'loading' ? 'cursor' : ''"
                    @click="stateClicked"
                    >{{ state }}</span
                >
                <span class="highlight">&nbsp;{{ title }}</span> by
                <span class="highlight">{{ artist }}</span> from
                <span class="highlight">{{ album }}</span>
            </div>
            <div v-if="state !== 'loading'">
                {{ elapsedTime }} / {{ duration }}
            </div>
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

.highlight {
    color: #afd700;
    font-weight: bold;
}

.cursor {
    cursor: pointer;
}
</style>
