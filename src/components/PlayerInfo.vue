<template>
  <div class="player-container">
    <Transition name="loading">
      <div v-if="isLoading" class="loading-screen">
        <LoadingAnimation class="loading-animation"/>
      </div>
    </Transition>

    <Transition name="player-info">
      <div v-if="!isLoading" class="player-info-container">
        <router-link class="back-link" :to="{path:'/', hash:'#'+id, }">Retour</router-link>

        <h1 v-if="player.firstnameShort===''" class="player-name">{{player.lastnameShort}}
          <p class="player-number">{{player.number}}</p>
        </h1>
        <h1 v-else class="player-name">{{player.firstnameShort}}<br>{{player.lastnameShort}}
          <p class="player-number">{{player.number}}</p>
        </h1>

        <p class="player-position" v-if="statsLeague.games.position === 'Goalkeeper'">Gardien</p>
        <p class="player-position" v-if="statsLeague.games.position === 'Defender'">Défenseur</p>
        <p class="player-position" v-if="statsLeague.games.position === 'Midfielder'">Milieu</p>
        <p class="player-position" v-if="statsLeague.games.position === 'Attacker'">Attaquant</p>

        <table class="player-info-table">
          <tr>
            <td colspan="2">
              <span class="info-label">Nom complet</span>
              <p class="info-value">{{player.firstname}} {{player.lastname}}</p>
            </td>
          </tr>
          <tr>
            <td>
              <span class="info-label">Âge</span>
              <p class="info-value">{{player.age}} ans</p>
            </td>
            <td>
              <span class="info-label">Nationalité sportive</span>
              <p class="info-value">{{player.nationality}}</p>

            </td>
          </tr>
          <tr>
            <td>
              <span class="info-label">Né le </span>
              <p class="info-value">{{player.birth.date}}</p>
            </td>
            <td>
              <span class="info-label"> à </span>
              <p class="info-value">{{player.birth.place}} ({{player.birth.country}})</p>
            </td>
          </tr>
          <tr>
            <td>
              <span class="info-label">Taille</span>
              <p class="info-value">{{player.height}}</p>
            </td>
            <td>
              <span class="info-label">Poids</span>
              <p class="info-value">{{player.weight}}</p>
            </td>
          </tr>
        </table>

      </div>
    </Transition>

    <Transition name="player-pic">
      <div v-if="!isLoading" class="player-picture-container">
        <img :src="'https://axeldona.com/girondins-img/player-page/'+id+'-p.png'" class="player-picture" alt="">
      </div>
    </Transition>

    <Transition name="player-stats">
      <div v-if="!isLoading" class="player-stats-container">
        <div class="league-title">
          <div></div>
          <img class="ligue2-logo" src=../assets/img/icon/ligue2-logo.svg>
          <div></div>
        </div>
        <table class="league-stats-table">
          <tr>
            <td class="stat-label">Matchs joués</td>
            <td class="stat-value">{{statsLeague.games.appearences}}</td>
          </tr>
          <tr>
            <td class="stat-label">Dont titulaire</td>
            <td class="stat-value">{{statsLeague.games.lineups}}</td>
          </tr>
          <tr><td colspan="2"><hr></td></tr>
          <tr>
            <td class="stat-label">Temps de jeu total (minutes)</td>
            <td v-if="statsLeague.games.minutes === 0" class="stat-value">{{statsLeague.games.minutes}}</td>
            <td v-else class="stat-value">{{statsLeague.games.minutes}}</td>
          </tr>
          <tr><td colspan="2"><hr></td></tr>
          <tr>
            <td class="stat-label">Buts</td>
            <td class="stat-value">{{statsLeague.goals.total}}</td>
          </tr>
          <tr>
            <td class="stat-label">Passes décisives</td>
            <td v-if="!statsLeague.goals.assists" class="stat-value">0</td>
            <td v-else class="stat-value">{{statsLeague.goals.assists}}</td>
          </tr>
          <tr><td colspan="2"><hr></td></tr>
          <tr v-if="statsLeague.games.position === 'Goalkeeper'">
            <td class="stat-label">Arrêts</td>
            <td v-if="statsLeague.goals.saves" class="stat-value">{{statsLeague.goals.saves}}</td>
            <td v-else class="stat-value">0</td>
          </tr>
          <tr v-if="statsLeague.games.position === 'Goalkeeper'">
            <td class="stat-label">Buts encaissés</td>
            <td class="stat-value">{{statsLeague.goals.conceded}}</td>
          </tr>
          <tr v-if="statsLeague.games.position === 'Goalkeeper'"><td colspan="2"><hr></td></tr>
          <tr>
            <td class="stat-label">Entré en cours de jeu</td>
            <td class="stat-value">{{statsLeague.substitutes.in}}</td>
          </tr>
          <tr>
            <td class="stat-label">Remplacé en cours de jeu</td>
            <td class="stat-value">{{statsLeague.substitutes.out}}</td>
          </tr>
          <tr><td colspan="2"><hr></td></tr>
          <tr>
            <td class="stat-label">Tirs</td>
            <td v-if="!statsLeague.shots.total" class="stat-value">0</td>
            <td v-else class="stat-value">{{statsLeague.shots.total}}</td>
          </tr>
          <tr>
            <td class="stat-label">dont cadrés</td>
            <td v-if="!statsLeague.shots.on" class="stat-value">0</td>
            <td v-else class="stat-value">{{statsLeague.shots.on}}</td>
          </tr>
        </table>
      </div>
    </Transition>

  </div>
