<template>
  <q-breadcrumbs active-color="light" color="white">
    <q-icon name="keyboard_arrow_right" slot="separator" slot-scope="props" />
    <q-breadcrumbs-el v-if="path.name" class="q-body-2" :icon="path.icon" :key="index" v-for="(path, index) in $route.matched" :label="path.name" :to="path.path || '/'" />
  </q-breadcrumbs>
</template>

<script>
export default {
  // name: 'ComponentName',
  created () {
    this.$route.matched[0].name = '홈'
    this.$route.matched[0].icon = 'home'
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.q-breadcrumbs {
  margin: 0;
  padding: 0 1rem 0.5rem 1rem;
  border-radius: 1rem;
  // background: rgb(255, 255, 255);
}
</style>
