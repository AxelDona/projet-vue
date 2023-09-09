<template>
  <div class="player-container">
    <Transition name="loading">
      <div v-if="isLoading" class="loading-screen">
        <LoadingAnimation class="loading-animation"/>
      </div>
    </Transition>

    <Transition name="player-info" appear>
      <div v-if="!isLoading" class="player-info-container">
        <router-link class="back-link" :to="{path:'/', hash:'#'+positionTag, }"><font-awesome-icon icon="fa-solid fa-chevron-left" class="chevron-left" /> Retour</router-link>

        <h1 v-if="player.firstnameShort===''" class="player-name">{{player.lastnameShort}}
          <p class="player-number">{{player.number}}</p>
        </h1>
        <h1 v-else class="player-name">{{player.firstnameShort}}<br>{{player.lastnameShort}}
          <p class="player-number">{{player.number}}</p>
        </h1>

        <p class="player-position">{{statsLeague.games.position}}</p>

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
              <p class="info-value"><span v-if="player.flag" class="nationality-flag">{{player.flag}}</span>{{player.nationality}}</p>

            </td>
          </tr>
          <tr>
            <td>
              <span class="info-label">Né le </span>
              <p class="info-value">{{player.birth.date}}</p>
            </td>
            <td v-if="player.birth.place">
              <span class="info-label"> à </span>
              <p v-if="player.birth.country === 'France'" class="info-value">{{player.birth.place}}</p>
              <p v-else class="info-value">{{player.birth.place}} ({{player.birth.country}})</p>
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

    <Transition name="player-pic" appear>
      <div v-if="!isLoading" class="player-picture-container">
        <img :src="'https://axeldona.com/girondins-img/player-page/'+id+'-p.png'" class="player-picture" alt="">
      </div>
    </Transition>

    <Transition name="player-stats" appear>
      <div v-if="!isLoading" class="player-stats-container">
        <div class="league-title">
          <span @click="getPreviousCompetition" class="competition-button previous"><font-awesome-icon icon="fa-solid fa-chevron-left" class="league-selection-chevron" /></span>
          <div @click="getPreviousCompetition"></div>
          <img v-show="allCompetitions[currentCompetition].league.id === 62" class="ligue2-logo" src="../assets/img/icon/ligue2-logo.svg">
          <img v-show="allCompetitions[currentCompetition].league.id === 66" class="ligue2-logo" src="../assets/img/icon/cdf-logo.svg">
          <div @click="getNextCompetition"></div>
          <span @click="getNextCompetition" class="competition-button next"><font-awesome-icon icon="fa-solid fa-chevron-right" class="league-selection-chevron" /></span>
        </div>
        <Transition :name="'stats-swipe-'+statsDirection">
          <table :key="currentLeagueID" class="league-stats-table">
            <tr>
              <td class="stat-label">Matchs joués</td>
              <td class="stat-value">{{allCompetitions[currentCompetition].games.appearences}}</td>
            </tr>
            <tr>
              <td class="stat-label">Dont titulaire</td>
              <td class="stat-value">{{allCompetitions[currentCompetition].games.lineups}}</td>
            </tr>
            <tr><td colspan="2"><hr></td></tr>
            <tr>
              <td class="stat-label">Temps de jeu total (minutes)</td>
              <td v-if="allCompetitions[currentCompetition].games.minutes === 0" class="stat-value">{{allCompetitions[currentCompetition].games.minutes}}</td>
              <td v-else class="stat-value">{{allCompetitions[currentCompetition].games.minutes}}</td>
            </tr>
            <tr><td colspan="2"><hr></td></tr>
            <tr>
              <td class="stat-label">Buts</td>
              <td class="stat-value">{{allCompetitions[currentCompetition].goals.total}}</td>
            </tr>
            <tr>
              <td class="stat-label">Passes décisives</td>
              <td v-if="!allCompetitions[currentCompetition].goals.assists" class="stat-value">0</td>
              <td v-else class="stat-value">{{allCompetitions[currentCompetition].goals.assists}}</td>
            </tr>
            <tr><td colspan="2"><hr></td></tr>
            <tr>
              <td class="stat-label">Tirs</td>
              <td v-if="!allCompetitions[currentCompetition].shots.total" class="stat-value">0</td>
              <td v-else class="stat-value">{{allCompetitions[currentCompetition].shots.total}}</td>
            </tr>
            <tr>
              <td class="stat-label">dont cadrés</td>
              <td v-if="!allCompetitions[currentCompetition].shots.on" class="stat-value">0</td>
              <td v-else class="stat-value">{{allCompetitions[currentCompetition].shots.on}}</td>
            </tr>
            <tr v-if="allCompetitions[currentCompetition].games.position === 'Goalkeeper'"><td colspan="2"><hr></td></tr>
            <tr v-if="allCompetitions[currentCompetition].games.position === 'Goalkeeper'">
              <td class="stat-label">Arrêts</td>
              <td v-if="allCompetitions[currentCompetition].goals.saves" class="stat-value">{{allCompetitions[currentCompetition].goals.saves}}</td>
              <td v-else class="stat-value">0</td>
            </tr>
            <tr v-if="allCompetitions[currentCompetition].games.position === 'Goalkeeper'">
              <td class="stat-label">Buts encaissés</td>
              <td v-if="allCompetitions[currentCompetition].goals.conceded" class="stat-value">{{allCompetitions[currentCompetition].goals.conceded}}</td>
              <td v-else class="stat-value">0</td>
            </tr>
          </table>
        </Transition>
      </div>
    </Transition>

  </div>
