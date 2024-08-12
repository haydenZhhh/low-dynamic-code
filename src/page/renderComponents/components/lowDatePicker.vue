<template>
  <div v-if="props.showRender === 'showSet'">
    {{ itemTitle }}
  </div>
  <el-date-picker
    v-model="datevalue"
    :type="chooseType"
    placeholder="请选择"
    @change="changePicker"
    :value-format="getvalueformat()"
  />
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();
const datevalue = ref('');

const props = defineProps({
  stackValue: Object,
  showRender: String,
  changeFormValue: Function,
  nowConfig: Object,
});

const chooseType = ref(
  store.getters.formConfigValue[props.stackValue.id]?.timeType || 'date'
);

const getvalueformat = () => {
  if (chooseType.value === 'date') {
    return 'YYYY-MM-DD';
  }
  if (chooseType.value === 'year') {
    return 'YYYY';
  }
  if (chooseType.value === 'month') {
    return 'YYYY-MM';
  }
  return 'YYYY-MM-DD';
};

const changePicker = (val) => {
  datevalue.value = val;
  if (props.changeFormValue) {
    props.changeFormValue(val, props.nowConfig);
  }
};

const itemTitle = ref(
  store.getters.formConfigValue[props.stackValue.id]?.titleName || ''
);
emitter.on('storeDataChange', () => {
  itemTitle.value =
    store.getters.formConfigValue[props.stackValue.id]?.titleName || '';
  chooseType.value =
    store.getters.formConfigValue[props.stackValue.id]?.timeType || 'date';
});
</script>

<style scoped>
.el-form-item {
  display: block;
}
</style>
