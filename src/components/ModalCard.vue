<script setup>
import store from '@/store/index'
import ModalDetail from './ModalDetail.vue'
import ModalFilter from './ModalFilter.vue'
</script>

<template>
  <dialog>
    <div class="d-flex">
      <ModalFilter v-if="isFilter" />

      <ModalDetail v-if="isDetail" />

      <div class="modal-container" v-if="isMessage">
        <div class="modal-title">
          Your Message Title 
        </div>
        <div class="modal-message">
          Your Message Here
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
  },
  mounted() {},
  methods: {
    overlayClose() {
      if (this.isFilter) store.dispatch('app/SET_FILTER', false, { root: true }).catch(err => { console.log('filter', err)})
      if (this.isDetail) store.dispatch('app/SET_DETAIL', false, { root: true }).catch(err => { console.log('detail', err)})
      if (this.isMessage) store.dispatch('app/SET_MESSAGE', false, { root: true }).catch(err => { console.log('message', err)})

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
  width: 800px;
  z-index: 11;

  &.full {
    width: 100% !important;
    height: calc(100vh - 60px);
  }

  &.d-block {
    display: block;
  }
  .d-flex {
    display: flex;
    padding: .4rem;
    flex-wrap: wrap;

    &.flex-column {
      flex-flow: column;
    }
  }

  .modal-container {
    max-width: 800px;
    width: -webkit-fill-available;

    .modal-title {
      font-size: 1.4rem;
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

  .text-center {
    text-align: center !important;
  }

  .content-center {
    justify-content: center !important;
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

@media (min-width: 800px) {
  dialog{
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
    &.large {
      width: 1036px;
    }

    .d-flex {
      padding: 1rem;
    }
  }
}

</style>