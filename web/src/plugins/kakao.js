// import axios from 'axios'

export default async ({ app, router, Vue }) => {
  const kakao = window.$kakao
  kakao.init('3299c67d8403452ebb215a134e7a5ab6')
  Vue.prototype.$kakao = kakao
}
