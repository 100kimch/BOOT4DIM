<template>
  <q-page>
    <c-title title="이메일 인증" :noNavigation="true" />
    <q-alert v-if="!email.isConfirmed" class="confirmAlert" color="warning" icon="error_outline" flat>
      <h3 class="q-title">{{ email.msg }}</h3>
      <div class="row">
        <q-input v-model="email.code" class="col-auto" placeholder="인증 코드" />
        <q-btn flat class="col-2" @click="resendEmail()" label="재전송" />
        <q-btn flat class="col-2" @click="confirmEmail()" label="인증" />
      </div>
    </q-alert>
    <q-alert v-if="email.showMsgConfirmed" class="confirmAlert" color="positive" icon="check_circle_outline">
      <h3 class="q-title">인증되었어요. 감사합니다 :)</h3>
    </q-alert>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  created () {
    console.log('this.tempId: ', this.tempId)
    if (!this.tempId) {
      this.$router.go(-1)
    }
  },
  computed: {
    tempId: {
      get () {
        return this.$store.state.showcase.tempId
      }
    }
  },
  methods: {
    resendEmail: async function () {
      const msg = await this.$resendSignUp(this.tempId)
      if (msg) {
        this.email.msg = msg
      }
    },
    confirmEmail: async function () {
      const msg = await this.$confirmSignUp(this.tempId, this.email.code)
      if (msg) {
        this.email.msg = msg
      } else {
        this.email.showMsgConfirmed = true
        setTimeout(() => {
          this.email.showMsgConfirmed = false
          this.$router.push('/')
        }, 5000)
        this.email.isConfirmed = true
      }
    }
  },
  data () {
    return {
      email: {
        isConfirmed: false,
        showMsgConfirmed: false,
        msg: '이메일 확인 후 인증해주세요!',
        code: ''
      }
    }
  }
}
</script>

<style lang="scss">
.confirmAlert {
  * {
    color: black;
  }
  h3 {
    margin: 0.3em 0;
  }
  p {
    margin: 0em;
  }
  .q-input {
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #333 !important;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #333;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #333;
    }
    text-align: center !important;
  }
}
</style>