</template>

<script>
import AdditionalInfo from "@/assets/json/additional-info.json";
import axios from 'axios';
import LoadingAnimation from "@/components/LoadingAnimation.vue";

export default {
  name: "PlayerInfo",
  components: {LoadingAnimation},
  data(){
    return{
      player: [],
      id : this.$route.params.id,
      statsLeague: [],
      isLoading: true
    }
  },
  created: function() {
    this.getFCGBPlayers()
  },
  methods: {
    async getFCGBPlayers(){

      try {
        this.isLoading = true; // Définit isLoading sur true pour afficher la page de chargement

        let fullResponse = await axios.get('https://api-football-v1.p.rapidapi.com/v3/players?id=' + this.id + '&season=2022', {
          headers: {
            'X-RapidAPI-Key': '53fef01e3cmsh88ac04d3580cb85p1610d1jsn3405a8d53f6e',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
        });
        let responseData = fullResponse.data;



        this.player = responseData.response[0].player;
        let statsGdB = responseData.response[0].statistics.filter(obj => obj.team.id === 78);
        this.statsLeague = statsGdB.filter(obj => obj.league.id === 62)[0];


        const playerId = parseInt(this.id);
        const playerInfo = AdditionalInfo.find(player => player.id === playerId);


        if (playerInfo) {
          this.player.firstnameShort = playerInfo['firstnameShort'];
          this.player.lastnameShort = playerInfo['lastnameShort'];
          this.player.number = playerInfo.number;
        } else {
          this.player.firstnameShort = "";
          this.player.lastnameShort = "";
          this.player.number = "";
        }

        this.isLoading = false; // Définit isLoading sur false pour afficher le contenu de la page
      } catch (error) {
        console.error(error);
        this.isLoading = false; // Définit isLoading sur false en cas d'erreur pour afficher le contenu partiel de la page
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .player-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: $pageHeight;
    position: relative;
    margin-top: 10px;

    .loading-screen{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc($pageHeight - 10px);
      position: absolute;
      z-index: 400;
      background-color: $backgroundColor;

      .loading-animation{
        transform: translateY(-$headerHeight/2);
      }
    }

    .player-info-container{

      .back-link{
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
        color: $lightGray3;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 15px;
        position: relative;
        z-index: 700;
        margin-bottom: 1rem;
        display: block;
      }

      .player-name{
        position: relative;
        font-size: 4rem;
        line-height: 3.5rem;
        text-align: left;
        font-family: 'Galano Grotesque Alt Semi-Bold', sans-serif;
        letter-spacing: -0.1rem;
        z-index: 20;

        .player-number{
          font-family: 'Barlow Condensed', sans-serif;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 23rem;
          line-height: 13rem;
          position: absolute;
          top: 70px;
          right: -130px;
          z-index: -400;
          color: rgba(255, 255, 255, 0);
          -webkit-text-fill-color: rgba(255, 255, 255, 0); /* Will override color (regardless of order) */
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: $lightGray1;
        }
      }


      .player-position{
        text-align: left;
        font-family: 'Galano Grotesque Alt Semi-Bold', sans-serif;
        font-size: 1.6rem;
        margin-top: 0.6rem;
        position: relative;
        z-index: 500;
      }

      .player-info-table{
        margin-top: 40px;
        width: 100%;
        text-align: left;
        position: relative;
        z-index: 450;


        .info-label{
          font-size: 0.7rem;
          text-transform: uppercase;
          padding-right: 5rem;
        }

        .info-value{
          margin-bottom: 1rem;
          font-weight: 700;
          font-size: 1.1rem;
          font-family: 'Barlow Condensed', sans-serif;
        }
      }
    }

    .player-picture-container{

      width: 33%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      position: relative;
      z-index: 20;
      max-height: 1000px;

      img.player-picture{
        height: 1000px;
      }

      img.player-picture-background{
        z-index: -3000;
        opacity: 0.3;
        position: absolute;
        top: -100px;
        height: 3000px;
        left: -100px;
        transform: translateX(-50%);
      }
    }

    .player-stats-container{

      position: relative;
      z-index: 500;

      .league-title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        padding-bottom: 2rem;

        div{
          height: 1px;
          background-color: $lightGray3;
          border: 0;
          flex: 1;
        }

        h3{
          @include sectionTitle;
        }

        .ligue2-logo{
          max-height: 80px;
          margin: 0 30px;
        }
      }

      .league-stats-table{

        width: 100%;

        tr{

          td{
            padding: 6px;
            border-radius: 4px;

            hr{
              height: 0.7px;
              background-color: $lightGray3;
              border: 0;
              box-sizing: border-box;
              margin-left: 140px;
            }
          }

          td.stat-label{
            text-align: right;
            text-transform: uppercase;
            font-size: 0.7rem;
            letter-spacing: 0.3rem;
          }

          td.stat-value{
            font-family: 'Barlow Condensed', sans-serif;
            text-transform: uppercase;
            font-size: 1.4rem;
            font-weight: 700;
            text-align: center;
          }
        }
      }
    }
  }

  // ANIMATIONS

  .loading-enter-active {
    transition: all 50ms ease-out;
  }

  .loading-leave-active {
    transition: all 50ms ease-in-out;
  }

  .loading-enter-from,
  .loading-leave-to {
    opacity: 0;
  }

  .player-pic-enter-active img {
    transition: all 500ms cubic-bezier(.17,.67,0,1.04);
    transition-delay: 5000ms;
  }

  .player-pic-enter-from img {
    transform: translateY(50px);
    opacity: 0;
  }

  .player-info-enter-active,
  .player-stats-enter-active{
    transition: all 200ms ease-out;
  }

  .player-info-leave-active,
  .player-stats-leave-active{
    transition: all 200ms ease-in-out;
  }

  .player-info-enter-from,
  .player-info-leave-to {
    opacity: 0;
    transform: translateX(-100px);
  }

  .player-stats-enter-from,
  .player-stats-leave-to {
    opacity: 0;
    transform: translateX(100px);
  }

  @media screen and (max-width: 1024px){

    .player-container{

      flex-wrap: wrap;

      .player-info-container,
      .player-picture-container{
        width: 50%;
      }
      .player-picture-container{
        max-height: 600px;
        overflow: hidden;
      }
      .player-stats-container{
        width: 100%;
      }
    }
  }
  
  @media screen and (max-width: 596px) {

    .player-container{

      .player-info-container,
      .player-picture-container{
        width: 100%;
      }
      .player-picture-container{
        max-height: 300px;
        overflow: hidden;
      }
    }
  }

</style>