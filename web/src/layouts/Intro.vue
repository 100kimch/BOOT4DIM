<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar class="top-toolbar" height="300">
        <img class="logo" src="assets/boot_logo.png">
        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>
        <q-btn flat round dense icon="menu" @click="rightDrawer = !rightDrawer" />
      </q-toolbar>
      <q-tabs>
        <q-route-tab slot="title" :key="index" v-for="(tab, index) in selectedTab" :default="index==0" replace :label="tab.label" :icon="tab.icon" :to="tab.to" />
      </q-tabs>
    </q-layout-header>

    <q-layout-footer>
      2019 Boot4Dim 부트사차원 (c) All rights reserved. <br/>
      <span class="darken">Pages made by KJH(100kimch@naver.com) <br/> Icon made by Freepik from www.flaticon.com & material.io</span>
    </q-layout-footer>

    <q-layout-drawer side="right" v-model="rightDrawer" :overlay="true" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <q-list v-if="userLevel" no-border link inset-delimiter>
          <q-item class="q-py-none">
            <q-item-main></q-item-main>
            <q-item-side class="q-body-1" @click.native="logout()" right>로그아웃</q-item-side>
          </q-item>
          <q-item class="q-py-none" @click.native="goto('/profile')">
            <q-item-side>
              <q-item-tile avatar>
                <img :src="$loginInfo.avatar" alt="Profile Image">
              </q-item-tile>
            </q-item-side>
            <q-item-main :label="$loginInfo.label" :sublabel="$loginInfo.email" />
            <q-item-side style="min-width: auto" icon="settings"></q-item-side>
          </q-item>
        </q-list>
        <q-list v-if="!userLevel" no-border link inset-delimiter>
          <q-item @click.native="goto('/register')">
            <q-item-side avatar>
              <q-item-tile icon="person"></q-item-tile>
            </q-item-side>
            <q-item-main label="로그인해주세요." />
          </q-item>
        </q-list>
        <q-list v-if="userLevel == 3" no-border link inset-delimiter>
          <q-list-header>관리자 권한</q-list-header>
          <q-item class="menu" @click.native="setAdminMode(!adminMode)">
            <q-item-side icon="supervised_user_circle" />
            <q-item-main :label="adminMenuName" />
          </q-item>
        </q-list>
        <q-list no-border link inset-delimiter>
          <q-list-header>메뉴</q-list-header>
          <q-item class="menu" :key="index" v-for="(menu, index) in menus" @click.native="goto(menu.url)">
            <q-item-side :icon="menu.icon" />
            <q-item-main :label="menu.title" />
          </q-item>
        </q-list>
        <q-list no-border link inset-delimiter>
          <q-list-header>관련 링크</q-list-header>
          <q-item :key="index" v-for="(link, index) in links" @click.native="openURL(link.url)">
            <q-item-side :icon="link.icon" />
            <q-item-main :label="link.title" :sublabel="link.url" />
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',
  created () {
    this.$accountBus.$on('loginInfo', (loginInfo) => {
      this.setUserLevel(loginInfo.level)
      this.setAdminMode(this.adminMode)
    })
    this.selectedTab = this.tabs[0]
  },
  methods: {
    openURL: function (url) {
      window.location.href = url
    },
    goto: function (url) {
      this.$router.push(url)
    },
    setUserLevel: function (newLevel) {
      console.log('new Level: ', newLevel)
      switch (newLevel) {
        case '관리자':
          this.userLevel = 3
          break
        case '졸업자':
          this.userLevel = 2
          break
        case '정회원':
        case '준회원':
          this.userLevel = 1
          break
        default:
          this.userLevel = 0
      }
      this.setSelectedTab(this.userLevel)
    },
    setAdminMode: function (newMode) {
      if (this.userLevel !== 3) {
        this.$q.notify({
          message: '관리자가 아닙니다.',
          color: 'error'
        })
        return
      }
      this.adminMode = newMode
      if (newMode) {
        this.adminMenuName = '정회원 모드로 전환하기'
      } else {
        this.adminMenuName = '관리자 모드로 전환하기'
      }
      this.setSelectedTab((newMode) ? 3 : 1)
      this.rightDrawer = false
    },
    logout () {
      this.$q.dialog({
        title: '로그아웃',
        message: '로그아웃 하시겠습니까?',
        ok: true,
        cancel: true
      }).then(() => {
        this.$q.dialog({
          message: '성공적으로 로그아웃되었습니다.'
        })
      }).catch((err) => {
        this.$q.dialog({
          message: '로그아웃에 실패하였습니다:' + err
        })
      })
    },
    setSelectedTab: function (level) {
      // for rerendering v-for, selectedTab should be set individually.
      for (let i in this.selectedTab) {
        this.$set(this.selectedTab, i, this.tabs[level][i])
      }
    }
  },
  data () {
    return {
      rightDrawer: false,
      appName: window.appName,
      userLevel: 0,
      adminMode: false,
      adminMenuName: null,
      selectedTab: [],
      tabs: [
        [
          {
            'icon': 'map',
            'to': '/',
            'label': '소개'
          },
          {
            'icon': 'next_week',
            'to': '/projects',
            'label': '프로젝트'
          },
          {
            'icon': 'date_range',
            'to': '/plans',
            'label': '연간계획'
          },
          {
            'icon': 'assignment',
            'to': '/apply',
            'label': '신입지원'
          }
        ],
        [
          {
            'icon': 'report',
            'to': '/notice',
            'label': '공지사항'
          },
          {
            'icon': 'next_week',
            'to': '/projects',
            'label': '프로젝트'
          },
          {
            'icon': 'date_range',
            'to': '/plans',
            'label': '연간계획'
          },
          {
            'icon': 'toc',
            'to': '/board',
            'label': '자유게시판'
          }
        ],
        [
          {
            'icon': 'report',
            'to': '/notice',
            'label': '공지사항'
          },
          {
            'icon': 'next_week',
            'to': '/projects',
            'label': '프로젝트'
          },
          {
            'icon': 'date_range',
            'to': '/plans',
            'label': '연간계획'
          },
          {
            'icon': 'toc',
            'to': '/board',
            'label': '자유게시판'
          }
        ],
        [
          {
            'icon': 'poll',
            'to': '/admin',
            'label': '대시보드'
          },
          {
            'icon': 'people',
            'to': '/admin/members',
            'label': '부원관리'
          },
          {
            'icon': 'next_week',
            'to': '/admin/projects',
            'label': '플젝관리'
          },
          {
            'icon': 'attach_file',
            'to': '/admin/files',
            'label': '파일관리'
          }
        ]
      ],
      menus: [
        {
          'icon': 'map',
          'title': '소개',
          'url': '/'
        },
        {
          'icon': 'next_week',
          'title': '프로젝트',
          'url': '/projects'
        },
        {
          'icon': 'date_range',
          'title': '연간계획',
          'url': '/plans'
        },
        {
          'icon': 'assignment',
          'title': '신입지원',
          'url': '/apply'
        },
        {
          'icon': 'assignment',
          'title': '기존회원등록',
          'url': '/register'
        },
        {
          'icon': 'flag',
          'title': '공지사항',
          'url': '/notice'
        },
        {
          'icon': 'chat',
          'title': '자유게시판',
          'url': '/board'
        },
        {
          'icon': 'bug_report',
          'title': '오류신고',
          'url': '/report'
        }
      ],
      links: [
        {
          'icon': 'record_voice_over',
          'title': '네이버 카페',
          'url': 'https://cafe.naver.com/boot4dim'
        },
        {
          'icon': 'school',
          'title': '건국대학교',
          'url': 'https://konkuk.ac.kr'
        },
        {
          'icon': 'code',
          'title': '웹사이트 GitHub',
          'url': 'https://github.com/100kimch/BOOT4DIM'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
* {
  word-break: keep-all;
  word-wrap: break-word;
}

button + button {
  margin-left: 0.5em;
}

.top-toolbar {
  border-top: 3px solid var(--q-color-secondary);
  padding: 1em;
  overflow: initial;
  height: 2em;
  .logo {
    height: calc(100% + 1em);
    width: auto;
  }
}

.menu {
  cursor: pointer;
}

.q-layout-footer {
  background: var(--q-color-primary);
  color: #ccc;
  padding: 1em;
  .darken {
    font-size: 0.8em;
    color: #999;
  }
}

.custom-title {
  padding: 0;
  margin: 1em 0;
  line-height: 150%;
  color: var(--q-color-secondary);
  font-weight: bold;
  b {
    background: var(--q-color-secondary);
    color: #eee;
    padding: 0.2em;
  }
}

.custom-box {
  padding: 1em;
  // applied background in App.Vue
  // background: #ddd;
  &.custom-main {
    background: var(--q-color-secondary);
  }
  img {
    min-width: 5em;
    min-height: 5em;
    width: 30vw;
    height: 30vw;
    max-width: 10em;
    max-height: 10em;
    margin: 2.2em 1em;
    & + * {
      margin-left: 2em;
    }
  }
  p {
    text-align: justify;
  }
  li {
    list-style: disc;
    line-height: 200%;
  }
}
.custom-option-box {
  text-align: right;
  margin-top: 0.5em;
}
</style>
