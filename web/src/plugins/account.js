// http://andreybleme.com/2018-01-07/sharing-data-across-vuejs-components/
// import Vue from 'vue'
import { Auth } from 'aws-amplify'
import { Notify } from 'quasar'

// export const accountBus = new Vue()

export default ({ Vue }) => {
  // Vue.prototype.$accountBus = accountBus
  // Vue.prototype.$loginInfo = {
  //   email: 'local_test@naver.com',
  //   email_verified: true,
  //   name: '로컬비',
  //   phone_number: '+821010101010',
  //   level: 1
  // }
  // Vue.prototype.$auth = Auth
  Vue.prototype.$signUp = userData => {
    let phoneFiltered = userData.phone_number
    if (phoneFiltered[0] === '0') {
      phoneFiltered = phoneFiltered.replace('-', '').substr(1)
    }
    phoneFiltered = '+82' + phoneFiltered

    return new Promise((resolve, reject) => {
      const sendData = {
        username: userData.username,
        password: 'Test!1234',
        attributes: {
          address: userData.address,
          birthdate: userData.birthdate.slice(0, 10),
          'custom:hope': userData.hope,
          'custom:level': '1',
          'custom:motive': userData.motive,
          'custom:snsLogin': 'kakao',
          'custom:univ_id': userData.univ_id,
          'custom:univ_major': userData.univ_major,
          email: userData.email,
          phone_number: phoneFiltered,
          name: userData.username,
          picture: userData.picture,
          profile: userData.profile
        },
        validationData: [] // optional
      }
      // const sendData = {
      //   username: 'Testing03',
      //   password: 'Test!2342',
      //   attributes: {
      //     address: userData.address,
      //     birthdate: userData.birthdate,
      //     'custom:hope': userData.hope,
      //     'custom:motive': userData.motive,
      //     'custom:snsLogin': userData.snsLogin,
      //     'custom:univ_id': userData.univ_id,
      //     'custom:univ_major': userData.univ_major,
      //     email: 'test@naver.com',
      //     phone_number: '+82101010110',
      //     name: 'rlawlgud',
      //     picture: userData.picture,
      //     profile: userData.profile
      //   },
      //   validationData: [] // optional
      // }

      console.log(sendData)
      /* eslint-disable */
      Auth.signUp(sendData)
        .then(data => {
          console.log(data)
          Notify.create({
            color: 'positive',
            message: '성공적으로 회원등록했습니다.'
          })
          resolve(false)
        })
        .catch(err => {
          console.log(err)
          Notify.create({
            color: 'negative',
            message: '등록에 실패하였습니다: ' + err.message
          })
          resolve(err.name)
        })
    })
  }
  Vue.prototype.$confirmSignUp = (username, code) => {
    return new Promise((resolve, reject) => {
      Auth.confirmSignUp(username, code, {
        forceAliasCreation: true
      })
        .then(data => {
          console.log(data)
          Notify.create({
            color: 'positive',
            message: '이메일이 확인되었습니다.'
          })
          resolve(false)
        })
        .catch(err => {
          console.log(err)
          Notify.create({
            color: 'negative',
            message: '이메일 확인에 실패하였습니다.'
          })
          resolve('인증 코드가 맞지 않아요 :(')
        })
    })
  }
  Vue.prototype.$resendSignUp = username => {
    return new Promise((resolve, reject) => {
      Auth.resendSignUp(username)
        .then(() => {
          console.log('code resent successfully')
          Notify.create({
            color: 'positive',
            message: '이메일이 재전송되었습니다.'
          })
          resolve('이메일이 재전송되었어요 :)')
        })
        .catch(e => {
          console.log(e)
          Notify.create({
            color: 'negative',
            message: '이메일 재전송에 실패하였습니다.'
          })
          resolve('이메일 재전송에 실패하였어요 :(')
        })
      /* eslint-enable */
    })
  }
  Vue.prototype.$getUserInfo = () => {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
  }
  Vue.prototype.$login = (username, password) => {
    return new Promise((resolve, reject) => {
      // http request
      Auth.signIn(username, 'Test!1234')
        .then(user => {
          resolve(user)
        })
        .catch(err => {
          reject(err.code)
        })
      // setTimeout(() => {
      //   accountBus.$emit('loginInfo', {
      //     label: '김지형',
      //     avatar: '/statics/profile_kjh.png',
      //     email: '100kimch@naver.com',
      //     level: '관리자',
      //     userLevel: 0,
      //     adminMode: ''
      //   })
      //   Vue.prototype.$loginInfo = {
      //     label: '김지형',
      //     avatar: '/statics/profile_kjh.png',
      //     email: '100kimch@naver.com',
      //     level: '관리자',
      //     userLevel: 0,
      //     adminMode: ''
      //   }
      //   resolve({
      //     message: '로그인되었습니다.'
      //   })
      // }, 1500)
    })
  }
  Vue.prototype.$logout = function () {
    return new Promise(function (resolve, reject) {
      Auth.signOut()
        .then(data => {
          console.log('logout success: ', data)
          resolve(true)
        })
        .catch(err => {
          console.log('error on logout(): ', err)
          reject(err)
        })
    })
  }
}
