<template>
  <q-page padding>
    <q-table :data="supports.data" :columns="supports.columns">
      <template slot="top-right" slot-scope="supportsProps">
        <q-btn flat round dense icon="edit" />
        <q-btn flat round dense icon="delete" />
        <q-btn flat round dense :icon="supportsProps.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="supportsProps.toggleFullscreen" />
      </template>
    </q-table>

    <q-table :data="projects.data" :columns="projects.columns" :pagination.sync="projects.pagination" row-key="name" color="secondary" :loading="true" :selection="projects.selection" :selected.sync="projects.selected">
      <template slot="top-left" slot-scope="projectsProps">
        <q-search hide-underline color="secondary" v-model="projects.searchString" class="col-6" />
      </template>
      <template slot="top-right" slot-scope="projectsProps">
        <q-btn flat round dense icon="edit" />
        <q-btn flat round dense icon="delete" />
        <q-btn flat round dense :icon="projectsProps.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="projectsProps.toggleFullscreen" />
      </template>
    </q-table>

    <q-card>
      <q-card-title>프로젝트 내용</q-card-title>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  watch: {
    'selected': function () {
      console.log('selected: ', this.selected)
    }
  },
  data () {
    return {
      projectsProps: {},
      supportsProps: {},
      projects: {
        searchString: '',
        props: {},
        separator: 'vertical',
        selection: 'single',
        selected: [],
        columns: [
          {
            name: 'name',
            required: true,
            label: '이름',
            align: 'center',
            field: 'name',
            sortable: true
          },
          {
            name: 'status',
            required: true,
            label: '진행현황',
            align: 'center',
            field: 'status',
            sortable: true,
            format: val => `${['준비중', '진행중', '중지', '실패', '완료'][val]}`
          },
          {
            name: 'manager',
            required: true,
            label: '매니저',
            align: 'center',
            field: 'manager',
            sortable: true
          },
          {
            name: 'personnel',
            required: true,
            label: '인원',
            align: 'center',
            field: 'personnel',
            sortable: true
          },
          {
            name: 'startDuration',
            required: true,
            label: '시작일',
            align: 'center',
            field: 'startDuration',
            sortable: true,
            format: val => new Date(val).toLocaleDateString()
          }
        ],
        pagination: {
          sortBy: 'name',
          descending: false,
          page: 1,
          rowsPerPage: 20
        },
        data: [
          {
            name: 'TestProject',
            status: 1,
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
                src: 'statics/boot4dust_sample1.jpeg',
                title: '부스 사진',
                date: new Date('2018-11-05').toLocaleTimeString(),
                body: 'Boot4Dust 프로젝트 사진입니다 :)'
              },
              {
                src: 'statics/boot4dust_sample2.jpeg',
                title: '제품 외형',
                date: new Date('2018-11-05').toLocaleTimeString(),
                body: 'Boot4Dust 프로젝트 사진입니다 :)'
              },
              {
                src: 'statics/boot4dust_sample3.jpeg',
                title: '회로 제작기',
                date: new Date('2018-11-05').toLocaleTimeString(),
                body: 'Boot4Dust 프로젝트 사진입니다 :)'
              },
              {
                src: 'statics/boot4dust_sample4.jpeg',
                title: '미세먼지 센서',
                date: new Date('2018-11-05').toLocaleTimeString(),
                body: 'Boot4Dust 프로젝트 사진입니다 :)'
              }
            ],
            notifications: [
              {
                label: '새 프로젝트를 생성하였습니다.',
                date: new Date() - 7200000,
                avatar: 'statics/boot_logo.png'
              },
              {
                label: '운영진에게 프로젝트 진행 시 필요한 사항을 전달했습니다.',
                date: new Date() - 360000,
                avatar: 'statics/boot_logo.png'
              }
            ],
            contributors: [
              {
                label: '김지형',
                avatar: 'statics/profile_kjh.png',
                email: '100kimch@naver.com',
                position: '매니저'
              }
            ],
            comments: [
              {
                avatar: 'statics/profile_kjh.png',
                body: ['프로젝트 후기입니다.보람찼네요.'],
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
            teamNotes: [
              {
                title: '개인 노트작성하기',
                date: new Date('2018-11-01'),
                body: '안녕하세요.'
              }
            ],
            contents: [
              {
                title: '새로운 프로젝트가 시작되었습니다!',
                date: new Date('2018-09-03'),
                numIssue: 0,
                contributor: {
                  label: '김지형',
                  avatar: 'statics/profile_kjh.png',
                  email: '100kimch@naver.com'
                },
                isModifying: false,
                isLike: false,
                themeColor: false,
                headerImgSrc: '',
                numLikes: 3,
                numComments: 10,
                showComments: false,
                body: 'hello',
                newCommentBody: '',
                comments: [
                  {
                    date: new Date('2018-11-09'),
                    writer: {
                      label: '김기리',
                      avatar: 'statics/profile_kjh.png',
                      email: 'oioi@naver.com'
                    },
                    body: ['안녕하세요']
                  },
                  {
                    date: new Date('2018-11-09'),
                    writer: {
                      label: '김지형',
                      avatar: 'statics/profile_kjh.png',
                      email: '100kimch@naver.com'
                    },
                    body: ['안녕하세요']
                  },
                  {
                    date: new Date('2018-11-09'),
                    writer: {
                      label: '이한울',
                      avatar: 'statics/profile_kjh.png',
                      email: 'kim@naver.com'
                    },
                    body: ['안녕하세요']
                  },
                  {
                    date: new Date('2018-11-10'),
                    writer: {
                      label: '김지형',
                      avatar: 'statics/profile_kjh.png',
                      email: '100kimch@naver.com'
                    },
                    body: ['댓글 시험중입니다.']
                  }
                ]
              }
            ]
          },
          {
            name: 'Boot4Dust',
            status: 1,
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
                src: 'statics/boot4dust_sample1.jpeg',
                title: '부스 사진',
                date: new Date('2018-11-05').toLocaleTimeString(),
                body: 'Boot4Dust 프로젝트 사진입니다 :)'
              },
              {
                src: 'statics/boot4dust_sample2.jpeg',
                title: '제품 외형',
                date: new Date('2018-11-05').toLocaleTimeString(),
                body: 'Boot4Dust 프로젝트 사진입니다 :)'
              },
              {
                src: 'statics/boot4dust_sample3.jpeg',
                title: '회로 제작기',
                date: new Date('2018-11-05').toLocaleTimeString(),
                body: 'Boot4Dust 프로젝트 사진입니다 :)'
              },
              {
                src: 'statics/boot4dust_sample4.jpeg',
                title: '미세먼지 센서',
                date: new Date('2018-11-05').toLocaleTimeString(),
                body: 'Boot4Dust 프로젝트 사진입니다 :)'
              }
            ],
            notifications: [
              {
                label: '새 프로젝트를 생성하였습니다.',
                date: new Date() - 7200000,
                avatar: 'statics/boot_logo.png'
              },
              {
                label: '운영진에게 프로젝트 진행 시 필요한 사항을 전달했습니다.',
                date: new Date() - 360000,
                avatar: 'statics/boot_logo.png'
              }
            ],
            contributors: [
              {
                label: '김지형',
                avatar: 'statics/profile_kjh.png',
                email: '100kimch@naver.com',
                position: '매니저'
              }
            ],
            comments: [
              {
                avatar: 'statics/profile_kjh.png',
                body: ['프로젝트 후기입니다.보람찼네요.'],
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
            teamNotes: [
              {
                title: '개인 노트작성하기',
                date: new Date('2018-11-01'),
                body: '안녕하세요.'
              }
            ],
            contents: [
              {
                title: '새로운 프로젝트가 시작되었습니다!',
                date: new Date('2018-09-03'),
                numIssue: 0,
                contributor: {
                  label: '김지형',
                  avatar: 'statics/profile_kjh.png',
                  email: '100kimch@naver.com'
                },
                isModifying: false,
                isLike: false,
                themeColor: false,
                headerImgSrc: '',
                numLikes: 3,
                numComments: 10,
                showComments: false,
                body: 'hello',
                newCommentBody: '',
                comments: [
                  {
                    date: new Date('2018-11-09'),
                    writer: {
                      label: '김기리',
                      avatar: 'statics/profile_kjh.png',
                      email: 'oioi@naver.com'
                    },
                    body: ['안녕하세요']
                  },
                  {
                    date: new Date('2018-11-09'),
                    writer: {
                      label: '김지형',
                      avatar: 'statics/profile_kjh.png',
                      email: '100kimch@naver.com'
                    },
                    body: ['안녕하세요']
                  },
                  {
                    date: new Date('2018-11-09'),
                    writer: {
                      label: '이한울',
                      avatar: 'statics/profile_kjh.png',
                      email: 'kim@naver.com'
                    },
                    body: ['안녕하세요']
                  },
                  {
                    date: new Date('2018-11-10'),
                    writer: {
                      label: '김지형',
                      avatar: 'statics/profile_kjh.png',
                      email: '100kimch@naver.com'
                    },
                    body: ['댓글 시험중입니다.']
                  }
                ]
              }
            ]
          }
        ]
      },
      supports: {
        props: {},
        seperator: 'vertical',
        selection: 'multiple',
        selected: [],
        columns: [
          {
            name: 'label',
            required: true,
            label: '제목',
            align: 'left',
            field: 'label',
            sortable: true
          },
          {
            name: 'sublabel',
            label: '설명',
            align: 'left',
            field: 'sublabel',
            sortable: true
          }
        ],
        pagination: {
          sortBy: 'label',
          descending: false,
          page: 1,
          rowsPerPage: 20
        },
        data: [
          {
            label: '20인 다과제공',
            sublabel: '20인 이상 프로젝트시 제공되는 다과입니다.'
          },
          {
            label: '부품',
            sublabel: '프로젝트시 필요한 부품을 제공했습니다'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.q-table-container {
  background: white;
}
</style>
