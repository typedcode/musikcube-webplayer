import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebSocketHandler } from './webSocketHandler';

export const useMusikcubeStore = defineStore('musikcube', () => {
  const loggedIn = ref(false);
  const loginResponseHandler = (data: any) => {
    if (!data.options.authenticated === true) {
      console.error("Could not login");
      return;
    }

    loggedIn.value = true;
    console.log("Login successfull");
  }

  const webSocketHandler = useWebSocketHandler();
  webSocketHandler.init(loginResponseHandler);

  return {
    loggedIn
  }
})
