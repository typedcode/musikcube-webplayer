import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid';

interface request {
  id: string,
  device_id: string
}

export const useWebSocketHandler = defineStore('webSocketHandler', () => {
  const webSocket = ref<WebSocket>();
  const responseHandlerMap: Map<string, Function> = new Map();
  const deviceId = uuid();

  const handleResponse = (data: any) => {
    console.log('recieved: ' + JSON.stringify(data, null, 2));
    const handler = responseHandlerMap.get(data.id);

    if (handler === undefined) {
      console.error(`No Handler for Message ID '${data.id}' found`);
      return;
    }
    responseHandlerMap.delete(data.id);
    handler(data);
  }

  const init = (responseHandler: Function) => {
    webSocket.value = new WebSocket(`ws://${import.meta.env.VITE_MUSIKCUBE_SERVER_ADDRESS}:${import.meta.env.VITE_MUSIKCUBE_SERVER_PORT}`);
    webSocket.value.onmessage = (event) => {
      handleResponse(JSON.parse(event.data));
    }
    webSocket.value.onclose = (event: CloseEvent) => {
      console.log("Connection closed.");
      console.log("Reason: " + JSON.stringify(event.reason, null, 4));
    }

    webSocket.value.onopen = () => {
      const authMessage = {
        "name": "authenticate",
        "type": "request",
        "id": uuid(),
        "device_id": deviceId,
        "options": {
          "password": import.meta.env.VITE_MUSIKCUB_PASSWORD ?? ""
        }
      };

      sendRequest(authMessage, responseHandler);
    }
  }

  const sendRequest = (request: request, responseHandler: Function) => {
    console.log("sending: " + JSON.stringify(request, null, 2));
    request.device_id = deviceId;
    responseHandlerMap.set(request.id, responseHandler);
    webSocket.value!.send(JSON.stringify(request));
  }

  return {
    init,
    sendRequest
  }
})
