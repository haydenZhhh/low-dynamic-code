<template>
    <div v-if="props.showRender === 'showSet'">
        {{ itemTitle }}
    </div>

    <el-radio-group v-model="radiovalue">
        <el-radio v-for="(item, index) in options" @change="changeRadio" :key="index" :label="item.value">{{ item.label
            }}</el-radio>

    </el-radio-group>

</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();

const props = defineProps({
    stackValue: Object,
    showRender: String,
    changeFormValue: Function,
    nowConfig: Object,
});
const radiovalue = ref(store.getters.formConfigValue[props.stackValue.id]?.defultValue || '');


const options = ref(
    store.getters.formConfigValue[props.stackValue.id]?.radioData || [
        {
            label:'A',
            value:'A'
        }
    ]
);

const changeRadio = (val) => {
    radiovalue.value = val;
    if (props.changeFormValue) {
        props.changeFormValue(val, props.nowConfig);
    }
};

const itemTitle = ref(
    store.getters.formConfigValue[props.stackValue.id]?.titleName
);
emitter.on('storeDataChange', () => {
    itemTitle.value =
        store.getters.formConfigValue[props.stackValue.id]?.titleName;
    options.value =
        store.getters.formConfigValue[props.stackValue.id]?.radioData;
    radiovalue.value = store.getters.formConfigValue[props.stackValue.id]?.defultValue
});
</script>

<style scoped>
.el-form-item {
    display: block;
}
</style>