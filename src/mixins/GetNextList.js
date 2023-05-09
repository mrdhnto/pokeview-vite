import store from '@/store/index'

export const getNextList = {
  methods: {
    async getNextList() {
      const maxItem = store.getters['pokemon/getItemTotal']
      if (maxItem > this.paginationData.offset) {
        this.loading = true
        this.getDataFromAPI(`?limit=${this.paginationData.limit}&offset=${this.paginationData.offset}`)
        this.loading = false
      }
    },
  },
}

export const _ = null