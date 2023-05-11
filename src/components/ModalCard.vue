<script setup>
import store from '@/store/index'
import ModalDetail from './ModalDetail.vue'
import ModalFilter from './ModalFilter.vue'
import { showError } from '@/mixins/ShowError'
import { showModalContent } from '@/mixins/ShowModalContent'
</script>

<template>
  <dialog>
    <div class="d-flex pb-0">
      <div class="loader-container m-auto" id="modal-loader">
        <div class="loader"></div>
      </div>

      <ModalFilter v-if="isFilter" />

      <ModalDetail v-if="isDetail" />

      <div v-if="isMessage">
        <div class="modal-container d-none">
          <div class="modal-title" :class="getMessage.type">
            {{ getMessage.title }}
          </div>
          <div class="modal-message">
            {{ getMessage.message }}
          </div>
        </div>
      </div>
      <button class="btn-clear modal-close" @click="overlayClose">
        <vue-feather type="x"></vue-feather>
      </button>
    </div>
  </dialog>
  <div class="overlay" @click="overlayClose"></div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true
    }
  },
  mixins: [showModalContent, showError],
  computed: {
    isFilter() {
      return store.getters['app/getFilterStatus']
    },
    isDetail() {
      return store.getters['app/getDetailStatus']
    },
    isMessage() {
      return store.getters['app/getMessageStatus']
    },
    getMessage() {
      return store.getters['app/getMessageData']
    },
  },
  mounted() {},
  methods: {
    overlayClose() {
      if (this.isFilter) store.dispatch('app/SET_FILTER', false, { root: true }).catch(err => { this.showError(err) })
      if (this.isDetail) store.dispatch('app/SET_DETAIL', false, { root: true }).catch(err => { this.showError(err) })
      if (this.isMessage) store.dispatch('app/SET_MESSAGE', false, { root: true }).catch(err => { this.showError(err) })

      document.getElementById('modal-loader').classList.remove('d-none')
      document.getElementById('sidebar').classList.remove('show')
      document.querySelector('dialog').removeAttribute('class')
      document.querySelector('.overlay').classList.remove('show')
      document.querySelector('main').removeAttribute('style')
    },
  }
}
</script>

<style lang="scss" scoped>

dialog{
  position: absolute;
  margin: auto;
  top: 50%;
  transform: translate(0, -50%);
  animation: appear .4s ease-in-out;
  max-height: calc(100vh - 100px);
  z-index: 11;
  overflow-y: overlay;

  &.full {
    width: 100% !important;
    height: calc(100vh - 60px);
  }

  &.normal {
    min-width: 200px;
    width: 50%;
  }

  .modal-container {
    max-width: 800px;
    width: -webkit-fill-available;

    .modal-title {
      font-size: 1.4rem;
      
      &.success {
        color: rgb(0 189 126);
      }

      &.error {
        color: rgb(189, 32, 32);
      }
    }
  
    .modal-message, .modal-content {
      font-size: 1rem;
    }
  }

  .modal-close {
    border: none !important;
    background-color: transparent !important;
    cursor: pointer !important;
    position: absolute !important;
    top: 0;
    right: 0;
  }
}

.overlay {
    display: none;
    position: absolute;
    // top: 60px;
    margin: auto;
    animation: appear 350ms ease-in 1;
    // width: 100% !important;
    // height: calc(100vh - 60px);
    height: 100%;
    z-index: 10;
    top: 0;
    width: 100%;
    background: #000000cc;
    
    &.show {
      display: block !important;
    }
  }

@keyframes appear {
  0%{
    opacity: 0;
    transform: translateY(-10px);
  }
}

@media (max-width: 799px) {
  dialog{
    min-width: 55%;
  }
}

@media (min-width: 800px) {
  dialog{
    width: 600px;
    &.large {
      width: 600px;
    }

    &.normal {
      width: 600px;
    }
  }
}

@media (min-width: 1024px) {
  dialog{
    width: 800px;
    &.large {
      width: 1036px;
    }

    .d-flex {
      padding: 1rem;
    }
  }
}

</style>