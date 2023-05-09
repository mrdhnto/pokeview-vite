import { createStore } from 'vuex'
// Modules
import app from './app'
import pokemon from './pokemon'
import pokemonType from './pokemonType'

export default createStore({
  modules: {
    app,
    pokemon,
    pokemonType,
  },
  strict: import.meta.env.VITE_DEV,
})