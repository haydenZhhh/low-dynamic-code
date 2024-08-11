<template>
  <div class="mainPage">
    <el-button type="primary" @click="openDrawer">表单配置</el-button>
  </div>

  <div v-if="showDataList.length > 0" style="width: 100%; margin: 40px auto; padding: 10px">
    <el-card v-for="(iteam, index) in showDataList" :key="index" style="max-width: 480px">
      <!-- <p  class="text item">名称</p> -->
      <div class="cardMain">
        <div class="leftName">{{ iteam?.formConfig?.formName }}</div>
        <div class="rightBtn">
          <el-button type="primary" :icon="View" circle @click="handleClick(iteam)" />
          <el-button :icon="Edit" @click="editClick(iteam)" circle />
          <el-button :icon="Delete" @click="deleteClick(iteam)" circle />

        </div>
      </div>
    </el-card>
  </div>

  <el-drawer v-model="drawer2" destroy-on-close direction="btt" size="100%">
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
        <el-button round @click="toLookForm">预览</el-button>
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>

  <el-dialog destroy-on-close v-model="dialogTableVisible" title="表单查看" width="800">
    <RenderForm :formValue="nowValue" />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import LowCodeMain from './lowCodeMain.vue';
import { useStore } from 'vuex';
import RenderForm from './renderForm/index.vue';
import { View, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus'

const dialogTableVisible = ref(false);

const store = useStore();

const drawer2 = ref(true);


const nowValue = ref(null)

const showDataList = ref(store.getters.allFormJsonData)


// 编辑
const editClick = (val) => {
  sessionStorage.setItem('editId', `${val.formId}`)
  store.commit("setMainFormList", val.formainFormList);
  store.commit("setFormConfigValue", val.formData);
  store.commit("setFormConfig", val.formConfig);
  drawer2.value = true;

}


// 预览
const toLookForm = () => {
  const tempSendData = {
    formainFormList: store.getters.mainFormList,
    formData: store.getters.formConfigValue,
    formConfig: store.getters.formConfig,
  };
  nowValue.value = tempSendData
  dialogTableVisible.value = true;
}


// 删除
const deleteClick = (val) => {
  ElMessageBox.confirm(
    '确认删除?',
    '提示',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      const tempAllFormJsonData = JSON.parse(
        JSON.stringify(store.getters.allFormJsonData)
      );
      showDataList.value = showDataList.value.filter((item) => item.formId !== val.formId)
      store.commit('setAllFormJsonData', tempAllFormJsonData.filter((item) => item.formId !== val.formId));

      ElMessage({
        type: 'success',
        message: '删除成功！',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      })
    })


}

// 打开配置页面
const openDrawer = () => {
  drawer2.value = true;
  console.log(store.getters.allFormJsonData)
};

// 取消
const cancelClick = () => {
  // 清空
  sessionStorage.setItem('editId', '')

  store.commit("setMainFormList", []);
  store.commit("setFormConfigValue", {});
  store.commit("setFormConfig", {});
  drawer2.value = false;
};

// 保存配置数据
const confirmClick = () => {

  const editId = sessionStorage.getItem('editId')

  if (Object.keys(store.getters.formConfigValue).length === 0) {
    ElMessage('请先配置表单再保存！')
    return
  }


  for (let item of Object.keys(store.getters.formConfigValue)) {
    if (!store.getters.formConfigValue[item].titleName || !store.getters.formConfigValue[item].keyValue || !store.getters.formConfig.formName || !store.getters.formConfig.formPort) {
      ElMessage.error('表单里有配置项没有填完整！')
      return
    }
  }

  drawer2.value = false;
  const tempAllFormJsonData = JSON.parse(
    JSON.stringify(store.getters.allFormJsonData)
  );
  const tempSendData = {
    formainFormList: store.getters.mainFormList,
    formData: store.getters.formConfigValue,
    formConfig: store.getters.formConfig,
    formId: `${tempAllFormJsonData.length}`
  };

  if (editId) {
    // 编辑
    for (let i = 0; i < tempAllFormJsonData.length; i += 1) {
      if (tempAllFormJsonData[i].formId === editId) {
        tempAllFormJsonData[i] = {
          formainFormList: store.getters.mainFormList,
          formData: store.getters.formConfigValue,
          formConfig: store.getters.formConfig,
          formId: editId
        }
      }
    }
    store.commit('setAllFormJsonData', [...tempAllFormJsonData]);
    showDataList.value = [...tempAllFormJsonData]

  } else {
    store.commit('setAllFormJsonData', [tempSendData, ...tempAllFormJsonData]);
    showDataList.value = [tempSendData, ...tempAllFormJsonData]
  }


  // 清空
  sessionStorage.setItem('editId', '')

  store.commit("setMainFormList", []);
  store.commit("setFormConfigValue", {});
  store.commit("setFormConfig", {});
};

const handleClick = (val) => {
  nowValue.value = val
  dialogTableVisible.value = true;
};
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

.cardMain {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
