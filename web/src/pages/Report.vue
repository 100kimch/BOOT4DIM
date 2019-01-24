<template>
  <q-page padding>
    <h1 class="custom-title q-display-1">오류 신고하기</h1>
    <q-stepper ref="stepper" vertical>
      <q-step title="환영합니다">
        <h2 class="q-title">부트사차원 신입부원 모집기간입니다!</h2>
        <h3 class="q-body-1">열정적이고 성실한 부트사차원 예비부원들의 많은 지원 바라고 있어요!</h3>
        <q-stepper-navigation>
          <q-btn color="secondary" @click="$refs.stepper.next()" label="지원하기!" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="가입방법 선택">
        <h2 class="q-title">카카오 계정에 로그인해주세요!</h2>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="$refs.stepper.next()" label="다음" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="기본정보 입력">
        <q-field icon="face">
          <q-input v-model="formValue.name" float-label="이름" autofocus />
          <q-input v-model="formValue.schoolNumber" type="number" float-label="학번" />
          <q-input v-model="formValue.major" float-label="학과" />
          <q-datetime type="date" default-value="1995-01-01" v-model="formValue.birthdate" float-label="생년월일" />
          <q-input type="tel" v-model="formValue.phone" float-label="전화번호" />
          <q-input v-model="formValue.address" float-label="거주지" />
        </q-field>
        <q-field label="부트사차원에서 하고싶은 것(모두 선택해주세요)">
          <q-select :display-value="selectMultipleText(formValue.whattodoMultipleSelect)" multiple v-model="formValue.whattodoMultipleSelect" :options="listOptions.whattodo" />
        </q-field>
        <q-field label="가입하게 된 경로">
          <q-input v-model="formValue.motive" label="예시) 부트 사람의 권유 / 동기의 권유 / 모집공고 포스터 / 홈페이지 등" />
        </q-field>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="$refs.stepper.next()" label="다음" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  mounted () {
    this.$store.commit('showcase/updateDarkenTheme', false)
  },
  data () {
    return {
      enableApply: true,
      formValue: {
        name: null,
        SNSLogin: null,
        id: null,
        email: null,
        schoolNumber: null,
        major: null,
        birthdate: null,
        phone: null,
        address: null,
        motive: null,
        question: null,
        whattodoMultipleSelect: []
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
  methods: {
    selectMultipleText: function (array) {
      return `${array.length ? array.length + '개 선택되었어요.' : '선택된 것이 없어요!'}`
    },
    resetValue: function (parent, element) {
      if (typeof (parent[element]) === 'object') {
        parent[element] = []
      } else {
        parent[element] = ''
      }
    },
    sendFormValue: function () {
      // console.log(this.formValue)
      this.$router.push('/projects/sample')
    }
  }
}
</script>

<style>
</style>
