<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="组件属性" name="first">组件属性</el-tab-pane>
    <el-tab-pane label="表单属性" name="second">
      <FormConfig />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
import FormConfig from './formConfig.vue';

const props = defineProps({
  componentVal: Object,
});

watch(
  () => props.componentVal,
  (value) => {
    console.log('6666666666', value);
  }
);

const activeName = ref('second');

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>

<style scoped>
.demo-tabs {
  font-size: 14px;
}
</style>
