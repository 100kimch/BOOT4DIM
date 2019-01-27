<template>
  <q-page>
    <c-title title="로그인" :noNavigation="true" />
    <c-login-btn v-if="!isLoggedIn" type="kakao"></c-login-btn>
    <q-card v-if="!isLoggedIn" class="loginbox">
      <q-field>
        <h1 class="q-title">로그인 테스트</h1>
        <div class="row">
          <q-input class="col-8" v-model="id" />
          <q-btn class="col-4" color="primary" @click="login()" label="로그인" />
        </div>
      </q-field>
    </q-card>
    <q-alert v-if="isLoggedIn" color="positive" icon="verified_user">
      <h1 class="q-title">{{ username + ' 회원님 환영합니다!' }}</h1>
      <p class="q-body-1">{{ seconds + '초 후에 메인으로 이동합니다.' }}</p>
    </q-alert>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  mounted () {
    // this.$store.commit('showcase/updateTheme', 'bluegreen')
  },
  methods: {
    login: async function () {
      try {
        const userInfo = await this.$login(this.id, this.password)
        if (userInfo) {
          console.log('SUCCESS: ', userInfo)
          this.$store.commit('showcase/setUserInfo', userInfo)
          this.isLoggedIn = true
          const { attributes } = await this.$getUserInfo()
          console.log('attributes: ', attributes)
          this.counter = setInterval(() => {
            this.seconds--
            if (this.seconds <= 0) {
              clearInterval(this.counter)
              this.$router.push('/')
            }
          }, 1000)
        }
      } catch (e) {
        console.log('ERROR: ', e)
        if (e === 'UserNotConfirmedException') {
          this.$store.commit('showcase/needConfirm', this.id)
          this.$router.push('confirm_email')
        } else if (e === 'UserNotFoundException') {
          this.$q.dialog({
            title: '어이쿠',
            message: '회원등록을 안하신 것 같아요!',
            color: 'negative',
            ok: true
          })
        }
      }
    }
  },
  computed: {
    username: {
      get () {
        return this.$store.state.showcase.userInfo.username
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.counter)
  },
  data () {
    return {
      id: '',
      password: '',
      isLoggedIn: false,
      seconds: 5,
      counter: null
    }
  }
}
</script>

<style lang="scss">
.loginbox {
  padding: 1em;
}
</style>
