<script setup>
import store from '@/store/index'
</script>

<template>
  <div class="modal-container d-none">
    <div class="modal-content d-flex flex-column p-0">
      <div class="pokemon__header d-flex p-0">
        <div class="pokemon__img">
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`"
            class="pokemon-icon"
          />
        </div>
        <div class="pokemon__title">
          <h4 class="pokemon__name" v-if="pokemonData.name">{{ pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1) }}</h4>
          <div class="pokemon__type d-flex p-0">
            <span
              v-for="pokemonType in pokemonData.types"
              :key="pokemonType.slot"
              class="pokemon__type-badge">
              {{ pokemonType.type.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="pokemon__body d-flex p-0">
        <div class="left_info d-flex flex-column p-0">
          <div class="pokemon__stats">
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
          <div class="pokemon__skills">
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
      <div class="d-flex justify-end">
        <div class="button" :class="favSaved.includes(pokemonData.id) ? 'active' : ''" @click="favoritePokemon(pokemonData.id)">
          <vue-feather class="align-sub" type="heart" size="16"></vue-feather> Favorite
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
          if(this.isDetailFav) this.overlayClose()
        }).catch(err => { this.showError(err) })
        
      } else {
        await store.dispatch('pokemon/ADD_FAVORITE', id, {root: true}).then(() => {
          this.isActive = true
        }).catch(err => { this.showError(err) })
      }
    },
    overlayClose() {
      store.dispatch('app/SET_DETAIL', false, { root: true }).catch(err => { this.showError(err) })

      document.getElementById('modal-loader').classList.remove('d-none')
      document.getElementById('sidebar').classList.remove('show')
      document.querySelector('dialog').removeAttribute('class')
      document.querySelector('.overlay').classList.remove('show')
      document.querySelector('main').removeAttribute('style')
    },
  }
}
</script>

<style lang="scss" scoped>
  .modal-container {
    max-width: 800px;
    width: -webkit-fill-available;

    .modal-title {
      font-size: 1.4rem;
    }
  
    .modal-message, .modal-content {
      font-size: 1rem;
    }

    h5 {
      color: rgb(0 189 126);
    }
  }
  
  .button {
    &.active {
      color: red;
    }
  }

  .align-sub {
    display: inline-block;
    vertical-align: sub;
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
  max-height: 200px;

  .pokemon__title {
    padding-left: .5rem;
  }

  .pokemon__name {
    font-size: 1rem;
    margin-bottom: .5rem;
    color: rgb(0 189 126);
  }

  .pokemon__type {
    padding-bottom: .5rem !important;
    font-size: .8rem;
    .pokemon__type-badge {
      border: .4px solid rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      margin-right: .5rem;
      padding: 1.5px 4px;
    }
  }

}

.pokemon__body {
  .left_info {
    width: 100%;
    // padding-right: 5px !important;

    .item_stat, .pokemon__game-badge {
      display: inline-block;
      min-width: 50%;
    }

    .pokemon__skills {
      display: block;
      .item_ability::before {
        content: '• '
      }
    }

    .pokemon__game-badge::before {
      content: '• '
    }
  }

  .right_info {
    width: 20%;
    display: none;
    padding-left: 5px !important;
  }
}

.pokemon__img {
  max-width: 200px;

  .pokemon-icon {
    max-width: 75px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.75);
    border-radius: 0.25em;
  }
}

.border-round {
  border: 1px solid #000000;
  padding: 0.4rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

@media (min-width: 540px) {
  .pokemon__body {
    .left_info {
      width: 70%;
      padding-right: 5px !important;

      .pokemon__skills {
        display: none;
      }
    }

    .right_info {
      width: 30%;
      display: block;
      padding-left: 5px !important;

      .item_ability::before {
        content: '• '
      }
    }
  }
}

@media (min-width: 1024px) {
  .pokemon__title {
    .pokemon__name {
      font-size: 1.35rem;
    }

    .pokemon__type {
      font-size: .962rem;
      .pokemon__type-badge {
        border-radius: 6px;
        padding: 2px 6px;
      }
    }
  }
  .pokemon__img {
    .pokemon-icon {
      max-width: 125px;
    }
  }

  .pokemon__body {
    .left_info {
      width: 80%;

      .item_stat, .pokemon__game-badge {
        display: inline-block;
        min-width: 33.33%;
      }
    }

    .right_info {
      width: 20%;
    }
  }
}

</style>