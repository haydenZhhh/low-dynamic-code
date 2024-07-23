<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="组件属性" name="first">
      <component :is="stackComponent"></component>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="second">
      <FormConfig />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, defineProps, watch, defineAsyncComponent, shallowRef } from 'vue';
import FormConfig from './formConfig.vue';

const props = defineProps({
  componentVal: Object,
});

const activeName = ref('second');

const stackComponent = shallowRef(null);

watch(
  () => props.componentVal,
  (value) => {
    if (value) {
      stackComponent.value = defineAsyncComponent(() => {
        return import(`./components/${value.type}.vue`);
      });
      activeName.value = 'first';
    }
  }
);

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>

<style scoped>
.demo-tabs {
  font-size: 14px;
}
</style>
