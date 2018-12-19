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
        <q-route-tab slot="title" icon="map" to="/" default replace label="소개" />
        <q-route-tab slot="title" icon="next_week" to="/projects" replace label="프로젝트" />
        <q-route-tab slot="title" icon="date_range" to="/plans" replace label="연간계획" />
        <q-route-tab slot="title" icon="assignment" to="/apply" replace label="신입지원" />
      </q-tabs>
    </q-layout-header>

    <q-layout-footer>
      2019 Boot4Dim 부트사차원 (c) All rights reserved. <br/>
      <span class="darken">Pages made by KJH(100kimch@naver.com) <br/> Icon made by Freepik from www.flaticon.com & material.io</span>
    </q-layout-footer>

    <q-layout-drawer side="right" v-model="rightDrawer" :overlay="true" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
        <q-list no-border inset-delimiter>
          <q-item @click.native="openURL('https://cafe.naver.com/boot4dim')">
            <q-item-side>
              <q-item-tile avatar>
                <img :src="loginInfo.avatar" alt="Profile Image">
              </q-item-tile>
            </q-item-side>
            <q-item-main :label="loginInfo.label" :sublabel="loginInfo.email" />
          </q-item>
        </q-list>
        <q-list no-border inset-delimiter>
          <q-list-header>메뉴</q-list-header>
          <q-item @click.native="openURL('https://cafe.naver.com/boot4dim')">
            <q-item-side icon="school" />
            <q-item-main label="네이버 카페" sublabel="https://cafe.naver.com/boot4dim" />
          </q-item>
        </q-list>
        <q-list no-border link inset-delimiter>
          <q-list-header>관련 링크</q-list-header>
          <q-item @click.native="openURL('http://quasar-framework.org')">
            <q-item-side icon="chat" />
            <q-item-main label="Docs" sublabel="quasar-framework.org" />
          </q-item>
          <q-item @click.native="openURL('https://github.com/quasarframework/')">
            <q-item-side icon="code" />
            <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
          </q-item>
          <q-item @click.native="openURL('https://cafe.naver.com/boot4dim')">
            <q-item-side icon="school" />
            <q-item-main label="네이버 카페" sublabel="https://cafe.naver.com/boot4dim" />
          </q-item>
          <q-item @click.native="openURL('http://forum.quasar-framework.org')">
            <q-item-side icon="record_voice_over" />
            <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
          </q-item>
          <q-item @click.native="openURL('https://twitter.com/quasarframework')">
            <q-item-side icon="rss feed" />
            <q-item-main label="Twitter" sublabel="@quasarframework" />
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
    window.loginInfo =
      {
        label: '김지형',
        avatar: 'assets/profile_kjh.png',
        email: '100kimch@naver.com',
        level: '관리자'
      }
    this.loginInfo = window.loginInfo
  },
  data () {
    return {
      rightDrawer: false,
      appName: window.appName
    }
  },
  methods: {
    openURL: function (url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="scss">
* {
  word-break: keep-all;
  word-wrap: break-word;
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
</style>
