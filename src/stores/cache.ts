import { ref } from 'vue'
import { defineStore } from 'pinia'

type CacheEntry = {
  externalId: string,
  ctx: AudioContext,
  audioBuffer: AudioBuffer
}

export const useCacheStore = defineStore('cache', () => {
  const trackCache = ref<CacheEntry[]>([]);

  const loadTrack = async (externalId: string): Promise<CacheEntry> => {
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

    return {
      externalId,
      ctx,
      audioBuffer
    };
  };

  const getTrack = async (externalId: string): Promise<CacheEntry> => {
    for (const entry of trackCache.value) {
      if (entry.externalId === externalId) {
        return entry;
      }
    }

    if (trackCache.value.length >= import.meta.env.VITE_CACHE_SIZE) {
      trackCache.value.shift();
    }

    const cacheEntry = await loadTrack(externalId);
    trackCache.value.push(cacheEntry);

    return cacheEntry;
  }

  return {
    getTrack
  }
})

