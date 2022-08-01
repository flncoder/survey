<template>
  <div class="commitment">
    <h2>{{ msg.introductitle }}</h2>
    <div v-html="msg.introducCon"></div>
    <p> {{msg.allPrice}} {{allPrice/10}} $</p>
  </div>
</template>

<script>
import resultpage from '../data/resultpage'
import request from '../unit/request'

export default {
  name: 'Introduction',
  data () {
    return {
      msg: {},
      allPrice: ((+localStorage.getItem('userHasPrice')) + (+localStorage.getItem('fixedParticipationFee'))) || 0
    }
  },
  mounted () {
    this.msg = resultpage
    // 禁用浏览器返回键
    history.pushState(null, null, '')
    window.addEventListener('popstate', this.disableBrowserBack)
    this.saveForm()
  },
  destroyed () {
    // 清除popstate事件 否则会影响到其他页面
    window.removeEventListener('popstate', this.disableBrowserBack, false)
  },
  methods: {
    saveForm () {
      var data = {
        participantIdNumber: localStorage.getItem('participantIdNumber'),
        participantSessionNumber: localStorage.getItem('participantSessionNumber'),
        participantIpAddress: localStorage.getItem('cip') + localStorage.getItem('cname'),
        participantRecruitmentId: localStorage.getItem('pid'),
        participantTimeStarted: localStorage.getItem('gameStartTime') || (parseInt(new Date().getTime() / 1000) + ''),
        participantInGroupOrNot: false,
        participantEmailAddress: localStorage.getItem('participantEmailAddress'),
        gender: localStorage.getItem('gendergender') || '-',
        age: localStorage.getItem('age') || 0,
        education: localStorage.getItem('education') || '-',
        race: localStorage.getItem('race') || '-',
        numberOfChildren: localStorage.getItem('numberOfChildren') || 0,
        maritalStatus: localStorage.getItem('maritalStatus') || '-',
        annualIncome: localStorage.getItem('annualIncome') || '-',
        employmentStatus: localStorage.getItem('employmentStatus') || '-',
        updating: {
          participantMaxPage: 22,
          participantCurrentAppName: '',
          ParticipantCurrentPageName: 'resultPage',
          finishedOrNo: true
        },
        taboo: {},
        dotCounting: {},
        snake: {},
        video: {},
        creatingTabooCard: {},
        transcribing: {},
        participantTotalPayoff: this.allPrice,
        participantTimeEnded: parseInt(new Date().getTime() / 1000) + '',
        doingGame: '',
        doingGameState: 1
      }
      request.post('/interfaceData', data).then(res => {
      })
    },
    disableBrowserBack () {
      history.pushState(null, null, '')
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
.font12 {
  font-size: 12px;
}
.el-radio {
  margin-bottom: 15px;
}
.margin_but {
  margin-bottom: 20px;
  margin-top: 10px;
}
.margin_top_15 {
  margin-top: 15px;
}
</style>
<style>
  .q_title > span {
    background: #faf9e5;
  }
</style>
