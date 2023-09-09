<template>
  <div id="container">
    <div v-if="isLoading">
      <!-- Page de chargement -->
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="filter-categories">
        <div class="filters-left">
          <div class="select-container">
            <select v-model="sortOption">
              <option value="position">Trier par poste</option>
              <option value="lastname">Trier par nom</option>
              <option value="number">Trier par numéro</option>
            </select>
          </div>
          <input v-show="sortOption !== 'position'" type="text" v-model="search" placeholder="Chercher un joueur..." class="filter-category" />
          <button v-show="sortOption !== 'position'" @click="toggleDisplay('Nationalities')" class="filter-category"><font-awesome-icon class="filter-icon" :icon="['fas', 'filter']" v-if="selectedNationalities.length > 0"/> Nationalités <font-awesome-icon icon="fa-solid fa-chevron-down"   :class="{dropdownArrow: true, active: showFilters === 'Nationalities'}" /></button>
          <button v-show="sortOption !== 'position'" @click="toggleDisplay('Positions')" class="filter-category"><font-awesome-icon class="filter-icon" :icon="['fas', 'filter']" v-if="selectedPositions.length > 0" /> Postes <font-awesome-icon icon="fa-solid fa-chevron-down"  :class="{dropdownArrow: true, active: showFilters === 'Positions'}" /></button>
          <button v-show="sortOption !== 'position'" @click="toggleDisplay('Age')" class="filter-category"><font-awesome-icon class="filter-icon" :icon="['fas', 'filter']" v-if="ageFilters[0] > ageMinMax[0] || ageFilters[1] < ageMinMax[1]" /> Âge <font-awesome-icon icon="fa-solid fa-chevron-down"  :class="{dropdownArrow: true, active: showFilters === 'Age'}" /></button>
        </div>
        <div class="filters-right">
          <button v-show="sortOption !== 'position' && anyFilters" @click="clearFilters" class="filter-category"><font-awesome-icon class="close-cross" icon="fa-solid fa-xmark" /> Réinitialiser les filtres</button>
          <p class="filter-category">{{filteredPlayers.length}} joueurs</p>
        </div>
      </div>
      <transition-group
          name="filters"
          tag="div"
          v-show="sortOption !== 'position'"
          :class="{ filterscontainer: true, active: showFilters !== '' }"
      >
          <div v-if="showFilters === 'Nationalities'" class="nationality-buttons filter-buttons-wrapper">
            <button
                v-for="nationality in nationalitiesCount"
                :key="nationality.name"
                :class="{ tag: true, active: isSelectedNationality(nationality.name) }"
                @click="toggleNationality(nationality.name)"
            >
              {{ nationality.name }} ({{ nationality.count }})
            </button>
          </div>
          <div v-if="showFilters === 'Positions'" class="position-buttons filter-buttons-wrapper">
            <button
                v-for="position in positions"
                :key="position"
                :class="{ tag: true, active: selectedPositions.includes(position) }"
                @click="togglePosition(position)"
            >
              {{ position }}
            </button>
          </div>
          <div v-if="showFilters === 'Age'" class="position-buttons filter-buttons-wrapper slider-wrapper">
            <Slider v-model="ageFilters" :min="ageMinMax[0]" :max="ageMinMax[1]" tooltipPosition="bottom" class="slider-navy"/>
          </div>
        </transition-group>
      <hr v-if="sortOption !== 'position'">


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

      <div v-show="sortOption === 'position'" class="position-title" id="goalkeepers">
        <div></div>
        <h2>Gardiens</h2>
        <div></div>
      </div>
      <div v-show="sortOption === 'position'" class="cards-container">
        <PlayerCard
            v-for="playerData in playersByPosition('Gardien')"
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

      <div v-show="sortOption === 'position'" class="position-title" id="defenders">
        <div></div>
        <h2>Défenseurs</h2>
        <div></div>
      </div>
      <div v-show="sortOption === 'position'" class="cards-container">
        <PlayerCard
            v-for="playerData in playersByPosition('Défenseur')"
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

      <div v-show="sortOption === 'position'" class="position-title" id="midfielders">
        <div></div>
        <h2>Milieux</h2>
        <div></div>
      </div>
      <div v-show="sortOption === 'position'" class="cards-container">
        <PlayerCard
            v-for="playerData in playersByPosition('Milieu')"
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

      <div v-show="sortOption === 'position'" class="position-title" id="forwards">
        <div></div>
        <h2>Attaquants</h2>
        <div></div>
      </div>
      <div v-show="sortOption === 'position'" class="cards-container">
        <PlayerCard
            v-for="playerData in playersByPosition('Attaquant')"
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
import allPlayers from "@/assets/json/players.json";
import PlayerCard from "@/components/PlayerCard.vue";
import Slider from '@vueform/slider'

