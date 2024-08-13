<template>
  <div class="mainPage">
    <!-- <el-button type="primary" @click="openDrawer">表单配置</el-button> -->

    <div class="meBox">
      <div class="headPhoto"></div>
      <div class="meBox-title">
        <p>ZH的低代码</p>
        <div class="fg"></div>
      </div>
      <div class="meBox-text">
        <p>爱好</p>
        <p>爱好踢足球，计算机</p>
        <p>瞎折腾浪费时间最在行</p>
        <p>最爱</p>
      </div>
      <div class="meBox-Button">
        <a>关于</a>
        <a>联系</a>
      </div>
    </div>

    <!-- 页脚 -->
    <div id="footer">
      <p>
        个人纯手写低代码平台，目前解决了表单常规配置，基本可以满足平常的普通表单开发
      </p>
      <p>同时也支持自定义扩展组件</p>
    </div>
    <!-- v-if="showDataList.length > 0" -->
    <div class="showIteam">
      <el-card
        v-for="(iteam, index) in showDataList"
        :key="index"
        class="iteamListPanenl"
      >
        <!-- <p  class="text item">名称</p> -->
        <div class="cardMain">
          <div class="leftName">{{ iteam?.formConfig?.formName }}</div>
          <div class="rightBtn">
            <el-button
              type="primary"
              :icon="View"
              circle
              @click="handleClick(iteam)"
            />
            <el-button :icon="Edit" @click="editClick(iteam)" circle />
            <el-button :icon="Delete" @click="deleteClick(iteam)" circle />
          </div>
        </div>
      </el-card>
    </div>
  </div>

  <el-drawer v-model="drawer2" destroy-on-close direction="btt" size="100%">
    <template #title>
      <h4>表单配置</h4>
    </template>
    <template #default>
      <div class="setPanenl">
        <LowCodeMain />
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button round @click="toLookForm">预览</el-button>
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>

  <el-dialog
    destroy-on-close
    v-model="dialogTableVisible"
    :title="titleName"
    width="800"
  >
    <RenderForm :isOnlyShow="isOnly" :formValue="nowValue" />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import LowCodeMain from './lowCodeMain.vue';
import { useStore } from 'vuex';
import RenderForm from './renderForm/index.vue';
import { View, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const dialogTableVisible = ref(false);

const store = useStore();

const drawer2 = ref(true);

const nowValue = ref(null);

const showDataList = ref(store.getters.allFormJsonData);

const isOnly = ref(false);

const titleName = ref('预览');

// 编辑
const editClick = (val) => {
  sessionStorage.setItem('editId', `${val.formId}`);
  store.commit('setMainFormList', val.formainFormList);
  store.commit('setFormConfigValue', val.formData);
  store.commit('setFormConfig', val.formConfig);
  drawer2.value = true;
};

// 预览
const toLookForm = () => {
  if (Object.keys(store.getters.formConfigValue).length === 0) {
    ElMessage('请先配置表单再预览！');
    return;
  }

  for (let item of Object.keys(store.getters.formConfigValue)) {
    if (
      !store.getters.formConfigValue[item].titleName ||
      !store.getters.formConfigValue[item].keyValue
    ) {
      ElMessage.error('表单里有配置项每个必须要有标题和Key！');
      return;
    }
  }

  isOnly.value = true;
  titleName.value = '预览';
  const tempSendData = {
    formainFormList: store.getters.mainFormList,
    formData: store.getters.formConfigValue,
    formConfig: store.getters.formConfig,
  };
  nowValue.value = tempSendData;
  dialogTableVisible.value = true;
};

// 删除
const deleteClick = (val) => {
  ElMessageBox.confirm('确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
  })
    .then(() => {
      const tempAllFormJsonData = JSON.parse(
        JSON.stringify(store.getters.allFormJsonData)
      );
      showDataList.value = showDataList.value.filter(
        (item) => item.formId !== val.formId
      );
      store.commit(
        'setAllFormJsonData',
        tempAllFormJsonData.filter((item) => item.formId !== val.formId)
      );

      ElMessage({
        type: 'success',
        message: '删除成功！',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      });
    });
};

// 打开配置页面
// const openDrawer = () => {
//   drawer2.value = true;
//   console.log(store.getters.allFormJsonData);
// };

// 取消
const cancelClick = () => {
  // 清空
  sessionStorage.setItem('editId', '');

  store.commit('setMainFormList', []);
  store.commit('setFormConfigValue', {});
  store.commit('setFormConfig', {});
  drawer2.value = false;
};

// 保存配置数据
const confirmClick = () => {
  const editId = sessionStorage.getItem('editId');

  if (Object.keys(store.getters.formConfigValue).length === 0) {
    ElMessage('请先配置表单再保存！');
    return;
  }

  for (let item of Object.keys(store.getters.formConfigValue)) {
    if (
      !store.getters.formConfigValue[item].titleName ||
      !store.getters.formConfigValue[item].keyValue ||
      !store.getters.formConfig.formName ||
      !store.getters.formConfig.formPort
    ) {
      ElMessage.error('表单里有配置项没有填完整！');
      return;
    }
  }

  drawer2.value = false;
  const tempAllFormJsonData = JSON.parse(
    JSON.stringify(store.getters.allFormJsonData)
  );
  const tempSendData = {
    formainFormList: store.getters.mainFormList,
    formData: store.getters.formConfigValue,
    formConfig: store.getters.formConfig,
    formId: `${tempAllFormJsonData.length}`,
  };

  if (editId) {
    // 编辑
    for (let i = 0; i < tempAllFormJsonData.length; i += 1) {
      if (tempAllFormJsonData[i].formId === editId) {
        tempAllFormJsonData[i] = {
          formainFormList: store.getters.mainFormList,
          formData: store.getters.formConfigValue,
          formConfig: store.getters.formConfig,
          formId: editId,
        };
      }
    }
    store.commit('setAllFormJsonData', [...tempAllFormJsonData]);
    showDataList.value = [...tempAllFormJsonData];
  } else {
    store.commit('setAllFormJsonData', [tempSendData, ...tempAllFormJsonData]);
    showDataList.value = [tempSendData, ...tempAllFormJsonData];
  }

  // 清空
  sessionStorage.setItem('editId', '');
  store.commit('setMainFormList', []);
  store.commit('setFormConfigValue', {});
  store.commit('setFormConfig', {});
};

