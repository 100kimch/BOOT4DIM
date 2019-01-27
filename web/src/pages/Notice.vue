<template>
  <q-page>
    <c-title title="공지사항" />
    <q-card bg-color="secondary" color="teal">
      <q-card-title>토픽 별로 찾기</q-card-title>
      <q-card-main>
        <div class="finder col row items-center">
          <div class="q-chip row no-wrap inline items-center q-chip-small text-white bg-primary" :class="{'selected': topic === selectedTopic}" :key="index" v-for="(topic, index) in topics" @click="onClickTopic(topic)">{{topic || '' }}</div>
        </div>
        <!-- <q-chips-input class="finder" v-model="topics" readonly hide-underline @click.native="onClickTopic" /> -->
        <p v-if="selectedTopic" class="q-body-1 q-mt-md q-mb-none">{{ selectedTopic }}을(를) 선택하셨습니다.</p>
      </q-card-main>
    </q-card>
    <q-card>
      <q-tabs v-model="selectedTab" inverted>
        <q-tab label="관리자 메뉴" readonly disable slot="title" />
        <q-tab name="tabNewData" icon="event_note" label="글쓰기" slot="title" />
        <q-tab name="tabManagement" icon="comment" label="최근 댓글" slot="title" />

        <q-tab-pane name="tabNewData">
          <q-input v-model="newData.title" type="text" float-label="제목" />
          <q-chips-input v-model="newData.topic" float-label="토픽">
            <q-autocomplete @search="searchTopic" @selected="selectSearch" />
          </q-chips-input>
          <q-input v-model="newData.body" type="textarea" float-label="내용" :max-height="7" rows="7" />
          <q-field align="right">
            <q-btn color="primary" @click="resetNewContent()" label="취소" />
            <q-btn color="secondary" @click="saveNewContent()" label="저장" />
          </q-field>
        </q-tab-pane>
        <q-tab-pane name="tabManagement" class="darken">
          <h3 class="q-body-2">준비중입니다.</h3>
        </q-tab-pane>
      </q-tabs>
    </q-card>
    <c-card-list :contents="reversedContents"></c-card-list>
  </q-page>
</template>

<script>
export default {
  name: 'page-notice',
  mounted () {
    this.$store.commit('showcase/updateDarkenTheme', false)
  },
  computed: {
    reversedContents: function () {
      return this.contents.slice().reverse()
    }
  },
  methods: {
    resetNewContent: function () {
      this.selectedTab = null
      this.newData.title = null
      this.newData.body = null
    },
    saveNewContent: function () {
      const date = new Date()
      this.contents.push({
        body: this.newData.body || '내용이 없습니다.',
        comments: [],
        contributor: this.$loginInfo,
        date: date,
        headerImgSrc: '',
        isLike: false,
        isModifying: false,
        newCommentBody: '',
        numComments: 0,
        numIssue: 0,
        numLikes: 0,
        showComments: false,
        themeColor: false,
        title: this.newData.title || '무제'
      })
      // this.notifications.push({
      //   label: this.$loginInfo.label + '님이 새 글을 작성하였습니다:',
      //   sublabel: this.newData.title || '무제',
      //   date: date,
      //   avatar: this.$loginInfo.avatar
      // })
      this.resetNewContent()
      console.log('httpRequest')
    },
    searchTopic: function (terms, done) {
      done([
        {
          value: '정회원',
          label: '정회원'
        }
      ])
    },
    selectSearch: function () {

    },
    onClickTopic: function (topic) {
      // const topicString = content.srcElement.innerText
      if (topic) {
        if (this.selectedTopic === topic) {
          this.selectedTopic = ''
        } else {
          this.selectedTopic = topic
        }
      }
    }
  },
  data () {
    return {
      selectedTab: null,
      newData: {
        title: '',
        body: '',
        topic: []
      },
      topics: ['신입회원', '공모전'],
      selectedTopic: '',
      contents: [
        {
          body: 'hello',
          comments: [{
            body: ['안녕하세요'],
            date: new Date('2018-11-09'),
            writer: {
              avatar: 'statics/profile_kjh.png',
              email: 'oioi@naver.com',
              label: '김기리'
            }
          }, {
            body: ['안녕하세요'],
            date: new Date('2018-11-09'),
            writer: {
              avatar: 'statics/profile_kjh.png',
              email: '100kimch@naver.com',
              label: '김지형'
            }
          }, {
            body: ['안녕하세요'],
            date: new Date('2018-11-09'),
            writer: {
              avatar: 'statics/profile_kjh.png',
              email: 'kim@naver.com',
              label: '이한울'
            }
          }, {
            body: ['댓글 시험중입니다.'],
            date: new Date('2018-11-10'),
            writer: {
              avatar: 'statics/profile_kjh.png',
              email: '100kimch@naver.com',
              label: '김지형'
            }
          }],
          contributor: {
            avatar: 'statics/profile_kjh.png',
            email: '100kimch@naver.com',
            label: '김지형'
          },
          date: new Date('2018-09-03'),
          headerImgSrc: '',
          isLike: false,
          isModifying: false,
          newCommentBody: '',
          numComments: 10,
          numIssue: 0,
          numLikes: 3,
          showComments: false,
          themeColor: false,
          title: '새로운 프로젝트가 시작되었습니다!',
          topic: []
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.finder {
  .q-chip {
    margin: 0 0.5rem;
    transition: all 0.5s;
  }
  .q-chip.selected {
    border: 2px solid var(--q-color-primary) !important;
    transform: scale(1.2);
    background: white !important;
    color: var(--q-color-primary) !important;
  }
}
</style>
