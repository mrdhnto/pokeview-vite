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
</style>