<template>
  <div class="codeMain">
    <DndProvider :backend="HTML5Backend">
      <div class="componentStack">
        <Box name="Glass" />
      </div>
      <div class="showcodeComponent">
        <RenderStack />
      </div>
    </DndProvider>
    <div class="configurationArea"></div>
  </div>
</template>

<script setup>
import { DndProvider } from 'vue3-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RenderStack from './renderStack/index.vue';
import Box from './lowStack/lowBox.vue';
</script>

<style scoped>
.codeMain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.componentStack {
  width: 20vw;
  height: 100%;
  /* background-color: aqua; */
}

.showcodeComponent {
  width: 60vw;
  background-color: rgb(237, 239, 243);
  height: 100%;
}

.configurationArea {
  width: 20vw;
  /* background-color: aqua; */
  height: 100%;
}
</style>
