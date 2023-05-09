<script setup>
import store from '@/store/index'
import PokemonList from '../components/PokemonList.vue'
</script>

<template>
  <PokemonList :pokemonData="pokemonData" :favorite="true" />
</template>

<script>
export default {
  name: 'App',
  components: {
    PokemonList
  },
  data() {
    return {
      pokemonData: [1,2,52,77,123,96],
      indexCount: null,
    }
  },
  methods: {
    async getDataFromAPI(endPoint) {
      await store.dispatch('pokemon/LIST', {url: endPoint}, { root: true }).then(response => {
        this.indexCount = response.count
        this.pokeList = [response.previous, response.next]
        this.pokemonData = [...this.pokemonData, ...response.results]
      })
      this.loading = false
    },
  },
  mounted() {
  }
}
</script>

<style>
.loader-container {
  margin-top: 3.5em;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #42b983; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>