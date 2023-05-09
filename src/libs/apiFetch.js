import { app } from '@/main'

const apiFetch = {
  async getPokemonList(data) {
    // get all filter, position, offset before fetch
    const baseUrl = import.meta.env.VITE_BASE_URL
    const url = `${baseUrl}/pokemon${data.url}`
    return app.$http.get(url).then((response) => {
      return response.data
    }) 
  },

  async getFilterList(data) {
    // get all filter, position, offset before fetch
    const baseUrl = import.meta.env.VITE_BASE_URL
    const url = `${baseUrl}/type${data.url}`
    return app.$http.get(url).then((response) => {
      return response.data
    }) 
  },

  async getTypeList(data) {
    // get all filter, position, offset before fetch
    const baseUrl = import.meta.env.VITE_BASE_URL
    const url = `${baseUrl}/type${data.url}`
    return app.$http.get(url).then((response) => {
      return response.data
    }) 
  },

  async getPokemonDetail(data) {
    // get all filter, position, offset before fetch
    const baseUrl = import.meta.env.VITE_BASE_URL
    const url = `${baseUrl}/pokemon${data.url}`
    return app.$http.get(url).then((response) => {
      return response.data
    }) 
  },
}

export default apiFetch