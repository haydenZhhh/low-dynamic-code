<template>
  <div class="codeMain">
    <div class="componentStack">
      <div class="title">基础组件</div>
      <VueDraggable v-model="list1" :animation="150" :group="{ name: 'people', pull: 'clone', put: false }"
        :sort="false" dragClass="dragClass" class="leftBox " @clone="onClone" @end="endEnvent">
        <div v-for="item in list1" :key="item.id" class="chooseBox">
          {{ item.name }}
        </div>
      </VueDraggable>
      <br />
      <br />
      <div class="title">高级组件</div>
      <VueDraggable v-model="list3" :animation="150" :group="{ name: 'people', pull: 'clone', put: false }"
        :sort="false" dragClass="dragClass" class="leftBox " @clone="onClone" @end="endEnvent">
        <div v-for="item in list3" :key="item.id" class="chooseBox">
          {{ item.name }}
        </div>
      </VueDraggable>
    </div>
    <div class="showcodeComponent">
      <VueDraggable v-model="list2" :animation="150" group="people" @onAdd="afterAdd" class="rightBox "
        ghostClass="ghost">
        <div v-for="item in list2" :key="item.id" :class="{ chooseKey: item.id === chooseId, showBox: true }"
          @click="chooseTab(item)">
          <div class="renderPanenl">
            {{ item.name }}
          </div>
          <div v-if="item.id === chooseId" class="closePanenl ">

            <el-popconfirm confirm-button-text="是" cancel-button-text="否" @confirm="confirmEvent(item)" title="确认删除?">
              <template #reference>
                <el-icon>
                  <Delete style="height: 20px;width: 20px;color: rgb(251,83,86)" />
                </el-icon>
              </template>
            </el-popconfirm>


          </div>
        </div>
      </VueDraggable>
    </div>
    <div class="configurationArea"></div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { Delete } from '@element-plus/icons-vue'
import { ElPopconfirm } from 'element-plus';

const chooseId = ref('');

const list1 = ref([
  {
    name: 'Joao',
    id: '1',
  },
  {
    name: 'Jean',
    id: '2',
  },
  {
    name: 'Johanna',
    id: '3',
  },
  {
    name: 'Juan',
    id: '4',
  },
]);

const list3 = ref([
  {
    name: '看看',
    id: '8',
  },
  {
    name: '方法',
    id: '9',
  },
  {
    name: '打点',
    id: '12',
  },
  {
    name: '嗯嗯',
    id: '15',
  },
]);

const list2 = ref([]
  // list1.value.map((item) => ({
  //   name: `${item.name}-2`,
  //   id: `${item.id}-2`,
  // }))
);
const afterAdd = (val) => {
  console.log('hhhh', val, list2.value)
}

const chooseTab = (val) => {
  chooseId.value = val.id;
};

const endEnvent = () => {

};

const confirmEvent = (val) => {
  console.log('===', val)
  list2.value = list2.value.filter((item) => item.id !== val.id)
  chooseId.value = ''
}

const onClone = (val) => {
  console.log('===', list2.value);
  console.log('clone', val);
}


watchEffect(() => {
  console.log(list2.value);
});
</script>

<style scoped>
.codeMain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  background-color: #fff;
}

.componentStack {
  width: 20%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
}

.showcodeComponent {
  width: 60%;
  background-color: rgb(245, 245, 245);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
}

.configurationArea {
  width: 20%;
  /* background-color: aqua; */
  height: 100%;
}

.leftBox {
  /* height: 100%; */
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction: row;
  margin-top: 20px;
  gap: 10px;
  flex-wrap: wrap;
}

.basicComponents {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.rightBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}

.chooseBox {
  height: 18px;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(244, 246, 252);
  cursor: move;
  padding: 8px;
}

.showBox {
  height: 100px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  cursor: move;
}

.chooseKey {
  background-color: rgb(175, 223, 245);
}

.renderPanenl {
  width: 100%;
  height: 100%;
  padding: 10px;
}

.title {
  font-weight: bold;
}

.showComponents {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 20px;
  gap: 10px;
  flex-wrap: wrap;
}

.dragClass {
  background-color: red;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.closePanenl {
  position: relative;
  right: 20px;
  bottom: -45px;
  z-index: 999;
  height: 34px;
  width: 34px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgb(251, 83, 86);
}
</style>
