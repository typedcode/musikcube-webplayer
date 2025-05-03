<script setup lang="ts">
import { usePlayQueueStore } from "../stores/playQueue";
import { useMusikcubeStore } from "../stores/musikcube";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import type { Track } from "@/types/Track";
import TrackListMenu from "@/components/TrackListMenu.vue";
import secondsToTime from "@/common/secondsToTime";
import { useUiStateStore } from "@/stores/uiState";

const musikcubeStore = useMusikcubeStore();
const playQueueStore = usePlayQueueStore();
const uiStateStore = useUiStateStore();

const headlineNeedsToBePrinted = (index: number) => {
    if (index === 0) {
        return true;
    }

    return (
        musikcubeStore.tracks[index].album !==
            musikcubeStore.tracks[index - 1].album ||
        musikcubeStore.tracks[index].disc !==
            musikcubeStore.tracks[index - 1].disc
    );
};

const setTrack = (track: Track) => {
    playQueueStore.setQueue(musikcubeStore.tracks, track!);
    showContextMenu.value = false;
};

const setSingleTrack = (track: Track) => {
    playQueueStore.setQueue([track], track!);
    showContextMenu.value = false;
};

const playAlbum = (albumId: number) => {
    const albumTracks = musikcubeStore.tracks.filter(
        (track: Track) => track.album_id === albumId,
    );

    playQueueStore.setQueue(albumTracks, albumTracks[0]);
};

const { currentTrack } = storeToRefs(playQueueStore);
const currentyPlayingTrack = ref<HTMLTableRowElement | undefined>(undefined);

watch(currentTrack, async (newTrack) => {
    if (currentyPlayingTrack.value !== undefined) {
        currentyPlayingTrack.value.classList.remove("activeRow");
    }

    if (newTrack === undefined) {
        return;
    }

    const newElement = document.getElementById(
        newTrack.external_id,
    ) as HTMLTableRowElement;

    if (!newElement) {
        return;
    }

    newElement.classList.add("activeRow");

    currentyPlayingTrack.value = newElement;
});

const showContextMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const contextMenuData = ref<Track>();

const openContextMenu = (event: MouseEvent, track: Track) => {
    menuX.value = event.clientX;
    menuY.value = event.clientY;
    showContextMenu.value = true;
    contextMenuData.value = track;
};

const addToQueue = () => {
    playQueueStore.addToQueue(contextMenuData!.value!);
    showContextMenu.value = false;
};

const changeTrackList = () => {
    uiStateStore.setTrackListUiElement("PlayQueue");
};
</script>

<template>
    <fieldset class="titleInfo border">
        <legend class="pointer" @click="changeTrackList()">tracks</legend>
        <TrackListMenu
            v-if="showContextMenu"
            @add-to-queue="addToQueue"
            @play-track-clicked="setSingleTrack(contextMenuData!)"
            :x="menuX"
            :y="menuY"
        />
        <table>
            <tbody>
                <template v-for="(track, index) in musikcubeStore.tracks">
                    <tr v-if="headlineNeedsToBePrinted(index)">
                        <th @click="playAlbum(track.album_id)" colspan="5">
                            {{ track.album }}
                            <span class="disc"> - Disc {{ track.disc }}</span>
                        </th>
                    </tr>
                    <tr
                        @contextmenu.prevent="openContextMenu($event, track)"
                        :id="track.external_id"
                        @click="setTrack(track)"
                        :class="
                            track.external_id === currentTrack?.external_id
                                ? 'trackRow activeRow'
                                : 'trackRow'
                        "
                    >
                        <td class="trackNumber">{{ track.track }}</td>
                        <td class="trackName">{{ track.title }}</td>
                        <td class="trackLength">
                            {{ secondsToTime(track.duration) }}
                        </td>
                        <td class="trackArtist">{{ track.artist }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </fieldset>
</template>

<style scoped>
.titleInfo {
    grid-area: titleInfo;
    margin-top: 20px;
    margin-right: 20px;
    padding: 0;
    overflow: auto;
}

legend {
    margin-left: 10px;
}

table {
    width: 100%;
    margin: 0;
    padding: 0;
    border-collapse: collapse;
}

.trackRow:hover {
    background-color: #afd700;
    color: #373d1f;
    cursor: pointer;
}

td {
    padding: 0;
    margin: 0;
    padding-top: 2px;
    padding-bottom: 2px;
}

tr {
    padding-top: 2px;
    padding-bottom: 2px;
}

th {
    color: #afd700;
    text-align: start;
    padding-left: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
}

th:hover {
    cursor: pointer;
}

.trackNumber {
    width: 30px;
    text-align: end;
}

.trackName {
    padding-left: 10px;
}

.trackLength {
    padding-right: 50px;
    text-align: right;
    width: 80px;
}

.trackArtist {
    width: 200px;
}

.disc {
    color: #595f3f;
}
</style>
