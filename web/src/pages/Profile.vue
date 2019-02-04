<template>
  <q-page>
    <q-card>
      <div class="bg"></div>
      <div class="profile">
        <img slot="left" :src="userInfo.avatar ? userInfo.avatar : '/statics/profile_kjh.png'" class="profile-image" />
        <div class="profile-info row">
          <span class="name q-display-1"> {{ userInfo['name'] }} </span>
          <span class="sublabel col q-body-2"> {{ userInfo['email'] }} </span>
        </div>
        <div class="profile-description q-body-1">부트사차원 31기 정회원</div>
      </div>
      <q-card-main>
        <q-list>
          <q-collapsible default opened icon="explore" label="기본 정보">
            <ul>이메일: {{ userInfo['email'] }} ({{ userInfo['email_verified'] ? '인증됨' : '인증필요' }})</ul>
            <ul>학번: {{ userInfo['custom:univ_id'] }}</ul>
            <ul>학과: {{ userInfo['custom:univ_major'] }}</ul>
            <ul v-if="userInfo['address']">거주지: {{ userInfo['address'] }}</ul>
            <ul v-if="userInfo['phone_number']">핸드폰: {{ userInfo['phone_number'] }}</ul>
          </q-collapsible>
          <q-collapsible icon="developer_board" label="프로젝트 활동">
            <div>존재하지 않습니다.</div>
          </q-collapsible>
          <q-collapsible icon="create" label="글쓴 목록">
            <div>존재하지 않습니다.</div>
          </q-collapsible>
        </q-list>
        <div class="custom-option-box">
          <q-btn color="primary">수정하기</q-btn>
          <q-btn color="primary">탈퇴신청</q-btn>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  async mounted () {
    try {
      this.$q.loading.show()
      const user = await this.$getUserInfo()
      this.userInfo = user.attributes
      this.$q.loading.hide()
    } catch (err) {
      this.$q.notify({
        title: '어이쿠',
        message: '잘못 들어오셨네요.'
      })
    }
    // this.$store.commit('showcase/updateTheme', 'custom1')
  },
  data () {
    return {
      userInfo: {}
    }
  }
}
</script>

<style lang="scss">
.q-card {
  background: white;
  .bg {
    height: 10em;
    background-color: #63417a;
    background-image: url("/statics/profile_background.jpg");
    background-size: cover;
    z-index: -1;
  }
  .profile {
    margin-top: -5rem;
    z-index: 10;
    .profile-image {
      float: left;
      width: 7rem;
      height: 7rem;
      margin: 0 5vw 0 1rem;
      border-radius: 50%;
    }
    .profile-info {
      align-items: baseline;
      span {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &.name,
        &.sublabel {
          color: white;
          margin: 0;
          margin-top: 1.5rem;
        }
        &.name {
          line-height: 3.5rem;
          margin-right: 1rem;
        }
        &.sublabel {
          line-height: 1rem;
        }
      }
    }
    .profile-description {
      color: #666;
      line-height: 2rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .q-card-main {
    .custom-option-box {
      text-align: right;
      margin-top: 0.5rem;
    }
  }
}
</style>
