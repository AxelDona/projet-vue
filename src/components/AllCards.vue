<template>
  <div id="container">
    <div v-if="isLoading">
      <!-- Page de chargement -->
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="select-container">
        <select v-model="sortOption">
          <option value="position">Trier par poste</option>
          <option value="lastname">Trier par nom</option>
          <option value="number">Trier par numéro</option>
        </select>
      </div>
      <Transition name="filters">
        <div v-show="sortOption !== 'position'" class="filters-container">
          <button @click="clearFilters">Clear</button>
          <input type="text" v-model="search" placeholder="Chercher un joueur..." />
          <div class="nationality-buttons">
            <button
                v-for="nationality in nationalitiesCount"
                :key="nationality.name"
                :class="{ active: isSelectedNationality(nationality.name) }"
                @click="toggleNationality(nationality.name)"
            >
              {{ nationality.name }} ({{ nationality.count }})
            </button>
          </div>
          <div class="position-buttons">
            <button
                v-for="position in positions"
                :key="position"
                :class="{ active: selectedPositions.includes(position) }"
                @click="togglePosition(position)"
            >
              {{ position }}
            </button>
          </div>
          <span>{{filteredPlayers.length}} joueurs</span>
        </div>
      </Transition>

        <div v-show="sortOption !== 'position'" class="cards-container">
          <transition-group name="list">
            <PlayerCard
                v-for="playerData in filteredPlayers"
                v-bind:key="playerData.player.id"
                :id="playerData.player.id"
                :name="playerData.player.name"
                :firstnameShort="playerData.player.firstnameShort"
                :lastnameShort="playerData.player.lastnameShort"
                :age="playerData.player.age"
                :height="playerData.player.height"
                :weight="playerData.player.weight"
                :number="playerData.player.number"
            />
          </transition-group>
        </div>

      <div v-show="sortOption === 'position'" class="position-title">
        <div></div>
        <h2>Gardiens</h2>
        <div></div>
      </div>
      <div v-show="sortOption === 'position'" class="cards-container">
        <PlayerCard
            v-for="playerData in playersByPosition('Goalkeeper')"
            v-bind:key="playerData.player.id"
            :id="playerData.player.id"
            :name="playerData.player.name"
            :firstnameShort="playerData.player.firstnameShort"
            :lastnameShort="playerData.player.lastnameShort"
            :age="playerData.player.age"
            :height="playerData.player.height"
            :weight="playerData.player.weight"
            :number="playerData.player.number"
        />
      </div>

      <div v-show="sortOption === 'position'" class="position-title">
        <div></div>
        <h2>Défenseurs</h2>
        <div></div>
      </div>
      <div v-show="sortOption === 'position'" class="cards-container">
        <PlayerCard
            v-for="playerData in playersByPosition('Defender')"
            v-bind:key="playerData.player.id"
            :id="playerData.player.id"
            :name="playerData.player.name"
            :firstnameShort="playerData.player.firstnameShort"
            :lastnameShort="playerData.player.lastnameShort"
            :age="playerData.player.age"
            :height="playerData.player.height"
            :weight="playerData.player.weight"
            :number="playerData.player.number"
        />
      </div>

      <div v-show="sortOption === 'position'" class="position-title">
        <div></div>
        <h2>Milieux</h2>
        <div></div>
      </div>
      <div v-show="sortOption === 'position'" class="cards-container">
        <PlayerCard
            v-for="playerData in playersByPosition('Midfielder')"
            v-bind:key="playerData.player.id"
            :id="playerData.player.id"
            :name="playerData.player.name"
            :firstnameShort="playerData.player.firstnameShort"
            :lastnameShort="playerData.player.lastnameShort"
            :age="playerData.player.age"
            :height="playerData.player.height"
            :weight="playerData.player.weight"
            :number="playerData.player.number"
        />    </div>

      <div v-show="sortOption === 'position'" class="position-title">
        <div></div>
        <h2>Attaquants</h2>
        <div></div>
      </div>
      <div v-show="sortOption === 'position'" class="cards-container">
        <PlayerCard
            v-for="playerData in playersByPosition('Attacker')"
            v-bind:key="playerData.player.id"
            :id="playerData.player.id"
            :name="playerData.player.name"
            :firstnameShort="playerData.player.firstnameShort"
            :lastnameShort="playerData.player.lastnameShort"
            :age="playerData.player.age"
            :height="playerData.player.height"
            :weight="playerData.player.weight"
            :number="playerData.player.number"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from "@/components/PlayerCard.vue";
import AdditionalInfo from "@/assets/json/additional-info.json";

