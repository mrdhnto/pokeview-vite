<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="sidebar">
    <div class="sidebar">
      <div class="logo-container">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      </div>
      <div class="web-title">PokeView - Vite</div>
      <div class="wrapper">
        <nav>
          <RouterLink to="/"><vue-feather type="home" size="12px"></vue-feather> Home</RouterLink>
          <RouterLink to="/favorites"><vue-feather type="heart" size="12px"></vue-feather> Favorite</RouterLink>
          <RouterLink to="/about"><vue-feather type="info" size="12px"></vue-feather> About</RouterLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#sidebar {
  // display: none;
  display: block;
  position: absolute;
  left: -220px;
  background-color: var(--color-background);
  height: inherit;
  transition: all .4s ease-in-out;
  z-index: 11;

  &.show {
    left: 0;
  }

  .sidebar {
    padding: 1rem;
    line-height: 1.5;
    max-height: 100vh;
    flex-flow: column;
    border-right: 3px solid #333333;
    height: inherit;
  
    .web-title {
      text-align: center;
      color: hsla(160, 100%, 37%, 1);
    }
  
    .logo-container {
      display: flex;
      justify-content: center;
    }
  
    nav {
      display: flex;
      flex-flow: column;
      width: 100%;
      font-size: 12px;
      margin-top: 2rem;
    }
  
    nav a.router-link-exact-active {
      color: var(--color-text);
      border: 0;
    }
  
    nav a.router-link-exact-active:hover {
      background-color: transparent;
    }
  
    nav a {
      display: inline-block;
      padding: 0.3rem 1rem;
      border-left: 1px solid var(--color-border);
    }
  }
}

@media (min-width: 1024px) {
  #sidebar {
    display: inherit;
    position: relative;
    left: 0;
    z-index: 10;

    .sidebar {
      display: flex;
      width: 220px;

      .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
      }
      nav {
        text-align: left;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
      }
    }
  }
}
</style>
