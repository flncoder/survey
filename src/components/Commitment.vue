<template>
  <div class="commitment">
    <div v-show="!noToGo">
      <h2>{{ msg.title }}</h2>
      <p>{{ msg.desc }}</p>
      <h3>{{ msg.title2 }}</h3>
      <p>{{ msg.desc2 }}</p>
      <div v-for="(item, index) in msg.items" :key="index">
        <h3>{{ item.Q }}</h3>
        <p>{{ item.A }}</p>
        <p class="topic_desc" v-if="item.desc">{{ item.desc }}</p>
      </div>
      <h3>{{ msg.tipsTitle }}</h3>
      <div v-html="msg.tipsCon"></div>
      <el-radio-group v-model="changeResult">
        <el-radio v-for="(item, index) in msg.tipsItem" :key="index" :label="item.con" @change="getResult(item)"></el-radio>
      </el-radio-group>
      <el-button type="primary" class="margin_bot_20" @click="nextPage">Next</el-button>
      <div class="font12">{{ msg.foot }}</div>
    </div>
    <div v-show="noToGo">
      <p>{{msg.sitOutTips}}</p>
    </div>
  </div>
</template>

<script>
import commitmentData from '../data/commitment'
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
    this.msg = commitmentData
    // 禁用浏览器返回键
    history.pushState(null, null, '')
    window.addEventListener('popstate', this.disableBrowserBack)

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
    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    getResult (item) {
      this.toGo = !item.res
    },
    nextPage () {
      if (this.toGo) {
        this.noToGo = true
      } else {
        this.$router.push({path: '/overview'})
      }
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
          participantMaxPage: 2,
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
.el-radio-group {
  display: block;
}
.el-radio {
  margin-bottom: 15px;
  display: block;
}
.margin_bot_20 {
  margin-bottom: 20px;
}
</style>
