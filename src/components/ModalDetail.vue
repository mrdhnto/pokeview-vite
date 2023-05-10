<script setup>
import store from '@/store/index'
</script>

<template>
  <div class="modal-container">
    <div class="modal-content d-flex flex-column">
      <div class="pokemon__header d-flex p-0">
        <div class="pokemon__img">
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`"
            class="pokemon-icon"
          />
        </div>
        <div class="pokemon__title">
          <h4 class="pokemon__name">{{ pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1) }}</h4>
          <div class="pokemon__type d-flex p-0">
            <span
              v-for="pokemonType in pokemonData.types"
              :key="pokemonType.slot"
              class="pokemon__type-badge">
              {{ pokemonType.type.name }}
            </span>
          </div>
          <div :class="favSaved.includes(pokemonData.id) ? 'active' : ''" @click="favoritePokemon(pokemonData.id)">
            <vue-feather type="heart" size="32"></vue-feather>
          </div>
        </div>
      </div>
      <div class="pokemon__body d-flex p-0">
        <div class="left_info d-flex flex-column p-0">
          <div class="pokemon__stats d-flex p-0">
            <h5>Pokemon Stats</h5>
            <div class="border-round">
              <div
                class="item_stat"
                v-for="(pokemonStat, id) in pokemonData.stats"
                :key="id"
              >
                <span class="stat_name">{{ pokemonStat.stat.name }}</span> : <span class="stat_number">{{ pokemonStat.base_stat }}</span>
              </div>
            </div>
          </div>
          <div class="pokemon__game_apperance">
            <h5>Game Apperance</h5>
            <div class="border-round">
              <div
                v-for="(gameApperance, id) in pokemonData.game_indices"
                :key="id"
                class="pokemon__game-badge">
                {{ gameApperance.version.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="right_info flex-column p-0">
          <h5>Skills</h5>
          <div class="border-round">
            <div
              class="item_ability"
              v-for="(pokemonAbility, id) in pokemonData.abilities"
              :key="id"
            >
              {{ pokemonAbility.ability.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    pokemonData() {
      return store.getters['pokemon/getPokemonData']
    },
    favSaved() {
      return store.getters['pokemon/getUserFav']
    },
    isDetailFav() {
      return store.getters['app/getDetailFavStatus']
    },
  },
  methods: {
    async favoritePokemon(id) {
      if (this.favSaved.includes(id)) {
        await store.dispatch('pokemon/REMOVE_FAVORITE', id, {root: true}).then(() => {
          this.isActive = false
          this.overlayClose()
        }).catch(err => { console.log('remove fav', err)})
        
      } else {
        await store.dispatch('pokemon/ADD_FAVORITE', id, {root: true}).then(() => {
          this.isActive = true
        }).catch(err => { console.log('add fav', err)})
      }
    },
    overlayClose() {
      store.dispatch('app/SET_DETAIL', false, { root: true }).catch(err => { console.log('detail', err)})

      document.getElementById('sidebar').classList.remove('show')
      document.querySelector('dialog').removeAttribute('class')
      document.querySelector('.overlay').classList.remove('show')
      document.querySelector('main').removeAttribute('style')
    },
  }
}
</script>

<style lang="scss" scoped>

  .d-flex {
    display: flex;
    padding: .4rem;
    flex-wrap: wrap;

    &.flex-column {
      flex-flow: column;
    }
  }

  .modal-container {
    max-width: 800px;
    width: -webkit-fill-available;

    .modal-title {
      font-size: 1.4rem;
    }
  
    .modal-message, .modal-content {
      font-size: 1rem;
    }
  }

  .modal-close {
    border: none !important;
    background-color: transparent !important;
    cursor: pointer !important;
    position: absolute !important;
    top: 0;
    right: 0;
  }

  .text-center {
    text-align: center !important;
  }

  .content-center {
    justify-content: center !important;
  }

.pokemon__header {
  height: 100%;
  min-height: 100px;
  max-height: 200px;

  .pokemon__name {
    font-size: 1.7rem;
  }

  .pokemon__type {
    padding-bottom: .5rem !important;
    .pokemon__type-badge {
      border: .4px solid rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      margin-right: .5rem;
      padding: 2px 5px;
    }
  }

  .active {
    color: red;
  }

}

.pokemon__body {
  .left_info {
    width: 80%;
    padding-right: 5px !important;

    .item_stat {
      display: inline-block;
      width: 33.33%;
    }

    .pokemon__game-badge {
      display: inline-block;
      width: 25%;
      padding: .365rem;
    }
  }

  .right_info {
    width: 20%;
    padding-left: 5px !important;
  }
}

.pokemon__img {
  width: 20%;
  min-width: 100px;
  max-width: 200px;

  .pokemon-icon {
    max-width: 75px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.75);
    border-radius: 0.25em;
  }
}

.p-0 {
  padding: 0 !important;
}

.pokemon__title {
  width: 70%;
}

.border-round {
  border: 1px solid #000000;
  padding: 0.4rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

@media (min-width: 800px) {
  .pokemon__img {
    .pokemon-icon {
      max-width: 95px;
    }
  }
}

@media (min-width: 1024px) {
  .pokemon__img {
    .pokemon-icon {
      max-width: 125px;
    }
  }
}

</style>