<script setup>
import { useDrag, useDrop } from 'vue3-dnd'
// import { ItemTypes } from './ItemTypes'
import { computed, unref, defineProps } from 'vue'
import { toRefs } from '@vueuse/core'

const props = defineProps({
    id:Number,
    name: Number,
    text: String,
    key: Number,
    moveCard: Function,
    findCard: Function
})



const originalIndex = computed(() => props.findCard(props.id).index)
const [collect, drag] = useDrag(() => ({
    type: 'card',
    item: () => ({ id: props.id, originalIndex: originalIndex.value }),
    collect: monitor => ({
        isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
            props.moveCard(droppedId, originalIndex)
        }
    },
}))

const [, drop] = useDrop(() => ({
    accept: 'card',
    hover({ id: draggedId }) {
        if (draggedId !== props.id) {
            const { index: overIndex } = props.findCard(props.id)
            props.moveCard(draggedId, overIndex)
        }
    },
}))

const { isDragging } = toRefs(collect)
const opacity = computed(() => (unref(isDragging) ? 0 : 1))
</script>

<template>
    <div :ref="node => drag(drop(node))" class="card" :style="{ opacity }">
        {{ text }}
    </div>
</template>

<style scoped>
.card {
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: white;
    border: 1px dashed gray;
    cursor: move;
}
</style>