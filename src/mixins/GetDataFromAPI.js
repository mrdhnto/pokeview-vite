import store from '@/store/index'

export const getDataFromAPI = {
  methods: {
    async getDataFromAPI(endPoint) {
      await store.dispatch('pokemon/LIST', {url: endPoint}, { root: true }).catch(err => { this.showError(err) })
      this.loading = false
    },
  },
}

export const _ = null