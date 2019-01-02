<template>
  <q-page padding>
    <!-- content -->
    <div class="custom-box">
      <h1 class="custom-title q-display-1">공지사항</h1>
    </div>
    <c-card-list :contents="contents"></c-card-list>
  </q-page>
</template>

<script>
import CCardList from '../components/CCardList.vue'

export default {
  name: 'page-notice',
  components: {
    CCardList
  },
  computed: {
    reversedContents: function () {
      return this.contents.slice().reverse()
    }
  },
  data () {
    return {
      contents: [
        {
          title: '새로운 프로젝트가 시작되었습니다!',
          date: new Date('2018-09-03'),
          numIssue: 0,
          contributor: {
            label: '김지형',
            avatar: 'assets/profile_kjh.png',
            email: '100kimch@naver.com'
          },
          isModifying: false,
          isLike: false,
          themeColor: false,
          headerImgSrc: '',
          numLikes: 3,
          numComments: 10,
          showComments: false,
          body: 'hello',
          newCommentBody: '',
          comments: [
            {
              date: new Date('2018-11-09'),
              writer: {
                label: '김기리',
                avatar: 'assets/profile_kjh.png',
                email: 'oioi@naver.com'
              },
              body: ['안녕하세요']
            },
            {
              date: new Date('2018-11-09'),
              writer: {
                label: '김지형',
                avatar: 'assets/profile_kjh.png',
                email: '100kimch@naver.com'
              },
              body: ['안녕하세요']
            },
            {
              date: new Date('2018-11-09'),
              writer: {
                label: '이한울',
                avatar: 'assets/profile_kjh.png',
                email: 'kim@naver.com'
              },
              body: ['안녕하세요']
            },
            {
              date: new Date('2018-11-10'),
              writer: {
                label: '김지형',
                avatar: 'assets/profile_kjh.png',
                email: '100kimch@naver.com'
              },
              body: ['댓글 시험중입니다.']
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
</style>
