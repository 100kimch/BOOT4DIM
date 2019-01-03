<template>
  <q-page class="plans-page" padding>
      <c-navigation />
      <h1 class="custom-title q-display-1">
        <b>연간 계획</b> 및 진행 현황</h1>
      <q-card v-if="!editable">
        <q-timeline responsive color="secondary">
          <q-timeline-entry :key="index" v-for="(data, index) in planData" :heading="data.heading" :title="data.title" :subtitle="data.subtitle">
            <p>{{ data.body }}</p>
          </q-timeline-entry>
        </q-timeline>
        <div class="custom-option-box">
          <q-btn color="primary" @click="editable = true">수정하기</q-btn>
        </div>
      </q-card>
      <q-card v-if="editable">
        <q-input type="textarea" v-model="strPlanData" />
        <div class="custom-option-box">
          <q-btn color="primary" @click="resetData()">취소</q-btn>
          <q-btn color="secondary" @click="editData()">등록</q-btn>
        </div>
      </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      editable: false,
      strPlanData: '',
      planData: [
        {
          heading: true,
          body: '2018년'
        },
        {
          title: 'PRIME 학과 작품전시회',
          subtitle: '11월 9일',
          side: 'left',
          body: '부트사차원의 여섯 팀이 2개월 간의 노력으로 PRIME 학과 작품전시회에 참여하였습니다. 라인트레이서, 미세먼지측정 IoT, 아두이노 활용 작품 등 다양한 작품을 선보였었습니다.'
        },
        {
          title: '31기 동계 신입부원 모집 (타과생)',
          subtitle: '12월',
          side: 'right',
          body: '전기전자공학과에서 벗어나 타과생을 대상으로 31기 부원을 모집하였습니다. 신입 부원들은 2018-2019 겨울방학 스터디부터 같이 활동합니다.'
        },
        {
          heading: true,
          body: '2019년 1학기'
        },
        {
          title: 'Python 활용 스터디',
          subtitle: '1월 7일 ~ 1월 28일',
          side: 'left',
          body: '겨울방학 소프트웨어 스터디로서 파이썬을 비롯한 프로젝트시 유용한 스킬들을 익힙니다. 34명이 참여하고, 총 10회에 걸쳐 진행됩니다.'
        },
        {
          title: 'Tensorflow 및 딥러닝 기초 스터디',
          subtitle: '1월 7일 ~ 3월 31일',
          side: 'right',
          body: '겨울방학 인공지능 스터디로서 파이썬을 비롯한 프로젝트시 유용한 스킬들을 익힙니다. 6명이 참여하고, 모두의연구소 풀잎스쿨을 통한 외부강의로 진행됩니다.'
        },
        {
          title: 'AVR 스터디',
          subtitle: '1월 7일 ~ 1월 28일',
          side: 'left',
          body: '겨울방학 하드웨어 스터디로서 AVR 실습이 진행됩니다. 3학년 응용설계 범위를 선행학습하고, 한발 더 들어가 연구합니다.'
        },
        {
          title: '31기 신입부원 모집',
          subtitle: '3월 중',
          side: 'right',
          body: '신입생을 대상으로 31기 신입부원을 모집합니다.'
        },
        {
          title: '춘계 엠티',
          subtitle: '3월 4째주',
          side: 'left',
          body: '신입부원 및 기존부원이 함께 어울려 활동하는 워크샵입니다.'
        }
      ]
    }
  },
  methods: {
    resetData: function () {
      this.editable = false
    },
    editData: function () {
      this.editable = false
      this.planData = JSON.parse(this.strPlanData)
      // http request
    }
  },
  watch: {
    'editable': function (val, oldVal) {
      if (val === true && oldVal === false) {
        this.strPlanData = JSON.stringify(this.planData, undefined, 4)
      }
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 767px) {
  h6 {
    font-size: 20px !important;
  }
}
.plans-page {
  .q-card {
    padding: 1em;
    background: white;
  }
}
.custom-box p {
  text-align: left !important;
  word-break: keep-all;
}
</style>
