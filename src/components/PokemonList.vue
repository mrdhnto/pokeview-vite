<script setup>
import PokemonCard from './PokemonCard.vue'
</script>

<template>
  <div v-if="pokemonData.length > 0 && !favorites" class="pokemon__card-container">
    <PokemonCard
      v-for="pokemon in pokemonData"
      :key="pokemon.name"
      :pokemonInfo="pokemon"
    />
  </div>
  <div v-if="pokemonData.length > 0 && favorites" class="pokemon__card-container">
    <PokemonCard
      v-for="pokemon in pokemonData"
      :key="pokemon"
      :uniqId="pokemon"
    />
  </div>
</template>

<script>
export default {
  name: 'PokemonList',
  props: {
    pokemonData: Array,
    favorites: Boolean
  },
  components: { PokemonCard },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.pokemon__card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33.33%);
  grid-row-gap: 20px;
  justify-content: space-around;
  margin: 2em 0 1em 0;
  max-width: 1320px;
}

@media (min-width: 425px) and (max-width: 560px) {
  .pokemon__card-container {
    grid-template-columns: repeat(auto-fill, 25%);
  }
}

@media (min-width: 561px) and (max-width: 600px) {
  .pokemon__card-container {
    grid-template-columns: repeat(auto-fill, 20%);
  }
}

@media (min-width: 601px) and (max-width: 701px) {
  .pokemon__card-container {
    grid-template-columns: repeat(auto-fill, 25%);
  }
}

@media (min-width: 701px) and (max-width: 825px) {
  .pokemon__card-container {
    grid-template-columns: repeat(auto-fill, 20%);
  }
}

@media (min-width: 826px) and (max-width: 1170px) {
  .pokemon__card-container {
    grid-template-columns: repeat(auto-fill, 16.66%);
  }
}

@media (min-width: 1171px) {
  .pokemon__card-container {
    grid-template-columns: repeat(auto-fill, 12.25%);
  }

  .pokemon__card-container {
    margin: 2em auto 1em auto;
  }
}

</style>
