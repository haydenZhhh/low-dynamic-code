<template>
  <div v-if="props.showRender === 'showSet'">
    {{ itemTitle }}
  </div>
  <el-upload
    ref="upload"
    class="upload-demo"
    action=""
    :limit="limitNum"
    :auto-upload="false"
    :before-upload="beforeUpload"
    v-model:file-list="fileData"
  >
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>
  </el-upload>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import { useStore } from 'vuex';
import emitter from '../../../utils/emitter';

const store = useStore();
const limitNum = ref(1);
const upload = ref(null);
const fileData = ref([]);

const props = defineProps({
  stackValue: Object,
  showRender: String,
  changeFormValue: Function,
  nowConfig: Object,
});

watch(
  () => fileData,
  (newVal) => {
    if (props.changeFormValue) {
      props.changeFormValue(newVal.value, props.nowConfig);
    }
  },
  {
    deep: true,
  }
);

const beforeUpload = () => {
  return false;
};

const itemTitle = ref(
  store.getters.formConfigValue[props.stackValue.id]?.titleName || ''
);
emitter.on('storeDataChange', () => {
  itemTitle.value =
    store.getters.formConfigValue[props.stackValue.id]?.titleName || '';
  limitNum.value =
    store.getters.formConfigValue[props.stackValue.id]?.fileNum || 1;
});
</script>

<style scoped>
.el-form-item {
  display: block;
}
</style>
