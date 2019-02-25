import axios from 'axios'

export function kakaoLoginWithInfo ({ commit }) {
  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log('authObj: ', authObj)
        commit('setSnsUserToken', authObj)
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: function (res) {
            console.log('Kakao API Request Success:', res)
            commit('setSnsUserInfo', res)
            resolve(true)
          },
          fail: function (err) {
            console.error('Error in Kakao API Request: ', err)
            const errorCode = {
              code: err.code,
              type: 'api_request_failed'
            }
            reject(errorCode)
          }
        })
      },
      fail: function (error) {
        const errorCode = {
          code: -900,
          type: error.error
        }
        reject(errorCode)
      }
    })
  })
}

export function kakaoLogin ({ commit, state }) {
  return new Promise((resolve, reject) => {
    var loginWithCognito = (kakaoid, accessToken, expiresIn) => {
      var cognitoURL =
        state.kakaoApiUrl +
        '?id=' +
        kakaoid +
        '&access_token=' +
        accessToken +
        '&expires_in=' +
        expiresIn
      axios
        .get(cognitoURL)
        .then(response => {
          console.log('response in kakaoLogin(): ', response)
        })
        .catch(error => {
          console.error(error)
        })
    }

    window.Kakao.Auth.login({
      success: function (authObj) {
        commit('setSNSUserToken', authObj)
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: function (res) {
            console.log('Kakao API Request Success:', res)
            commit('setSnsUserInfo', res)
            loginWithCognito(res.id, authObj.access_token, authObj.expires_in)
            resolve(true)
          },
          fail: function (err) {
            console.error('Error in Kakao API Request: ', err)
            const errorCode = {
              code: err.code,
              type: 'api_request_failed'
            }
            reject(errorCode)
          }
        })
      },
      fail: function (error) {
        const errorCode = {
          code: -900,
          type: error.error
        }
        reject(errorCode)
      }
    })
  })
}
