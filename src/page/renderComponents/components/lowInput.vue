<template>
    <div v-if="!props.showRender">
      {{ store.getters.formConfigValue[props.stackValue.id]?.titleName }}
    </div>
    <el-input v-model="inputvalue" @input="changeInput" placeholder="请输入" />


</template>

<script setup>
import { watch, defineProps,ref } from 'vue';
import { useStore } from 'vuex';


const store = useStore();
const inputvalue = ref('')

const changeInput = (val) => {
  inputvalue.value = val;
  if(props.changeFormValue){
    props.changeFormValue(val,props.nowConfig);

  }
  // emit('callParentMethod')
};
const props = defineProps({
  stackValue: Object,
  showRender: String,
  changeFormValue: Function,
  nowConfig:Object

});
console.log('====加载', props.stackValue, store.getters.formConfigValue)


watch(
  () => store.getters.formConfigValue,
  (newVal) => {
    console.log('ppp9999', newVal,)
  },
  {
    deep: true,
  }
);
</script>

<style scoped>
.el-form-item {
  display: block;
}
</style>
