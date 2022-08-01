<template>
  <div class="commitment">
      <h2 style="text-align: center">{{ msg.title }}</h2>
      <p>{{ msg.desc }}</p>
      <p>{{ msg.desc2 }}</p>
      <div class="tipscon" v-html="msg.tipsCon"></div>
      <p>{{ msg.sitOutTips }}</p>
      <el-button type="primary" class="margin_bot_20" @click="nextPage">Next</el-button>
  </div>
</template>

<script>
import overviewData from '../data/overview'
import request from '../unit/request'

export default {
  name: 'Commitment',
  data () {
    return {
      msg: {},
      changeResult: false,
      toGo: true,
      noToGo: false,
      newDay: '',
      gameStartTime: parseInt(new Date().getTime() / 1000) + ''
    }
  },
  mounted () {
    this.msg = overviewData
    // 禁用浏览器返回键
    history.pushState(null, null, '')
    window.addEventListener('popstate', this.disableBrowserBack)

    this.saveForm()

    localStorage.setItem('gameStartTime', this.gameStartTime)
  },
  destroyed () {
    // 清除popstate事件 否则会影响到其他页面
    window.removeEventListener('popstate', this.disableBrowserBack, false)
  },
  methods: {
    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    getResult (item) {
      this.toGo = !item.res
    },
    nextPage () {
      this.$router.push({path: '/userinfo'})
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
          participantMaxPage: 3,
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
div {
  text-align: left;
}
.topic_desc {
  background: #faf9e5;
}
.font12 {
  font-size: 12px;
}

.margin_bot_20 {
  margin-bottom: 20px;
}
/* p {
  line-height: 20px !important;
} */
</style>
<style>
.tipscon {
  margin: 25px 0;
}
.tipscon > p {
  line-height: 15px !important;
}
.tipscon > p > span {
  font-weight: bold;
  color: #000;
}
</style>
