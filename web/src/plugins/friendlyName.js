import words from '../assets/words.json'
import adjWords from '../assets/adj_words.json'

export default ({ app, router, Vue }) => {
  Vue.prototype.$getFriendlyName = () => {
    var now = new Date()
    var start = new Date(now.getFullYear(), 0, 0)
    var diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000
    var oneDay = 1000 * 60 * 60 * 24
    var dayNum = Math.floor(diff / oneDay)
    var randNum = Math.floor(Math.random() * 161)
    console.log('Day of year: ' + dayNum, 'randNum: ' + randNum)

    return adjWords[randNum] + '맛 ' + words[dayNum]
  }
}
