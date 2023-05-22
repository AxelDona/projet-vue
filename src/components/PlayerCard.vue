<template>
  <router-link :id="id" :to="{name: 'Joueur', params: {id: id, title: firstnameShort}}" class="player-card-link">
    <div class="player-card">
      <div class="player-name-container">
        <span class="player-firstName">{{firstnameShort}}</span>
        <h3 class="player-lastName">{{lastnameShort}}</h3>
      </div>
      <div class="player-card-gradient"></div>
      <img :src="require('../assets/img/player-cards/'+id+'-card.png')" alt="" class="player-card-player-picture">
      <span class="player-card-player-number">{{number}}</span>
      <div class="player-card-scapulaire-container">
        <img src="../assets/img/player-cards/scapulaire.svg" alt="">
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "PlayerCard",
  props: ["name", "firstnameShort", "lastnameShort", "age", "height", "weight", "id", "number"]
}
</script>

<style lang="scss" scoped>

  a{
    text-decoration: none;
  }

  .player-card{
    border: 1px solid black;
    width: 260px;
    height: 325px;
    background-color: dimgrey;
    display: flex;
    justify-content: left;
    align-items: flex-end;
    overflow: hidden;
    background-image: url("../assets/img/player-cards/background.png");
    background-size: cover;
    margin: 15px;
    position: relative;
    border-radius: 4px;
  }

  .player-name-container{
    position: absolute;
    height: 70px;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 500;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding-left: 1rem;

    .player-firstName, .player-lastName{
      color: #ffffff;
      font-family: 'Barlow Condensed', sans-serif;
      font-style: italic;
      text-transform: uppercase;
      letter-spacing: 0.06rem;
      text-shadow: 0px 0px 14px rgba(0, 0, 0, 1),0px 0px 25px rgba(0, 0, 0, 0.56);
    }

    .player-firstName{
      font-size: 1rem;
      font-weight: 500;
      transform: translateY(0.2rem) translateX(0.2rem);
    }

    .player-lastName{
      font-size: 1.6rem;
      margin-top: 0;
      margin-bottom: 1rem;
      font-weight: 600;
    }
  }

  .player-card-gradient{
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5047152650122548) 62%, rgba(0,0,0,0) 100%);
    z-index: 100;
    height: 80px;
    width: 100%;
    position: absolute;
  }

  .player-card-player-picture{
    height: 320px;
    transform: translateY(-10px) translateX(5px);
    transition-duration: 400ms;
    z-index: 20;
    position: absolute;
  }

  .player-card-player-number{
    position: absolute;
    color: #ffffff;
    font-size: 1.8rem;
    font-family: 'Barlow Condensed', sans-serif;
    top: 8px;
    right: 18px;
  }

  .player-card-scapulaire-container{
    position: absolute;
    height: 260px;
    width: 260px;
    top: 50%;
    left: 0;
    transform: translateY(-200%);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 400ms;

    img{
      scale: 1.3;
      filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.6));
    }
  }

  a:hover{
    .player-card-player-picture{
      scale: 1.03;
      transform: translateY(-5px) translateX(5px);
    }

    .player-card-scapulaire-container{
      width: 260px;
      transform: translateY(-50%);
    }
  }
</style>