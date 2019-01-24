<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
window.appName = '부트사차원'
export default {
  name: 'Boot4Dim',
  created () {
    this.$q.addressbarColor.set('#333333')
  }
}
</script>

<style lang="scss">
body {
  background: rgb(240, 240, 240);
}
</style>
