<template>
  <div v-if="props.showRender === 'showSet'">
    {{ store.getters.formConfigValue[props.stackValue.id]?.titleName }}
  </div>
  <el-input v-model="inputvalue" @input="changeInput" placeholder="请输入" />
</template>

<script setup>
import { watch, defineProps, ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();
const inputvalue = ref('');

const changeInput = (val) => {
  inputvalue.value = val;
  if (props.changeFormValue) {
    props.changeFormValue(val, props.nowConfig);
  }
  // emit('callParentMethod')
};
const props = defineProps({
  stackValue: Object,
  showRender: String,
  changeFormValue: Function,
  nowConfig: Object,
});
console.log('====加载', props, store.getters.formConfigValue);
const counter = computed(() => store.state);
// const temp = toRefs(store.getters.formConfigValue);

emitter.on('storeDataChange', () => {
  console.log('触发事件', store.getters.formConfigValue);
});

// 监听变化
watch(
  counter,
  (newValue, oldValue) => {
    console.log(`counter changed from ${oldValue} to ${newValue}`);
  },
  {
    deep: true,
  }
);
watchEffect(() => {
  console.log('pppp999556466', store.getters.formConfigValue);
});

watch(
  () => store.state.formConfigValue,
  (newVal) => {
    console.log('ppp9999', newVal);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style scoped>
.el-form-item {
  display: block;
}
</style>
