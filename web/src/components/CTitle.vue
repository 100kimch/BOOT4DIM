<template>
  <q-parallax class="custom-title-box" :src="'/statics/cover_plans.png'" :speed="1" :height="400">
    <!-- <h2 class="title q-display-1">Boost Your Passion,</h2> -->
    <h1 class="title q-display-1" v-html="title"></h1>
  </q-parallax>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['title'],
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.custom-title-box {
  margin-top: -4.5rem;
  margin-bottom: -4rem;
  color: white;
  h1 {
    text-shadow: none;
  }
}
</style>
