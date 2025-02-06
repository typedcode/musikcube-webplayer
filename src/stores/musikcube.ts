import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebSocketHandler } from './webSocketHandler';
import { requestTracksByArtist, requestArtistsMessage, requestTracksMetadata } from './messages';
import { type Track } from '@/types/Track';
import { type Artist } from '@/types/Artist';

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
  }

  const getTracksResponseHandler = (data: any) => {
    trackIDs.value = (data.options.data as Track[]).map(track => track.id);

    webSocketHandler.sendRequest(requestTracksMetadata(trackIDs.value), trackMetadataHandler);
  };

  const trackMetadataHandler = (data: any) => {
    trackData.value = JSON.parse(data.options.raw_query_data).result;
    tracks.value = trackIDs.value.map(id => trackData.value[id]);
  }

  const getArtistResponseHandler = (data: any) => {
    artists.value = data.options.data as Artist[];
  };

  const loadTracksForArtist = (artistId: number) => {
    webSocketHandler.sendRequest(requestTracksByArtist(artistId), getTracksResponseHandler);
  }

  const webSocketHandler = useWebSocketHandler();
  webSocketHandler.init(loginResponseHandler);

  const artists = ref<Artist[]>([]);
  const trackData = ref<any[]>([]);
  const tracks = ref<Track[]>([]);
  const trackIDs = ref<number[]>([]);

  return {
    loggedIn,
    artists,
    tracks,
    loadTracksForArtist
  }
})
