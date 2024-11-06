import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebSocketHandler } from './webSocketHandler';
import { requestTracksByArtist, requestArtistsMessage } from './messages';
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
    console.log(data);
    tracks.value = data.options.data as Track[];
  };

  const getArtistResponseHandler = (data: any) => {
    artists.value = data.options.data as Artist[];
  };

  const loadTracksForArtist = (artistId: number) => {
    webSocketHandler.sendRequest(requestTracksByArtist(artistId), getTracksResponseHandler);
  }

  const webSocketHandler = useWebSocketHandler();
  webSocketHandler.init(loginResponseHandler);

  const artists = ref<Artist[]>([]);
  const tracks = ref<Track[]>([]);

  return {
    loggedIn,
    artists,
    tracks,
    loadTracksForArtist
  }
})
