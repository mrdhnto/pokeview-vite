<script setup>
import { RouterView } from 'vue-router'
import ModalCard from './components/ModalCard.vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

</script>

<template>
  <Sidebar />
  <main>
    <Header />
    <content>
      <RouterView />
    </content>
  </main>
  <ModalCard />
</template>

<style lang="scss" scoped>
main {
  width: 100%;
  overflow: overlay;
  height: 100%;

  content {
    display: block;
    max-width: 1026px;
    margin: 0 auto;
    padding-top: 62px;
  }
}

@media (min-width: 1024px) {
  main {
    width: calc(100% - 220px);
  }
}
</style>
