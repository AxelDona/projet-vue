<template>
  <header>
    <div class="container">
      <router-link to="/" class="header-left">
        <img src="../assets/img/icon/girondins-logo.svg" class="header-logo" alt="">
        <span class="title"></span>
      </router-link>
      <nav>
        <router-link to="/">Effectif professionnel - Saison 2022/2023</router-link>
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
  background-color: $backgroundColor;
  position: fixed;
  top: 0;
  z-index: 20000;
  box-shadow: 0px 10px 12px -10px rgba(0,0,0,0.1);

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
        color: $textColor1;
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
        text-decoration: none;
        padding: 0 20px;
        text-transform: uppercase;
        font-size: 1.2rem;
        font-family: 'Barlow Condensed', sans-serif;
        font-weight: 600;
        color: $textColor1;
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