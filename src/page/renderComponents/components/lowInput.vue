<template>

    <el-input v-model="inputvalue" style="width: 100%" @input="changeInput" placeholder="Please input" />
</template>

<script setup>
import { ref } from 'vue'
const inputvalue = ref('')

const changeInput = (val)=>{
    inputvalue.value = val
}
</script>

<style></style>