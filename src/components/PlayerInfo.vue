<template>
  <div>
    <h1>{{player.firstnameShort}} {{player.lastnameShort}}</h1>
    <p>{{player.number}}</p>
    <p>Nom complet : {{player.firstname}} {{player.lastname}}</p>
    <p>{{player.age}} ans</p>
    <p>Né le {{player.birth.date}} à {{player.birth.place}} ({{player.birth.country}})</p>
    <p>Nationalité : {{player.nationality}}</p>
    <p>{{player.height}}</p>
    <p>{{player.weight}}</p>
    <h3>Ligue 2</h3>
    <p>Matchs joués : {{statsLeague.games.appearences}}</p>
    <p>Dont titulaire : {{statsLeague.games.lineups}}</p>
    <p>Minutes jouées : {{statsLeague.games.minutes}}</p>
<!--    <div v-if="statsCup.games">
      <h3>Coupe de France</h3>
      <p>Matchs joués : {{statsCup.games.appearences}}</p>
      <p>Dont titulaire : {{statsCup.games.lineups}}</p>
      <p>Minutes jouées : {{statsCup.games.minutes}}</p>
    </div>-->
    <router-link to="">Acheter son maillot</router-link>
    <router-link to="/">Retour</router-link>

  </div>
</template>

<script>
import AdditionalInfo from "@/assets/json/additional-info.json";

export default {
  name: "PlayerInfo",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      player: [],
      statsLeague: [],
      statsCup: []
    }
  },
  created: function() {
    this.getFCGBPlayers()
  },
  methods: {
    async getFCGBPlayers(){
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '53fef01e3cmsh88ac04d3580cb85p1610d1jsn3405a8d53f6e',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };

      let fullResponse = await fetch('https://api-football-v1.p.rapidapi.com/v3/players?id='+this.id+'&season=2022', options)
          .then(response => response.json())
          .catch(err => console.error(err));

      this.player = fullResponse.response[0].player

      let statsGdB = fullResponse.response[0].statistics.filter(obj => obj.team.id === 78);
      this.statsLeague = statsGdB.filter(obj => obj.league.id === 62)[0]
      this.statsCup = statsGdB.filter(obj => obj.league.id === 66)[0]

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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>