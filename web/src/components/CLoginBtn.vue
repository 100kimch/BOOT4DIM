<template>
  <q-card v-if="type==='kakao'" :class="{'dense': dense }" @click.native="loginWithKakao">
    <img src="/statics/kakao_logo.png" />
    <h1>카카오계정으로 로그인</h1>
  </q-card>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    'type': String,
    'dense': Boolean,
    'creator': Boolean
  },
  mounted () {
    // console.log(this.type, this.dense)
  },
  methods: {
    loginWithKakao: async function () {
      this.pinNumber = null
      this.$q.loading.show()
      // console.log('kakaoLogin(): ', window.Kakao)
      try {
        setTimeout(() => {
          this.$q.loading.hide()
        }, 3000)
        await this.$store.dispatch('showcase/kakaoLoginWithInfo')

        if (this.creator) {
          let valid = false
          while (!valid) {
            this.pinNumber = await this.$q.dialog({
              title: 'PIN 번호 생성',
              message: '로그인 시 이용할 PIN 번호 6자리를 입력해 주세요.',
              ok: true,
              cancel: true,
              prompt: {
                model: this.pinNumber,
                type: 'password'
              }
            })
            console.log('pinNumber: ', this.pinNumber, this.pinNumber.length === 6)
            if (this.pinNumber >= 0 && this.pinNumber < 1000000 && this.pinNumber.length === 6) {
              valid = true
            } else {
              await this.$q.dialog({
                color: 'negative',
                message: '6자리의 숫자 PIN 번호를 입력해주세요.'
              })
            }
          }

          valid = false

          while (!valid) {
            let num = await this.$q.dialog({
              title: 'PIN 번호 확인',
              message: '다시한번 PIN 번호를 입력해 주세요.',
              ok: true,
              cancel: true,
              prompt: {
                model: '',
                type: 'password'
              }
            })

            if (num === this.pinNumber) {
              this.$store.commit('showcase/setPinNumber', this.pinNumber)
              valid = true
            } else {
              await this.$q.dialog({
                color: 'negative',
                message: 'PIN 번호가 맞지 않습니다.'
              })
            }
          }
        } else {
          this.pinNumber = await this.$q.dialog({
            title: 'PIN 번호',
            message: 'PIN 번호를 입력해 주세요.',
            ok: true,
            cancel: true,
            prompt: {
              model: this.pinNumber,
              type: 'password'
            }
          })
          this.$store.commit('showcase/setPinNumber', this.pinNumber)
        }

        this.$q.notify({
          color: 'positive',
          message: '카카오로 로그인했어요.'
        })
        this.$emit('login', true)
      } catch (e) {
        console.error('kakaoInfo Error: ', e)

        let msg = ''
        if (e.type === 'access_denied') {
          msg = '카카오 계정접근 동의를 취소하셨네요.'
        } else if (e.type === 'unauthorized') {
          msg = '서버에 문제가 있으니 운영자한테 "10번 에러"라고 알려주세요.'
        } else if (e.code !== -900) {
          msg = '서버에 문제가 있으니 운영자한테 "11번 에러"라고 알려주세요.'
        } else {
          msg = '카카오 로그인에 실패하였어요.'
        }

        this.$q.notify({
          color: 'negative',
          message: msg
        })

        this.$emit('login', false)
      } finally {
        // this.$q.loading.hide()
      }
    }
  },
  data () {
    return {
      pinNumber: null
    }
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  // padding: 0 calc(50% - 50px - 6rem);
  padding: 0 2rem;
  background: #ffeb00;
  cursor: pointer;
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
  padding: 0 calc(50% - 25px - 6rem);
  img {
    width: 50px;
    height: 50px;
  }
  h1 {
    font-size: 1rem;
    line-height: 50px;
    text-align: center;
  }
}
</style>
