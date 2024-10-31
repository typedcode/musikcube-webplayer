import { v4 as uuid } from 'uuid';

const requestArtistsMessage = {
  "name": "query_category",
  "type": "request",
  "id": uuid(),
  "device_id": "",
  "options": {
    "category": "artist",
  }
};

export {
  requestArtistsMessage
}
