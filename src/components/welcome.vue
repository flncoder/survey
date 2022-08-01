<template>
  <div class="commitment">
    <p>{{ msg.desc }}</p>
    <el-button type="primary" class="margin_bot_20" @click="nextPage">Next</el-button>
  </div>
</template>

<script>
import welcomeData from '../data/welcome'
import request from '../unit/request'

export default {
  name: 'Commitment',
  data () {
    return {
      msg: {}
    }
  },
  mounted () {
    this.msg = welcomeData
    // 禁用浏览器返回键
    history.pushState(null, null, '')
    window.addEventListener('popstate', this.disableBrowserBack)

    this.init()
    if (localStorage.getItem('pid')) {
      this.saveForm()
    }

    localStorage.setItem('gameStartTime', this.gameStartTime)
  },
  destroyed () {
    // 清除popstate事件 否则会影响到其他页面
    window.removeEventListener('popstate', this.disableBrowserBack, false)
  },
  methods: {
    init () {
      request.get('/start').then(res => {
        localStorage.setItem('participantIdNumber', res.data.participantIdNumber)
        localStorage.setItem('creatingTabooCardPrice', res.data.creatingTabooCardPrice)
        localStorage.setItem('dotCountingPrice', res.data.dotCountingPrice)
        localStorage.setItem('snakePrice', res.data.snakePrice)
        localStorage.setItem('tabooPrice', res.data.tabooPrice)
        localStorage.setItem('transcribingPrice', res.data.transcribingPrice)
        localStorage.setItem('videoPrice', res.data.videoPrice)
        localStorage.setItem('gameMode', res.data.manageInfo.gameMode)
        localStorage.setItem('gameTime', res.data.manageInfo.gameTime)
        localStorage.setItem('computerMinPrice', res.data.manageInfo.computerMinPrice)
        localStorage.setItem('computerMaxPrice', res.data.manageInfo.computerMaxPrice)
        localStorage.setItem('doubleGameNum', res.data.manageInfo.doubleGameNum)
        localStorage.setItem('fixedParticipationFee', res.data.manageInfo.fixedParticipationFee)
      })
      // 获取当前时间年月日
      let nowDate = new Date()

      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      let newmonth = date.month > 10 ? date.month : '0' + date.month
      let newday = date.date > 10 ? date.date : '0' + date.date
      // 我需要的时间格式为 "yyyy-MM-dd" 有不一样的自己拼别的，都是字符串拼接
      this.newDay = date.year + '' + newmonth + '' + newday
      // 获取url参数
      localStorage.setItem('pid', this.$route.query.PROLIFIC_PID)
      localStorage.setItem('participantSessionNumber', this.newDay)
    },
    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    nextPage () {
      this.$router.push({path: '/commitment'})
    },
    saveForm () {
      var data = {
        participantIdNumber: localStorage.getItem('participantIdNumber'),
        participantSessionNumber: localStorage.getItem('participantSessionNumber'),
        participantIpAddress: localStorage.getItem('cip') + localStorage.getItem('cname'),
        participantRecruitmentId: localStorage.getItem('pid'),
        participantTimeStarted: localStorage.getItem('gameStartTime') || (parseInt(new Date().getTime() / 1000) + ''),
        participantInGroupOrNot: false,
        participantEmailAddress: '',
        gender: '-',
        age: 0,
        education: '-',
        race: '-',
        numberOfChildren: 0,
        maritalStatus: '-',
        annualIncome: '-',
        employmentStatus: '-',
        updating: {
          participantMaxPage: 1,
          participantCurrentAppName: '-',
          ParticipantCurrentPageName: 'commitment',
          finishedOrNo: false
        },
        taboo: {},
        dotCounting: {},
        snake: {},
        video: {},
        creatingTabooCard: {},
        transcribing: {},
        participantTotalPayoff: '0',
        participantTimeEnded: parseInt(new Date().getTime() / 1000) + '',
        doingGame: '-',
        doingGameState: 1
      }
      request.post('/interfaceData', data).then(res => {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  /*font-weight: normal;*/
  text-align: left;
}
p {
  font-size: 22px;
  line-height: 1.6;
}
.margin_bot_20 {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
