<template>
  <q-page class="intro-page">
    <q-parallax :src="'/statics/bg_seminar.jpg'" :speed="1" :height="400">
      <h2 class="title q-display-1">Boost Your Passion,</h2>
      <h1 class="title q-display-3">부트사차원</h1>
    </q-parallax>
    <div class="custom-box custom-main row" :class="{'custom-for-mobile': $q.platform.is.mobile}">
      <img src="/statics/icon_friendship.png" />
      <span :class="{ 'col': $q.platform.is.desktop }">
        <h1 class="q-display-2">배우고, 즐기는 학술동아리</h1>
        <p>부트사차원은 자유로운 분위기를 추구합니다. 동아리 안에서 선후배 간 허물없이 놀고 즐기며 문득 떠오르는 아이디어가 있으면 자발적으로 몇 명의 동아리 부원이 모여 프로젝트를 진행합니다. 또한 새로움을 추구합니다. 새로운 발상을 토대로 전자, 컴퓨터 지식을 활용해 그것을 구현합니다.</p>
      </span>
    </div>
    <q-parallax class="custom-blackbox" :height="height" :class="{'custom-for-mobile': $q.platform.is.mobile}">
      <video slot="media" poster="~assets/poster_video_coding.png" :height="height + 250" autoplay loop muted>
        <source type="video/mp4" src="~assets/video_coding.mp4">
      </video>
      <h1 class="q-display-2">When hardware meets software</h1>
      <p class="centered">1989년부터 시작된 건국대학교 전자공학과 소속 학술동아리 부트사차원은 하드웨어 동아리 ‘부트’와 소프트웨어 동아리 ‘4차원’이 힘을 합해 전자공학과 대표 학술 동아리로서 자리매김했습니다. 그리고 2017년, 전자공학과 학과 개편 후 공과대학 소속으로 전환하면서 더욱 활발한 활동을 이어나가고 있습니다.</p>
    </q-parallax>
    <div class="custom-box">
      <h1 class="q-display-1">정보</h1>
      <ul>
        <li>지도교수: 조용범 교수님</li>
        <li>소속: 건국대학교 공과대학</li>
        <li>동아리방: 건국대학교 중장비동 306-3호</li>
        <li>회장: 김지형 (100kimch@naver.com)</li>
        <li>부회장: 이인원 (inwonlee1541@naver.com)</li>
        <li>운영진: 이재영, 최희정, 권미경, 백이주</li>
        <li>총원: 66명</li>
      </ul>
    </div>
    <div class="custom-box darker">
      <h1 class="q-display-1">관련 링크</h1>
      <div class="custom-card-box">
        <div>
          <q-card inline :key="index" v-for="(link, index) in links">
            <a @click="go(link.url)">
              <q-card-title>
                {{ link.title }}
                <span slot="subtitle">{{ link.url }}</span>
              </q-card-title>
              <q-card-main>{{ link.description }}</q-card-main>
            </a>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'page-intro',
  async mounted () {
    if (this.$q.platform.is.mobile) {
      this.height = 500
    }
    const sampleFile = {
      name: 'Sample Todo 1',
      description: 'Sample Todo Contents.'
    }

    console.log('mutating using graphQL...')
    const newTodo = await this.$API.graphql(this.$graphqlOperation(this.$mutations.createTodo, { input: sampleFile }))
    console.log('newTodo: ', newTodo)
  },
  methods: {
    go: function (url) {
      window.location.href = url
    }
  },
  data () {
    return {
      height: 300,
      links: [
        {
          title: '네이버 카페',
          url: 'https://cafe.naver.com/boot4dim',
          description: '부트사차원 부원 및 동문이 방문가능한 네이버 카페입니다.'
        },
        {
          title: '건국대학교',
          url: 'https://www.konkuk.ac.kr/',
          description: '건국대학교'
        },
        {
          title: '프로젝트 작품설명서',
          url: 'https://boot4dim.gitbook.io/boot4dust/',
          description: '부트사차원 부원들이 발표한 프로젝트 문서를 열람하실 수 있습니다.'
        },
        {
          title: '동문 게시판',
          url: 'https://cafe.naver.com/boot4dim',
          description: '부트사차원 동문 전용 게시판입니다.'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.intro-page {
  .q-parallax {
    color: white;
    .title {
      margin: 0;
      font-weight: lighter;
    }
    .centered {
      margin: 0 3em;
      line-height: 170%;
    }
    h1 {
      text-align: center;
      margin: 0 1em 0.5em 1em;
    }
  }

  .custom-blackbox {
    background: #111;
    .q-parallax-media {
      margin: 4em;
    }
    &.custom-for-mobile {
      .q-parallax-media {
        margin: 30em;
      }
    }
  }

  .custom-box {
    padding: 1em 0;
    background: #ddd;
    &.custom-main {
      padding: 1em;
      background: var(--q-color-secondary);
    }
    &.darker {
      background: #ccc;
    }
    &.custom-for-mobile {
      padding: 1em 0;
      text-align: center;
      img {
        text-align: center;
        display: block;
        margin: 0 auto;
      }
      span {
        margin: 0;
      }
      p {
        margin: 0 1em;
      }
    }
    .q-display-1 {
      margin-left: 1em;
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

  .custom-card-box {
    width: 100%;
    margin: 0;
    overflow-x: scroll;
    & > div {
      width: max-content;
      // width: 200vw;
    }
    .q-card {
      width: 300px;
      margin: 0 0.5em;
      background: white;
      cursor: pointer;
      .q-card-main {
        height: 3.5em;
      }
    }
  }
}
</style>
