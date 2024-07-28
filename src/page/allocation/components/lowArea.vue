<template>
    <el-form ref="stackForm" :model="stackConfig" label-width="auto" label-position="top" size="large">
        <el-form-item label="placeholder提示语">
            <el-input v-model="stackConfig.placeholderValue" placeholder="请输入" />
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive, ref, watch, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const stackForm = ref();
const stackConfig = reactive({
    placeholderValue: '',
});

const props = defineProps({
    stackValue: Object,
});


watch(
    () => stackConfig,
    (newVal) => {
        const tempFormConfigValue = JSON.parse(JSON.stringify(store.getters.formConfigValue))

        const tempConfig = {
        }
        tempConfig[props.stackValue.id] = newVal
        store.commit("setFormConfigValue", { ...tempFormConfigValue, ...tempConfig });


    },
    {
        deep: true,
    }
);
</script>

<style scoped></style>