const handleClick = (val) => {
  titleName.value = val.formConfig.formName;
  nowValue.value = val;
  dialogTableVisible.value = true;
};
</script>

<style scoped>
.mainPage {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
      to left,
      rgba(255, 0, 149, 0.2),
      rgba(0, 247, 255, 0.2)
    ),
    url('../assets/bg.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.showIteam {
  width: 50%;
  height: 40%;
  float: right;
  border: 1px solid red;
}
.iteamListPanenl {
  max-width: 480px;
  margin-left: 10px;
}
.setPanenl {
  height: 100%;
  width: 100%;
  background-color: rgb(245, 245, 245);
  padding: 8px;
}

.cardMain {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meBox {
  float: left;
  width: 20rem;
  height: 25rem;
  background-color: white;
  margin-top: 100px;
  margin-left: 10%;
  border-radius: 2%;
  transition: all 0.3s;
  text-align: center;
}

.meBox:hover {
  width: 21rem;
  height: 26rem;
  margin: 95px 0 0 9.5%;
}

.headPhoto {
  width: 8rem;
  height: 8rem;
  background: url('../assets/hd.png') no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
  top: -15%;
  left: 50%;
  margin-left: -4rem;
  transition: all 0.3s;
}

.meBox:hover .headPhoto {
  width: 9rem;
  height: 9rem;
  margin: -0.5rem 0 0 -4.5rem;
  transform: rotate(360deg);
}

.headPhoto:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.meBox-title {
  width: auto;
  margin: 0 auto;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink-caret {
  50% {
    border-color: transparent;
  }
}

.meBox-title p {
  font-size: 18px;
  font-weight: bold;
  border-right: 0.1em solid;
  width: 12ch;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 2s steps(20, end),
    blink-caret 0.3s step-end infinite alternate;
  margin: -30px 0 0 90px;
  transition: all 0.3s;
}

.meBox:hover .meBox-title p {
  font-size: 1.3rem;
}

.meBox-title .fg {
  width: 80%;
  height: 2px;
  background-image: linear-gradient(to left, #3498db, #2980b9);
  margin: 5% 0 0 10%;
}

.meBox-text {
  width: 80%;
  height: 45%;
  overflow: hidden;
  text-align: center;
  color: rgb(70, 70, 70);
  animation-name: meBox-text;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  margin: 5% 0 0 10%;
  transition: all 0.3s;
}

.meBox-text p {
  margin-top: 5px;
}

.meBox:hover .meBox-text {
  font-size: 1.05rem;
}

@keyframes meBox-text {
  0% {
    transform: translateY(50px);
    color: white;
  }

  100% {
    transform: translateY(0);
    color: rgb(70, 70, 70);
  }
}

.meBox-Button {
  width: 100%;
}

.meBox-Button a {
  display: inline-block;
  float: left;
  width: 158px;
  height: 50px;
  margin-top: 13px;
  line-height: 50px;
  text-decoration: none;
  color: gray;
  transition: all 0.3s;
}

.meBox-Button a:hover {
  color: rgb(0, 132, 255);
  font-size: 1.2rem;
}

.meBox:hover .meBox-Button a {
  width: 165px;
  margin-top: 10px;
}

#footer {
  width: 100%;
  color: white;
  float: left;
  text-align: center;
  position: fixed;
  bottom: 0;
  margin-bottom: 30px;
  /* background-color: blue; */
}

#footer a {
  text-decoration: none;
  color: white;
}

#footer a:hover {
  color: rgb(0, 81, 255);
}

/* 自适应 */
@media screen and (max-width: 1250px) {
  .meBox {
    margin-left: 3%;
  }

  .meBox:hover {
    width: 21rem;
    height: 26rem;
    margin: 95px 0 0 2.5%;
  }
}

@media screen and (max-width: 1110px) {
  .meBox {
    float: none;
    margin: 100px auto 100px;
  }

  .meBox:hover {
    width: 21rem;
    height: 26rem;
    margin: 95px auto 95px;
  }
}

@media screen and (max-width: 768px) {
  .meBox {
    width: 300px;
  }

  .meBox:hover {
    width: 300px;
    height: 25rem;
    margin: 100px auto 100px;
  }

  .meBox-Button a:hover {
    color: rgb(0, 132, 255);
  }

  .meBox:hover .meBox-Button a {
    width: 150px;
    margin-top: 0;
  }

  .meBox:hover .meBox-title p {
    font-size: 1.2rem;
  }

  .meBox:hover .headPhoto {
    width: 8rem;
    height: 8rem;
    margin: -0.5rem 0 0 -4rem;
    transform: rotate(360deg);
  }

  .meBox:hover .meBox-text {
    font-size: 1rem;
  }

  .meBox-Button a {
    width: 150px;
  }
}
</style>
