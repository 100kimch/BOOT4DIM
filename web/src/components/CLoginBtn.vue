<template>
  <q-card v-if="type==='kakao'" :class="{'dense': dense }" @click.native="loginWithKakao">
    <img src="/statics/kakao_logo.png" />
    <h1>카카오톡으로 로그인</h1>
  </q-card>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    'type': String,
    'dense': Boolean
  },
  mounted () {
    console.log(this.type, this.dense)
  },
  methods: {
    loginWithKakao: function () {
      this.$q.loading.show()
      // kakao request
      this.$login({}).then((response) => {
        this.$q.dialog({
          color: 'positive',
          message: response.message
        })
        this.$router.go(-1)
        this.$q.loading.hide()
      }).catch((response) => {
        this.$q.dialog({
          color: 'negative',
          message: response.message
        })
        this.$q.loading.hide()
      })
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  padding: 0 calc(50% - 50px - 6rem);
  background: #ffeb00;
  img {
    float: left;
    width: 100px;
    height: 100px;
  }
  h1 {
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    font-weight: normal;
    line-height: 100px;
  }
}
.q-card.dense {
  padding: - calc(50% - 25px - 6rem);
  img {
    width: 50px;
    height: 50px;
  }
  h1 {
    font-size: 1rem;
    line-height: 50px;
  }
}
</style>
