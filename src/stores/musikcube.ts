import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebSocketHandler } from './webSocketHandler';
import { requestTracksByArtist, requestArtistsMessage, requestTracksMetadata, requestPlaylistsMessage, requestTracksByPlaylist } from './messages';
import { type Track } from '@/types/Track';
import { type QueryCategoryResult } from '@/types/QueryCategoryResult';

export const useMusikcubeStore = defineStore('musikcube', () => {
  const loggedIn = ref(false);
  const loginResponseHandler = (data: any) => {
    if (!data.options.authenticated === true) {
      console.error("Could not login");
      return;
    }

    loggedIn.value = true;
    console.log("Login successfull");
    webSocketHandler.sendRequest(requestArtistsMessage, getArtistResponseHandler);
    webSocketHandler.sendRequest(requestPlaylistsMessage, getPlaylistResponseHandler);
  }

  const getTracksResponseHandler = (data: any) => {
    trackIDs.value = (data.options.data as Track[]).map(track => track.id);

    webSocketHandler.sendRequest(requestTracksMetadata(trackIDs.value), trackMetadataHandler);
  };

  const trackMetadataHandler = (data: any) => {
    trackData.value = JSON.parse(data.options.raw_query_data).result;
    tracks.value = trackIDs.value.map(id => trackData.value[id]);
  }

  const getPlaylistResponseHandler = (data: any) => {
    playlists.value = data.options.data as QueryCategoryResult[];
  };

  const getArtistResponseHandler = (data: any) => {
    artists.value = data.options.data as QueryCategoryResult[];
  };

  const loadTracksForPlaylist = (playlistId: number) => {
    webSocketHandler.sendRequest(requestTracksByPlaylist(playlistId), getTracksResponseHandler);
  }

  const loadTracksForArtist = (artistId: number) => {
    webSocketHandler.sendRequest(requestTracksByArtist(artistId), getTracksResponseHandler);
  }

  const webSocketHandler = useWebSocketHandler();
  webSocketHandler.init(loginResponseHandler);

  const artists = ref<QueryCategoryResult[]>([]);
  const trackData = ref<any[]>([]);
  const tracks = ref<Track[]>([]);
  const trackIDs = ref<number[]>([]);
  const playlists = ref<QueryCategoryResult[]>([]);

  return {
    loggedIn,
    artists,
    tracks,
    loadTracksForArtist,
    loadTracksForPlaylist,
    playlists
  }
})

