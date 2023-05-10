<script setup>
import store from '@/store/index'
import PokemonList from '../components/PokemonList.vue'
import { getDataFromAPI } from '@/mixins/GetDataFromAPI'
import { checkHeightContent } from '@/mixins/CheckHeightContent'
import { getNextList } from '@/mixins/GetNextList'
import { showError } from '@/mixins/ShowError'

</script>

<template>
  <PokemonList v-if="pokemonData.length > 0" :pokemonData="pokemonData" />
  <h5 class="empty" v-else>No Pokemon Loaded</h5>
  <div class="loader-container" v-if="loading">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    PokemonList
  },
  mixins: [getDataFromAPI, checkHeightContent, getNextList, showError],
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    pokemonData() {
      return store.getters['pokemon/getPokemonList']
    },
    paginationData() {
      return store.getters['pokemon/getPaginationData']
    }
  },  
  methods: {
  },
  async mounted() {
    await this.getDataFromAPI(`?limit=${this.paginationData.limit}&offset=${this.paginationData.offset}`).catch(err => { this.showError(err) })

    const mainWrapper = document.querySelector('main')
    const contentWrapper = document.querySelector('content')

    this.checkHeightContent(mainWrapper, contentWrapper)

    mainWrapper.addEventListener('scroll', e => {
      if (mainWrapper.scrollTop + mainWrapper.clientHeight >= mainWrapper.scrollHeight) {
        this.getNextList()
      }
    })
  }
}
</script>

<style lang="scss">
h5 {
  &.empty {
    text-align: center;
    font-size: 1rem;
    color: #41b883;
    margin: 2rem auto;
  }
}
</style>