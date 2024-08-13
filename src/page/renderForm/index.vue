<template>
  <el-form
    ref="renderForm"
    :rules="rules"
    :model="renderFormData"
    label-width="auto"
  >
    <div v-for="item in showFormList" :key="item.id">
      <el-form-item
        :label="getLabelTitle(item)"
        :prop="formConfigList[item.id].keyValue"
      >
        <IowInput
          v-if="item.type === 'lowInput'"
          :changeFormValue="parentChangeMethod"
          :nowConfig="formConfigList[item.id]"
          :stackValue="item"
          :showRender="'render'"
        />
        <IowArea
          v-if="item.type === 'lowArea'"
          :changeFormValue="parentChangeMethod"
          :nowConfig="formConfigList[item.id]"
          :stackValue="item"
          :showRender="'render'"
        />
        <lowSelect
          v-if="item.type === 'lowSelect'"
          :changeFormValue="parentChangeMethod"
          :nowConfig="formConfigList[item.id]"
          :stackValue="item"
          :showRender="'render'"
        />
        <lowSwitch
          v-if="item.type === 'lowSwitch'"
          :changeFormValue="parentChangeMethod"
          :nowConfig="formConfigList[item.id]"
          :stackValue="item"
          :showRender="'render'"
        />
        <lowTimePicker
          v-if="item.type === 'lowTimePicker'"
          :changeFormValue="parentChangeMethod"
          :nowConfig="formConfigList[item.id]"
          :stackValue="item"
          :showRender="'render'"
        />
        <lowDatePicker
          v-if="item.type === 'lowDatePicker'"
          :changeFormValue="parentChangeMethod"
          :nowConfig="formConfigList[item.id]"
          :stackValue="item"
          :showRender="'render'"
        />
        <lowRadio
          v-if="item.type === 'lowRadio'"
          :changeFormValue="parentChangeMethod"
          :nowConfig="formConfigList[item.id]"
          :stackValue="item"
          :showRender="'render'"
        />
        <lowUpload
          v-if="item.type === 'lowUpload'"
          :changeFormValue="parentChangeMethod"
          :nowConfig="formConfigList[item.id]"
          :stackValue="item"
          :showRender="'render'"
        />
        <lowSelf
          v-if="item.type === 'lowSelf'"
          :changeFormValue="parentChangeMethod"
          :nowConfig="formConfigList[item.id]"
          :stackValue="item"
          :showRender="'render'"
        />
      </el-form-item>
    </div>
  </el-form>

  <el-button v-if="!props.isOnlyShow" type="primary" @click="confirmClick"
    >提交</el-button
  >
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';
import { useStore } from 'vuex';
import IowInput from '../renderComponents/components/lowInput.vue';
import IowArea from '../renderComponents/components/lowArea.vue';
import lowSelect from '../renderComponents/components/lowSelect.vue';
import lowSwitch from '../renderComponents/components/lowSwitch.vue';
import lowTimePicker from '../renderComponents/components/lowTimePicker.vue';
import lowDatePicker from '../renderComponents/components/lowDatePicker.vue';
import lowRadio from '../renderComponents/components/lowRadio.vue';
import lowUpload from '../renderComponents/components/lowUpload.vue';
import lowSelf from '../renderComponents/components/lowSelf.vue';

const store = useStore();

const renderForm = ref();

const props = defineProps({
  formValue: Object,
  isOnlyShow: Boolean,
});

// 中间主组件list
const showFormList = ref(props.formValue.formainFormList);

// 组件配置list
const formConfigList = JSON.parse(JSON.stringify(props.formValue.formData));
const renderFormData = reactive({});

const rules = reactive({});

// 校验
if (props.formValue) {
  Object.keys(props.formValue.formData).forEach((item) => {
    if (props.formValue.formData[item].isMustValue) {
      rules[props.formValue.formData[item].keyValue] = [
        { required: true, message: '请输入', trigger: 'blur' },
      ];
    }
  });
}

Object.keys(formConfigList).forEach((item) => {
  formConfigList[item].id = item;
});

store.commit('setFormConfigValue', formConfigList);

const getLabelTitle = (val) => {
  return formConfigList[val.id]?.titleName || '';
};

// 表单提交
const confirmClick = async () => {
  renderForm.value.validate((valid) => {
    if (valid) {
      console.log('submit!');
      console.log('submit!', renderFormData);
    } else {
      console.log('error submit!');
      console.log('submit!', renderFormData);
    }
  });
};

const parentChangeMethod = (val, item) => {
  renderFormData[formConfigList[item.id].keyValue] = val;
};
</script>

<style scoped></style>
