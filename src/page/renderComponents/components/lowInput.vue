<template>
  <div v-if="props.showRender === 'showSet'">
    {{ itemTitle }}
  </div>
  <el-input v-model="inputvalue" @input="changeInput" placeholder="请输入" />
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();
const inputvalue = ref('');

const changeInput = (val) => {
  inputvalue.value = val;
  if (props.changeFormValue) {
    props.changeFormValue(val, props.nowConfig);
  }
};
const props = defineProps({
  stackValue: Object,
  showRender: String,
  changeFormValue: Function,
  nowConfig: Object,
});

const itemTitle = ref(
  store.getters.formConfigValue[props.stackValue.id]?.titleName
);
emitter.on('storeDataChange', () => {
  itemTitle.value =
    store.getters.formConfigValue[props.stackValue.id]?.titleName;
});
</script>

<style scoped>
.el-form-item {
  display: block;
}
</style>
