<template>
  <div>
    <q-parallax class="custom-title-box" :class="{'noNavigation': noNavigation}" :src="coverImg" :speed="0.5" :height="400">
      <!-- <h2 class="title q-display-1">Boost Your Passion,</h2> -->
      <h2 class="q-body-1">{{ subtitle }}</h2>
      <h1 class="title q-display-1" v-html="title"></h1>
    </q-parallax>
    <c-navigation v-if="!noNavigation" intitle />
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['title', 'subtitle', 'imgSrc', 'noNavigation'],
  computed: {
    coverImg () {
      if (this.imgSrc) {
        return this.imgSrc
      } else {
        return this.$store.state.showcase.theme.imgSrc
      }
    }
  }
}
</script>

<style lang="scss">
* {
  text-shadow: none;
}
.custom-title-box {
  margin-top: -4.5rem;
  margin-bottom: -4.5rem;
  color: white;
  z-index: -1;
  h1 {
    margin-top: 0;
    margin-bottom: 3rem;
  }
  h2 {
    margin: none;
  }
  &.noNavigation {
    margin-bottom: calc(-4.5rem + 3rem);
  }
}
</style>
