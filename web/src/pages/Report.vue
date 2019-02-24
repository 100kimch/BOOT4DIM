<template>
  <q-page>
    <c-title title="오류 신고하기" />
    <q-stepper ref="stepper" vertical>
      <q-step title="안내">
        <h2 class="q-title">반갑습니다.</h2>
        <h3 class="q-body-1">부트사차원 웹서비스 개선 프로그램에 참여해주셔서 감사합니다. 다음을 눌러 오류를 신고해주세요.</h3>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.next()" label="신고하기" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="오류 유형 선택">
        <h2 class="q-title">오류에 관한 내용을 설명해 주세요.</h2>
        <q-input v-model="formValue.name" float-label="내용을 적어주세요." autofocus />
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="$refs.stepper.next()" label="다음" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="기본정보 입력">
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
  async created () {
    this.$store.commit('showcase/updateTheme', 'black')
  },
  data () {
    return {
      enableApply: true,
      formValue: {
        reportBody: null,
        id: null
      },
      // formValue: {
      //   name: null,
      //   SNSLogin: null,
      //   id: null,
      //   email: null,
      //   schoolNumber: null,
      //   major: null,
      //   birthdate: null,
      //   phone: null,
      //   address: null,
      //   motive: null,
      //   question: null,
      //   whattodoMultipleSelect: []
      // },
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
