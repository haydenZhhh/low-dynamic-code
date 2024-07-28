<template>
    <!-- <div >
        {{ store.getters.formConfigValue[props.stackValue.id]?.titleName }}
    </div> -->
    <el-input v-model="inputvalue" @input="changeInput" :rows="4" type="textarea" placeholder="请输入" />
</template>

<script setup>
import { ref } from 'vue';

const inputvalue = ref('');



const changeInput = (val) => {
    inputvalue.value = val;
};
</script>

<style></style>