<template>
  <q-layout>
    <!-- <q-toolbar class="second-toolbar">
      <q-toolbar-title>프로젝트</q-toolbar-title>
    </q-toolbar> -->
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="secondary" @click="goBack" icon="arrow_back" />
    </q-page-sticky>
  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',
  data () {
    return {
      leftDrawer: true
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.second-toolbar {
  padding: 1em;
  overflow: initial;
  height: 2em;
}

table {
  overflow: hidden;
}

* + .q-table-container {
  // TODO: solve the full-screen status
  margin-top: 0.5rem;
}
</style>
