<template>
  <header>
    <div class="container">
      <router-link to="/" class="header-left">
        <img src="../assets/img/icon/girondins-logo.svg" class="header-logo" alt="">
        <span class="title">FC Girondins<br/> de Bordeaux</span>
      </router-link>
      <nav>
        <router-link to="/">Effectif professionnel</router-link>
      </nav>
      <div class="header-right"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader"
}
</script>

<style lang="scss" scoped>

header{
  width: 100%;
  height: $headerHeight;
  background-color: $girondinsColor;
  color: white;
  position: fixed;
  top: 0;
  z-index: 2000;

  .container{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left{
      width: 200px;
      height: $headerHeight;
      display: flex;
      justify-content: left;
      align-items: center;
      text-transform: uppercase;
      font-weight: 700;
      font-family: 'Ageo Extra-Bold', sans-serif;

      .title{
        text-decoration: none;
        color: #ffffff;
      }

      .header-logo{
        height: 60px;
        margin-left: 15px;
      }
    }

    .header-right{
      width: 200px;
    }

    nav{

      a{
        color: #ffffff;
        text-decoration: none;
        padding: 0 20px;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-family: 'Ageo Semi-Bold', sans-serif;
      }

      a:hover{
        text-decoration: underline;
      }
    }
  }
}

@media screen and (max-width: 1080px) {
  .header-right{
    display: none;
    text-align: right;
  }
}

</style>