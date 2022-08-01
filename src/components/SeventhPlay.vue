<template>
  <div class="commitment">
    <div v-show="!showResult">
      <h2>{{ msg.introductitle }}</h2>
      <div class="outTips">{{msg.outTimeTips}} <span>{{min}} : {{sec}}</span></div>
      <div class="word_con">
        <h3>{{nowWord.targetWord}}</h3>
        <el-form label-width="80px">
          <el-form-item label="1st word">
            <el-input class="word_input" v-model="descList.one" placeholder="Please enter" @input="checkoutPush = ''"></el-input>
          </el-form-item>
          <el-form-item label="2nd word">
            <el-input class="word_input" v-model="descList.two" placeholder="Please enter" @input="checkoutPush = ''"></el-input>
          </el-form-item>
          <el-form-item label="3rd word">
            <el-input class="word_input" v-model="descList.three" placeholder="Please enter" @input="checkoutPush = ''"></el-input>
          </el-form-item>
          <el-form-item label="4th word">
            <el-input class="word_input" v-model="descList.four" placeholder="Please enter" @input="checkoutPush = ''"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
          <el-alert
            class="margin_top_15"
            :title="msg.pushTips"
            type="error"
            show-icon
            v-show="checkoutPush === false">
          </el-alert>
        </div>
      <el-button type="primary" class="margin_but" @click="getNextWord">Next</el-button>
    </div>
    <div v-show="showResult">
      <h2>{{msg.resultTitle}}</h2>
      <div>Thank you. You generated {{trueNum}} Taboo cards. </div>
      <el-button type="primary" class="margin_but" @click="nextPage">Next</el-button>
    </div>
  </div>
</template>

<script>
import seventhplay from '../data/seventhplay'
import request from '../unit/request'

export default {
  name: 'Introduction',
  data () {
    return {
      msg: {},
      min: '',
      sec: '',
      endTime: '',
      descList: {
        one: '',
        two: '',
        three: '',
        four: ''
      },
      nowWordIndex: 0,
      nowWord: {},
      checkoutPush: '',
      showResult: false,
      trueNum: 0
    }
  },
  mounted () {
    this.msg = seventhplay
    this.checkoutPush = ''
    this.nowWord = seventhplay.gameWord[this.nowWordIndex]
    this.endTime = Date.parse(new Date()) + (60000 * (localStorage.getItem('gameTime') || 1)) // 截止时间为5分钟（当前时间的五分钟后,1min为60000ms,5min故为300000ms,当前时间的时间戳加上毫秒数）
    this.countdownPay()
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
          participantMaxPage: 21,
          participantCurrentAppName: 'Generating Taboo Cards',
          ParticipantCurrentPageName: 'Generating Taboo Cards-play',
          finishedOrNo: false
        },
        taboo: {},
        dotCounting: {},
        snake: {},
        video: {},
        creatingTabooCard: {
          computerPrice: localStorage.getItem('creatingTabooCardPrice'),
          userPrice: localStorage.getItem('creatingTabooCardUserPrice') || 0,
          BDMBinary: false,
          roundDetail: {
            round: this.trueNum + 1,
            desc: [this.descList.one, this.descList.two, this.descList.three, this.descList.four]
          }
        },
        transcribing: {},
        participantTotalPayoff: '0',
        participantTimeEnded: parseInt(new Date().getTime() / 1000) + '',
        doingGame: 'creatingTabooCard',
        doingGameState: this.showResult ? 3 : 2
      }
      request.post('/interfaceData', data).then(res => {
      })
    },
    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    getNextWord () {
      if (this.descList.one === '' || this.descList.two === '' || this.descList.three === '' || this.descList.four === '') {
        this.checkoutPush = false
      } else {
        this.saveForm()
        this.trueNum++
        this.checkoutPush = ''
        this.nowWordIndex++
        this.nowWord = seventhplay.gameWord[this.nowWordIndex]
        this.descList.one = ''
        this.descList.two = ''
        this.descList.three = ''
        this.descList.four = ''
      }
    },
    // 猜题倒计时
    countdownPay () {
      const end = this.endTime
      const now = Date.parse(new Date())
      const msec = end - now
      if (msec < 0) return
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec

      const that = this
      if (min >= 0 && sec >= 0) {
        // 倒计时结束关闭支付
        if (min === 0 && sec === 0) {
          this.$alert('Time is up!', '', {
            confirmButtonText: 'OK',
            callback: action => {
              // this.nextPage()
              this.showResult = true
            }
          })
          // return
        }
        setTimeout(function () {
          that.countdownPay()
        }, 1000)
      }
    },
    nextPage () {
      this.saveForm()
      this.$router.push({path: '/resultpage'})
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
h3 {
  padding-left: 10px;
}
div {
  text-align: left;
}
.outTips {
  background: #fdf6ec;
  color: #e6a23c;
  font-size: 17px;
  padding: 20px;
  border-radius: 3px;
}
.outTips > span {
  font-weight: bold;
}
.word_con {
  border: 1px solid #ebebeb;
  padding: 0 15px 15px;
  margin-top: 15px;
  border-radius: 3px;
}
.word_input {
  width: 300px
}
.font12 {
  font-size: 12px;
}
.margin_but {
  margin-bottom: 20px;
  margin-top: 10px;
}
.margin_top_15 {
  margin-top: 15px;
}
</style>
