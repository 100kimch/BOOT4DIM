export function kakaoLoginWithInfo ({ commit }) {
  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        commit('setSNSUserToken', authObj)
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

export function kakaoLogin ({ commit }) {
  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        commit('setSNSUserToken', authObj)
        resolve(true)
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
