<template>
  <MainHeader/>
  <router-view :key="$route.path"></router-view>
</template>

<script>

import MainHeader from "@/components/MainHeader.vue";

export default {
  name: 'App',
  components: {MainHeader},
}


</script>

<style lang="scss">

*{
  margin: 0;
  padding: 0;
}

a{
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
