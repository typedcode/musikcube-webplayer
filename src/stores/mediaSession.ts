import { ref, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { usePlayQueueStore } from "@/stores/playQueue";
import { usePlayerStore } from "@/stores/player";

export const useMediaSessionStore = defineStore("mediaSession", () => {
    const audioElement = ref<HTMLAudioElement>();
    const playQueueStore = usePlayQueueStore();
    const { currentTrack } = storeToRefs(playQueueStore);
    const playerStore = usePlayerStore();

    watch(currentTrack, async (newTrack) => {
        if (!navigator.mediaSession || !newTrack) {
            return;
        }

        navigator.mediaSession.metadata = new MediaMetadata({
            album: newTrack.album,
            artist: newTrack.artist,
            artwork: [],
            title: newTrack.title,
        });
    });

    const paused = () => {
        playerStore.pauseTrack();
        navigator.mediaSession.playbackState = "paused";
    };

    const play = () => {
        playerStore.resumeTrack();
        navigator.mediaSession.playbackState = "playing";
    };

    const nexttrack = () => {
        playQueueStore.setNextTrack();
    };

    const init = (ae: HTMLAudioElement) => {
        if (!navigator.mediaSession) {
            return;
        }

        audioElement.value = ae;
        navigator.mediaSession.setActionHandler("pause", paused);
        navigator.mediaSession.setActionHandler("play", play);
        navigator.mediaSession.setActionHandler("nexttrack", nexttrack);
    };

    const setPlaybackState = (state: MediaSessionPlaybackState) => {
        if( !navigator.mediaSession ) {
            return
        }

        navigator.mediaSession.playbackState = state;
    }

    return {
        init,
        setPlaybackState
    };
});
