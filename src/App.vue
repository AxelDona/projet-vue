<template>
  <MainHeader/>

    <Transition name="page">
        <router-view :key="$route.path"></router-view>
    </Transition>

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

@font-face {
  font-family: 'Galano Grotesque Alt Semi-Bold';
  src: url(assets/fonts/galano-grotesque-alt-semibold.otf);
}

@font-face {
  font-family: 'Ageo Semi-Bold';
  src: url(assets/fonts/ageo-semibold.otf);
}

@font-face {
  font-family: 'Ageo Extra-Bold';
  src: url(assets/fonts/ageo-extrabold.otf);
}

a{
  text-decoration: none;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $dark;
}

.container{
  width: 1250px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
}

@media screen and (max-width: 1280px) {
  .container{
    width: 100%;
  }
}

.container.page-container{
  margin-top: $headerHeight;
  background-color: $backgroundColor;
}

.page-move, /* apply transition to moving elements */
.page-enter-active,
.page-leave-active {
  transition: all 200ms ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.page-leave-to{
  transition: all 150ms ease;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.page-leave-active {
  position: absolute;
}

.fade-move, /* apply transition to moving elements */
.fade-enter-active,
.fade-leave-active {
  transition: all 400ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}

</style>
