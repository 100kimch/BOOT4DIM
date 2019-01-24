<template>
  <q-layout>
    <q-layout-header reveal>
      <q-toolbar class="custom-logobar" :class="{'darken': darkenTheme}">
        <img class="logo" src="/statics/boot_logo.png">
        <span class="logo-name">
          {{ appName }}
        </span>
        <q-btn flat round dense icon="menu" @click="rightDrawer = !rightDrawer" />
      </q-toolbar>
    </q-layout-header>

    <div class="custom-menu" :class="{'darken': darkenTheme}">
      <q-tabs>
        <q-route-tab slot="title" :key="index" v-for="(tab, index) in selectedTab" :default="index==0" replace :label="tab.label" :icon="tab.icon" :to="tab.to" />
      </q-tabs>
    </div>

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
          <q-item @click.native="goto('/login')">
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
        <q-list class="copyright" no-border inset-delimiter>
          <span class="title">(c) 2019 Boot4Dim 부트사차원<br/></span>
          <span class="subtitle">Pages made by KJH(100kimch@naver.com) <br/> Icon made by Freepik from www.flaticon.com & material.io</span>
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
  name: 'layout-intro',
  created () {
    this.$accountBus.$on('loginInfo', (loginInfo) => {
      if (loginInfo) {
        this.setUserLevel(loginInfo.level)
        this.setAdminMode(this.adminMode)
      }
    })
    this.selectedTab = this.tabs[0]
    this.$login({})
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
          color: 'negative'
        })
        return
      }
      this.adminMode = newMode
      if (newMode) {
        this.$router.push('/admin')
        this.adminMenuName = '정회원 모드로 전환하기'
      } else {
        // this.$router.push('/notice')
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
        this.$q.loading.show()
        this.$logout().then((res) => {
          this.$q.notify({
            color: 'info',
            message: res.message
          })
          this.$q.loading.hide()
        }).catch((err) => {
          this.$q.dialog({
            message: '로그아웃에 실패하였습니다:' + err
          })
          this.$q.loading.hide()
        })
      }).catch(() => {
        this.$q.loading.hide()
        // when canceled.
      })
    },
    setSelectedTab: function (level) {
      // for rerendering v-for, selectedTab should be set individually.
      for (let i in this.selectedTab) {
        this.$set(this.selectedTab, i, this.tabs[level][i])
      }
    }
  },
  computed: {
    darkenTheme: {
      get () {
        return this.$store.state.showcase.darkenTheme
      },
      set (val) {
        this.$store.commit('showcase/updateDarkenTheme', val)
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
body {
  margin-bottom: 4rem;
}

* {
  word-break: keep-all;
  word-wrap: break-word;
}

button + button {
  margin-left: 0.5em;
}

.q-layout-header {
  box-shadow: none;
}

.custom-logobar {
  height: 4.5rem;
  padding: 1rem 1rem 2rem 1rem;
  display: flex;
  color: black !important;
  background: linear-gradient(
    rgba(238, 238, 238, 0.3) 50%,
    transparent 100%
  ) !important;
  // background: linear-gradient(
  //   rgba(238, 238, 238, 1) 50%,
  //   transparent 100%
  // ) !important;
  &.darken {
    color: white !important;
    background: linear-gradient(
      rgba(51, 51, 51, 0.7) 50%,
      transparent 100%
    ) !important;
  }
  .logo {
    height: 1.5rem;
    width: auto;
  }
  .logo-name {
    flex: 1;
    padding: 0 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
  .q-btn {
    margin: -0.25rem 0;
    height: 1.5rem;
    width: 1.5rem;
  }
}

.custom-menu {
  position: fixed;
  width: 100vw;
  bottom: 0;
  padding-top: 1.5rem;
  background: linear-gradient(transparent, rgb(97, 88, 80) 30%) !important;
  z-index: 2500;
  .q-tabs-head {
    color: white !important;
    background: transparent !important;
  }
  &.darken {
    background: transparent !important;
    .q-tabs-head {
      color: white !important;
      background: #333 !important;
    }
  }
}

.q-layout-drawer {
  box-shadow: none;
  border-radius: 1rem 0 0 1rem;
  margin: 0.5rem;
  margin-right: 0;
}

// .top-toolbar {
//   border-top: 3px solid var(--q-color-secondary);
//   padding: 1em;
//   overflow: initial;
//   height: 2em;
//   .logo {
//     height: calc(100% + 1em);
//     width: auto;
//   }
// }

.copyright {
  padding: 1rem;
  .title {
    line-height: 250%;
  }
  .subtitle {
    line-height: 100%;
    font-size: 0.8em;
    color: #666;
  }
}

.q-card {
  background: white;
  margin: 0 0 0.5rem 0;
  border-radius: 1rem;
  box-shadow: none;

  .q-btn:hover,
  .q-btn:focus {
    transform: scale(1.1);
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

.custom-title-box {
  padding: 3em 0 5em 0;
  text-align: center;
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
