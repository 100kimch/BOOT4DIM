<template>
  <q-page padding>
    <q-table :data="tableData" :columns="columns" :pagination.sync="pagination" row-key="email" color="secondary" :loading="true" :selection="selection" :selected.sync="selected">
      <template slot="top-left" slot-scope="props">
        <q-search hide-underline color="secondary" v-model="searchString" class="col-6" />
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn flat round dense icon="edit" />
        <q-btn flat round dense icon="delete" />
        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      searchString: '',
      props: {},
      separator: 'vertical',
      selection: 'multiple',
      selected: [],
      visibleColumns: [],
      columns: [
        {
          name: 'level',
          required: true,
          label: '등급',
          align: 'center',
          field: 'level',
          sortable: true,
          sort: (a, b) => {
            const levels = ['관리자', '정회원', '준회원', '졸업생']
            return levels.indexOf(a) - levels.indexOf(b)
          }
        },
        {
          name: 'name',
          required: true,
          label: '이름',
          align: 'center',
          field: 'label',
          sortable: true
        },
        {
          name: 'email',
          required: true,
          label: '이메일',
          align: 'left',
          field: 'email',
          sortable: true
        }
      ],
      pagination: {
        sortBy: 'level',
        descending: false,
        page: 1,
        rowsPerPage: 20
      },
      tableData: [
        {
          label: '김지형',
          avatar: 'statics/profile_kjh.png',
          email: '100kimch@naver.com',
          level: '관리자'
        },
        {
          label: '김한솔',
          avatar: 'statics/profile_kjh.png',
          email: 'saifjoqwd@naver.com',
          level: '관리자'
        },
        {
          label: '홍길동',
          avatar: 'statics/profile_kjh.png',
          email: 'gtgerf@naver.com',
          level: '졸업생'
        },
        {
          label: '김기리',
          avatar: 'statics/profile_kjh.png',
          email: 'degrwedd@naver.com',
          level: '준회원'
        },
        {
          label: '양하영',
          avatar: 'statics/profile_kjh.png',
          email: 'gregref@naver.com',
          level: '졸업생'
        },
        {
          label: '이미리',
          avatar: 'statics/profile_kjh.png',
          email: 'biotbjrtio2@naver.com',
          level: '졸업생'
        },
        {
          label: '박하림',
          avatar: 'statics/profile_kjh.png',
          email: 'sdf312ds@naver.com',
          level: '정회원'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.q-table-container {
  background: white;
}
</style>
