<template>
  <el-form :rules="rules" ref="form" :model="formConfig" label-width="auto" label-position="top" size="large">
    <el-form-item  prop="formName" label="表单名称">
      <el-input v-model="formConfig.formName" />
    </el-form-item>
    <el-form-item  prop="formPort" label="表单提交接口">
      <el-input v-model="formConfig.formPort" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useStore } from 'vuex';


const store = useStore();

const formConfig = reactive( store.getters.formConfig|| {
  formPort: '',
  formName: ''
});



const rules = reactive({
  formName: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
  formPort: [{ required: true, message: '请输入表单提交接口', trigger: 'blur' }],
});

watch(
  () => formConfig,
  (newVal) => {
    store.commit("setFormConfig", newVal);
  },
  {
    deep: true,
  }
);

</script>

<style>
.titlePanenl {
  width: 100%;
}

.setIteamPanenl {
  margin-bottom: 20px;
}
</style>
