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

const requestTracksByArtist = (artistId: number) => {
  return {
    "name": "query_tracks_by_category",
    "type": "request",
    "id": uuid(),
    "device_id": "",
    "options": {
      "category": "artist",
      "id": artistId,
    }
  }
};

export {
  requestArtistsMessage,
  requestTracksByArtist
}
