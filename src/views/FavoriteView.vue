<script setup>
import store from '@/store/index'
import PokemonList from '../components/PokemonList.vue'
</script>

<template>
  <PokemonList v-if="favoriteData.length > 0" :pokemonData="favoriteData" :favorite="true" />
  <h5 class="empty" v-else>There is no Favorited Pokemon yet!</h5>
</template>

<script>
export default {
  name: 'App',
  components: {
    PokemonList
  },
  data() {
    return {}
  },
  computed: {
    favoriteData() {
      return store.getters['pokemon/getUserFav']
    },
  },  
  methods: {},
  mounted() {
  }
}
</script>

<style lang="scss">
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

h5 {
  &.empty {
    text-align: center;
    font-size: 2rem;
    color: #41b883;
    margin: 2rem auto;
  }
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