</template>

<script>
import allPlayers from "@/assets/json/players.json";
import LoadingAnimation from "@/components/LoadingAnimation.vue";

export default {
  name: "PlayerInfo",
  components: {LoadingAnimation},
  data(){
    return{
      player: [],
      id : this.$route.params.id,
      positionTag : "goalkeepers",
      statsLeague: [],
      statsCup: [],
      allCompetitions: [],
      currentCompetition: 0,
      currentLeagueID: 62,
      competitionLogos: [],
      statsDirection: "right",
      isLoading: true
    }
  },
  created: function() {
    this.getFCGBPlayers()
  },
  methods: {
    async getFCGBPlayers(){

      try {
        this.isLoading = true;

        const playerId = parseInt(this.id);
        const playerInfo = allPlayers.find(player => player.player.id === playerId);

        this.player = playerInfo.player;

        let statsGdB = playerInfo.statistics.filter(obj => obj.team.id === 78);
        this.statsLeague = statsGdB.filter(obj => obj.league.id === 62)[0];
        this.statsCup = statsGdB.filter(obj => obj.league.id === 66)[0];

        this.allCompetitions = [this.statsLeague, this.statsCup];
        this.competitionLogos = ["ligue2", "cdf"];

        if (this.statsLeague.games.position === "Gardien"){
          this.positionTag = "goalkeepers";
        } else if (this.statsLeague.games.position === "Défenseur"){
          this.positionTag = "defenders";
        } else if (this.statsLeague.games.position === "Milieu"){
          this.positionTag = "midfielders";
        } else if (this.statsLeague.games.position === "Attaquant"){
          this.positionTag = "forwards";
        }

        this.isLoading = false;
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
    getNextCompetition(){
      if (this.currentCompetition >= this.allCompetitions.length-1){
        this.currentCompetition = 0;
      } else {
        this.currentCompetition ++;
      }
      this.statsDirection = "right";
      this.currentLeagueID = this.allCompetitions[this.currentCompetition].league.id;
    },
    getPreviousCompetition(){
      if (this.currentCompetition === 0){
        this.currentCompetition = this.allCompetitions.length-1;
      } else {
        this.currentCompetition --;
      }
      this.statsDirection = "left";
      this.currentLeagueID = this.allCompetitions[this.currentCompetition].league.id;
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
    padding-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;

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
      padding-bottom: 20px;

      .back-link{
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
        color: $girondinsColor;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 15px;
        position: relative;
        z-index: 700;
        margin-bottom: 1rem;
        display: block;

        .chevron-left{
          transition-duration: 200ms;
        }
      }

      .back-link:hover{

        .chevron-left{
          margin-right: 0.3rem;
          margin-left: 0.4rem;
        }
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
          user-select: none;
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

          .nationality-flag{
            margin-right: 0.4rem;
          }
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
      max-height: calc($pageHeight - 10px);

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
      padding-bottom: 20px;

      .league-title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        padding-bottom: 2rem;
        max-height: 80px;

        .competition-button{
          padding: 10px 22px;
          cursor: pointer;
          font-size: 12px;

          &.previous{
            padding-left: 10px;
          }

          &.next{
            padding-right: 10px;
          }
        }

        div{
          height: 1px;
          background-color: $lightGray3;
          border: 0;
          flex: 1;
          cursor: pointer;
          position: relative;
        }

        div:after {
          content:'';
          position:absolute;
          top:-10px; bottom:-10px;
          left:-10px; right:-10px;
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
            min-width: 2.4rem;
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

  .player-pic-enter-active{
    transition: all 800ms cubic-bezier(.17,.67,0,1.04);
    transition-delay: 200ms;
  }

  .player-pic-enter-from{
    transform: translateY(70px);
    opacity: 0;
  }

  .player-info-enter-active,
  .player-stats-enter-active{
    transition: all 400ms ease-out;
  }

  .player-info-leave-active,
  .player-stats-leave-active{
    transition: all 400ms ease-in-out;
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

  .stats-swipe-left-enter-active,
  .stats-swipe-right-enter-active{
    transition: all 300ms ease;
  }

  .stats-swipe-left-leave-active,
  .stats-swipe-right-leave-active{
    transition: all 300ms ease-in-out;
  }

  .stats-swipe-left-enter-from,
  .stats-swipe-right-leave-to {
    transform: translateX(-150px);
    opacity: 0;
  }

  .stats-swipe-right-enter-from,
  .stats-swipe-left-leave-to {
    transform: translateX(150px);
    opacity: 0;
  }

  .stats-swipe-left-enter-active,
  .stats-swipe-right-enter-active{
    transition-delay: 150ms;
  }

  .stats-swipe-right-leave-active,
  .stats-swipe-left-leave-active{
    position: absolute;
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