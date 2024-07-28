<template>
    <el-form ref="renderForm" :rules="rules" :model="renderFormData" label-width="auto">
        <div v-for="item in showFormList" :key="item.id">
            <el-form-item :label="getLabelTitle(item)" :prop="formConfigList[item.id].keyValue">
                <IowInput :changeFormValue="parentChangeMethod" v-if="item.type === 'lowInput'"
                    :nowConfig="formConfigList[item.id]" :stackValue="item" showRender="render" />
                <IowArea :changeFormValue="parentChangeMethod" v-if="item.type === 'lowArea'"
                    :nowConfig="formConfigList[item.id]" :stackValue="item" showRender="render" />
            </el-form-item>
        </div>
    </el-form>

    <el-button type="primary" @click="confirmClick">提交</el-button>

</template>

<script setup>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import IowInput from '../renderComponents/components/lowInput.vue'
import IowArea from '../renderComponents/components/lowArea.vue'

const store = useStore();


const renderForm = ref();
const showFormList = ref(JSON.parse(sessionStorage.getItem('formainFormList')))
const formConfigList = JSON.parse(sessionStorage.getItem('formData'))

const renderFormData = reactive({

});

const rules = reactive({
    nameKey: [
    { required: true, message: '请输入组件名称', trigger: 'blur' },
  ],

})

Object.keys(formConfigList).forEach((item) => {
    formConfigList[item].id = item
})

store.commit("setFormConfigValue", formConfigList);

const getLabelTitle = (val) => {
    return formConfigList[val.id].titleName
}

const confirmClick = async () => {
    renderForm.value.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log('submit!', renderFormData)

    } else {
      console.log('error submit!')
      console.log('submit!', renderFormData)

    }
  })

}

const parentChangeMethod = (val, item) => {
    console.log('===父组件方法', val, item)
    renderFormData[formConfigList[item.id].keyValue] = val
}

</script>

<style scoped></style>