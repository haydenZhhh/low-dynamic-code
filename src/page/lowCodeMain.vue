<template>
  <div class="codeMain">
    <div class="componentStack">
      <VueDraggable v-model="list1" :animation="150" :group="{ name: 'people', pull: 'clone', put: false }"
        :sort="false" class="leftBox" @clone="onClone">
        <div v-for="item in list1" :key="item.id" class="chooseBox">
          {{ item.name }}
        </div>
      </VueDraggable>
    </div>
    <div class="showcodeComponent">
      <VueDraggable v-model="list2" :animation="150" group="people" class="rightBox">
        <div v-for="item in list2" :key="item.id" class="showBox">
          <IconSort class="handle cursor-move"></IconSort>
          {{ item.name }}
          <iconClose class="cursor-pointer" @click="remove(index)"></iconClose>
        </div>
      </VueDraggable>
    </div>
    <div class="configurationArea"></div>
  </div>
</template>

<script setup>
import { ref,watchEffect } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'


const list1 = ref([
  {
    name: 'Joao',
    id: '1'
  },
  {
    name: 'Jean',
    id: '2'
  },
  {
    name: 'Johanna',
    id: '3'
  },
  {
    name: 'Juan',
    id: '4'
  }
])
const list2 = ref(
  list1.value.map(item => ({
    name: `${item.name}-2`,
    id: `${item.id}-2`
  }))
)

function onClone() {
  console.log('===', list2.value)
  console.log('clone')
}
function remove(index) {
  list2.value.splice(index, 1)
}

watchEffect(() => {
      console.log( list2.value);
    });

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
