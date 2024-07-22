<template>
  <MainEntryVue />
</template>

<script>
import MainEntryVue from './page/mainEntry.vue';

export default {
  name: 'App',
  components: {
    MainEntryVue,
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
.el-form-item__label:before {
  display: inline-block;
  margin-right: 4px;
  color: #9e9e9e !important;
  font-size: 20px !important;
  font-family: SimSun, sans-serif;
  content: '';
  height: 12px;
  width: 3px;
  background-color: #1d90ff;
}
.el-form-item__label {
  line-height: 14px;
}

::-webkit-scrollbar {
  width: 0.4rem;
  height: 0.6rem;
}

::-webkit-scrollbar-track {
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  background: rgba(199, 199, 199, 0.7);
  border-radius: 0.4rem;
  transition: all 0.2s;
}
</style>
