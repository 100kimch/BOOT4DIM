<template>
  <q-page>
    <div class="custom-title-box">
      <div class="q-display-1">로그인</div>
    </div>
    <c-login-btn type="kakao"></c-login-btn>
    <q-card class="loginbox">
      <q-field>
        <h1 class="q-title">로그인 테스트</h1>
        <div class="row">
          <q-input class="col-8" v-model="id" />
          <q-btn class="col-4" color="primary" @click="login()" label="로그인" />
        </div>
      </q-field>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  mounted () {
    this.$store.commit('showcase/updateDarkenTheme', false)
  },
  methods: {
    login: async function () {
      const loginStatus = await this.$login(this.id, this.password)
      if (loginStatus === 'needConfirm') {
        this.$router.push('confirm_email')
      }
    }
  },
  data () {
    return {
      id: '',
      password: ''
    }
  }
}
</script>

<style lang="scss">
.loginbox {
  padding: 1em;
}
</style>
