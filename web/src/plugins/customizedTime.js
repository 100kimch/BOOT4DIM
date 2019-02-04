// https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site

export default ({ Vue }) => {
  Vue.prototype.$timeSince = function (date) {
    const past = new Date() - new Date(date)
    var seconds = Math.floor(past / 1000)
    var interval = Math.floor(seconds / 31536000)

    if (interval > 1) {
      return interval + '년 전'
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
      return interval + '개월 전'
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
      return interval + '일 전'
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
      return interval + '시간 전'
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
      return interval + '분 전'
    }
    return '방금 전'
  }
}
