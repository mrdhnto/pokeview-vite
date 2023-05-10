import store from '@/store/index'

export const showModalContent = {
  methods: {
    async showModalContent() {
      document.getElementById('modal-loader').classList.add('d-none')
      document.querySelector('.modal-container').classList.remove('d-none')
    },
  },
}

export const _ = null