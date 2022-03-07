import Vue from 'vue';
const moment = require('moment-timezone');
const userTimezone  = 'Asia/Singapore';
Vue.mixin({
    methods: {
        iconPath(name) {
            return require(`@/assets/img/${name}`).default;
        },
        notification(type, message) {
            this.$notification[type]({ message:this.$t('app.notification'), description: message, });
        },
        localTimeConversion: function(utcTime, format = `${moment.HTML5_FMT.DATE} ${moment.HTML5_FMT.TIME_SECONDS}`,  timezone = userTimezone, ) {
            return moment.utc(utcTime).tz(timezone).format(format);
        },
        utcTimeConversion: function(localTime, format = `${moment.HTML5_FMT.DATE} ${moment.HTML5_FMT.TIME_SECONDS}`, timezone = userTimezone,) {
            return moment.tz(moment(localTime).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS), timezone).utc().format(format);
        },
        formatDateTime(dateTime, format) {
            if (!dateTime) return ''
            return this.localTimeConversion(dateTime,format,userTimezone)
        }
    },
});