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
        <p>个人纯手写低代码平台</p>
        <p>目前解决了表单常规配置</p>
        <p>基本可以满足平常的普通表单开发</p>
        <p>同时也支持自定义扩展组件</p>
        <p>个人比较喜欢一些新东西</p>
        <p>希望能和大家多多交流</p>
      </div>
      <div class="meBox-Button">
        <a>
          <el-popover popper-class="popperClass" :popper-style="{ width: '' }" placement='top-end' title=""
            trigger="hover">
            <div class="codeimg">
              <p>“没有怎么注重样式</p>
              <p>只简单弄了一下，可能会有小bug”</p>
              <p>框架使用的是vue3</p>
              <p>里面没有很多的组件</p>
              <p>后续我会继续完善</p>
              <p>争取把这个系统做到更好更细</p>
              <p>同时我也有想法</p>
              <p>以后空余时间把这个系统扩展成个人博客</p>
              <p>里面包含所有一些前端的比较新的技术</p>
              <p>再使用微前端将其他有意思的系统统一到此处</p>
              <p>。。。。。。</p>
            </div>
            <template #reference>
              关于
            </template>
          </el-popover>
        </a>
        <a>
          <el-popover popper-class="popperClass" :popper-style="{ width: '' }" placement="top-start" title=""
            trigger="hover">
            <div class="codeimg">
              <img src="../assets/vxcode.jpg" alt="">
            </div>
            <template #reference>
              联系
            </template>
          </el-popover>
        </a>
      </div>
    </div>

    <!-- <div class="openPanenl">
      <a>表单配置</a> -->
    <div class="openPanenltext" @click="openDrawer">
      <p>点击打开表单配置</p>
      <!-- <el-icon>
        <DArrowRight />
      </el-icon> -->
      <!-- <a>表单配置</a> -->
      <!-- <el-button type="primary" size="large" link :icon="FullScreen"
        >打开表单配置</el-button
      > -->
    </div>

    <!-- 页脚 -->
    <div id="footer">
      <p>
        作者：ZH
      </p>
      <p>邮箱：1300450091@qq.com</p>
    </div>

    <!-- 伪终端介绍 -->
    <div id="cmdBox">
      <!-- 第一个终端 -->
      <div class="cmd">
        <!-- 三个按钮 -->
        <div class="click">
          <div class="red"></div>
          <div class="yellow"></div>
          <div class="green"></div>
        </div>
        <!-- 顶部标题 -->
        <div class="title">
          <span>表单配置列表</span>
        </div>
        <!-- 终端内文字 -->
        <div class="cmdText">
          <!-- <span style="color: rgb(0, 190, 0)">root@zhlowcode</span>
          <span style="color: blue">~</span>
          <span style="color: rgb(39, 39, 39)">cd lowcode</span>
          <br /> -->
          <!--  -->
          <br />
          <span style="color: rgb(0, 190, 0)">root@zhlowcode</span>
          <span style="color: blue">~</span>
          <span style="color: rgb(39, 39, 39)">lowcode /list.txt</span>
          <div class="showLowCodeList" v-for="(iteam, index) in showDataList" :key="index">
            <div class="codeFormName">{{ iteam?.formConfig?.formName }}</div>
            <div class="codeFormBtn" @click="handleClick(iteam)">查看</div>
            <div class="codeFormBtn" @click="editClick(iteam)">编辑</div>
            <div class="codeFormBtn" @click="deleteClick(iteam)">删除</div>
          </div>
          <br />
          <!-- <span style="color: rgb(0, 190, 0)">root@kapsiz</span>
          <span style="color: blue">~</span>
          <span style="color: rgb(39, 39, 39)">sudo rm -rf /过去的自己/*</span> -->
        </div>
      </div>
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

  <el-dialog destroy-on-close v-model="dialogTableVisible" :title="titleName" width="800">
    <RenderForm :isOnlyShow="isOnly" :formValue="nowValue" />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import LowCodeMain from './lowCodeMain.vue';
import { useStore } from 'vuex';
import RenderForm from './renderForm/index.vue';
// import { DArrowRight } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const dialogTableVisible = ref(false);

const store = useStore();

const drawer2 = ref(false);

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
const openDrawer = () => {
  drawer2.value = true;
  console.log(store.getters.allFormJsonData);
};

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
  isOnly.value = false;
  dialogTableVisible.value = true;
};
</script>

<style scoped>
.popperClass {
  text-align: center;
  display: flex;
  justify-content: center;
}

.codeimg {
  margin: 0 auto;
}

.codeimg img {
  height: 200px;
  width: 200px;
}

.openPanenltext {
  font-size: 20px;
  position: absolute;
  top: 20px;
  left: 50px;
  color: #fff;
  /* line-height: 20px;
  text-align: center; */
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-shadow: 5px -5px 3px #333;
}

