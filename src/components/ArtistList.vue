<script setup lang="ts">
import { ref } from 'vue';

const artists = ref([
  {
    name: "Jimi Hendrix"
  },
  {
    name: "Metallica"
  },
  {
    name: "Nickelback"
  },
  {
    name: "Sabaton"
  },
  {
    name: "Die Ärzte"
  },
  {
    name: "Jimi Hendrix"
  },
  {
    name: "Metallica"
  },
  {
    name: "Nickelback"
  },
  {
    name: "Sabaton"
  },
  {
    name: "Die Ärzte"
  },
  {
    name: "Jimi Hendrix"
  },
  {
    name: "Metallica"
  },
  {
    name: "Nickelback"
  },
  {
    name: "Sabaton"
  },
  {
    name: "Die Ärzte"
  },
  {
    name: "Jimi Hendrix"
  },
  {
    name: "Metallica"
  },
  {
    name: "Nickelback"
  },
  {
    name: "Sabaton"
  },
  {
    name: "Die Ärzte"
  }
]);

</script>

<template>
  <div class="artistListContainer">
    <ul>
      <li v-for="artist in artists"><a href="">{{ artist.name }}</a></li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  margin: 0;
  width: 100%;
  padding: 0;
  height: 100%;
}

li {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration-line: none;
}

li a {
  font: inherit;
  display: block;
  padding: 5px;
  font: inherit;
  color: #c6c6c6
}

li a:hover {
  color: #373d1f;
  background-color: #afd700;
}

.artistListContainer {
  height: 100%;
  width: 100%;
}
</style>
