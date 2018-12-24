<template>
  <q-page padding>
    <q-jumbotron dark img-src="assets/boot_project_boot4dust.jpg">
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
              <a @click="openPictureDetail(picture)">
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
        <q-modal v-model="pictureDetail.visible">
          <q-modal-layout header-style="min-height: 2em">
            <q-toolbar slot="header">
              <q-btn flat round icon="arrow_back" @click="pictureDetail.visible=false" />
              <q-toolbar-title>사진</q-toolbar-title>
            </q-toolbar>
            <q-list padding>
              <img :src="pictureDetail.src" />
              <q-list-header>{{ pictureDetail.title }}</q-list-header>
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
            </q-list>
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
            <q-item :key="index" v-for="(contributor, index) in contributors">
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
        <q-collapsible icon="comment" label="프로젝트 후기">
          <q-chat-message name="김지형" :avatar="comment.avatar" :text="comment.text" :key="index" v-for="(comment, index) in comments" />
        </q-collapsible>
        <q-collapsible icon="attach_money" label="지원 현황">
          <q-list>
            <q-item :key="index" v-for="(support, index) in supports">
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
    <q-card>
      <q-tabs v-model="selectedTab" inverted>
        <q-tab name="tabNewData" icon="event_note" label="글쓰기" slot="title" />
        <q-tab name="tabTeamNote" icon="person_pin" label="개인 노트" slot="title" />
        <q-tab name="tabGithub" icon="code" label="깃허브 연결" slot="title" />

        <q-tab-pane name="tabNewData">
          <q-input v-model="newData.title" type="text" float-label="제목" />
          <q-input v-model="newData.body" type="textarea" float-label="내용" :max-height="7" rows="7" />
          <div class="custom-btn-box">
            <q-btn color="primary" @click="resetNewData()" label="취소" />
            <q-btn color="secondary" @click="saveNewData()" label="저장" />
          </div>
        </q-tab-pane>
        <q-tab-pane name="tabTeamNote">
          <q-item @click.native="openTeamNoteDetail(teamNote)" :key="index" v-for="(teamNote, index) in teamNotes">
            <q-item-side>
              <q-item-tile icon="note"></q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>{{ teamNote.title }}</q-item-tile>
              <q-item-tile sublabel>{{ teamNote.body }}</q-item-tile>
            </q-item-main>
            <q-item-side right>{{ $timeSince(teamNote.date) }}</q-item-side>
          </q-item>
          <q-item @click.native="openTeamNoteDetail()">
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
              <img :src="teamNoteDetail.src" />
            </q-modal-layout>
          </q-modal>
        </q-tab-pane>
        <q-tab-pane name="tabGithub" class="darken">
          <h3 class="q-title">깃허브와 연동하세요!</h3>
        </q-tab-pane>
      </q-tabs>
    </q-card>
    <q-card class="custom-content-card" :key="index" v-for="(content, index) in reversedContents">
      <h3 class="q-title">{{ content.title }}</h3>
      <h4 class="q-subtitle">{{ content.contributor.label }} | {{ $timeSince(content.date) }}</h4>
      <hr class="q-hr q-my-lg">
      <p class="q-body-1">{{ content.body }}</p>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  created () {
    this.loginInfo = window.loginInfo
  },
  data () {
    return {
      selectedTab: null,
      notifications: [
        {
          label: '새 프로젝트를 생성하였습니다.',
          date: new Date() - 7200000,
          avatar: 'assets/boot_logo.png'
        },
        {
          label: '운영진에게 프로젝트 진행 시 필요한 사항을 전달했습니다.',
          date: new Date() - 360000,
          avatar: 'assets/boot_logo.png'
        }
      ],
      project: {
        name: 'Boot4Dust',
        description: '본 프로젝트는 건국대학교 전자전기공학과 학술동아리 BOOT4DIM에서 진행하는 2018 2학기 정기 프로젝트 중 하나로, 6번째 팀의 프로젝트입니다. 아두이노를 비롯한 라즈베리파이, 리눅스 등을 처음 다루기 위해 미세먼지 측정기 제작을 목표로 진행했습니다.',
        typeMultipleSelect: ['스터디', '작품제작', '세미나'],
        topicMultipleSelect: ['sw', 'hw'],
        deadlineOption: true,
        startDuration: '2018-09-03T00:00:00.000+09:00',
        endDuration: '2018-11-25T00:00:00.000+09:00',
        manager: '김지형',
        personnel: '4',
        hasPlace: true,
        place: '부트방 (중장비동 306-3호)',
        hopePlace: true,
        hopePlaceMultipleSelect: [],
        fixedBudget: '100000',
        study: {
          topicMultipleSelect: ['c', 'web', 'arduino', 'raspberry'],
          hasTutor: false,
          tutor: '김지형',
          meeting: '주당 1회 총 8회'
        },
        contest: {
          topicSelect: 'hwcontest',
          name: 'PRIME 학과 공모전',
          duedate: '2018-11-05T00:00:00.000+09:00',
          hasDuedate: true,
          objectives: 'tojoin'
        },
        seminar: {
          meeting: '한달에 한번',
          tutor: '김지형',
          tutorOption: true
        },
        shareTopicMultipleSelect: [],
        meeting: null,
        request: {
          hopePlace: true,
          hopePlaceMultipleSelect: [],
          needMaterial: true,
          material: '라즈베리파이, 점퍼케이블',
          needBudget: true,
          budget: '100000',
          needCookie: null,
          cookie: null
        },
        pictures: [
          {
            src: 'assets/boot4dust_sample1.jpeg',
            title: '부스 사진'
          },
          {
            src: 'assets/boot4dust_sample2.jpeg',
            title: '제품 외형'
          },
          {
            src: 'assets/boot4dust_sample3.jpeg',
            title: '회로 제작기'
          },
          {
            src: 'assets/boot4dust_sample4.jpeg',
            title: '미세먼지 센서'
          }
        ]
      },
      pictureDetail: {
        visible: false,
        src: '',
        title: '',
        comments: [
          {
            date: this.$timeSince(new Date()),
            body: '아주 멋져요!',
            writer: {
              label: '김지형',
              avatar: 'assets/profile_kjh.png',
              email: '100kimch@naver.com',
              position: '매니저'
            }
          }
        ]
      },
      contributors: [
        {
          label: '김지형',
          avatar: 'assets/profile_kjh.png',
          email: '100kimch@naver.com',
          position: '매니저'
        }
      ],
      comments: [
        {
          avatar: 'assets/profile_kjh.png',
          text: ['프로젝트 후기입니다.보람찼네요.'],
          date: new Date('2018-11-26')
        }
      ],
      supports: [
        {
          label: '20인 다과제공',
          sublabel: '20인 이상 프로젝트시 제공되는 다과입니다.',
          status: '지급완료'
        },
        {
          label: '부품',
          sublabel: '프로젝트시 필요한 부품을 제공했습니다',
          status: '지급완료'
        }
      ],
      newData: {
        title: null,
        body: null
      },
      teamNotes: [
        {
          title: '개인 노트작성하기',
          date: new Date('2018-11-01'),
          body: '안녕하세요.'
        }
      ],
      teamNoteDetail: {
        visible: false
      },
      github: {
      },
      contents: [
        {
          title: '새로운 프로젝트가 시작되었습니다!',
          date: new Date('2018-09-03'),
          contributor: {
            label: '김지형',
            avatar: 'assets/profile_kjh.png',
            email: '100kimch@naver.com'
          },
          body: 'hello'
        }
      ]
    }
  },
  methods: {
    openPictureDetail: function (picture) {
      this.pictureDetail = {
        visible: true,
        src: picture.src,
        title: picture.title
      }
    },
    openTeamNoteDetail: function (note) {
      this.teamNoteDetail = {
        visible: true
      }
      if (note) {

      } else {

      }
    },
    resetNewData: function () {
      this.selectedTab = null
      this.newData.title = null
      this.newData.body = null
    },
    saveNewData: function () {
      this.contents.push({
        title: this.newData.title || '무제',
        date: new Date(),
        contributor: this.loginInfo,
        body: this.newData.body || '내용이 없습니다.'
      })
      this.notifications.push({
        label: this.loginInfo.label + '님이 새 글을 작성하였습니다:',
        sublabel: this.newData.title || '무제',
        date: new Date(),
        avatar: this.loginInfo.avatar
      })
      this.resetNewData()
      console.log('httpRequest')
    },
    addTeammate: function () {
      this.$q.actionSheet({
        title: '팀원 추가하기',
        dismissLabel: '나가기',
        actions: [
          {
            label: 'KJH',
            avatar: 'assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: 'assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: 'assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: 'assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: 'assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: 'assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          },
          {
            label: 'KJH',
            avatar: 'assets/profile_kjh.png',
            email: 'kimjihyeong100@gmail.com'
          }
        ]
      }).then(action => {
        let hasContributor = this.contributors.some(contributor => contributor.email === action.email)
        if (hasContributor) {
          this.$q.notify({
            color: 'negative',
            message: `${action.label}님은 이미 추가되어 있습니다.`
          })
        } else {
          action.position = '팀원'
          this.contributors.push(action)
          this.notifications.push({
            label: this.loginInfo.label + '님이 ' + action.label + '님을 팀원으로 추가하였습니다.',
            date: new Date(),
            avatar: this.loginInfo.avatar
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
    reversedContents: function () {
      return this.contents.slice().reverse()
    },
    reversedNotifications: function () {
      return this.notifications.slice().reverse()
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
  padding: 1em;
  h3 {
    line-height: 170%;
    padding: 0;
    margin: 0;
  }
  h4 {
    line-height: 100%;
    font-size: 0.8em;
    color: #666;
    margin: 0;
  }
}
</style>
