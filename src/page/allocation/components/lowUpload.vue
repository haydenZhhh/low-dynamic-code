<template>
  <el-form
    :rules="rules"
    ref="stackForm"
    :model="stackConfig"
    label-width="auto"
    label-position="top"
    size="large"
  >
    <el-form-item label="标题" prop="titleName">
      <el-input v-model="stackConfig.titleName" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="键值" prop="keyValue">
      <el-input v-model="stackConfig.keyValue" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="上传数量限制">
      <el-input-number v-model="stackConfig.fileNum" :min="1" :max="2" />
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch
        v-model="stackConfig.isMustValue"
        size="large"
        active-text="是"
        inactive-text="否"
        @change="
          (val) => {
            stackConfig.isMustValue = val;
          }
        "
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, watch, defineProps } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();

const stackForm = ref();
const props = defineProps({
  stackValue: Object,
});

const stackConfig = reactive(
  store.getters.formConfigValue[props.stackValue.id] || {
    keyValue: '',
    titleName: '',
    fileNum: 1,
    isMustValue: false,
  }
);

const rules = reactive({
  titleName: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
  keyValue: [{ required: true, message: '请输入唯一键值', trigger: 'blur' }],
});

watch(
  () => stackConfig,
  (newVal) => {
    const tempFormConfigValue = JSON.parse(
      JSON.stringify(store.getters.formConfigValue)
    );
    const tempConfig = {};
    tempConfig[props.stackValue.id] = newVal;
    store.commit('setFormConfigValue', {
      ...tempFormConfigValue,
      ...tempConfig,
    });
    emitter.emit('storeDataChange');
  },
  {
    deep: true,
  }
);
</script>

<style scoped></style>
