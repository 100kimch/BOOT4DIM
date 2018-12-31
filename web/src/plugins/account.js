// http://andreybleme.com/2018-01-07/sharing-data-across-vuejs-components/
import Vue from 'vue'

export const accountBus = new Vue()

setTimeout(loginInfo => {
  accountBus.$emit('loginInfo', {
    label: '김지형',
    avatar: 'assets/profile_kjh.png',
    email: '100kimch@naver.com',
    level: '관리자',
    userLevel: 0,
    adminMode: ''
  })
  Vue.prototype.$loginInfo = {
    label: '김지형',
    avatar: 'assets/profile_kjh.png',
    email: '100kimch@naver.com',
    level: '관리자',
    userLevel: 0,
    adminMode: ''
  }
}, 1500)

export default ({ Vue }) => {
  Vue.prototype.$accountBus = accountBus
  Vue.prototype.$loginInfo = {
    label: '비회원',
    email: '',
    level: ''
  }
}
