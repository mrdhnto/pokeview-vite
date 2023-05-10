<template>
  <div class="about d-flex flex-column">
    <div class="about-image">
      <div class="image-wrapper">
        <img src="@/assets/mine.jpg" alt="Riski Mardhianto"/>
      </div>
    </div>
    <div class="about-description text-center">
      <h4>PokeView - Vite</h4>
      <div>This web is created for Jublia Front-End Assessment purpose using Vue 3 + Vite</div>
    </div>
    <div class="about-link text-center">
        <a href="https://ra121514.my.id" target="_blank">Portfolio</a>
        <a href="https://github.com/Darkerside/pokeview-vite" target="_blank">Github Repo</a>
        <a href="https://www.figma.com/file/Fbd0KrnkMQN5MAyRbOtGNg/PokeView---Skeleton?type=design&t=c0QkVyavKA0QFypA-1" target="_blank">Figma Skets</a>
      </div>
  </div>
</template>

<style lang="scss" scoped>
.about-image {
  margin: 2rem auto 1rem;
  text-align: center;

    img {
      border-radius: 50%;
      max-height: 150px;
      min-height: 80px;
      border: 2px solid hsla(160, 100%, 37%, 1);
      padding: .2rem;
    }
}

.about-description {
  margin-bottom: 1rem;
  h4 {
    color: hsla(160, 100%, 37%, 1);
    font-size: 20px;
  }

}

.about-link {
  a {
    margin: 0 .5rem;
  }
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
