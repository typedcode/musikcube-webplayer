# musikcube-webplayer

musikcube-webplayer is a free to use web-frontend for the [musikcube](https://musikcube.com) streaming audio server. It is intendet to be installed alonside ones musikcube instance in the local network.

**For now the musikcube-webplayer is in a version < 1.0.0. This means that stuff can change. If you update from a previous version and the player will not start, please doubleckeck the installation documentation to check if something has changed.**

## prerequisites

- musikcube must be installed (get it [here](https://github.com/clangen/musikcube))
- install the musikcube-webplayer-proxy (get it [here](https://github.com/typedcode/musikcube-webplayer-proxy))
- node needs to be installed

## installation

- clone this repository
- rename `.env.template` to `.env`
- set at least the `VITE_MUSIKCUBE_SERVER_ADDRESS` and `VITE_MUSIKCUBE_PROXY_ADDRESS` to the appropriate values. Check the parameters table for additional parameters and default values.
- run `npm ci`
- run `npm run start`

## parameters
|Parameter                         |Default | Description|
|----------------------------------|--------|------------|
|VITE_MUSIKCUBE_SERVER_ADDRESS     |        | IP-Adress where musikcube is running |
|VITE_MUSIKCUBE_PROXY_ADDRESS      |        | Address (inkl protocol) where the proxy is running|
|VITE_MUSIKCUBE_METADATASERVER_PORT| 7905   | Port for the musikcube metadata server. Can be found in musikcube -> settings -> server setup. |
|VITE_MUSIKCUBE_PASSWORD           |        | If the password for musikcube is set. Enter it here|
|VITE_MUSIKCUBE_PROXY_PORT         | 5000   | Port to connect to the proxy|

## (planned) features

- [x] play tracks
- [x] play all tracks of an artist
- [x] play an album
- [x] add song to playqueue
- [x] adjust volume
- [x] pause/resume track
- [x] show artists
- [x] show albums of artist
- [x] pause/resume via multi media keys
- [x] show playqueue
- [x] show playlists
- [x] play playlist
- [ ] add album to playqueue
- [ ] create playlist
- [ ] add track to playlist
- [ ] add album to playlist
- [ ] remove track from playlist
- [ ] remoce track from playqueue
- [ ] rename playlist
- [ ] integrate album art to mediasession
- [ ] save volume settings for next session
- [ ] save last played artist/playlist/playqueue and track
- [ ] repeat
- [ ] shuffle
- [ ] next track
- [ ] previous track
