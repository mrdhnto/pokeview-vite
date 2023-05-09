<script setup>
import store from '@/store/index'
</script>

<template>
  <div class="pokemon__card-info" @click="openDetail">
    <img
      v-if="typeof(pokemonInfo) === 'object'"
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`"
      class="pokemon-icon"
    />
    <img
      v-else
      src="@/assets/loader.gif"
      class="pokemon-icon"
      :pokemon-index="pokemonInfo"
    />
    <span class="poke-index">#{{ pokedexNumber }}</span>
    <p class="pokemon-name">{{ pokemonName }}</p>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemonInfo: JSON
  },
  data() {
    return {
      pokemonId: '?',
      pokemonName: 'Loading...',
      pokedexNumber: '?',
    }
  },
  methods: {
    getPokemonId() {
      let splittedStr = this.pokemonInfo.url.split('/')
      this.pokemonId = splittedStr[splittedStr.length-2]
      let num = this.pokemonId.toString();
      while (num.length < 4) num = "0" + num;
      this.pokedexNumber = num
    },
    renamePokemon() {
      this.pokemonName = this.pokemonInfo.name.replace(/-/g,' ');
    },
    async openDetail() {
      await store.dispatch('app/SET_DETAIL', '', { root: true })
      document.querySelector('dialog').classList.add('d-block')
      document.querySelector('.overlay').classList.add('show')
      document.querySelector('main').style.overflowY = 'hidden'
    },
  },
  mounted() {
    if (typeof(this.pokemonInfo) === 'object') {
      this.getPokemonId(),
      this.renamePokemon()
    } else {
      store.dispatch('pokemon/GET_DATA', {url: `/${this.pokemonInfo}`}, { root: true }).then(result => {
        this.pokemonId = result.id
        this.pokemonName = result.name
        this.pokedexNumber = result.id
        document.querySelector(`.pokemon-icon[pokemon-index="${result.id}"]`).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${result.id}.png`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pokemon__card-info {
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;
}

.pokemon__card-info:hover {
  transform: scale(1.1, 1.1);
}

.pokemon__card-info:hover .pokemon-icon {
  box-shadow: 0 2px 5px 0 rgba(102, 240, 178, 0.5), 0 2px 10px 0 rgba(102, 240, 178, 0.5);
}

.pokemon__card-info:hover .pokemon-name, .pokemon__card-info:hover .poke-index {
  color: #42b983;
}

.pokemon-icon {
  max-width: 75px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 0.25em;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.pokemon-name {
  margin: 10px auto;
  font-weight: 500;
}

.poke-index {
  position: absolute;
  top: 0;
  right: 5px;
}

@media (min-width: 601px) and (max-width: 864px) {
  .pokemon-icon {
    max-width: 95px;
  }
}

@media (min-width: 865px) {
  .pokemon-icon {
    max-width: 120px;
  }
}
</style>
