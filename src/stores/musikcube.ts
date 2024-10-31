import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebSocketHandler } from './webSocketHandler';
import { requestArtistsMessage } from './messages';

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

  const getArtistResponseHandler = (data: any) => {
    artists.value = data.options.data;

    console.log("hier die artists:");
    console.log(artists.value);
  };

  const webSocketHandler = useWebSocketHandler();
  webSocketHandler.init(loginResponseHandler);

  const artists = ref({});

  return {
    loggedIn,
    artists
  }
})
