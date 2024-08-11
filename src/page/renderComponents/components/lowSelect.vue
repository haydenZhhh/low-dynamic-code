<template>
    <div v-if="props.showRender === 'showSet'">
        {{ itemTitle }}
    </div>
    <el-select v-model="selectvalue" @change="changeSelect" class="m-2" placeholder="Select">
        <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();
const selectvalue = ref('');

const options = ref([])

const changeSelect = (val) => {
    selectvalue.value = val;
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