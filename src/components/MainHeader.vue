<template>
  <header>
    <div class="header-left">
      <img src="../assets/img/icon/girondins-logo.svg" class="header-logo" alt="">
      <span>FC Girondins de Bordeaux</span>
    </div>
    <nav>
      <router-link to="/">Effectif professionnel</router-link>
    </nav>
    <div class="header-right"></div>
  </header>
</template>

<script>
export default {
  name: "MainHeader"
}
</script>

<style lang="scss" scoped>

$headerHeight: 75px;

header{
  width: 100%;
  height: $headerHeight;
  background-color: #2c3e50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-left{
    width: 200px;
    height: $headerHeight;
    display: flex;
    justify-content: left;
    align-items: center;

    .header-logo{
      height: 60px;
      margin-left: 15px;
    }
  }

  .header-right{
    width: 200px;
  }


}

</style>