<template>
  <div :ref="drop" class="renderPanenl" role="Dustbin" :style="{  backgroundColor }">
    {{ isActive ? 'Release to drop' : 'Drag a box here' }}
    <!-- <Container /> -->
    <!-- <DndProvider > -->
    <Container></Container>
  <!-- </DndProvider> -->
  </div>
</template>

<script setup>
import { useDrop } from 'vue3-dnd';
import { onMounted, onUnmounted,unref,computed } from 'vue';
import { useStore } from 'vuex'
import { toRefs } from '@vueuse/core';
import emitter from '../../utils/emitter'
import Container from './Container.vue'
// import { DndProvider } from 'vue3-dnd'

const store = useStore()
console.log('管理', store)


const [collect,drop] = useDrop(() => ({
  accept: 'box',
  drop: () => ({ name: 'Dustbin' }),
  collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}));
const { canDrop, isOver } = toRefs(collect);
const isActive = computed(() => unref(canDrop) && unref(isOver));

const backgroundColor = computed(() =>{
console.log('lllllllll',unref(isActive),unref(canDrop))
return {}
}
  // unref(isActive) ? 'darkgreen' : unref(canDrop) ? 'darkkhaki' : '#222'
)

const doMountStack = (val) => {
  console.log('pppppjjj', val)
}

onMounted(() => {
  emitter.on('finishDrag', (val) => {
    doMountStack(val)
  })
})

onUnmounted(() => {
  emitter.all.clear()
});
</script>

<style scoped>
.renderPanenl {
  height: 100%;
  width: 100%;
}

</style>
