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
          <q-select :display-value="selectMultipleText(formValue.typeMultipleSelect)" multiple v-model="formValue.typeMultipleSelect" :options="listOptions.type" />
        </q-field>
        <q-field icon="none" label="해당하는 사항에 모두 체크해주세요.">
          <q-select :display-value="selectMultipleText(formValue.topicMultipleSelect)" multiple v-model="formValue.topicMultipleSelect" :options="listOptions.topic" />
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
          <q-btn color="primary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="$refs.stepper.next()" label="다음" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="자세하게 알려주세요!">
        <p class="q-body-1">조금 더 자세하게 알려주세요!</p>
        <div v-if="formValue.typeMultipleSelect.includes('스터디')">
          <q-field icon="face">스터디성 프로젝트에 관한 질문입니다.</q-field>
          <q-field label="다루는 주제를 모두 체크해주세요.">
            <q-select :display-value="selectMultipleText(formValue.study.topicMultipleSelect)" multiple v-model="formValue.study.topicMultipleSelect" :options="listOptions.study" />
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
        <div v-if="formValue.typeMultipleSelect.includes('작품제작')">
          <q-field icon="face">작품제작/공모전에 관한 질문입니다.</q-field>
          <q-field label="해당 사항을 선택해주세요.">
            <q-select v-model="formValue.contest.topicSelect" :options="listOptions.contest" />
          </q-field>
          <q-field label="어떤 공모전/전시회에 나가시나요?">
            <q-input type="text" v-model="formValue.contest.name" placeholder="공모전 이름" />
          </q-field>
          <q-field v-if="formValue.contest.topicSelect!=='nocontest'" label="작품 제출일자는 언제인가요?">
            <div class="row">
              <q-datetime v-model="formValue.contest.duedate" class="col" type="date" float-label="작품 제출일" :disable="!formValue.contest.hasDuedate" />
              <q-checkbox v-model="formValue.contest.hasDuedate" :true-value="false" :false-value="true" label="미정" @input="resetValue(formValue.contest, 'duedate')" />
            </div>
          </q-field>
          <q-field v-if="formValue.contest.topicSelect!=='nocontest'" label="공모전/전시회의 목표는?">
            <div class="row">
              <q-radio v-model="formValue.contest.objectives" class="col" :val="'towin'" label="수상!" />
              <q-radio v-model="formValue.contest.objectives" class="col" :val="'tojoin'" label="참여하는데 의미를 둬요!" />
            </div>
          </q-field>
        </div>
        <div v-if="formValue.typeMultipleSelect.includes('세미나')">
          <q-field icon="face">세미나/수업에 관한 질문입니다.</q-field>
          <q-field label="몇 회의 모임을 가지나요?">
            <q-input type="text" v-model="formValue.seminar.meeting" placeholder="예시> 주당 2회 총 8회" />
          </q-field>
          <q-field label="해당 내용을 가르쳐주는 튜터가 있나요?">
            <div class="row">
              <q-radio v-model="formValue.seminar.tutorOption" :val="true" class="col" label="있어요!" />
              <q-radio class="col" v-model="formValue.seminar.tutorOption" :val="false" label="없어요!" />
            </div>
          </q-field>
          <q-field v-if="formValue.seminar.tutorOption" label="튜터의 성함을 적어주세요!">
            <q-input type="text" v-model="formValue.seminar.tutor" placeholder="성함" />
          </q-field>
        </div>
        <div v-if="formValue.typeMultipleSelect.includes('단순공유')">
          <q-field icon="face">단순공유에 관한 질문입니다.</q-field>
          <q-field label="본인 외 저작물이 있는 자료를 공유하시나요?">
            <div class="row">
              <q-radio v-model="formValue.share.hasCopyright" :val="true" class="col" label="네!" />
              <q-radio v-model="formValue.share.hasCopyright" :val="false" class="col" label="아니오!" />
            </div>
          </q-field>
        </div>
        <div v-if="formValue.typeMultipleSelect.includes('애자일')">
          <q-field icon="face">애자일에 관한 질문입니다.</q-field>
          <q-field label="애자일 프로젝트를 경험해보셨나요?">
            <div class="row">
              <q-radio v-model="formValue.agile.hasBeen" :val="true" class="col" label="네!" />
              <q-radio v-model="formValue.agile.hasBeen" :val="false" class="col" label="아니오!" />
            </div>
          </q-field>
        </div>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="$refs.stepper.next()" label="다음" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="어떤 도움이 필요한가요?">
        <q-field icon="face">부트사차원에서 도움을 드리려고 해요!</q-field>
        <q-field v-if="!formValue.hasPlace" label="원하시는 공간이 있나요?">
          <div class="row">
            <q-select class="col" :display-value="selectMultipleText(formValue.request.hopePlaceMultipleSelect)" multiple v-model="formValue.request.hopePlaceMultipleSelect" :options="listOptions.hopePlace" :disable="!formValue.request.hopePlace" />
            <q-checkbox v-model="formValue.request.hopePlace" :true-value="false" :false-value="true" label="필요없어요" @input="resetValue(formValue.request, 'hopePlaceMultipleSelect')" />
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
        <q-field v-if="formValue.personnel >= 20" label="20인 이상 프로젝트에 간식비 신청이 가능한데 간식비 신청하시겠어요?">
          <div class="row">
            <q-radio v-model="formValue.request.needCookie" :val="true" class="col" label="네!" />
            <q-radio v-model="formValue.request.needCookie" :val="false" class="col" label="필요없어요!" />
          </div>
        </q-field>
        <q-field>
          <q-input v-model="formValue.request.extra" placeholder="추가적으로 필요한 도움 있으면 적어주세요." />
        </q-field>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.previous()" label="이전" />
          <q-btn color="secondary" @click="sendFormValue()" label="프로젝트 생성" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  mounted () {
    this.$store.commit('showcase/updateDarkenTheme', false)
  },
  data () {
    return {
      inProgress: false,
      infoVisible: true,
      formValue: {
        name: '',
        description: '',
        typeMultipleSelect: [],
        topicMultipleSelect: [],
        deadlineOption: true,
        startDuration: null,
        endDuration: null,
        manager: null,
        personnel: null,
        hasPlace: null,
        place: null,
        study: {
          topicMultipleSelect: [],
          hasTutor: null,
          tutor: null,
          meeting: null
        },
        contest: {
          topicSelect: null,
          name: null,
          duedate: null,
          hasDuedate: true,
          objectives: null,
          select: null
        },
        seminar: {
          meeting: null,
          tutor: null,
          tutorOption: null
        },
        share: {
          hasCopyright: null
        },
        agile: {
          hasBeen: null
        },
        request: {
          hopePlace: true,
          hopePlaceMultipleSelect: [],
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
          { label: '스터디성 프로젝트', value: '스터디' },
          { label: '작품제작/공모전', value: '작품제작' },
          { label: '세미나/수업', value: '세미나' },
          { label: '단순공유', value: '단순공유' },
          { label: '개인', value: '개인' },
          { label: '애자일', value: '애자일' }
        ],
        topic: [
          { label: '소프트웨어/코딩', value: 'sw' },
          { label: '하드웨어', value: 'hw' },
          { label: '인공지능/기계학습', value: 'ai' },
          { label: '통계/분석/빅데이터', value: 'an' },
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
          { label: '하드웨어 공모전/전시회', value: 'hwcontest' },
          { label: '소프트웨어 공모전/전시회', value: 'swcontest' },
          { label: '공모전/전시회 아님', value: 'noconest' }
        ],
        hopePlace: [
          { label: '동아리방', value: 'club' },
          { label: '공대 강의실', value: 'lectureroom' },
          { label: '세미나실', value: 'seminarroom' }
        ]
      }
    }
  },
  methods: {
    selectMultipleText: function (array) {
      return `${array.length ? array[0].toUpperCase() + ' 등 ' + array.length + '개 선택되었어요.' : '선택된 것이 없어요!'}`
    },
    resetValue: function (parent, element) {
      if (typeof (parent[element]) === 'object') {
        parent[element] = []
      } else {
        parent[element] = ''
      }
    },
    sendFormValue: function () {
      // console.log(this.formValue)
      this.$router.push('/projects/sample')
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
