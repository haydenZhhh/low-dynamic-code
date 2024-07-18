<template>
  <div class="codeMain">
    <div class="componentStack">
      <div class="title">基础组件</div>
      <VueDraggable
        v-model="basiclist"
        :animation="150"
        :group="{ name: 'lowCode', pull: 'clone', put: false }"
        :sort="false"
        dragClass="dragClass"
        class="leftBox"
        :clone="onClone"
        @end="endEnvent"
      >
        <div v-for="item in basiclist" :key="item.id" class="chooseBox">
          <el-icon style="margin-right: 4px">
            <component :is="item.iconName" />
          </el-icon>
          {{ item.name }}
        </div>
      </VueDraggable>
      <br />
      <br />
      <div class="title">高级组件</div>
      <VueDraggable
        v-model="highOrderList"
        :animation="150"
        :group="{ name: 'lowCode', pull: 'clone', put: false }"
        :sort="false"
        dragClass="dragClass"
        class="leftBox"
        :clone="onClone"
        @end="endEnvent"
      >
        <div v-for="item in highOrderList" :key="item.id" class="chooseBox">
          {{ item.name }}
        </div>
      </VueDraggable>
    </div>
    <div class="showcodeComponent">
      <VueDraggable
        v-model="configurationList"
        :animation="150"
        group="lowCode"
        class="rightBox"
        ghostClass="ghost"
      >
        <div
          v-for="item in configurationList"
          :key="item.id"
          :class="{ chooseKey: item.id === chooseId, showBox: true }"
          @click="chooseTab(item)"
        >
          <div class="renderPanenl">
            {{ item.name }}
          </div>
          <div v-if="item.id === chooseId" class="closePanenl">
            <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              @confirm="confirmEvent(item)"
              title="确认删除?"
            >
              <template #reference>
                <el-icon>
                  <Delete
                    style="height: 20px; width: 20px; color: rgb(251, 83, 86)"
                  />
                </el-icon>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </VueDraggable>
    </div>
    <div class="configurationArea">
      <Allocation />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { Delete } from '@element-plus/icons-vue';
import { ElPopconfirm } from 'element-plus';
import lowCodeConfig from '../global.js';
import Allocation from './allocation/index.vue';

// 此刻选中的组件id
const chooseId = ref('');
// 基础组件
const basiclist = ref(lowCodeConfig.basic);
// 高阶组件
const highOrderList = ref(lowCodeConfig.highOrder);

const configurationList = ref([]);

// 点击渲染的组件
const chooseTab = (val) => {
  chooseId.value = val.id;
};

// 结束拖拽
const endEnvent = () => {};

// 删除确定操作
const confirmEvent = (val) => {
  configurationList.value = configurationList.value.filter(
    (item) => item.id !== val.id
  );
  chooseId.value = '';
};

// 复制
const onClone = (element) => {
  const len = configurationList.value.length;
  return {
    name: `${element.name}`,
    id: `${element.id}-${len}`,
  };
};

watchEffect(() => {
  console.log('最终', configurationList.value);
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
  min-width: 250px;
  width: 12%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
}

.showcodeComponent {
  width: 74%;
  min-width: 400px;
  background-color: rgb(245, 245, 245);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
}

.configurationArea {
  width: 14%;
  min-width: 300px;
  height: 100%;
  padding-left: 14px;
  padding-right: 10px;
  padding-bottom: 10px;
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
  width: 40%;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: rgb(244, 246, 252);
  cursor: move;
  padding: 8px;
  font-size: 13px;
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
