<template>
  <el-input
    v-model="inputvalue"
    style="width: 100%"
    @input="changeInput"
    placeholder="请输入"
  />
</template>

<script setup>
import { ref } from 'vue';
import emitter from '../../../utils/emitter';

const inputvalue = ref('');

emitter.on('lowInputConfig', (data) => {
  console.log('接收', data);
});

const changeInput = (val) => {
  inputvalue.value = val;
};
</script>

<style></style>
