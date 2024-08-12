<template>
    <el-form :rules="rules" ref="stackForm" :model="stackConfig" label-width="auto" label-position="top" size="large">
        <el-form-item label="标题" prop="titleName">
            <el-input v-model="stackConfig.titleName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="键值" prop="keyValue">
            <el-input v-model="stackConfig.keyValue" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="radio数据选项">
            <div class="addPanenl">
                <el-button @click="addData()" size="large" type="primary" link :icon="Plus" />
            </div>

            <div class="dataListMain">
                <el-row v-for="(iteam, index) in stackConfig.radioData" :key="index">
                    <el-col :span="10">
                        <el-input v-model="iteam.label" @input="(val) => changeInput(val, index)" placeholder="label" />
                    </el-col>
                    <el-col :span="10">
                        <el-input @input="(val) => changeInput(val, index)" v-model="iteam.value" placeholder="value" />
                    </el-col>
                    <el-col :span="4" style="
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
              ">
                        <el-icon @click="deleteIteam(index)" style="font-size: 20px; color: red">
                            <CircleClose />
                        </el-icon>
                    </el-col>
                </el-row>
            </div>
        </el-form-item>
        <el-form-item label="默认值">
            <el-input v-model="stackConfig.defultValue" placeholder="请输入" />
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive, ref, watch, defineProps } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';
import { CircleClose, Plus } from '@element-plus/icons-vue';

const store = useStore();

// const dataList = ref([])

const stackForm = ref();
const props = defineProps({
    stackValue: Object,
});

const stackConfig = reactive(
    store.getters.formConfigValue[props.stackValue.id] || {
        radioData: [ {
            label:'A',
            value:'A'
        }],
        keyValue: '',
        titleName: '',
        defultValue: '',
    }
);

const rules = reactive({
    titleName: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
    keyValue: [{ required: true, message: '请输入唯一键值', trigger: 'blur' }],
});

const changeInput = (val, idx) => {
    console.log('====', stackConfig.radioData, val, idx);
};

// 新增
const addData = () => {
    const data = {
        label: '',
        value: '',
    };
    stackConfig.radioData = [...stackConfig.radioData, data];
};

// 删除
const deleteIteam = (vidx) => {
    stackConfig.radioData = stackConfig.radioData.filter(
        (val, idx) => idx !== vidx
    );
};

watch(
    () => stackConfig,
    (newVal) => {
        const tempFormConfigValue = JSON.parse(
            JSON.stringify(store.getters.formConfigValue)
        );
        const tempConfig = {};
        tempConfig[props.stackValue.id] = newVal;
        store.commit('setFormConfigValue', {
            ...tempFormConfigValue,
            ...tempConfig,
        });
        emitter.emit('storeDataChange');
    },
    {
        deep: true,
    }
);
</script>

<style scoped>
.dataListMain {
    width: 100%;
    overflow-y: auto;
}

.addPanenl {
    position: absolute;
    left: 100px;
    top: -45px;
    z-index: 999;
    font-weight: 700;
}
</style>