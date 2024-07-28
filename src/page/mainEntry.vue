<template>
  <div class="mainPage">
    <el-button type="primary" @click="openDrawer">表单配置</el-button>
  </div>

  <div style="width: 100%;margin: 40px auto;padding: 10px;">
    <el-card style="max-width: 480px">
    <!-- <p  class="text item">名称</p> -->
    <div class="cardMain">
      <div class="leftName">名称</div>
      <div class="rightBtn">
        <el-button type="primary" :icon="View" circle @click="handleClick" />
        <el-button :icon="Edit" circle />
      </div>
    </div>
  </el-card>
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
        <el-button round>预览</el-button>
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>

  <el-dialog v-model="dialogTableVisible" title="表单查看" width="800">
    <RenderForm />
  </el-dialog>

</template>

<script setup>
import { ref } from 'vue';
import LowCodeMain from './lowCodeMain.vue';
import { useStore } from 'vuex';
import RenderForm from './renderForm/index.vue'
import {
  View,Edit
} from '@element-plus/icons-vue'

const dialogTableVisible = ref(false)

const store = useStore();

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
  console.log('===提交数据', store.getters.formConfigValue)
  sessionStorage.setItem('formainFormList', JSON.stringify(store.getters.mainFormList))

  sessionStorage.setItem('formData', JSON.stringify(store.getters.formConfigValue))
};



const handleClick = () => {
  dialogTableVisible.value = true
}

</script>

<style scoped>
.mainPage {
  padding: 8px;
}

.setPanenl {
  height: 100%;
  width: 100%;
  background-color: rgb(245, 245, 245);
  padding: 8px;
}

.cardMain{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content:space-between;
  align-items: center;
}
</style>
