// http://andreybleme.com/2018-01-07/sharing-data-across-vuejs-components/
import Vue from 'vue'

export const accountBus = new Vue()

export default ({ Vue }) => {
  Vue.prototype.$accountBus = accountBus
  Vue.prototype.$loginInfo = {
    label: '비회원',
    email: '',
    level: ''
  }
  Vue.prototype.$login = function (request) {
    return new Promise(function (resolve, reject) {
      // http request
      setTimeout(() => {
        accountBus.$emit('loginInfo', {
          label: '김지형',
          avatar: '/statics/profile_kjh.png',
          email: '100kimch@naver.com',
          level: '관리자',
          userLevel: 0,
          adminMode: ''
        })
        Vue.prototype.$loginInfo = {
          label: '김지형',
          avatar: '/statics/profile_kjh.png',
          email: '100kimch@naver.com',
          level: '관리자',
          userLevel: 0,
          adminMode: ''
        }
        resolve({
          message: '로그인되었습니다.'
        })
      }, 1500)
    })
  }
  Vue.prototype.$logout = function () {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        accountBus.$emit('loginInfo', {})
        Vue.prototype.$loginInfo = {}
        resolve({
          message: '로그아웃되었습니다.'
        })
      }, 700)
    })
  }
}