.openPanenltext p {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.showLowCodeList {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 20px;
  margin-bottom: 15px;
}

.codeFormName {
  font-size: 18px;
  font-weight: 500;
}

.codeFormBtn {
  color: #1890ff;
  margin-left: 10px;
  cursor: pointer;
}

#cmdBox {
  width: 710px;
  height: 550px;
  position: absolute;
  top: 10%;
  right: 2%;
  /* background-color: green; */
}

.cmd {
  width: 600px;
  height: 400px;
  border-radius: 10px 10px 5px 5px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s;
  font-size: 14px;
  color: rgb(88, 89, 92);
  position: relative;
  top: 0;
  left: 0;
}

.cmd:hover {
  width: 610px;
  height: 410px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  margin: -5px 0 0 -5px;
  z-index: 1;
}

.cmd .title {
  width: 100%;
  height: 25px;
  background-image: linear-gradient(to top, rgb(184, 184, 184), white);
  font-size: 14px;
  line-height: 25px;
}

.cmd .title span {
  display: inline-block;
  width: 70%;
  text-align: center;
  /* background-color: red; */
}

.cmd .click {
  margin-left: 10px;
  float: left;
}

.cmd .click div {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 8px 0 0 10px;
  float: left;
}

.cmd .click .red {
  background-color: #ff1b22;
  box-shadow: 0 0 1px #ff1b22;
}

.cmd .click .red:hover {
  background-color: #ff6268;
  box-shadow: 0 0 3px #ff1b22;
}

.cmd .click .yellow {
  background-color: #ffaf00;
  box-shadow: 0 0 1px #ffaf00;
}

.cmd .click .yellow:hover {
  background-color: #ffd373;
  box-shadow: 0 0 3px #ffaf00;
}

.cmd .click .green {
  background-color: #00931a;
  box-shadow: 0 0 1px #00931a;
}

.cmd .click .green:hover {
  background-color: rgb(0, 196, 36);
  box-shadow: 0 0 3px #00931a;
}

.cmdText {
  padding-top: 10px;
  padding-left: 15px;
}

/* ========== */

.mainPage {
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(to left,
      rgba(255, 0, 149, 0.2),
      rgba(0, 247, 255, 0.2)),
    url('../assets/bg.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.showIteam {
  width: 40%;
  height: 45%;
  position: absolute;
  top: 10%;
  right: 2%;
  border: 1px solid red;
  background-color: rgba(0, 0, 0, 0.5);
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

.openPanenl {
  position: absolute;
  top: 20px;
  left: 100px;
}

.openPanenl a {
  /* 相对定位 */
  position: relative;
  width: 400px;
  height: 100px;
  padding: 10px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  /* 渐变背景 */
  background: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #09a8f4);
  /* 背景渐变色大小 */
  background-size: 400%;
  /* 圆角 */
  border-radius: 17px;
  z-index: 1;
  box-shadow: 0 1px 5px #fff;
  animation: streamer 8s infinite;
}

/* 发光效果 */
.openPanenl a::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  bottom: -5px;
  right: -5px;
  /* 渐变背景 */
  background: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #09a8f4);
  /* 背景渐变色大小 */
  background-size: 400%;
  /* 圆角 */
  border-radius: 50px;
  /* 位于按钮之下 */
  z-index: -1;
  /* 设置模糊度 显示发光效果 */
  filter: blur(20px);
}

/* 鼠标移入执行动画 */
/* .openPanenl a:hover {
  animation: streamer 8s infinite;
} */
.openPanenl a:hover::before {
  animation: streamer 8s infinite;
}

/* 接下来定义动画 */
@keyframes streamer {
  100% {
    /* 背景位置 */
    background-position: -400% 0;
  }
}

.meBox {
  float: left;
  width: 23rem;
  height: 28rem;
  background-color: white;
  margin-top: 12%;
  margin-left: 10%;
  border-radius: 2%;
  transition: all 0.3s;
  text-align: center;
}

.meBox:hover {
  width: 24rem;
  height: 29rem;
  margin: 11.5% 0 0 9.5%;
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
  text-align: center;
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
  font-size: 1.5rem;
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
  font-size: 1.6rem;
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
  cursor: pointer;
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
</style>
