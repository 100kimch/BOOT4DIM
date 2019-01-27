<template>
  <q-page>
    <c-title title="지원하기" />
    <q-stepper v-if="enableApply" ref="stepper" vertical>
      <q-step title="환영합니다">
        <h2 class="q-title">부트사차원 신입회원 모집기간입니다!</h2>
        <h3 class="q-body-1">열정적이고 성실한 부트사차원 예비회원들의 많은 지원 바라고 있어요!</h3>
        <q-stepper-navigation>
          <q-btn color="secondary" @click="$refs.stepper.next()" label="지원하기!" />
          <q-btn color="secondary" @click="$signUp(formValue)" label="테스트" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="가입방법 선택">
        <h2 class="q-body-2">카카오 계정에 로그인해주세요!</h2>
        <c-login-btn type="kakao" dense></c-login-btn>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="$refs.stepper.next()" label="다음" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="기본정보 입력">
        <q-field>
          <q-input v-model.trim="formValue.username" @blur="$v.formValue.username.$touch" :error="$v.formValue.username.$error" float-label="이름" autofocus />
          <div class="error" v-if="$v.formValue.username.$dirty && !$v.formValue.username.required" color="negative">실명을 적어주세요.</div>
          <q-input v-model.trim="formValue.email" type="email" @blur="$v.formValue.email.$touch" :error="$v.formValue.email.$error" float-label="이메일" />
          <div class="error" v-if="$v.formValue.email.$dirty && !$v.formValue.email.required" color="negative">이메일을 적어주세요.</div>
          <div class="error" v-if="$v.formValue.email.$dirty && !$v.formValue.email.email" color="negative">이메일 형식이 아닙니다.</div>
          <q-input v-model.trim="formValue.univ_id" @blur="$v.formValue.univ_id.$touch" :error="$v.formValue.univ_id.$error" float-label="학번" />
          <div class="error" v-if="$v.formValue.univ_id.$dirty && !$v.formValue.univ_id.required" color="negative">학번을 적어주세요.</div>
          <q-input v-model.trim="formValue.univ_major" @blur="$v.formValue.univ_major.$touch" :error="$v.formValue.univ_major.$error" float-label="학과" />
          <div class="error" v-if="$v.formValue.univ_major.$dirty && !$v.formValue.univ_major.required" color="negative">학과를 적어주세요.</div>
          <q-datetime v-model.trim="formValue.birthdate" @blur="$v.formValue.birthdate.$touch" :error="$v.formValue.birthdate.$error" type="date" default-value="1995-01-01" float-label="생년월일" />
          <div class="error" v-if="$v.formValue.birthdate.$dirty && !$v.formValue.birthdate.required" color="negative">생일을 적어주세요.</div>
          <q-input v-model.trim="formValue.phone_number" type="tel" @blur="$v.formValue.phone_number.$touch" :error="$v.formValue.phone_number.$error" float-label="핸드폰번호" />
          <div class="error" v-if="$v.formValue.phone_number.$dirty && !$v.formValue.phone_number.required" color="negative">휴대폰번호를 적어주세요.</div>
          <q-input v-model.trim="formValue.address" @blur="$v.formValue.address.$touch" :error="$v.formValue.address.$error" float-label="거주지" />
          <div class="error" v-if="$v.formValue.address.$dirty && !$v.formValue.address.required" color="negative">주소를 적어주세요.</div>
        </q-field>
        <q-field label="부트사차원에서 하고싶은 것(모두 선택해주세요)">
          <q-select :display-value="selectMultipleText(value_hope)" multiple v-model="value_hope" :options="listOptions.whattodo" />
        </q-field>
        <q-field label="가입하게 된 경로">
          <q-input v-model="formValue.motive" label="예시) 부트 사람의 권유 / 동기의 권유 / 모집공고 포스터 / 홈페이지 등" />
        </q-field>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn :color="$v.$invalid?'primary':'secondary'" @click="sendFormValue()" :loading="loading.sendFormValue" :disable="$v.$invalid" :label="$v.$invalid ?'수정이 필요합니다.':'다음'" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="완료">
        <h2 class="q-title">지원해주셔서 감사합니다 :)</h2>
        <h3 class="q-body-1">작성해주신 내용을 확인 후 핸드폰 번호로 연락드릴게요~</h3>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="$signUp(formValue)" label="완료" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <q-stepper v-if="!enableApply" class="custom-box">
      <h1 class="q-display-1">
        <span>가입 신청기간이 </span>
        <span>아닙니다.</span>
      </h1>
    </q-stepper>
  </q-page>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  // name: 'PageName',
  mounted () {
    this.$store.commit('showcase/updateTheme', 'brown')
  },
  methods: {
    selectMultipleText: function (array) {
      // IMPORTANT: (temporary) set data to hope field
      let hope = ''
      for (let str in array) {
        hope += str + ','
      }
      this.formValue.hope = hope
      // console.log('changed')
      return `${array.length ? array.length + '개 선택되었어요.' : '선택된 것이 없어요!'}`
    },
    resetValue: function (parent, element) {
      if (typeof (parent[element]) === 'object') {
        parent[element] = []
      } else {
        parent[element] = ''
      }
    },
    sendConrifmCode: function (code) {
      this.$auth.signUp(this.formValue.username, code)
    },
    sendFormValue: async function () {
      this.loading.sendFormValue = true
      let hasError = await this.$signUp(this.formValue)
      this.loading.sendFormValue = false
      if (hasError) {
        console.log('failed..', hasError)
      } else {
        console.log('success!', hasError)
        this.$refs.stepper.next()
      }
      // this.$router.push('/projects/sample')
    },
    show: (value) => {
      console.log(value)
    }
  },
  data () {
    return {
      enableApply: true,
      signUpConfig: null,
      value_hope: [],
      loading: {
        sendFormValue: false
      },
      formValue: {
        address: '',
        birthdate: '',
        email: '',
        hope: '[]',
        motive: '',
        password: 'Test0123!',
        phone_number: '',
        picture: '',
        profile: '',
        snsLogin: 'kakao',
        univ_id: '',
        univ_major: '',
        updated_at: new Date().toISOString(),
        username: ''
      },
      listOptions: {
        whattodo: [
          { label: '좋은 사람들과 친목 도모', value: '1' },
          { label: '하드웨어 스터디', value: '2' },
          { label: '소프트웨어 스터디', value: '3' },
          { label: '인공지능(머신러닝, 딥러닝) 스터디', value: '4' },
          { label: '전기/전자분야 공모전', value: '5' },
          { label: '해커톤/코딩', value: '6' },
          { label: '전공 공부', value: '7' },
          { label: '다양한 과 사람들과 시너지를 낼 수 있는 활동', value: '8' }
        ]
      }
    }
  },
  validations: {
    formValue: {
      address: {},
      birthdate: {},
      email: { required, email },
      // hope: { required },
      // motive: { required },
      phone_number: { required },
      univ_id: {
        required,
        minLength: minLength(9),
        maxLength: maxLength(9)
      },
      univ_major: {
        required,
        minLength: minLength(4)
      },
      username: { required, minLength: minLength(2) }
    }
  }
}
</script>

<style lang="scss">
// .q-alert {
//   p:first-child {
//     margin-bottom: 0.25em;
//   }
//   p:last-child {
//     margin: 0;
//   }
// }
.q-btn + .q-btn {
  margin-left: 1em;
}
.error {
  color: var(--q-color-negative);
  font-size: 0.8em;
  line-height: 2em;
}
</style>
