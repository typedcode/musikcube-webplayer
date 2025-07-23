import { ref, watch, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { usePlayQueueStore } from "@/stores/playQueue";
import secondsToTime from "@/common/secondsToTime";

export const usePlayerStore = defineStore("player", () => {
    const audioElement = ref<HTMLAudioElement>();
    const playQueueStore = usePlayQueueStore();
    const { currentTrack } = storeToRefs(playQueueStore);
    const state = ref<"loading" | "playing" | "paused" | "stopped">();
    let elapsedTimeTimer: ReturnType<typeof setInterval>;

    const clearPlayer = () => {
        clearInterval(elapsedTimeTimer);
    };

    const currentTrackId = ref<string>();

    watch(currentTrack, async (newTrack) => {
        elapsedTime.value = 0;

        currentTrackId.value = newTrack?.external_id;

        clearPlayer();

        if (newTrack === undefined) {
            state.value = "stopped";
            return;
        }

        console.log("Player: " + JSON.stringify(newTrack));

        if (currentTrackId.value !== newTrack.external_id) {
            return;
        }

        startTrack();
    });

    const startTrack = () => {
        audioElement.value!.src = `http://${import.meta.env.VITE_MUSIKCUBE_PROXY_ADDRESS}:${import.meta.env.VITE_MUSIKCUBE_PROXY_PORT}/api?externalId=${currentTrack.value?.external_id}`;
        audioElement.value!.play();
        state.value = "playing";
    };

    const ended = async () => {
        clearInterval(elapsedTimeTimer);
        playQueueStore.setNextTrack();
    };

    const pauseTrack = () => {
        audioElement.value!.pause();
        state.value = "paused";
    };

    const resumeTrack = () => {
        audioElement.value!.play();
        state.value = "playing";
    };

    const title = computed(() => currentTrack.value?.title ?? undefined);
    const artist = computed(() => currentTrack.value?.artist ?? undefined);
    const album = computed(() => currentTrack.value?.album ?? undefined);
    const duration = computed(() =>
        currentTrack.value?.duration
            ? secondsToTime(currentTrack.value.duration)
            : undefined,
    );
    const elapsedTime = ref(0);

    const init = (ae: HTMLAudioElement) => {
        audioElement.value = ae;
        audioElement.value.addEventListener("ended", ended);
        volumeRef.value = audioElement.value.volume;
    };

    const volumeRef = ref(1);

    const increaseVolume = () => {
        volumeRef.value = Math.min(volumeRef.value + 0.02, 1);

        audioElement.value!.volume = volumeRef.value;
    };

    const decreaseVolume = () => {
        volumeRef.value = Math.max(volumeRef.value - 0.02, 0);

        audioElement.value!.volume = volumeRef.value;
    };

    const volume = () => {
        return Math.round(volumeRef.value * 100);
    };

    return {
        title,
        artist,
        album,
        state,
        duration,
        elapsedTime: computed(
            () => secondsToTime(elapsedTime.value / 1000) ?? "0",
        ),
        pauseTrack,
        resumeTrack,
        currentTrackId,
        init,
        volume,
        increaseVolume,
        decreaseVolume,
    };
});
