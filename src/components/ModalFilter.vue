<script setup>
import store from '@/store/index'
import TypeButton from './TypeButton.vue'
import { showError } from '@/mixins/ShowError'
import { showModalContent } from '@/mixins/ShowModalContent'

</script>

<template>
  <div class="modal-container d-none">
    <div class="modal-title">
      Filter 
    </div>
    <div class="modal-content d-flex text-center content-center">
      <TypeButton
        v-for="pokeType in dataType"
        :key="pokeType.id"
        :pokeType="pokeType"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mixins: [showModalContent, showError],
  computed: {
    dataType() {
      return store.getters['pokemonType/getPokemonType']
    },
  },
  mounted() {
    if (this.dataType.length === 0) {
      this.getDataFilter('')
    }
  },
  methods: {
    async getDataFilter(endPoint) {
      await store.dispatch('pokemonType/LIST', {url: endPoint}, { root: true }).catch(err => { this.showError(err) })
      this.loading = false
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
  }

  .modal-close {
    border: none !important;
    background-color: transparent !important;
    cursor: pointer !important;
    position: absolute !important;
    top: 0;
    right: 0;
  }

</style>
  