<template>
  <q-page>
    <c-title title="로그인" :noNavigation="true" />
    <c-login-btn v-if="!isLoggedIn" type="kakao" @login="onLoginTest($this, $event)"></c-login-btn>
    <!-- <q-card v-if="!isLoggedIn" class="loginbox">
      <q-field>
        <h1 class="q-title">로그인 테스트</h1>
        <div class="row">
          <q-btn class="col-4" color="primary" @click="loginWithKakao()" label="로그인" />
        </div>
      </q-field>
    </q-card> -->
    <q-alert v-if="isLoggedIn" color="positive" icon="verified_user">
      <h1 class="q-title">{{ userInfo.name + ' 회원님 환영합니다!' }}</h1>
      <p class="q-body-1">{{ seconds + '초 후에 메인으로 이동합니다.' }}</p>
    </q-alert>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  created () {
    // this.$store.commit('showcase/updateTheme', 'bluegreen')
    this.$this = this
  },
  methods: {
    loginWithKakao: async function () {
      this.$q.loading.show()
      try {
        await this.$store.dispatch('showcase/kakaoLogin')
      } catch (e) {
        console.error('error on loginWithKakao(): ', e)
      } finally {
        this.$q.loading.hide()
      }
    },
    onLoginTest: async ($this, $event) => {
      $this.$q.loading.show()
      setTimeout(() => {
        $this.$q.loading.hide()
      }, 3000)

      try {
        // console.log('trying: ', snsUserInfo.username, $this.pinNumber)
        const userInfo = await $this.$login('1033198031', 110403)
        // const userInfo = await $this.$login(snsUserInfo.username, $this.pinNumber)
        if (userInfo) {
          console.log('SUCCESS: ', userInfo)

          const { attributes } = await $this.$getUserInfo()
          // console.log('attributes: ', attributes)
          await $this.$store.commit('showcase/setUserInfo', attributes)

          $this.$q.loading.hide()
          $this.isLoggedIn = true

          $this.counter = setInterval(() => {
            $this.seconds--
            if ($this.seconds <= 0) {
              clearInterval($this.counter)
              $this.$router.push('/')
            }
          }, 1000)
        }
      } catch (e) {
        console.error('ERROR: ', e)
        if (e === 'UserNotConfirmedException') {
          await $this.$store.commit('showcase/needConfirm', '1033198031')
          $this.$router.push('/confirm_email')
        } else if (e === 'UserNotFoundException') {
          $this.$q.dialog({
            title: '어이쿠',
            message: '회원등록을 안하신 것 같아요!',
            color: 'negative',
            ok: true
          })
        }
      }
    },
    onLogin: async ($this, $event) => {
      $this.$q.loading.show()
      setTimeout(() => {
        $this.$q.loading.hide()
      }, 3000)

      if (!$event) return

      const snsUserInfo = $this.$store.state.showcase.snsUserInfo
      // console.log('snsUserInfo on Login: ', snsUserInfo, $this.isSNSLogined)
      if (!snsUserInfo) return

      $this.isSNSLogined = true

      try {
        // console.log('trying: ', snsUserInfo.username, $this.pinNumber)
        // const userInfo = await $this.$login('1033198031', 'bnqUzBT2Z9lGH11lW41cuvWiFElpJ0rRE4G9owopdaYAAAFpI4SGJQ')
        const userInfo = await $this.$login(snsUserInfo.username, $this.pinNumber)
        if (userInfo) {
          console.log('SUCCESS: ', userInfo)

          const { attributes } = await $this.$getUserInfo()
          // console.log('attributes: ', attributes)
          await $this.$store.commit('showcase/setUserInfo', attributes)

          $this.$q.loading.hide()
          $this.isLoggedIn = true

          $this.counter = setInterval(() => {
            $this.seconds--
            if ($this.seconds <= 0) {
              clearInterval($this.counter)
              $this.$router.push('/')
            }
          }, 1000)
        }
      } catch (e) {
        console.error('ERROR: ', e)
        if (e === 'UserNotConfirmedException') {
          // TODO: change $this.id  && await
          await $this.$store.commit('showcase/needConfirm', $this.id)
          $this.$router.push('/confirm_email')
        } else if (e === 'UserNotFoundException') {
          $this.$q.dialog({
            title: '어이쿠',
            message: '회원등록을 안하신 것 같아요!',
            color: 'negative',
            ok: true
          })
        }
      }
    },
    login: async function () {
      try {
        this.$q.loading.show()
        const userInfo = await this.$login(this.id, this.password)
        if (userInfo) {
          // console.log('SUCCESS: ', userInfo)

          const { attributes } = await this.$getUserInfo()
          // console.log('attributes: ', attributes)
          await this.$store.commit('showcase/setUserInfo', attributes)

          this.$q.loading.hide()
          this.isLoggedIn = true

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
    userInfo: {
      get () {
        return this.$store.state.showcase.userInfo
      }
    },
    userToken: {
      get () {
        return this.$store.state.showcase.snsUserToken.access_token
      }
    },
    pinNumber: {
      get () {
        return this.$store.state.showcase.pinNumber
      }
    }
  },
  beforeDestroy () {
    if (this.counter) {
      clearInterval(this.counter)
    }
  },
  data () {
    return {
      $this: null,
      isSNSLogined: false,
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
