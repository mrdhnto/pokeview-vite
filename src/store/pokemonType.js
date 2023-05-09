import apiFetch from '@/libs/apiFetch'

export default {
  namespaced: true,
  state: {
    pokemonType: [],
  },
  getters: {
    getPokemonType: state => state.pokemonType,
  },
  mutations: {
    UPDATE_TYPE_LIST(state, payload) {
      state.pokemonType = payload
    },
  },
  actions: {
    async LIST({ commit, getters }, data) {
      try {
        const response = await apiFetch.getFilterList(data)
        await commit('UPDATE_TYPE_LIST', response.results)
        return response
      } catch (error) {
        throw error
      }
    },
    async TYPE({ commit, dispatch }, data) {
      try {
        const response = await apiFetch.getTypeList(data)
        return response
      } catch (error) {
        throw error
      }
    },
  },
}