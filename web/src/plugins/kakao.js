// import axios from 'axios'

export default async ({ app, router, Vue }) => {
  const KakaoAppId = '3299c67d8403452ebb215a134e7a5ab6'
  // const KakaoApiUrl = 'https://r3dbx57x52.execute-api.us-west-2.amazonaws.com/default'
  const kakao = window.$kakao
  kakao.init(KakaoAppId)
  Vue.prototype.$kakao = kakao
}
