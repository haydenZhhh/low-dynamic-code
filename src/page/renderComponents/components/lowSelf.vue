<template>
  <div v-if="props.showRender === 'showSet'">
    {{ itemTitle }}
  </div>
  <div v-if="!currentComponent">请先选择自定义组件</div>
  <div v-else>
    <component
      :is="currentComponent"
      :getReturnData="getReturnData"
    ></component>
  </div>
</template>

<script setup>
import { defineProps, ref, shallowRef, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();

const props = defineProps({
  stackValue: Object,
  showRender: String,
  changeFormValue: Function,
  nowConfig: Object,
});

const currentComponent = shallowRef(null);

// 获取组件最终的选择数据
const getReturnData = (val) => {
  if (props.changeFormValue) {
    props.changeFormValue(val, props.nowConfig);
  }
};

if (
  props.nowConfig ||
  store.getters.formConfigValue[props.stackValue.id]?.selfvalue
) {
  currentComponent.value = defineAsyncComponent(() => {
    return import(
      `./selfComponents/${
        props.nowConfig?.selfvalue ||
        store.getters.formConfigValue[props.stackValue.id]?.selfvalue
      }.vue`
    );
  });
}

const itemTitle = ref(
  store.getters.formConfigValue[props.stackValue.id]?.titleName || ''
);
emitter.on('storeDataChange', () => {
  itemTitle.value =
    store.getters.formConfigValue[props.stackValue.id]?.titleName || '';

  if (store.getters.formConfigValue[props.stackValue.id]?.selfvalue) {
    currentComponent.value = defineAsyncComponent(() => {
      return import(
        `./selfComponents/${
          store.getters.formConfigValue[props.stackValue.id]?.selfvalue
        }.vue`
      );
    });
  }
});
</script>

<style scoped>
.el-form-item {
  display: block;
}
</style>
