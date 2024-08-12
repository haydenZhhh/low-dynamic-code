<template>
  <div v-if="props.showRender === 'showSet'">
    {{ itemTitle }}
  </div>
  <el-time-select
    v-model="timevalue"
    :start="stTime"
    :step="stepTime"
    :end="edTime"
    @change="changeTime"
    placeholder="选择时间"
  />
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();
const timevalue = ref('');

const props = defineProps({
  stackValue: Object,
  showRender: String,
  changeFormValue: Function,
  nowConfig: Object,
});

const stTime = ref(
  store.getters.formConfigValue[props.stackValue.id]?.startTime || '06:00'
);
const edTime = ref(
  store.getters.formConfigValue[props.stackValue.id]?.endTime || '18:00'
);
const stepTime = ref(
  store.getters.formConfigValue[props.stackValue.id]?.stepTime || '00:15'
);

const changeTime = (val) => {
  timevalue.value = val;
  if (props.changeFormValue) {
    props.changeFormValue(val, props.nowConfig);
  }
};

const itemTitle = ref(
  store.getters.formConfigValue[props.stackValue.id]?.titleName || ''
);

// 判断格式是否合法

const isValidTimeFormat = (timeStr) => {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(timeStr);
};

emitter.on('storeDataChange', () => {
  itemTitle.value =
    store.getters.formConfigValue[props.stackValue.id]?.titleName || '';
  stTime.value = isValidTimeFormat(
    store.getters.formConfigValue[props.stackValue.id]?.startTime
  )
    ? store.getters.formConfigValue[props.stackValue.id]?.startTime
    : '06:00';
  edTime.value = isValidTimeFormat(
    store.getters.formConfigValue[props.stackValue.id]?.endTime
  )
    ? store.getters.formConfigValue[props.stackValue.id]?.endTime
    : '18:00';
  stepTime.value = isValidTimeFormat(
    store.getters.formConfigValue[props.stackValue.id]?.stepTime
  )
    ? store.getters.formConfigValue[props.stackValue.id]?.stepTime
    : '00:15';
});
</script>

<style scoped>
.el-form-item {
  display: block;
}
</style>
