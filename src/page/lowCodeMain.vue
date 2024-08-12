<template>
  <div class="codeMain">
    <div class="componentStack">
      <div class="title">
        <div class="colorPanenl" />
        <div>基础组件</div>
      </div>
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
            <component :is="getIcon(item.name)" />
          </el-icon>
          {{ item.name }}
        </div>
      </VueDraggable>
      <br />
      <br />
      <div class="title">
        <div class="colorPanenl" />
        <div>高级组件</div>
      </div>
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
          <el-icon style="margin-right: 4px">
            <component :is="getIcon(item.name)" />
          </el-icon>
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
        <div class="tipsDral" v-if="configurationList.length === 0">
          请拖入此处
        </div>
        <div
          v-else
          v-for="item in configurationList"
          :key="item.id"
          :class="{ chooseKey: item.id === chooseId, showBox: true }"
          @click="chooseTab(item)"
        >
          <RenderComponents :stackVal="item" />
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
      <Allocation :componentVal="nowComponentVal" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, markRaw } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import {
  Delete,
  EditPen,
  Edit,
  Open,
  Mouse,
  Watch,
  Bell,
  Files,
} from '@element-plus/icons-vue';
import { ElPopconfirm } from 'element-plus';
import lowCodeConfig from '../global.js';
import Allocation from './allocation/index.vue';
import RenderComponents from './renderComponents/index.vue';
import emitter from '../utils/emitter';
import { useStore } from 'vuex';

const iconList = ref([
  { name: '输入框', path: markRaw(EditPen) },
  { name: '多行输入', path: markRaw(Edit) },
  { name: '选择器', path: markRaw(Mouse) },
  { name: '开关', path: markRaw(Open) },
  { name: '时间选择', path: markRaw(Watch) },
  { name: '日期选择', path: markRaw(Bell) },
  { name: '文件上传', path: markRaw(Files) },
]);

const nowComponentVal = ref(null);

const store = useStore();

const getIcon = (val) => {
  for (let i = 0; i < iconList.value.length; i += 1) {
    if (iconList.value[i].name === val) return iconList.value[i].path;
  }
};

// 此刻选中的组件id
const chooseId = ref('');
// 基础组件
const basiclist = ref(lowCodeConfig.basic);
// 高阶组件
const highOrderList = ref(lowCodeConfig.highOrder);

const configurationList = ref(store.getters.mainFormList || []);

// 点击渲染的组件
const chooseTab = (val) => {
  nowComponentVal.value = val;
  chooseId.value = val.id;
};

// 结束拖拽
const endEnvent = () => {};

// 删除确定操作
const confirmEvent = (val) => {
  nowComponentVal.value = null;
  configurationList.value = configurationList.value.filter(
    (item) => item.id !== val.id
  );
  store.commit('deleteFormConfigValue', val.id);
  emitter.emit('deleteSomeStack', {});

  chooseId.value = '';
};

// 复制
const onClone = (element) => {
  const len = configurationList.value.length;
  return {
    name: `${element.name}`,
    type: element.type,
    id: `${element.id}-${element.type}-${len}`,
    configVlaue: {},
  };
};

watchEffect(() => {
  store.commit('setMainFormList', configurationList.value);
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
  /* background-color: rgb(245, 245, 245); */
  background: linear-gradient(
    to right,
    rgba(240, 240, 240, 1),
    rgba(250, 250, 250, 1)
  );

  /* background-image: url('../assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%; */
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
  /* background-color: aqua; */
  min-height: 100px;
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
  /* background-color: rgb(51, 145, 248); */
  background-color: rgb(244, 246, 252);
  border: 1px solid rgb(115, 179, 244);
  color: rgb(0, 136, 254);
  border-radius: 5px;
  cursor: move;
  padding: 8px;
  font-size: 13px;
}

.showBox {
  /* height: 80px; */
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  cursor: move;
  position: relative;
}

.chooseKey {
  background-color: rgb(175, 223, 245);
}

.title {
  font-weight: bold;
  display: flex;
  align-items: center;
}
.colorPanenl {
  height: 20px;
  width: 7px;
  background-color: rgb(64, 169, 255);
  margin-right: 5px;
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
  /* background-color: red; */
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.closePanenl {
  position: absolute;
  right: 20px;
  bottom: -15px;
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
.tipsDral {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  /* 设置文字的渐变背景 */
  background: linear-gradient(to bottom, rgb(64, 169, 255), #feb47b);
  /* 使文字不可选中，防止背景显露 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* 其他样式 */
  font-weight: bold;
  /* display: inline-block; */
}
</style>
