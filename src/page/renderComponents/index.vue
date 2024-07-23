<template>
  <div class="renderPanenl">
    {{ props.stackVal.name }}
    <component :is="currentComponent"></component>
  </div>
</template>

<script setup>
import { defineProps, shallowRef, defineAsyncComponent } from 'vue';

const props = defineProps({
  stackVal: Object,
});

const currentComponent = shallowRef(null);

currentComponent.value = defineAsyncComponent(() => {
  return import(`./components/${props.stackVal.type}.vue`);
});
</script>

<style scoped>
.renderPanenl {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
</style>
