import { ref } from 'vue'
import { defineStore } from 'pinia'

type cacheEntry = {
  externalId: string,
  audioBuffer: AudioBufferSourceNode
}

export const useCacheStore = defineStore('cache', () => {
  const trackCache = ref<cacheEntry[]>([]);

  const loadTrack = async (externalId: string): Promise<AudioBufferSourceNode> => {
    const ctx = new AudioContext();

    const request = new Request(
      `http://${import.meta.env.VITE_MUSIKCUBE_PROXY_ADDRESS}:${import.meta.env.VITE_MUSIKCUBE_PROXY_PORT}/api?externalId=${externalId}`
    );

    const fetchResult = await fetch(request);
    const arraybuffer = await fetchResult.arrayBuffer();
    const audioBuffer: AudioBuffer = await ctx.decodeAudioData(arraybuffer);
    const absn: AudioBufferSourceNode = ctx.createBufferSource()
    absn.buffer = audioBuffer;
    absn.connect(ctx.destination);

    return absn;
  }

  const getTrack = async (externalId: string): Promise<AudioBufferSourceNode> => {
    const track = await loadTrack(externalId);
    //trackCache.value.push({ externalId: externalId, audioBuffer: track });

    return track;
  }

  return {
    getTrack
  }
})

