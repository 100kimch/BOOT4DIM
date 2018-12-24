<template>
  <q-page padding>
    <q-card>
      <div class="bg"></div>
      <div class="profile">
        <img slot="left" :src="loginInfo.avatar" class="profile-image" />
        <div class="profile-info row">
          <span class="name q-display-1"> {{ loginInfo.label }} </span>
          <span class="sublabel col q-body-2"> kimjihyeong100 </span>
        </div>
        <div class="profile-description q-body-1">부트사차원 31기 정회원</div>
      </div>
      <q-card-main>
        <q-list>
          <q-collapsible default opened icon="explore" label="기본 정보">
            <ul>카카오톡 이메일: kimjihyeong100@gmail.com</ul>
            <ul>학번: 201000000</ul>
            <ul>학과: 전자전기공학과</ul>
            <ul>거주지: 서울시 광진구 화양동</ul>
            <ul>핸드폰: 010-000-0000</ul>
          </q-collapsible>
          <q-collapsible icon="explore" label="프로젝트 활동">
            <div>기본 정보입니다.</div>
          </q-collapsible>
          <q-collapsible icon="explore" label="글쓴 목록">
            <div>기본 정보입니다.</div>
          </q-collapsible>
        </q-list>
        <div class="option-box">
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
  data () {
    return {
      loginInfo: window.loginInfo
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
    background-image: url("../assets/profile_background.jpg");
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
    .option-box {
      text-align: right;
      margin-top: 0.5rem;
    }
  }
}
</style>
