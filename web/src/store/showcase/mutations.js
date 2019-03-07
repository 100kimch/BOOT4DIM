export const set$q = (state, $q) => {
  // for changing addressbar color
  state.$q = $q
}

export const updateDarkenTheme = (state, darken) => {
  state.darkenTheme = darken
}

export const updateTheme = (state, tone) => {
  const theme = {
    black: {
      color: '#333333',
      imgSrc: '/statics/cover_black.png'
    },
    bluegreen: {
      color: '#0a8c8b',
      imgSrc: '/statics/cover_bluegreen.png'
    },
    brown: {
      color: '#7c3e0b',
      imgSrc: '/statics/cover_brown.png'
    },
    yellow: {
      color: '#f4cd08',
      imgSrc: '/statics/cover_yellow.png'
    },
    blank: {
      color: '#EEEEEE'
    },
    custom1: {
      color: '#666',
      imgSrc: '/statics/cover_custom1.png'
    }
  }
  document.body.style.background = theme[tone].color
  if (state.$q) {
    state.$q.addressbarColor.set(theme[tone].color)
  }
  state.theme = theme[tone]
}

export const needConfirm = (state, id) => {
  state.tempId = id
}

export const logout = state => {
  state.userInfo = {}
}

export const setUserInfo = (state, userInfo) => {
  state.userInfo = {
    birthdate: userInfo['birthdate'],
    snsLogin: userInfo['custom:snsLogin'],
    email: userInfo['email'],
    email_verified: userInfo['email_verified'],
    name: userInfo['name'],
    phone_number: userInfo['phone_number'],
    avatar: userInfo['picture'],
    level: userInfo['custom:level']
  }
  // state.userInfo = {
  //   username: userInfo.username,
  //   level: 3,
  //   email: '100kimch@naver.com',
  //   avatar: 'statics/profile_kjh.png'
  // }
  // console.log('setUserInfo()', state.userInfo)
}

export const setSnsUserToken = (state, snsUserToken) => {
  console.log('userToken: ', snsUserToken)
  state.snsUserToken = snsUserToken
}

export const setSnsUserInfo = (state, snsUserInfo) => {
  let userInfo = {}
  userInfo['username'] = '' + snsUserInfo.id
  if (snsUserInfo.kakao_account.email) {
    userInfo['email'] = snsUserInfo.kakao_account.email
  }
  if (snsUserInfo.properties.nickname) {
    userInfo['nickname'] = snsUserInfo.properties.nickname
  }

  state.snsUserInfo = userInfo
}

export const setPinNumber = (state, pinNumber) => {
  state.pinNumber = pinNumber
}

export const selectProject = (state, id) => {
  state.selectedProjectId = id
}
