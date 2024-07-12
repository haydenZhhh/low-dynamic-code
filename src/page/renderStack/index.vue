<template>
  <div
    :ref="drop"
    class="renderPanenl"
    role="Dustbin"
    :style="{ backgroundColor }"
  >
    {{ isActive ? 'Release to drop' : 'Drag a box here' }}
  </div>
</template>

<script setup>
import { useDrop } from 'vue3-dnd';
import { computed, unref } from 'vue';
import { toRefs } from '@vueuse/core';

const [collect, drop] = useDrop(() => ({
  accept: 'box',
  drop: () => ({ name: 'Dustbin' }),
  collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}));
const { canDrop, isOver } = toRefs(collect);
const isActive = computed(() => unref(canDrop) && unref(isOver));
const backgroundColor = computed(() =>
  console.log('====777', unref(isActive), unref(canDrop))
);
</script>

<style scoped>
.renderPanenl {
  height: 100%;
  width: 100%;
}
</style>
