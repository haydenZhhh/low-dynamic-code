<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="组件属性" name="first">
        <component :is="stackComponent" :stackValue="props.componentVal"></component>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="second">
      <FormConfig />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, defineProps, watch, defineAsyncComponent, shallowRef } from 'vue';
import FormConfig from './formConfig.vue';
import emitter from '../../utils/emitter';

const props = defineProps({
  componentVal: Object,
});

const activeName = ref('second');

const stackComponent = shallowRef(null);

emitter.on('deleteSomeStack', () => {
  activeName.value = 'second';
});

watch(
  () => props.componentVal,
  (value) => {
    if (value) {
      console.log('---===', value);
      stackComponent.value = defineAsyncComponent(() => {
        return import(`./components/${value.type}.vue`);
      });
      activeName.value = 'first';
    } else {
      stackComponent.value = null;
    }
  },
  {
    deep: true,
  }
);

const handleClick = (tab, event) => {
  console.log('====', props);
  console.log(tab, event);
};
</script>

<style scoped>
.demo-tabs {
  font-size: 14px;
   overflow-y: auto;

}

.el-tabs__content {
  overflow-y: auto;
}
</style>
