<template>
  <el-form
    ref="stackForm"
    :model="stackConfig"
    label-width="auto"
    label-position="top"
    size="large"
  >
    <el-form-item label="placeholder提示语">
      <el-input v-model="stackConfig.formPort" placeholder="请输入" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import emitter from '../../../utils/emitter';

const stackForm = ref();
const stackConfig = reactive({
  placeholderValue: '',
});

watch(
  () => stackConfig,
  (newVal) => {
    emitter.emit('lowInputConfig', newVal);
  },
  {
    deep: true,
  }
);
</script>

<style scoped></style>
