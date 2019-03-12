<template>
  <q-page>
    <!-- <h1 class="custom-title q-display-1">프로젝트</h1> -->
    <q-alert v-if="infoVisible" color="info" icon="offline_bolt" :actions="[{ label: '닫기', handler: ()=> { infoVisible = false } }]">
      <p class="q-title">새로운 프로젝트 진행을 환영합니다!</p>
      <p class="q-body-1 description">보다 원활한 프로젝트가 될 수 있도록 부트사차원에서 도와드릴게요.</p>
    </q-alert>
    <q-stepper ref="stepper" vertical>
      <q-inner-loading :visible="inProgress" />
      <q-step default title="시작하기">
        <q-field icon="face">
          <q-input v-model="formValue.name" float-label="프로젝트 이름은 무엇인가요?" />
          <q-input v-model="formValue.description" type="textarea" float-label="프로젝트의 목표를 한줄로?" :max-height="2" rows="2" />
        </q-field>
        <q-stepper-navigation>
          <q-btn color="tertiary" @click="$refs.stepper.next()" label="다음" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="어떻게 진행되나요?">
        <p class="q-body-1">와! 흥미로워요! 어떻게 진행되는지 설명해주세요!</p>
        <q-field icon="face" label="어떤 종류의 프로젝트인가요?">
          <q-select multiple v-model="formValue.types" :options="listOptions.type" />
        </q-field>
        <q-field icon="none" label="해당하는 사항에 모두 체크해주세요.">
          <q-select multiple v-model="formValue.topics" :options="listOptions.topic" />
        </q-field>
        <q-field icon="face" label="마감 기한이 있나요?">
          <div class="row">
            <q-radio v-model="formValue.deadlineOption" :val="true" class="col" label="있어요!" />
            <q-radio class="col" v-model="formValue.deadlineOption" :val="false" label="없어요!" />
          </div>
        </q-field>
        <q-field v-if="formValue.deadlineOption!==null" icon="none" label="진행 기간을 적어주세요.">
          <q-datetime v-model="formValue.startDuration" type="date" float-label="시작일" />
          <q-datetime v-if="formValue.deadlineOption===true" v-model="formValue.endDuration" type="date" float-label="종료일" />
        </q-field>
        <q-field icon="face" label="팀장이 누군가요?">
          <q-input type="text" v-model="formValue.manager" placeholder="이름" />
        </q-field>
        <q-field icon="face" label="몇 명이 참여하나요?">
          <q-input type="number" v-model="formValue.personnel" placeholder="숫자" />
        </q-field>
        <q-field icon="face" label="정해진 공간이 있나요?">
          <div class="row">
            <q-radio v-model="formValue.hasPlace" class="col" :val="true" label="있어요!" />
            <q-radio v-model="formValue.hasPlace" class="col" :val="false" label="없어요." />
          </div>
        </q-field>
        <q-field icon="none" v-if="formValue.hasPlace" label="공간 어디서 진행하나요?">
          <q-input type="text" v-model="formValue.place" placeholder="주소/호실명" />
        </q-field>
        <q-stepper-navigation>
          <q-btn color="tertiary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="$refs.stepper.next()" label="다음" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="자세하게 알려주세요!">
        <p class="q-body-1">조금 더 자세하게 알려주세요!</p>
        <div v-if="formValue.types.includes('study')">
          <q-field icon="face">스터디/수업에 관한 질문입니다.</q-field>
          <q-field label="다루는 주제를 모두 체크해주세요.">
            <q-select multiple v-model="formValue.study.topics" :options="listOptions.study" />
          </q-field>
          <q-field label="몇 회의 모임을 가지나요?">
            <q-input type="text" v-model="formValue.study.meeting" placeholder="예시> 주당 2회 총 8회" />
          </q-field>
          <q-field label="해당 내용을 가르쳐주는 튜터가 있나요?">
            <div class="row">
              <q-radio v-model="formValue.study.hasTutor" :val="true" class="col" label="있어요!" />
              <q-radio class="col" v-model="formValue.study.hasTutor" :val="false" label="없어요!" />
            </div>
          </q-field>
          <q-field v-if="formValue.study.hasTutor" label="튜터의 성함을 적어주세요!">
            <q-input type="text" v-model="formValue.study.tutor" placeholder="성함" />
          </q-field>
        </div>
        <div v-if="formValue.types.includes('contest')">
          <q-field icon="face">작품제작/공모전에 관한 질문입니다.</q-field>
          <q-field label="해당 사항을 선택해주세요.">
            <q-select v-model="formValue.contest.topic" :options="listOptions.contest" />
          </q-field>
          <q-field v-if="formValue.contest.topic==='nocontest'" label="어떤 작품을 만드는지 간단하게 설명해주세요!">
            <q-input type="text" v-model="formValue.contest.productDescription" placeholder="작품 이름" />
          </q-field>
          <q-field v-if="formValue.contest.topic!=='nocontest'" label="어떤 공모전/전시회에 나가시나요?">
            <q-input type="text" v-model="formValue.contest.name" placeholder="공모전 이름" />
          </q-field>
          <q-field v-if="formValue.contest.topic!=='nocontest'" label="작품 제출일자는 언제인가요?">
            <div class="row">
              <q-datetime v-model="formValue.contest.duedate" class="col" type="date" float-label="작품 제출일" :disable="!formValue.contest.hasDuedate" />
              <q-checkbox v-model="formValue.contest.hasDuedate" :true-value="false" :false-value="true" label="미정" @input="resetValue(formValue.contest, 'duedate')" />
            </div>
          </q-field>
          <q-field v-if="formValue.contest.topic!=='nocontest'" label="공모전/전시회의 목표는?">
            <div class="row">
              <q-radio v-model="formValue.contest.objectives" class="col" :val="'towin'" label="수상!" />
              <q-radio v-model="formValue.contest.objectives" class="col" :val="'tojoin'" label="참여하는데 의미를 둬요!" />
            </div>
          </q-field>
        </div>
        <div v-if="formValue.types.includes('seminar')">
          <q-field icon="face">세미나에 관한 질문입니다.</q-field>
          <q-field label="세미나 주제를 선택해주세요.">
            <q-select v-model="formValue.seminar.topics" multiple :options="listOptions.study" />
          </q-field>
          <q-field label="세미나 유형을 선택해주세요.">
            <div class="row">
              <q-radio v-model="formValue.seminar.isOnce" :val="true" class="col" label="한번만 하는 일회성 세미나" />
              <q-radio v-model="formValue.seminar.isOnce" :val="false" class="col" label="여러번 하는 세미나" />
            </div>
          </q-field>
          <q-field v-if="!formValue.seminar.isOnce" label="몇 회의 세미나를 가지나요?">
            <q-input type="text" v-model="formValue.seminar.meeting" placeholder="예시> 주당 2회 총 8회" />
          </q-field>
          <q-field label="발표자 성함을 적어주세요.">
            <q-input type="text" v-model="formValue.seminar.presenter" placeholder="성함" />
          </q-field>
        </div>
        <div v-if="formValue.types.includes('share')">
          <q-field icon="face">자료공유에 관한 질문입니다.</q-field>
          <q-field label="본인 외 저작물이 있는 자료를 공유하시나요?">
            <div class="row">
              <q-radio v-model="formValue.share.hasCopyright" :val="true" class="col" label="네!" />
              <q-radio v-model="formValue.share.hasCopyright" :val="false" class="col" label="아니오!" />
            </div>
          </q-field>
          <q-field v-if="formValue.share.hasCopyright" label="저작물의 출처를 적어주세요.">
            <q-input type="text" v-model="formValue.share.copyright" placeholder="출처" />
          </q-field>
        </div>
        <div v-if="formValue.types.includes('agile')">
          <q-field icon="face">애자일에 관한 질문입니다.</q-field>
          <q-field label="애자일 프로젝트를 경험해보셨나요?">
            <div class="row">
              <q-radio v-model="formValue.agile.hasBeen" :val="true" class="col" label="네!" />
              <q-radio v-model="formValue.agile.hasBeen" :val="false" class="col" label="아니오!" />
            </div>
          </q-field>
        </div>
        <div v-if="formValue.types.includes('etc')">
          <q-field icon="face">기타 사항에 관한 질문입니다.</q-field>
          <q-field label="프로젝트에 관한 구체적인 내용을 설명해주세요!">
            <q-input v-model="formValue.etc.description" type="textarea" float-label="프로젝트 설명" :max-height="2" rows="2" />
          </q-field>
        </div>
        <q-stepper-navigation>
          <q-btn color="tertiary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="$refs.stepper.next()" label="다음" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="어떤 도움이 필요한가요?">
        <q-field icon="face">부트사차원에서 도움을 드리려고 해요!</q-field>
        <q-field v-if="!formValue.hasPlace" label="원하시는 공간이 있나요?">
          <div class="row">
            <q-select class="col" multiple v-model="formValue.request.hopePlaces" :options="listOptions.hopePlace" :disable="!formValue.request.hasHopePlace" />
            <q-checkbox v-model="formValue.request.hasHopePlace" :true-value="false" :false-value="true" label="필요없어요" @input="resetValue(formValue.request, 'hopePlaces')" />
          </div>
        </q-field>
        <q-field label="동아리 소유자산 중 필요한 부품/준비물이 있나요?">
          <div class="row">
            <q-radio v-model="formValue.request.needMaterial" :val="true" class="col" label="네!" />
            <q-radio v-model="formValue.request.needMaterial" :val="false" class="col" label="아니오!" />
          </div>
        </q-field>
        <q-field v-if="formValue.request.needMaterial" label="필요한 물품을 모두 적어주세요.">
          <q-input type="text" v-model="formValue.request.material" :placeholder="'예시> 아두이노, 점퍼케이블'" />
        </q-field>
        <q-field label="필요 예산이 있나요?">
          <div class="row">
            <q-radio v-model="formValue.request.needBudget" :val="true" class="col" label="네!" />
            <q-radio v-model="formValue.request.needBudget" :val="false" class="col" label="아니오!" />
          </div>
        </q-field>
        <q-field v-if="formValue.request.needBudget" label="얼마정도 예상하시나요?">
          <q-input type="number" min="1000" max="150000" v-model="formValue.request.budget" :placeholder="'숫자만, 추천금액: '+formValue.personnel*3000+'원'" />
        </q-field>
        <q-field v-if="formValue.personnel >= 15" label="15인 이상 프로젝트에 간식비 신청이 가능한데 간식비 신청하시겠어요?">
          <div class="row">
            <q-radio v-model="formValue.request.needCookie" :val="true" class="col" label="네!" />
            <q-radio v-model="formValue.request.needCookie" :val="false" class="col" label="필요없어요!" />
          </div>
        </q-field>
        <q-field>
          <q-input v-model="formValue.request.extra" placeholder="추가적으로 필요한 도움 있으면 적어주세요." />
        </q-field>
        <q-stepper-navigation>
          <q-btn color="tertiary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="createProject()" label="프로젝트 생성" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  created () {
    // this.$store.commit('showcase/updateTheme', 'custom1')
  },
  computed: {
    userInfo: {
      get () {
        console.log('userInfo on ProjectNew: ', this.$store.state.showcase.userInfo)
        return this.$store.state.showcase.userInfo
      }
    }
  },
  methods: {
    // selectMultipleText: function (array) {
    //   return `${array.length ? array[0].toUpperCase() + ' 등 ' + array.length + '개 선택되었어요.' : '선택된 것이 없어요!'}`
    // },
    clean: (obj) => {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
          delete obj[propName]
        }
      }
      return obj
    },
    resetValue: function (parent, element) {
      if (typeof (parent[element]) === 'object') {
        parent[element] = []
      } else {
        parent[element] = ''
      }
    },
    createProject: async function () {
      this.$q.loading.show()
      const userInfo = this.userInfo
      console.log('userInfo: ', userInfo, this.userInfo)
      userInfo.position = 5
      console.log('formValue: ', this.formValue)
      const startDuration = this.formValue.startDuration ? this.formValue.startDuration.slice(0, 10) : null
      const endDuration = this.formValue.endDuration ? this.formValue.endDuration.slice(0, 10) : null

      const formData = {
        proposer: userInfo,
        name: this.formValue.name,
        description: this.formValue.description,
        types: this.formValue.types,
        topics: this.formValue.topics,
        deadlineOption: this.formValue.deadlineOption,
        startDuration: startDuration,
        endDuration: endDuration,
        manager: this.formValue.manager,
        personnel: this.formValue.personnel,
        hasPlace: this.formValue.hasPlace,
        place: this.formValue.place,
        studyTopics: this.formValue.study.topics,
        studyMeeting: this.formValue.study.meeting,
        studyTutor: this.formValue.study.tutor,
        contestTopic: this.formValue.contest.topic,
        contestProductDescription: this.formValue.contest.productDescription,
        contestName: this.formValue.contest.name,
        contestDuedate: this.formValue.contest.duedate,
        contestObjectives: this.formValue.contest.objectives,
        seminarTopics: this.formValue.seminar.topics,
        seminarIsOnce: this.formValue.seminar.isOnce,
        seminarMeeting: this.formValue.seminar.meeting,
        seminarPresenter: this.formValue.seminar.presenter,
        shareCopyright: this.formValue.share.copyright,
        agileHasBeen: this.formValue.agile.hasBeen,
        etcDescription: this.formValue.etc.description,
        // request: {
        //   items: [],
        //   nextTokens: ''
        // },
        // activities: [],
        // contributors: [],
        // comments: [],
        // contents: [],
        fixedBudget: 0,
        // pictures: [],
        // supports: [],
        // teamNotes: [],
        status: 1,
        syncGithub: false,
        themeColor: null
      }
      const formRequest = {
        date: new Date().toISOString(),
        requester: userInfo,
        hopePlaces: this.formValue.request.hopePlaces,
        material: this.formValue.request.material,
        budget: this.formValue.request.budget,
        cookie: this.formValue.request.cookie,
        extra: this.formValue.request.extra,
        status: 1
      }
      try {
        // TODO: Connect Request - Project Model
        // queryData.request = [request]
        const queryData = this.clean(formData)
        const queryRequest = this.clean(formRequest)

        console.log('queryData: ', queryData)
        const data = await this.$gql(this.$mutations.createProject, {
          input: queryData
        })
        console.log('result on creating data: ', data)
        console.log('queryRequest: ', queryRequest)

        // queryRequest['projectId'] = data.id
        const request = await this.$gql(this.$mutations.createRequest, {
          input: queryRequest
        })
        console.log('request: ', request)
        this.$q.loading.hide()
        this.$q.notify({
          color: 'positive',
          message: '프로젝트를 생성하였어요.'
        })
        this.$router.push('/projects/')
      } catch (e) {
        console.error('error on createProject(): ', e)
        this.$q.notify({
          color: 'negative',
          message: '프로젝트를 생성하지 못했어요.'
        })
        this.$q.loading.hide()
      }
    }
  },
  data () {
    return {
      inProgress: false,
      infoVisible: true,
      formValue: {
        name: '',
        description: '',
        types: [],
        topics: [],
        deadlineOption: true,
        startDuration: null,
        endDuration: null,
        manager: null,
        personnel: null,
        hasPlace: null,
        place: null,
        study: {
          topics: [],
          meeting: null,
          hasTutor: null,
          tutor: null
        },
        contest: {
          topic: null,
          productDescription: null,
          name: null,
          hasDuedate: true,
          duedate: null,
          objectives: null
        },
        seminar: {
          topics: [],
          isOnce: true,
          meeting: null,
          presenter: null
        },
        share: {
          hasCopyright: null,
          copyright: ''
        },
        agile: {
          hasBeen: null
        },
        etc: {
          description: null
        },
        request: {
          hasHopePlace: true,
          hopePlaces: [],
          needMaterial: null,
          material: null,
          needBudget: null,
          budget: null,
          needCookie: null,
          cookie: null,
          extra: null
        }
      },
      listOptions: {
        type: [
          { label: '스터디/수업', value: 'study' },
          { label: '작품제작/공모전', value: 'contest' },
          { label: '세미나', value: 'seminar' },
          { label: '자료공유', value: 'share' },
          { label: '애자일', value: 'agile' },
          { label: '기타', value: 'etc' }
        ],
        topic: [
          { label: '소프트웨어/코딩', value: 'sw' },
          { label: '하드웨어', value: 'hw' },
          { label: '인공지능/기계학습', value: 'ai' },
          { label: '통계/분석/빅데이터', value: 'an' },
          { label: '외국어', value: 'lang' },
          { label: '기타', value: 'etc' }
        ],
        study: [
          { label: '파이썬', value: 'python' },
          { label: 'C/C++', value: 'c' },
          { label: '웹 프로그래밍', value: 'web' },
          { label: '아두이노', value: 'arduino' },
          { label: '라즈베리파이', value: 'raspberry' },
          { label: 'AVR', value: 'avr' },
          { label: 'MCU', value: 'mcu' },
          { label: 'FPGA', value: 'fpga' },
          { label: '매트랩', value: 'matlab' },
          { label: '영상처리', value: 'graphic' },
          { label: '네트워크', value: 'network' },
          { label: '위 해당없음', value: 'etc' }
        ],
        contest: [
          { label: '하드웨어 공모전/전시회 출품', value: 'hwcontest' },
          { label: '소프트웨어 공모전/전시회 출품', value: 'swcontest' },
          { label: '단순 작품제작', value: 'nocontest' }
        ],
        hopePlace: [
          { label: '동아리방', value: 'club' },
          { label: '공대 강의실', value: 'lectureroom' },
          { label: '세미나실', value: 'seminarroom' }
        ],
        sharing: [
          { label: '시험 기출(족보)', value: 'classQuiz' },
          { label: '수업 자료', value: 'classMaterial' },
          { label: '지식 공유', value: 'knowledge' },
          { label: '세미나 자료', value: 'seminar' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-stepper {
  margin-top: 0.5rem;
}

.q-alert {
  p:first-child {
    margin-bottom: 0.25em;
  }
  p:last-child {
    margin: 0;
  }
}

.q-btn + .q-btn {
  margin-left: 1em;
}
</style>
