import apiFetch from '@/libs/apiFetch'

export default {
  namespaced: true,
  state: {
    pokemonList: [],
    itemTotal: 0,
    favorites: [],
    paginationData: {
      limit: 24,
      offset: 0,
    },
    pokemonData: {},
  },
  getters: {
    getPokemonList: state => state.pokemonList,
    getItemTotal: state => state.itemTotal,
    getPaginationData: state => state.paginationData,
    getUserFav: state => state.favorites,
    getPokemonData: state => state.pokemonData,
  },
  mutations: {
    UPDATE_POKEMON_LIST(state, payload) {
      state.pokemonList = [...state.pokemonList, ...payload]
    },
    UPDATE_POKEMON_LIST_BY_FILTER(state, payload) {
      state.pokemonList = payload
    },
    UPDATE_ITEM_TOTAL(state, payload) {
      state.itemTotal = payload
    },
    UPDATE_PAGINATION_OFFSET(state, payload) {
      state.paginationData.offset = state.paginationData.offset + payload
    },
    UPDATE_FAV(state, payload) {
      state.favorites = payload
    },
    SET_POKEMON_DATA(state, payload) {
      state.pokemonData = payload
    },
  },
  actions: {
    async LIST({ commit, getters, state }, data) {
      try {
        const response = await apiFetch.getPokemonList(data)
        const paginationData = getters.getPaginationData
        await commit('UPDATE_POKEMON_LIST', response.results)
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
        await commit('UPDATE_POKEMON_LIST_BY_FILTER', array)
        await commit('UPDATE_ITEM_TOTAL', array.length)
        return true
      } catch (error) {
        throw error
      }
    },
    async GET_DATA({ commit }, data) {
      try {
        const response = await apiFetch.getPokemonDetail(data)
        if (data.saved) {
          commit('SET_POKEMON_DATA', response)
        }
        return response
      } catch (error) {
        throw error
      }
    },
    async ADD_FAVORITE({ commit, getters }, data) {
      try {
        let savedFav = getters.getUserFav
        savedFav.push(data)
        await commit('UPDATE_FAV', savedFav)
        return true
      } catch (error) {
        throw error
      }
    },
    async REMOVE_FAVORITE({ commit, getters }, data) {
      try {
        let savedFav = getters.getUserFav
        // savedFav = savedFav.filter(item => item !== data)
        const index = savedFav.indexOf(data);
        if (index !== -1) {
          savedFav.splice(index, 1);
        }
        console.log(savedFav)
        await commit('UPDATE_FAV', savedFav)
        return true
      } catch (error) {
        throw error
      }
    }
  },
}