export default {
  name: "AllCards",
  components: { PlayerCard, Slider },
  data() {
    return {
      players: [],
      search: "",
      sortOption: "position",
      selectedNationalities: [],
      selectedPositions: [],
      showFilters: '',
      ageMinMax: [],
      ageFilters: [],
    };
  },
  created: async function() {
    if (this.isCacheValid()) {
      const cachedPlayers = sessionStorage.getItem('fcgbPlayers');
      if (cachedPlayers) {
        this.players = JSON.parse(cachedPlayers);
        this.getAgeValues();
        return;
      }
    }
    await this.getFCGBPlayers();
    this.getAgeValues();
  },
  computed: {
    positions() {
      return ["Gardien", "Défenseur", "Milieu", "Attaquant"];
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

      // Filtrage des joueurs par âge
      filteredPlayers = filteredPlayers.filter((playerData) => {
        const age = playerData.player.age;
        return age >= this.ageFilters[0] && age <= this.ageFilters[1];
      });

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
    anyFilters(){
      return this.search || this.selectedPositions.length > 0 || this.selectedNationalities.length > 0 || this.ageFilters[0] > this.ageMinMax[0] || this.ageFilters[1] < this.ageMinMax[1];
    },
  },
  methods: {
    async getFCGBPlayers() {

      this.players = allPlayers;

      sessionStorage.setItem('fcgbPlayers', JSON.stringify(allPlayers));

      const expirationTime = new Date().getTime() + 5 * 60 * 1000;
      sessionStorage.setItem('fcgbPlayersExpiration', expirationTime);
    },
    getAgeValues() {
      // Récupération de l'âge minimum et maximum des joueurs
      const ages = this.players.map((playerData) => playerData.player.age);
      const minAge = Math.min(...ages);
      const maxAge = Math.max(...ages);
      this.ageMinMax = [minAge, maxAge];

      // Initialisation de la donnée ageFilters
      this.ageFilters = [minAge, maxAge];
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
    toggleDisplay(string){
      if (this.showFilters !== string){
        this.showFilters = string
      } else {
        this.showFilters = ''
      }
    },
    clearFilters() {
      this.search = "";
      this.selectedPositions = [];
      this.selectedNationalities = [];
      this.ageFilters = this.ageMinMax;
      this.showFilters = '';
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

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss" scoped>

  hr{
    border: none;
    border-top: 1px solid $lightGray3;
    height: 1px;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  #container{
    color: $textColor1;
    min-width: 100%;
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

  .select-container{
    select{
      padding: 0.5rem;
    }
  }

  .filter-categories{
    display: flex;
    justify-content: space-between;
    padding-top: 2rem;

    .filters-left{
      display: flex;
      justify-content: flex-start;
    }

    .filters-right{
      display: flex;
      justify-content: flex-end;
    }

    .filter-category{
      border-style: none;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-right: 1rem;
      padding-left: 1rem;
      margin-left: 2rem;
      background-color: $backgroundColor;
    }

    button.filter-category{
      cursor: pointer;
    }

    input.filter-category{
      padding: 0.5rem;
      border-radius: 6px;
      border: 1px solid $lightGray3;
      margin-left: 2rem;
      margin-right: 1rem;
      width: 10rem;
      color: $darkLighter;
    }
  }

  .dropdownArrow{
    transition-duration: 400ms;
    margin-left: 0.4rem;
  }

  .dropdownArrow.active{
    transform: rotate(180deg);
  }

  .close-cross{
    color: $errorColor;
    font-size: 1.2rem;
  }

  .filter-icon{
    color: $lightGray3;
    font-size: 0.8rem;
    margin-right: 0.4rem;
  }

  .filterscontainer{
    max-height: 0;
    height: auto;
    transition-duration: 600ms;
  }

  .filterscontainer.active{
    max-height: 500px;
  }

  .filterscontainer{
    overflow: hidden;
    transition-duration: 600ms;

    .filter-buttons-wrapper{
      margin-top: 1rem;
      padding: 0.5rem;

      .tag{
        padding: 0.3rem;
        font-size: 0.7rem;
        border-style: none;
        background-color: $backgroundColor;
        border: 1px solid $lightGray3;
        border-radius: 6px;
        margin-right: 0.5rem;
        color: $darkLighter;
        transition-duration: 400ms;
        cursor: pointer;
      }

      .tag.active{
        background-color: $girondinsColor;
        color: $backgroundColor;
        border-color: $girondinsColor;
      }

    }

    .filter-buttons-wrapper.slider-wrapper{
      padding-bottom: 3rem;
      padding-left: 20px;
      max-width: 600px;


      .slider-navy{
        --slider-connect-bg: #131734;
        --slider-tooltip-bg: #131734;
        --slider-handle-ring-width: 3px;
        --slider-handle-ring-color: rgba(19, 23, 52, 0.4);
        --slider-handle-width: 12px;
        --slider-handle-height: 12px;
        --slider-tooltip-distance: 4px;
      }
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
    //transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
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
    position: absolute;
  }

</style>