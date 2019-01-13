// http://andreybleme.com/2018-01-07/sharing-data-across-vuejs-components/
import Vue from 'vue'
import { Auth } from 'aws-amplify'

export const accountBus = new Vue()

export default ({ Vue }) => {
  Vue.prototype.$accountBus = accountBus
  Vue.prototype.$loginInfo = {
    label: '비회원',
    email: '',
    level: ''
  }
  Vue.prototype.$auth = Auth
  Vue.prototype.$signUp = userData => {
    /* eslint-disable */
    Auth.signUp({
      username: userData.username,
      password: userData.password,
      attributes: {
        address: userData.address,
        birthdate: userData.birthdate,
        email: userData.email,
        hope: userData.hope,
        motivation: userData.motivation,
        phone_number: userData.phone_number,
        picture: userData.picture,
        profile: userData.profile,
        univ_id: userData.univ_id,
        univ_major: userData.univ_major,
        updated_at: userData.updated_at
      },
      validationData: [] //optional
    })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
  Vue.prototype.$confirmSignUp = () => {
    // After retrieveing the confirmation code from the user
    Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  Vue.prototype.$resendSignUp = () => {
    Auth.resendSignUp(username)
      .then(() => {
        console.log('code resent successfully')
      })
      .catch(e => {
        console.log(e)
      })
    /* eslint-enable */
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
