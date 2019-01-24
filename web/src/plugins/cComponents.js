import CNavigation from '../components/CNavigation.vue'
import CCardList from '../components/CCardList.vue'
import CLoginBtn from '../components/CLoginBtn.vue'
import CTitle from '../components/CTitle.vue'

export default ({ Vue }) => {
  Vue.component('CNavigation', CNavigation)
  Vue.component('CCardList', CCardList)
  Vue.component('CLoginBtn', CLoginBtn)
  Vue.component('CTitle', CTitle)
}
