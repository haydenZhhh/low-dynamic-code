<template>
    <div
      :ref="drag"
      role="Box"
      :style="{ ...style, opacity }"
      :data-testid="`box-${name}`"
    >
      {{ name }}
    </div>
  </template>
  
  <script  setup>
  import { useDrag } from 'vue3-dnd'
  import { computed, unref,defineProps } from 'vue'
  import { toRefs } from '@vueuse/core'
  
  
  const props = defineProps()
  
  const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
  }
  
  const [collect, drag] = useDrag(() => ({
    type:'box',
    item: () => ({
      name: props.name,
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  
  const { isDragging } = toRefs(collect)
  
  const opacity = computed(() => (unref(isDragging) ? 0.4 : 1))
  </script>
  
  <style  scoped>
  .box {
    float: left;
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem 1rem;
    background-color: white;
    border: 1px solid gray;
    cursor: move;
  
    &.dragging {
      opacity: 0.4;
    }
  }
  </style>