export default {
  name: "AllCards",
  components: { PlayerCard },
  data() {
    return {
      players: [],
      search: "",
      sortOption: "position",
      selectedNationalities: [],
      selectedPositions: [],
    };
  },
  created: async function() {
    if (this.isCacheValid()) {
      const cachedPlayers = sessionStorage.getItem('fcgbPlayers');
      if (cachedPlayers) {
        this.players = JSON.parse(cachedPlayers);
        return;
      }
    }

    await this.getFCGBPlayers();
  },
  computed: {
    positions() {
      return ["Goalkeeper", "Defender", "Midfielder", "Attacker"];
    },
    playersByPosition() {
      return (position) => {
        return this.players
            .filter((player) => player.statistics[0].games.position === position)
            .sort((a, b) => a.player.number - b.player.number);
      };
    },
    filteredPlayers() {
      let filteredPlayers = this.players;

      if (this.search) {
        const searchQuery = this.removeAccents(this.search.toLowerCase());
        filteredPlayers = filteredPlayers.filter((playerData) => {
          const playerFullName = this.removeAccents(
              playerData.player.firstname.toLowerCase() + " " + playerData.player.lastname.toLowerCase()
          );
          const playerShortName = this.removeAccents(
              playerData.player.firstnameShort.toLowerCase() + " " + playerData.player.lastnameShort.toLowerCase()
          );
          return playerFullName.includes(searchQuery) || playerShortName.includes(searchQuery);
        });
      }

      if (this.sortOption === "lastname") {
        filteredPlayers = filteredPlayers.sort((a, b) => {
          const nameA = this.removeAccents(a.player.lastnameShort.toLowerCase());
          const nameB = this.removeAccents(b.player.lastnameShort.toLowerCase());
          return nameA.localeCompare(nameB);
        });
      }

      if (this.sortOption === "number") {
        filteredPlayers = filteredPlayers.sort((a, b) => a.player.number - b.player.number);
      }

      if (this.selectedNationalities.length > 0) {
        filteredPlayers = filteredPlayers.filter((playerData) =>
            this.selectedNationalities.includes(playerData.player.nationality)
        );
      }

      if (this.selectedPositions.length > 0) {
        filteredPlayers = filteredPlayers.filter((playerData) =>
            this.selectedPositions.includes(playerData.statistics[0].games.position)
        );
      }

      return filteredPlayers;
    },
    nationalitiesCount() {
      const count = {};
      for (const player of this.players) {
        if (!count[player.player.nationality]) {
          count[player.player.nationality] = 1;
        } else {
          count[player.player.nationality]++;
        }
      }
      const sortedNationalities = Object.keys(count).sort((a, b) => {
        if (count[a] !== count[b]) {
          return count[b] - count[a];
        } else {
          return a.localeCompare(b);
        }
      });
      return sortedNationalities.map((nationality) => ({
        name: nationality,
        count: count[nationality],
      }));
    },
  },
  methods: {
    async getFCGBPlayers() {

      const cachedPlayers = sessionStorage.getItem('fcgbPlayers');
      if (cachedPlayers) {
        this.players = JSON.parse(cachedPlayers);
        return;
      }

      const options = {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': '53fef01e3cmsh88ac04d3580cb85p1610d1jsn3405a8d53f6e',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        },
      };

      let allPlayers = [];
      let page = 1;
      let totalPages = 1;


      while (page <= totalPages) {
        let response = await fetch(
            `https://api-football-v1.p.rapidapi.com/v3/players?team=78&season=2022&page=${page}`,
            options
        )
            .then((response) => response.json())
            .catch((err) => console.error(err));
        allPlayers = [...allPlayers, ...response.response];
        page++;
        totalPages = response.paging.total;
      }

      const filteredPlayers = allPlayers.filter((player) => {
        return AdditionalInfo.some((jsonPlayer) => jsonPlayer.id === player.player.id);
      });

      filteredPlayers.forEach((player) => {
        const jsonPlayer = AdditionalInfo.find(
            (jsonPlayer) => jsonPlayer.id === player.player.id
        );
        player.player.firstnameShort = jsonPlayer.firstnameShort;
        player.player.lastnameShort = jsonPlayer.lastnameShort;
        player.player.number = jsonPlayer.number;
      });

      this.players = filteredPlayers;

      sessionStorage.setItem('fcgbPlayers', JSON.stringify(filteredPlayers));

      const expirationTime = new Date().getTime() + 5 * 60 * 1000;
      sessionStorage.setItem('fcgbPlayersExpiration', expirationTime);
    },
    isSelectedNationality(nationality) {
      return this.selectedNationalities.includes(nationality);
    },
    toggleNationality(nationality) {
      if (this.isSelectedNationality(nationality)) {
        this.selectedNationalities = this.selectedNationalities.filter((n) => n !== nationality);
      } else {
        this.selectedNationalities.push(nationality);
      }
    },
    togglePosition(position) {
      if (this.selectedPositions.includes(position)) {
        this.selectedPositions = this.selectedPositions.filter((p) => p !== position);
      } else {
        this.selectedPositions.push(position);
      }
    },
    clearFilters() {
      this.search = "";
      this.selectedPositions = [];
      this.selectedNationalities = [];
    },
    removeAccents(str) {
      return str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[\u0105\u0104]/g, "a") // a avec ogonek
          .replace(/[\u0119\u0118]/g, "e") // e avec ogonek
          .replace(/[\u015b\u015a\u0161\u0160]/g, "s") // s avec accent aigu et s caron
          .replace(/[\u0142\u0141]/g, "l") // l avec barre
          .replace(/[\u017a\u0179]/g, "z") // z avec accent aigu
          .replace(/[\u017c\u017b]/g, "z"); // z avec point
    },
    isCacheValid() {
      const expirationTime = sessionStorage.getItem('fcgbPlayersExpiration');
      if (!expirationTime) {
        return false;
      }

      const currentTime = new Date().getTime();
      return currentTime < parseInt(expirationTime);
    }
  },
};
</script>

<style lang="scss" scoped>

  #container{
    color: #2c3e50;
  }

  .cards-container{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .position-title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 2rem;

    div{
      height: 0.8px;
      background-color: $lightGray3;
      border: 0;
      flex: 1;
    }

    h2{
      margin: 0 2rem;
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 600;
      font-size: 1.8rem;
      text-align: center;
    }
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 200ms ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
  }

  .active{
    background-color: red;
  }

  .filters-enter-active {
    transition: all 300ms ease-out;
  }

  .filters-leave-active {
    transition: all 300ms ease-in-out;
  }

  .filters-enter-from,
  .filters-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }

</style>