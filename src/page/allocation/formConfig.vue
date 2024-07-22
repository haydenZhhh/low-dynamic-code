<template>
  <el-form
    ref="form"
    :model="formConfig"
    label-width="auto"
    label-position="top"
    size="large"
  >
    <el-form-item label="表单提交接口">
      <el-input v-model="formConfig.formPort" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue';

const formConfig = reactive({
  formPort: '',
});
</script>

<style>
.titlePanenl {
  width: 100%;
}

.setIteamPanenl {
  margin-bottom: 20px;
}
</style>
