<script setup lang="ts">
</script>

<template>
  <div class="layout">
    <div class="artistList border"></div>
    <div class="titleInfo border"></div>
    <div class="playInfo border"></div>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto 100px;
  grid-template-areas:
    "artistList titleInfo"
    "playInfo   playInfo";
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  width: auto;
  height: 100%;
}

.border {
  border-color: #d75f5f;
  border-style: solid;
  border-radius: 3px;
  border-width: 2px;
}

.artistList {
  grid-area: artistList;
  margin-top: 20px;
  margin-left: 20px;
}

.titleInfo {
  grid-area: titleInfo;
  margin-top: 20px;
  margin-right: 20px;
}

.playInfo {
  grid-area: playInfo;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
