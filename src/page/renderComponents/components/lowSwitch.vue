<template>
  <div v-if="props.showRender === 'showSet'">
    {{ itemTitle }}
  </div>
  <el-switch
    v-model="switchvalue"
    size="large"
    @change="changeSwitch"
    :active-text="rightText"
    :inactive-text="leftText"
  />
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();

const props = defineProps({
  stackValue: Object,
  showRender: String,
  changeFormValue: Function,
  nowConfig: Object,
});

const switchvalue = ref(
  store.getters.formConfigValue[props.stackValue.id]?.defultValue || false
);
const leftText = ref(
  store.getters.formConfigValue[props.stackValue.id]?.leftText || ''
);
const rightText = ref(
  store.getters.formConfigValue[props.stackValue.id]?.rightText || ''
);

const changeSwitch = (val) => {
  switchvalue.value = val;
  if (props.changeFormValue) {
    props.changeFormValue(val, props.nowConfig);
  }
};
onMounted(() => {
  if (props.changeFormValue) {
    props.changeFormValue(
      store.getters.formConfigValue[props.stackValue.id]?.defultValue || false,
      props.nowConfig
    );
  }
});

const itemTitle = ref(
  store.getters.formConfigValue[props.stackValue.id]?.titleName || ''
);
emitter.on('storeDataChange', () => {
  itemTitle.value =
    store.getters.formConfigValue[props.stackValue.id]?.titleName || '';
  leftText.value =
    store.getters.formConfigValue[props.stackValue.id]?.leftText || '';
  rightText.value =
    store.getters.formConfigValue[props.stackValue.id]?.rightText || '';
});
</script>

<style scoped>
.el-form-item {
  display: block;
}
</style>
