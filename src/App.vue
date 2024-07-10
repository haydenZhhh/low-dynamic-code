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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
