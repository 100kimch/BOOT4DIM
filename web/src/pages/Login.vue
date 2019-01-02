<template>
  <q-page padding>
    <q-card class="custom-login-logo" @click.native="loginWithKakao">
      <img src="/assets/kakao_logo.png" />
      <h1>카카오톡으로 로그인</h1>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
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
  }
}
</script>

<style lang="scss">
.custom-login-logo {
  padding: 0 calc(50% - 50px - 6rem);
  background: #fee633;
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
</style>
