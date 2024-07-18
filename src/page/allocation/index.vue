<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="组件属性" name="first">组件属性</el-tab-pane>
    <el-tab-pane label="表单属性" name="second">Config</el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue';

const activeName = ref('second');

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>

<style scoped>
.demo-tabs {
  font-size: 14px;
}
.demo-tabs > .el-tabs__content {
  /* padding: 32px; */
}
</style>
