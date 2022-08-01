<template>
  <div class="commitment">
    <div v-if="!showResult">
      <h2>{{ msg.introductitle }}</h2>
      <video id="media" ref="video" src="../../static/images/video.mp4" controls="controls"></video>
      <div>{{msg.footTips}}</div>
      <el-button type="primary" class="margin_but" @click="displayResult" :disabled="!endPlay">Next</el-button>
    </div>
    <div v-if="showResult">
      <h2>{{msg.resultTitle}}</h2>
      <div v-if="!endPlay">
        {{msg.returnResultCon}}
      </div>
      <div v-if="endPlay">
        <div>{{msg.resultCon}}</div>
        <el-button type="primary" class="margin_but" @click="nextPage">Next</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import fifthplay from '../data/fifthplay'
import request from '../unit/request'

export default {
  name: 'Introduction',
  data () {
    return {
      msg: {},
      showResult: false,
      endPlay: false,
      duration: 0,
      currentTime: 0
    }
  },
  computed: {
    getEndPlay () {
      return this.endPlay
    }
  },
  mounted () {
    this.msg = fifthplay
    // 不设置视频循环播放
    document.getElementById('media').loop = false
    // 该视频播放是否已结束
    document.getElementById('media').addEventListener('ended', () => {
      this.endPlay = !this.endPlay
    }, false)
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
          participantMaxPage: 17,
          participantCurrentAppName: 'Video Watching',
          ParticipantCurrentPageName: 'Video Watching-play',
          finishedOrNo: false
        },
        taboo: {},
        dotCounting: {},
        snake: {},
        video: {
          computerPrice: localStorage.getItem('videoUserPrice'),
          userPrice: localStorage.getItem('videoPrice'),
          BDMBinary: false
        },
        creatingTabooCard: {},
        transcribing: {},
        participantTotalPayoff: '0',
        participantTimeEnded: parseInt(new Date().getTime() / 1000) + '',
        doingGame: 'video',
        doingGameState: this.showResult ? 3 : 2
      }
      request.post('/interfaceData', data).then(res => {
      })
    },
    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    displayResult () {
      this.showResult = true
      this.$refs.video.pause()
    },
    nextPage () {
      this.saveForm()
      this.$router.push({path: '/sixth'})
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
video {
  width: 80%;
  margin: 40px 0;
  height: 400px;
}
.margin_but {
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
