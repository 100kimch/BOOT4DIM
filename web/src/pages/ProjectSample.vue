<template>
  <q-page padding>
    <c-navigation />
    <q-jumbotron dark :img-src="'/assets/boot_project_boot4dust.jpg'">
      <h2 class="q-body-2">프로젝트</h2>
      <h1 class="q-display-2">{{ project.name }}</h1>
      <hr class="q-hr q-my-lg">
      <div class="q-subheading">{{ project.description }}</div>
    </q-jumbotron>
    <q-card>
      <q-list highlight>
        <q-list-header>최근 활동</q-list-header>
        <q-item :key="index" v-for="(notification, index) in reversedNotifications">
          <q-item-side>
            <q-item-tile avatar>
              <img :src="notification.avatar" alt="Profile Image">
            </q-item-tile>
          </q-item-side>
          <q-item-main>
            <q-item-tile label>{{ notification.label }}</q-item-tile>
            <q-item-tile v-if="notification.sublabel" sublabel>{{ notification.sublabel }}</q-item-tile>
          </q-item-main>
          <q-item-side right>{{ $timeSince(notification.date) }}</q-item-side>
        </q-item>
      </q-list>
    </q-card>
    <q-card>
      <q-list>
        <q-list-header>앨범</q-list-header>
        <div class="custom-album-box">
          <div>
            <q-card class="picture" inline :key="index" v-for="(picture, index) in project.pictures">
              <a @click="openPictureDetail(picture, index)">
                <q-card-media overlay-position="bottom">
                  <img :src="picture.src" />
                  <q-card-title v-if="picture.title" slot="overlay">
                    {{ picture.title }}
                  </q-card-title>
                </q-card-media>
              </a>
            </q-card>
          </div>
        </div>
        <q-modal class="custom-picture-detail" v-model="pictureVisible">
          <q-modal-layout header-style="min-height: 2em">
            <q-toolbar slot="header">
              <q-btn flat round icon="arrow_back" @click="pictureVisible=false" />
              <q-toolbar-title>사진</q-toolbar-title>
            </q-toolbar>
            <q-carousel v-model="pictureSlide" color="white" arrows infinite>
              <q-carousel-slide class="flex flex-center bg-black text-white" :key="`pic-${index}`" v-for="(picture, index) in project.pictures">
                <img :src="picture.src" />
              </q-carousel-slide>
            </q-carousel>
            <amplify-photo-picker v-bind:photoPickerConfig="photoPickerConfig" header="'사진 추가'" path="'/test'" accept="'image/*'"></amplify-photo-picker>
            <q-card class="text-black">
              <h1 class="q-display-1">{{ pictureDetail.title }}</h1>
              <h2 class="q-body-2 text-gray">{{ pictureDetail.date }}</h2>
              <p class="q-body-1">{{ pictureDetail.body }}</p>
              <q-item :key="index" v-for="(comment, index) in pictureDetail.comments">
                <q-item-side>
                  <q-item-tile avatar>
                    <img :src="comment.writer.avatar" alt="Profile Image">
                  </q-item-tile>
                </q-item-side>
                <q-item-main>
                  <q-item-tile label>{{ comment.body }}</q-item-tile>
                  <q-item-tile v-if="comment.writer.label" sublabel>{{ comment.writer.label }}</q-item-tile>
                </q-item-main>
                <q-item-side right>{{ $timeSince(comment.date) }}</q-item-side>
              </q-item>
            </q-card>
          </q-modal-layout>
        </q-modal>
      </q-list>
    </q-card>
    <q-card>
      <q-list>
        <q-collapsible icon="explore" label="개요" opened>
          <ul>
            <li>기간: {{ startDate + ' ~ ' + endDate }}</li>
            <li>장소: {{ project.place }}</li>
            <li>예산: {{ (parseInt(project.fixedBudget)/10000).toLocaleString() + '만원' }}</li>
            <li>인원: {{ project.personnel + '명' }}</li>
          </ul>
        </q-collapsible>
        <q-collapsible icon="people" label="기여자" opened>
          <q-list highlight>
            <q-item :key="index" v-for="(contributor, index) in project.contributors">
              <q-item-side>
                <q-item-tile avatar>
                  <img :src="contributor.avatar" alt="Profile Image">
                </q-item-tile>
              </q-item-side>
              <q-item-main>
                <q-item-tile label>{{ contributor.label }}</q-item-tile>
                <q-item-tile sublabel>{{ contributor.email }}</q-item-tile>
              </q-item-main>
              <q-item-side right>{{ contributor.position }}</q-item-side>
            </q-item>
            <q-item @click.native="addTeammate()">
              <q-item-side>
                <q-item-tile icon="person_add" avatar> </q-item-tile>
              </q-item-side>
              <q-item-main>
                <q-item-tile label>팀원 추가하기</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-collapsible>
        <q-collapsible icon="forum" label="프로젝트 후기">
          <q-chat-message name="김지형" :avatar="comment.avatar" bg-color="grey-3" :text="comment.body" :key="index" v-for="(comment, index) in project.comments" />
        </q-collapsible>
        <q-collapsible icon="attach_money" label="지원 현황">
          <q-list>
            <q-item :key="index" v-for="(support, index) in project.supports">
              <q-item-main>
                <q-item-tile label>{{ support.label }}</q-item-tile>
                <q-item-tile sublabel>{{ support.sublabel }}</q-item-tile>
              </q-item-main>
              <q-item-side right>{{ support.status }}</q-item-side>
            </q-item>
            <q-item @click.native="addTeammate()">
              <q-item-side>
                <q-item-tile icon="money" avatar> </q-item-tile>
              </q-item-side>
              <q-item-main>
                <q-item-tile label>추가지원 요청</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-collapsible>
      </q-list>
    </q-card>
    <q-card v-if="isManager" color="teal">
      <q-list>
        <q-item class="row q-py-none">
          <q-item-side class="col-5 q-pa-xs">
            <img class="full-width" src="~assets/icon_project.jpg" />
          </q-item-side>
          <q-item-main class="col">
            <h1 class="q-title">프로젝트 매니저님 안녕하세요!</h1>
            <q-btn color="primary" class="full-width" label="프로젝트 관리하기" @click.native="projectSettingsVisible = true" />
          </q-item-main>
        </q-item>
      </q-list>
      <q-modal v-model="projectSettingsVisible">
        <q-modal-layout header-style="min-height: 2em">
          <q-toolbar slot="header">
            <q-btn flat round icon="arrow_back" @click="projectSettingsVisible=false" />
            <q-toolbar-title>프로젝트 관리</q-toolbar-title>
          </q-toolbar>
          <q-list link>
            <q-list-header>진행현황</q-list-header>
            <q-item>
              <q-item-side icon="hourglass_empty" />
              <q-item-main>
                <q-select hide-underline class="q-ma-none full-width" v-model="project.status" :options="options.status" />
              </q-item-main>
            </q-item>
            <q-item v-if="project.status > 2">
              <q-item-main>
                <q-item-tile label>프로젝트 후기 관리</q-item-tile>
                <q-item-tile sublabel>프로젝트 후기를 작성합니다.</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item-separator />
            <q-item>
              <q-item-main>
                <q-item-tile label>최근 활동 내역</q-item-tile>
                <q-item-tile sublabel>최근 활동 내역을 관리합니다.</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item-separator />
            <q-list-header>기본설정</q-list-header>
            <q-item>
              <q-item-main>
                <q-item-tile label>개요</q-item-tile>
                <q-item-tile sublabel>초기 설정을 통해 입력된 개요입니다.</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <q-item-tile label>기여자(팀원)</q-item-tile>
                <q-item-tile sublabel>프로젝트에 참여한 팀원 목록입니다.</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <q-item-tile label>지원 현황</q-item-tile>
                <q-item-tile sublabel>부트사차원으로부터 지원받은 현황입니다.</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <q-item-tile label>지원 현황</q-item-tile>
                <q-item-tile sublabel>본 프로젝트가 부트사차원으로부터 지원받은 현황입니다.</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item-separator />
            <q-list-header>고급설정</q-list-header>
            <q-item>
              <q-item-main>
                <q-item-tile label>깃허브 연동</q-item-tile>
                <q-item-tile sublabel>깃허브 프로젝트와 연동합니다.</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <q-item-tile label>앨범 관리</q-item-tile>
                <q-item-tile sublabel>앨범을 관리합니다.</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item-separator />
            <q-list-header>꾸미기</q-list-header>
            <q-item link tag="label">
              <q-item-main>
                <q-item-tile label>고유색상 설정</q-item-tile>
                <q-item-tile sublabel>본 프로젝트만의 고유한 색상 설정이 가능합니다.</q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-toggle v-model="project.themeColor" />
              </q-item-side>
            </q-item>
            <q-item link tag="label">
              <q-item-main>
                <q-item-tile label>배경 이미지</q-item-tile>
                <q-item-tile sublabel>본 프로젝트를 상징하는 배경이미지를 넣어주세요.</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-modal-layout>
      </q-modal>
    </q-card>
    <q-card>
      <q-tabs v-model="selectedTab" inverted>
        <q-tab name="tabNewData" icon="event_note" label="글쓰기" slot="title" />
        <q-tab name="tabTeamNote" icon="person_pin" label="개인 노트" slot="title" />
        <q-tab name="tabGithub" icon="code" label="깃허브 연결" slot="title" />

        <q-tab-pane name="tabNewData">
          <q-input v-model="newData.title" type="text" float-label="제목" />
          <q-input v-model="newData.body" type="textarea" float-label="내용" :max-height="7" rows="7" />
          <div class="custom-btn-box">
            <q-btn color="primary" @click="resetNewContent()" label="취소" />
            <q-btn color="secondary" @click="saveNewContent()" label="저장" />
          </div>
        </q-tab-pane>
        <q-tab-pane name="tabTeamNote">
          <q-item link @click.native="openTeamNoteDetail(teamNote)" :key="index" v-for="(teamNote, index) in project.teamNotes">
            <q-item-side>
              <q-item-tile icon="note"></q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>{{ teamNote.title }}</q-item-tile>
              <q-item-tile sublabel>{{ teamNote.body }}</q-item-tile>
            </q-item-main>
            <q-item-side right>{{ $timeSince(teamNote.date) }}</q-item-side>
          </q-item>
          <q-item link @click.native="openTeamNoteDetail()">
            <q-item-side>
              <q-item-tile icon="note_add"></q-item-tile>
            </q-item-side>
            <q-item-main>기록 추가하기</q-item-main>
          </q-item>
          <q-modal v-model="teamNoteDetail.visible">
            <q-modal-layout header-style="min-height: 2em">
              <q-toolbar slot="header">
                <q-btn flat round icon="arrow_back" @click="teamNoteDetail.visible=false" />
                <q-toolbar-title>개인 노트</q-toolbar-title>
              </q-toolbar>
              <q-card>
                <q-item link @click.native="openTeamNoteDetail(teamNote)" :key="index" v-for="(teamNote, index) in project.teamNotes">
                  <q-item-side>
                    <q-item-tile icon="note"></q-item-tile>
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>{{ teamNote.title }}</q-item-tile>
                    <q-item-tile sublabel>{{ teamNote.body }}</q-item-tile>
                  </q-item-main>
                  <q-item-side right>{{ $timeSince(teamNote.date) }}</q-item-side>
                </q-item>
              </q-card>
            </q-modal-layout>
          </q-modal>
        </q-tab-pane>
        <q-tab-pane name="tabGithub" class="darken">
          <h3 class="q-title">준비중입니다.</h3>
        </q-tab-pane>
      </q-tabs>
    </q-card>
    <q-infinite-scroll :handler="loadContentsMore">
      <q-card :class="{ 'custom-content-card': true, 'isModifying': content.isModifying }" :key="index" v-for="(content, index) in reversedContents" :color="content.isModifying ? 'dark' : ''">
        <q-item class="q-pa-none">
          <q-item-main>
            <q-input class="q-title" type="textarea" v-model="content.title" hide-underline :readonly="!content.isModifying" />
            <h4 class="q-subtitle">{{ content.numIssue + '번째 이슈' }} | {{ content.contributor.label }} | {{ $timeSince(content.date) }}</h4>
          </q-item-main>
          <q-item-side right>
            <q-btn icon="more_vert" dense round flat>
              <q-popover>
                <q-list seperator link>
                  <q-item v-close-overlay @click.native="onDeleteContent(content)">
                    <q-item-side right icon="delete" />
                    <q-item-main>삭제</q-item-main>
                  </q-item>
                  <q-item v-close-overlay @click.native="onModifyContent(content)">
                    <q-item-side right icon="edit" />
                    <q-item-main>수정</q-item-main>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-item-side>
        </q-item>

        <hr class="custom-hr q-hr q-my-lg">
        <q-input v-if="content.isModifying" class="custom-body q-body-1" type="textarea" v-model="content.body" hide-underline />
        <div v-if="!content.isModifying" class="custom-body" v-html="marked(content.body, { sanitize: true })"></div>
        <p class="q-body-1">좋아요 {{ content.numLikes }}개 | 댓글 {{ content.numComments }}개</p>

        <hr class="custom-hr q-hr q-my-lg">
        <q-btn v-if="content.isModifying" class="full-width" color='negative' label="수정 끝내기" @click="content.isModifying = false" />
        <q-btn-group v-if="!content.isModifying" flat class="row full-width">
          <q-btn class="col" flat dense :color="content.isLike ? 'secondary' : ''" @click.native="onClickLike(content)" label="좋아요" icon="thumb_up" />
          <q-btn class="col" flat dense @click.native="onClickComment(content)" label="댓글" icon="comment" />
          <q-btn class="col" flat dense @click.native="onClickShare(content)" label="공유" icon="share" />
        </q-btn-group>
        <hr v-if="content.showComments && !content.isModifying" class="custom-hr q-hr q-my-lg">
        <q-list v-if="content.showComments && !content.isModifying" class="custom-comment">
          <q-btn flat icon="more_horiz" color="grey-8" class="q-pa-none full-width" @click="loadCommentsMore(content)">더보기</q-btn>
          <div :key="n" v-for="(comment, n) in content.comments">
            <q-chat-message v-if="comment.writer.email !== $loginInfo['email']" :name="comment.writer.label" :avatar="comment.writer.avatar" :text="comment.body" bg-color="grey-4" :stamp="'&nbsp;&nbsp;' + $timeSince(comment.date)" />
            <q-chat-message v-if="comment.writer.email === $loginInfo['email']" name="나" :text="comment.body" bg-color="teal-2" :stamp="'&nbsp;&nbsp;' + $timeSince(comment.date)" sent />
          </div>
          <q-item class="q-pa-none">
            <q-item-main>
              <q-input type="textarea" v-model="content.newCommentBody" :before="[{icon: 'sms'}]" placeholder="댓글을 입력하세요." @keyup.enter.exact="addComment(content)" @submit.prevent />
            </q-item-main>
            <q-item-side right>
              <q-btn color="primary" label="등록" @click="addComment(content)" />
            </q-item-side>
          </q-item>
        </q-list>
      </q-card>
      <q-spinner-dots class="q-mx-auto" slot="message" :size="40"></q-spinner-dots>
    </q-infinite-scroll>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  created () {
    this.marked = require('marked')
  },
  methods: {
    openPictureDetail: function (picture, index) {
      this.pictureVisible = true
      this.pictureSlide = index
    },
    openTeamNoteDetail: function (note) {
      this.teamNoteDetail = {
        visible: true
      }
      if (note) {

      } else {

      }
    },
    resetNewContent: function () {
      this.selectedTab = null
      this.newData.title = null
      this.newData.body = null
    },
    saveNewContent: function () {
      const date = new Date()
      this.project.contents.push({
        title: this.newData.title || '무제',
        date: date,
        numIssue: 0,
        contributor: this.$loginInfo,
        isModifying: false,
        isLike: false,
        themeColor: false,
        headerImgSrc: '',
        numLikes: 0,
        numComments: 0,
        showComments: false,
        body: this.newData.body || '내용이 없습니다.',
        newCommentBody: '',
        comments: []
      })
      this.project.notifications.push({
        label: this.$loginInfo.label + '님이 새 글을 작성하였습니다:',
        sublabel: this.newData.title || '무제',
        date: date,
        avatar: this.$loginInfo.avatar
      })
      this.resetNewContent()
      console.log('httpRequest')
    },
    loadContentsMore: function (index, done) {
      this.$q.notify({
        title: '제목',
        message: index + '번째 추가 로딩중입니다..',
        color: 'positive'
      })
      // setTimeout(() => {
      //   // http request
      //   // sample codes below:
      //   let sample = Object.create(this.project.contents[0])
      //   sample.date = new Date()
      //   // console.log(sample, sample === this.project.contents[0])
      //   this.project.contents.push(sample)
      //   this.project.contents.push(sample)
      //   done()
      // }, 10000)
    },
    onDeleteContent: function (content) {
      this.$q.dialog({
        title: '삭제 확인',
        message: '삭제하시겠습니까?',
        color: 'negative',
        ok: true,
        cancel: true,
        preventClose: true
      }).then(() => {
        let index = this.project.contents.indexOf(content)
        // console.log(this.project.contents)
        this.project.contents.splice(index, 1)
        // console.log(this.project.contents)
      })
    },
    onModifyContent: function (content) {
      // edit
      content.isModifying = !content.isModifying
      console.log(content)
    },
    onClickLike: function (content) {
      // request Like
      if (content.isLike) {
        content.isLike = false
        content.numLikes -= 1
      } else {
        content.isLike = true
        content.numLikes += 1
      }
    },
    onClickComment: function (content) {
      if (content.showComments) {
        content.showComments = false
      } else {
        content.showComments = true
      }
    },
    onClickShare: function (content) {
      this.$q.actionSheet({
        title: '공유하기',
        grid: true,
        dismissLabel: '취소',
        actions: [
          {
            label: '카카오톡',
            avatar: '/assets/kakao_logo.png',
            handler () {
              console.log('share with Kakao...')
            }
          },
          {
            label: '페이스북',
            avatar: '/assets/facebook_logo.png',
            handler () {
              console.log('share with Facebook...')
            }
          },
          {
            label: '구글',
            avatar: '/assets/google_logo.png',
            handler () {
              console.log('share with Google...')
            }
          }
        ]
      }).catch(() => {
        this.$q.notify({
          color: 'negative',
          message: '취소되었습니다.'
        })
      })
    },
    addComment: function (content) {
      let body = content.newCommentBody.split('\n')
      body.pop()
      // console.log(body)
      content.comments.push({
        id: new Date(),
        writer: this.$loginInfo,
        body: body
      })
      content.newCommentBody = ''
    },
    loadCommentsMore: function (content) {
    },
    addTeammate: function () {
      this.$q.actionSheet({
        title: '팀원 추가하기',
        dismissLabel: '나가기',
        actions: [
          {
            label: 'KJH',
            avatar: '/assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: '/assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: '/assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: '/assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: '/assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: '/assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: '/assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          }
        ]
      }).then(action => {
        let hasContributor = this.project.contributors.some(contributor => contributor.email === action.email)
        if (hasContributor) {
          this.$q.notify({
            color: 'negative',
            message: `${action.label}님은 이미 추가되어 있습니다.`
          })
        } else {
          action.position = '팀원'
          this.project.contributors.push(action)
          this.project.notifications.push({
            label: this.$loginInfo.label + '님이 ' + action.label + '님을 팀원으로 추가하였습니다.',
            date: new Date(),
            avatar: this.$loginInfo.avatar
          })
          this.$q.notify({
            color: 'positive',
            message: `${action.label}님을 기여자로 추가하였습니다.`
          })
        }
      }).catch(() => {
        this.$q.notify({
          color: 'negative',
          message: '취소되었습니다.'
        })
      })
    }
  },
  computed: {
    startDate: function () {
      return this.project.startDuration.slice(0, 10)
    },
    endDate: function () {
      return this.project.endDuration.slice(0, 10)
    },
    reversedNotifications: function () {
      return this.project.notifications.slice().reverse()
    },
    reversedContents: function () {
      return this.project.contents.slice().reverse()
    },
    isManager: function () {
      // ajax requests if login user is a project manager.
      return true
    }
  },
  watch: {
    'pictureSlide': function (val, oldVal) {
      this.pictureDetail = this.project.pictures[val]
      this.pictureDetail.comments = [
        {
          date: this.$timeSince(new Date()),
          body: '아주 멋져요!',
          writer: {
            label: '김지형',
            avatar: '/assets/profile_kjh.png',
            email: '100kimch@naver.com',
            position: '매니저'
          }
        }
      ]
    }
  },
  data () {
    return {
      photoPickerConfig: null,
      selectedTab: null,
      pictureSlide: null,
      pictureVisible: false,
      projectSettingsVisible: false,
      pictureDetail: {},
      newData: {
        title: null,
        body: null
      },
      teamNoteDetail: {
        visible: false
      },
      github: {
      },
      project: {
        comments: [{
          avatar: '/assets/profile_kjh.png',
          body: ['프로젝트 후기입니다.보람찼네요.'],
          date: new Date('2018-11-26')
        }],
        contents: [{
          body: 'hello',
          comments: [{
            body: ['안녕하세요'],
            date: new Date('2018-11-09'),
            writer: {
              avatar: '/assets/profile_kjh.png',
              email: 'oioi@naver.com',
              label: '김기리'
            }
          }, {
            body: ['안녕하세요'],
            date: new Date('2018-11-09'),
            writer: {
              avatar: '/assets/profile_kjh.png',
              email: '100kimch@naver.com',
              label: '김지형'
            }
          }, {
            body: ['안녕하세요'],
            date: new Date('2018-11-09'),
            writer: {
              avatar: '/assets/profile_kjh.png',
              email: 'kim@naver.com',
              label: '이한울'
            }
          }, {
            body: ['댓글 시험중입니다.'],
            date: new Date('2018-11-10'),
            writer: {
              avatar: '/assets/profile_kjh.png',
              email: '100kimch@naver.com',
              label: '김지형'
            }
          }],
          contributor: {
            avatar: '/assets/profile_kjh.png',
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
          title: '새로운 프로젝트가 시작되었습니다!'
        }],
        contest: {
          duedate: '2018-11-05T00:00:00.000+09:00',
          hasDuedate: true,
          name: 'PRIME 학과 공모전',
          objectives: 'tojoin',
          topicSelect: 'hwcontest'
        },
        contributors: [{
          avatar: '/assets/profile_kjh.png',
          email: '100kimch@naver.com',
          label: '김지형',
          position: '매니저'
        }],
        deadlineOption: true,
        description: '본 프로젝트는 건국대학교 전자전기공학과 학술동아리 BOOT4DIM에서 진행하는 2018 2학기 정기 프로젝트 중 하나로, 6번째 팀의 프로젝트입니다. 아두이노를 비롯한 라즈베리파이, 리눅스 등을 처음 다루기 위해 미세먼지 측정기 제작을 목표로 진행했습니다.',
        endDuration: '2018-11-25T00:00:00.000+09:00',
        fixedBudget: '100000',
        hasPlace: true,
        hopePlace: true,
        hopePlaceMultipleSelect: [],
        manager: '김지형',
        meeting: null,
        name: 'Boot4Dust',
        notifications: [{
          avatar: '/assets/boot_logo.png',
          date: new Date() - 7200000,
          label: '새 프로젝트를 생성하였습니다.'
        }, {
          avatar: '/assets/boot_logo.png',
          date: new Date() - 360000,
          label: '운영진에게 프로젝트 진행 시 필요한 사항을 전달했습니다.'
        }],
        personnel: '4',
        pictures: [{
          body: 'Boot4Dust 프로젝트 사진입니다 :)',
          date: new Date('2018-11-05').toLocaleTimeString(),
          src: '/assets/boot4dust_sample1.jpeg',
          title: '부스 사진'
        }, {
          body: 'Boot4Dust 프로젝트 사진입니다 :)',
          date: new Date('2018-11-05').toLocaleTimeString(),
          src: '/assets/boot4dust_sample2.jpeg',
          title: '제품 외형'
        }, {
          body: 'Boot4Dust 프로젝트 사진입니다 :)',
          date: new Date('2018-11-05').toLocaleTimeString(),
          src: '/assets/boot4dust_sample3.jpeg',
          title: '회로 제작기'
        }, {
          body: 'Boot4Dust 프로젝트 사진입니다 :)',
          date: new Date('2018-11-05').toLocaleTimeString(),
          src: '/assets/boot4dust_sample4.jpeg',
          title: '미세먼지 센서'
        }],
        place: '부트방 (중장비동 306-3호)',
        request: {
          budget: '100000',
          cookie: null,
          hopePlace: true,
          hopePlaceMultipleSelect: [],
          material: '라즈베리파이, 점퍼케이블',
          needBudget: true,
          needCookie: null,
          needMaterial: true
        },
        seminar: {
          meeting: '한달에 한번',
          tutor: '김지형',
          tutorOption: true
        },
        shareTopicMultipleSelect: [],
        startDuration: '2018-09-03T00:00:00.000+09:00',
        status: 1,
        study: {
          hasTutor: false,
          meeting: '주당 1회 총 8회',
          topicMultipleSelect: ['c', 'web', 'arduino', 'raspberry'],
          tutor: '김지형'
        },
        supports: [{
          label: '20인 다과제공',
          status: '지급완료',
          sublabel: '20인 이상 프로젝트시 제공되는 다과입니다.'
        }, {
          label: '부품',
          status: '지급완료',
          sublabel: '프로젝트시 필요한 부품을 제공했습니다'
        }],
        teamNotes: [{
          body: '안녕하세요.',
          date: new Date('2018-11-01'),
          title: '개인 노트작성하기'
        }],
        topicMultipleSelect: ['sw', 'hw'],
        typeMultipleSelect: ['스터디', '작품제작', '세미나']
      },
      options: {
        status: [
          { label: '준비중', value: 0 },
          { label: '진행중', value: 1 },
          { label: '중지', value: 2 },
          { label: '실패', value: 3 },
          { label: '완료', value: 4 }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.q-jumbotron {
  margin-bottom: 1em;
  h2 {
    margin: 0;
  }
  h1 {
    margin: 0.1em 0;
  }
}
.q-card {
  margin: 0.5em 0;
  background: white;
  li {
    line-height: 200%;
  }
}

.q-modal-layout-content {
  width: 100vw;
  img {
    width: 100%;
    object-fit: contain;
    // width: 100px;
  }
}

.custom-album-box {
  width: 100%;
  margin: 0;
  overflow-x: scroll;
  & > div {
    width: max-content;
    // width: 200vw;
  }
  .q-card {
    margin: 0 0.5em;
    background: white;
    cursor: pointer;
    .q-card-container {
      padding: 8px 16px;
    }
    .q-card-media {
      width: 12em;
      img {
        height: 7em;
        object-fit: cover;
      }
    }
  }
}
.custom-picture-detail {
  .q-carousel-slide {
    padding: 0;
  }
  .q-carousel-control {
    .q-btn {
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .q-card {
    padding: 0.5em;
    margin: 0;
    border-radius: 0;
  }
}

.q-tab-pane {
  // padding: 0em 1em 1em 1em;
  .custom-btn-box {
    text-align: center;
    padding-top: 1em;
    .q-btn + .q-btn {
      margin-left: 1em;
    }
  }
  .darken {
    background: #24292e !important;
    color: white;
  }
}
.custom-content-card {
  &.isModifying {
    .q-input-target {
      color: white !important;
    }
    .q-subtitle,
    p {
      color: #aaa;
    }
  }
  padding: 1em;
  .q-title {
    line-height: 120%;
    padding: 0;
    margin: 0;
    margin-bottom: 0.5em;
  }
  h4 {
    line-height: 100%;
    font-size: 0.8em;
    color: #666;
    margin: 0;
  }
  .custom-body {
    min-height: 7em;
    margin-bottom: 0.5rem;
  }
  .custom-hr {
    margin: 0.5rem 0;
  }
}
.custom-comment {
  img {
    width: 2.3rem;
    height: 2.3rem;
  }
  .q-message-name {
    font-size: 0.8rem;
  }
  .q-message-text {
    min-height: 1rem;
    padding: 0.5rem;
  }
  .q-message-text-content {
    div {
      display: inline-block !important;
    }
  }
  i {
    width: 2.3rem;
    margin-right: 0.5rem;
  }
}
.q-spinner {
  width: 4rem;
  margin: 0.5rem calc(50% - 2rem);
}
</style>
