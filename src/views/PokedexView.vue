<script setup>
import store from '@/store/index'
import PokemonList from '../components/PokemonList.vue'
import { getDataFromAPI } from '@/mixins/GetDataFromAPI'
import { checkHeightContent } from '@/mixins/CheckHeightContent'
import { getNextList } from '@/mixins/GetNextList'

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
  mixins: [getDataFromAPI, checkHeightContent, getNextList],
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
    await this.getDataFromAPI(`?limit=${this.paginationData.limit}&offset=${this.paginationData.offset}`).catch(err => { console.log('set detail', err)})

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