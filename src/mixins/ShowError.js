import store from '@/store/index'

export const showError = {
  methods: {
    async showError(error) {
      await store.dispatch('app/SET_MESSAGE', '', { root: true }).then( async () => {
        if (error.hasOwnProperty('code')) await store.dispatch('app/SET_MESSAGE_DATA', {type: 'error', title: `Error ${error.code}`, message: error.message}, { root: true })
        else await store.dispatch('app/SET_MESSAGE_DATA', {type: 'error', title: 'Something went wrong...', message: error.message}, { root: true })
        this.showModalContent()
      })
    },
  },
}

export const _ = null