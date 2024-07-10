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
body{
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
</style>
