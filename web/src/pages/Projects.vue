<template>
  <q-infinite-scroll :handler="loadContentsMore">
    <!-- <h1 class="custom-title q-display-1">프로젝트</h1> -->
    <c-title title="프로젝트" />
    <!-- <q-card>
      <q-tabs v-model="selectedTab" inverted>
        <q-tab label="관리자 메뉴" readonly disable slot="title" />
        <q-tab name="tabNewData" icon="event_note" label="진행 현황" slot="title" />
        <q-tab name="tabManagement" icon="comment" label="지원 현황" slot="title" />

        <q-tab-pane name="tabNewData">
          <h3 class="q-body-2">준비중입니다.</h3>
        </q-tab-pane>
        <q-tab-pane name="tabManagement" class="darken">
          <h3 class="q-body-2">준비중입니다.</h3>
        </q-tab-pane>
      </q-tabs>
    </q-card> -->
    <q-jumbotron>
      <div class="custom-heading q-title">
        프로젝트 생성하기
      </div>
      <div class="q-subheading">부트사차원 내부 프로젝트 진행 시 문서 관리 프로그램으로서 자유롭게 본 프로젝트 서비스를 이용할 수 있습니다. 간편한 문서 관리 매뉴얼을 보고 프로젝트 도움을 받으세요!</div>
      <hr class="q-hr q-my-lg">
      <div class="q-body-2 q-mb-md">로그인한 부트사차원 회원만 사용하실 수 있습니다.</div>
      <q-btn @click="go('/projects/new')" color="primary" class="q-py-sm q-px-xl" label="프로젝트 생성하기" />
    </q-jumbotron>
    <q-jumbotron :key="index" v-for="(content, index) in reversedContents">
      <div class="custom-heading q-display-2">
        <span>{{ content.name }}</span>
      </div>
      <div class="q-subheading">{{ content.description }}</div>
      <hr class="q-hr q-my-lg">
      <div class="q-title q-mb-md">{{ content.startDuration + ' ~ ' + (content.endDuration) ? content.endDuration : '' }}</div>
      <q-btn @click="go('/projects/'+content.name, content.id)" color="primary" class="q-py-sm q-px-xl" label="프로젝트 자세히보기" />
    </q-jumbotron>
    <!-- <q-jumbotron dark :img-src="'/statics/boot_project_boot4dust.jpg'">
        <div class="custom-heading q-display-3">
          <span>Boot4Dust </span>
        </div>
        <div class="q-subheading">본 프로젝트는 건국대학교 전자전기공학과 학술동아리 BOOT4DIM에서 진행하는 2018 2학기 정기 프로젝트 중 하나로, 6번째 팀의 프로젝트입니다. 아두이노를 비롯한 라즈베리파이, 리눅스 등을 처음 다루기 위해 미세먼지 측정기 제작을 목표로 진행했습니다.</div>
        <hr class="q-hr q-my-lg">
        <div class="q-title q-mb-md">2018. 09. 03 ~ 2018. 11. 25</div>
        <q-btn @click="go('/projects/sample')" color="primary" class="q-py-sm q-px-xl" label="프로젝트 자세히보기" />
      </q-jumbotron> -->
    <q-spinner-dots class="q-mx-auto custom-loading-cards" slot="message" :size="40"></q-spinner-dots>
  </q-infinite-scroll>
</template>

<script>
export default {
  // name: 'PageName',
  created () {
    // this.$store.commit('showcase/updateDarkenTheme', false)
    this.$store.commit('showcase/updateTheme', 'custom1')
  },
  computed: {
    reversedContents: function () {
      return this.contents.slice().reverse()
    }
  },
  methods: {
    go: function (url, projectId) {
      this.$store.commit('showcase/selectProject', projectId)
      this.$router.push(url)
    },
    loadContentsMore: async function (index, done) {
      this.hasMoreContents = true
      try {
        const result = await this.$gql(this.$queries.listProjects)
        console.log('result: ', result)
        this.contents = Object.values(result.data)[0].items
      } catch (e) {
        console.error('error on loadContentsMore():', e)
        this.$q.notify({
          color: 'negative',
          message: '로그인이 필요한 서비스입니다.'
        })
      }
      this.hasMoreContents = false
    }
  },
  data () {
    return {
      selectedTab: null,
      contents: []
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-heading {
  padding: 0 0 0.2em 0;
  line-height: 120%;
  margin-bottom: 0;
}
.q-jumbotron {
  margin-bottom: 1em;
  background: white;
  border-radius: 1rem;
}
</style>
