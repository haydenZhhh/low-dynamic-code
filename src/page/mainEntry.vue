<template>
  <div class="mainPage">
    <el-button type="primary" @click="openDrawer">表单配置</el-button>
  </div>

  <el-drawer v-model="drawer2" direction="btt" size="100%">
    <template #title>
      <h4>表单配置</h4>
    </template>
    <template #default>
      <div class="setPanenl">
        <LowCodeMain />
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { ElButton, ElDrawer } from 'element-plus';
import LowCodeMain from './lowCodeMain.vue';

const drawer2 = ref(false);

// 打开配置页面
const openDrawer = () => {
  drawer2.value = true;
};

// 取消
const cancelClick = () => {
  drawer2.value = false;
};

// 保存配置数据
const confirmClick = () => {
  drawer2.value = false;
};
</script>

<style scoped>
.mainPage {
  padding: 8px;
}

.setPanenl {
  height: 100%;
  width: 100%;
}
</style>
