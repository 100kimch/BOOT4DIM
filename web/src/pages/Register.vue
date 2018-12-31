<template>
  <q-page padding>
    <h1 class="custom-title q-display-1">부트 부원 등록하기</h1>
    <q-stepper ref="stepper" vertical>
      <q-step title="부원 등록하기">
        <h2 class="q-title">부트 기존 부원 대상 웹사이트 계정 등록 절차입니다.</h2>
        <h3 class="q-body-1">이 페이지를 통해 회비 납부한 기존 부원 또는 졸업 선배분들만 등록하실 수 있으며, 신입 희망 시 신입지원 페이지를 이용해주시길 바랄게요!</h3>
        <q-stepper-navigation>
          <q-btn color="secondary" @click="$refs.stepper.next()" label="네 확인했습니다." />
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
  data () {
    return {
      formValue: {}
    }
  }
}
</script>

<style lang="scss">
.q-stepper {
  background: white;
}
.q-field {
  margin: 2em 0;
}
.q-btn + .q-btn {
  margin-left: 1em;
}
</style>
