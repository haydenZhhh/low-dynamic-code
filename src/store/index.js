import { createStore } from 'vuex'


const store = createStore({
  state: {
    //状态管理器中定义的数据源
    mainFormList: [],
    formConfigValue:{}
  },
  mutations: {
    // 设置主表单
    setMainFormList(state, payload){
      state.mainFormList = payload;
    },
    // 主表单配置项
    setFormConfigValue(state, payload){
      state.formConfigValue = payload;
    },
    // 删除某个配置项
    deleteFormConfigValue(state, payload){
      delete state.formConfigValue[payload]
    }
  },
  actions: {
    //异步操作
  },
  //getters相当于计算属性
  getters: {
    mainFormList: (state) => state.mainFormList,
    formConfigValue: (state) => state.formConfigValue,

  }
})

export default store
