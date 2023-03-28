import Vue from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
var updateLocale = require('dayjs/plugin/updateLocale.js')

var config = {
    thresholds: [
        { l: 's', r: 1 },
        { l: 'm', r: 1 },
        { l: 'mm', r: 59, d: 'minute' },
        { l: 'h', r: 1 },
        { l: 'hh', r: 23, d: 'hour' },
        { l: 'd', r: 1 },
        { l: 'dd', r: 29, d: 'day' },
        { l: 'M', r: 1 },
        { l: 'MM', r: 11, d: 'month' },
        { l: 'y', r: 1 },
        { l: 'yy', d: 'year' }
      ],
    rounding: Math.round,
  }

dayjs.extend(updateLocale)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime, config)

dayjs.updateLocale('en', {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: 'a few seconds',
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    }
  })

Vue.config.productionTip = false

Vue.filter("cpu", function (value) {
    return (value * 100).toFixed(1);
});

Vue.filter("twoDigits", function (value) {
  return (value * 1).toFixed(2);
});

Vue.filter("relativeTime", function (date) {
    var timez = dayjs.tz.guess();
    return dayjs(date).tz(timez).fromNow();
});

new Vue({
    render: h => h(App),
}).$mount('#app')