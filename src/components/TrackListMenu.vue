<script setup lang="ts">

defineProps({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

const emitAction = (action: ('playTrackClicked' | 'addToQueue')) => {
  emit(action);
}

const emit = defineEmits(['playTrackClicked', 'addToQueue']);
</script>

<template>
  <div class="floatingMenu" :style="{ top: y + 'px', left: x + 'px' }">
    <ul>
      <li @click="emitAction('playTrackClicked')">
        <div>play track</div>
      </li>
      <li @click="emitAction('addToQueue')">
        <div>add to queue</div>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.floatingMenu {
  position: absolute;
  background-color: #242424;
  border-style: solid;
  border-radius: 3px;
  border-width: 2px;
  border-left-style: dashed;
  border-right-style: dashed;
  border-color: #d75f5f;
}

ul {
  width: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
}

li {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration-line: none;
}

li div {
  font: inherit;
  display: block;
  padding: 2px 5px 2px 5px;
  font: inherit;
  color: #c6c6c6
}

li div:hover {
  color: #373d1f;
  background-color: #afd700;
  cursor: pointer;
}
</style>
