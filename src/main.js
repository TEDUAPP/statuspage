import Vue from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')

dayjs.extend(relativeTime)
dayjs.extend(utc);
dayjs.extend(timezone);

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