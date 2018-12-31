<template>
  <q-page padding>
    <q-card>
      <q-card-title>요약</q-card-title>
      <q-card-main class="custom-graph-box">
        <q-knob v-model="models.totalMembers" readonly :placeholder="'총 부원수'" />
        <q-knob v-model="models.totalProjects" readonly :placeholder="'총 부원수'" />
        <q-knob v-model="models.totalFiles" readonly :placeholder="'총 부원수'" />
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      models: {
        'totalMembers': 66,
        'totalProjects': 40,
        'totalFiles': 30
      }
    }
  }
}
</script>

<style lang="scss">
.custom-graph-box {
  & > * {
    padding: 0.25em;
  }
}
</style>
