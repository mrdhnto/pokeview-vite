import apiFetch from '@/libs/apiFetch'

export default {
  namespaced: true,
  state: {
    pokemonList: [],
    itemTotal: 0,
    favorites: {},
    paginationData: {
      limit: 24,
      offset: 0,
    }
  },
  getters: {
    getPokemonList: state => state.pokemonList,
    getItemTotal: state => state.itemTotal,
    getPaginationData: state => state.paginationData,
    getUserFav: state => state.favorites,
  },
  mutations: {
    UPDATE_POKEMON_LIST(state, payload) {
      state.pokemonList = payload
    },
    UPDATE_ITEM_TOTAL(state, payload) {
      state.itemTotal = payload
    },
    UPDATE_PAGINATION_OFFSET(state, payload) {
      state.paginationData.offset = payload
    },
    UPDATE_FAV(state, payload) {
      state.favorites = payload
    },
  },
  actions: {
    async LIST({ commit, getters }, data) {
      try {
        const response = await apiFetch.getPokemonList(data)
        const stateData = getters.getPokemonList
        const paginationData = getters.getPaginationData
        const pokemonList = [...stateData, ...response.results]
        await commit('UPDATE_POKEMON_LIST', pokemonList)
        await commit('UPDATE_ITEM_TOTAL', response.count)
        await commit('UPDATE_PAGINATION_OFFSET', paginationData.limit)
        return response
      } catch (error) {
        throw error
      }
    },
    async LOAD_FILTER_DATA({commit}, data) {
      try {
        let array = []
        data.forEach(element => {
          array.push(element.pokemon)
        });
        await commit('UPDATE_POKEMON_LIST', array)
        await commit('UPDATE_ITEM_TOTAL', array.length)
        return true
      } catch (error) {
        throw error
      }
    },
    async GET_DATA(state, data) {
      try {
        const response = await apiFetch.getPokemonDetail(data)
        return response
      } catch (error) {
        throw error
      }
    }
  },
}