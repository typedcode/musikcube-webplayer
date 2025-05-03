import { v4 as uuid } from "uuid";

const requestArtistsMessage = {
    name: "query_category",
    type: "request",
    id: uuid(),
    device_id: "",
    options: {
        category: "artist",
    },
};

const requestPlaylistsMessage = {
    name: "query_category",
    type: "request",
    id: uuid(),
    device_id: "",
    options: {
        category: "playlists",
    },
};

const requestTracksByArtist = (artistId: number) => {
    return {
        name: "query_tracks_by_category",
        type: "request",
        id: uuid(),
        device_id: "",
        options: {
            category: "artist",
            id: artistId,
        },
    };
};

const requestTracksByPlaylist = (playlistId: number) => {
    return {
        name: "query_tracks_by_category",
        type: "request",
        id: uuid(),
        device_id: "",
        options: {
            category: "playlists",
            id: playlistId,
        },
    };
};

const requestTracksMetadata = (trackIds: number[]) => {
    return {
        name: "send_raw_query",
        type: "request",
        id: uuid(),
        device_id: "",
        options: {
            raw_query_data:
                '{"name":"TrackMetadataBatchQuery","options":{"trackIds":[' +
                trackIds +
                "]}}",
        },
    };
};

export {
    requestArtistsMessage,
    requestTracksByArtist,
    requestTracksMetadata,
    requestPlaylistsMessage,
    requestTracksByPlaylist,
};
