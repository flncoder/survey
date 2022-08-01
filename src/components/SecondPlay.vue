<template>
  <div class="commitment">
    <div v-show="!showResult">
      <h2>{{ msg.introductitle }}</h2>
      <div class="outTips">{{msg.outTimeTips}} <span>{{min}} : {{sec}}</span></div>
      <div class="desc_style">
        <h3>Hints</h3>
        <div class="desc_con" v-html="hints"></div>
        <el-button type="primary" plain size="small" :disabled="toPush" @click="pushHints">{{msg.hintBtn}}</el-button>
      </div>
      <div class="desc_style">
        <h3>{{msg.tips}}</h3>
        <el-input v-model="targetWord"/>
        <el-alert
          title="Congratulations on your guess!"
          type="success"
          show-icon
          v-show="nowResult===true"
          class="target_res_tip">
        </el-alert>
        <el-alert
          title="Sorry, you guessed wrong!"
          type="error"
          show-icon
          v-show="nowResult===false"
          class="target_res_tip">
        </el-alert>
      </div>
      <el-button type="primary" class="margin_but" @click="getNowWord">Next</el-button>
    </div>
    <div v-show="showResult">
      <h2>{{msg.resultTitle}}</h2>
      <div>You guessed {{trueNum}} word(s) right!</div>
      <el-button type="primary" class="margin_but" @click="nextPage">Next</el-button>
    </div>
  </div>
</template>

<script>
import secondplay from '../data/secondplay'
import request from '../unit/request'

export default {
  name: 'SecondPlay',
  watch: {
    'targetWord' () {
      this.nowResult = ''
    }
  },
  data () {
    return {
      msg: {},
      min: '',
      sec: '',
      endTime: '',
      nowWord: {},
      nowWordIndex: 0,
      hints: '',
      hintsIndex: 0,
      toPush: false,
      targetWord: '',
      nowResult: '',
      canInput: false,
      trueNum: 0,
      allNum: 1,
      showResult: false,
      userGetHints: ''
    }
  },
  mounted () {
    this.msg = secondplay
    this.endTime = Date.parse(new Date()) + (60000 * (localStorage.getItem('gameTime') || 1)) // 截止时间为5分钟（当前时间的五分钟后,1min为60000ms,5min故为300000ms,当前时间的时间戳加上毫秒数）
    this.countdownPay()
    this.nowWord = secondplay.gameWord[this.nowWordIndex]
    this.hints = '<p>' + (this.hintsIndex + 1) + '. ' + this.nowWord.wordTips[this.hintsIndex] + '</p>'
    this.userGetHints = '' + (this.hintsIndex + 1)
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
          participantMaxPage: 7,
          participantCurrentAppName: 'taboo',
          ParticipantCurrentPageName: 'Taboo-play',
          finishedOrNo: false
        },
        taboo: {
          computerPrice: localStorage.getItem('tabooPrice'),
          userPrice: localStorage.getItem('tabooUserPrice') || 0,
          BDMBinary: false,
          hints: this.userGetHints,
          correctWordsNum: this.trueNum
        },
        dotCounting: {},
        snake: {},
        video: {},
        creatingTabooCard: {},
        transcribing: {},
        participantTotalPayoff: '0',
        participantTimeEnded: parseInt(new Date().getTime() / 1000) + '',
        doingGame: 'taboo',
        doingGameState: this.showResult ? 3 : 2
      }
      request.post('/interfaceData', data).then(res => {
      })
    },
    disableBrowserBack () {
      history.pushState(null, null, '')
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
    getPrice () {
      if (this.setPrice >= this.computerNum) {
        this.istrue = true
        this.toGo = true
        this.timer = setInterval(() => {
          if (this.outTime === 0) {
            clearInterval(this.timer)
            this.timer = null
            this.outTime = 5
          } else {
            this.outTime--
          }
        }, 1000)
      } else {
        this.istrue = false
      }
    },
    getNowWord () {
      // 提交后禁止输入
      this.canInput = true
      // 当前猜词的结果
      this.allNum++
      this.saveForm()
      if (this.targetWord === this.nowWord.targetWord) {
        this.nowResult = true
        this.trueNum++
        // 获取下一个词
        this.hintsIndex = 0
        this.toPush = false
        this.canInput = false
        this.targetWord = ''
        this.nowWordIndex++
        this.nowWord = secondplay.gameWord[this.nowWordIndex]
        this.hints = '<p>' + (this.hintsIndex + 1) + '. ' + this.nowWord.wordTips[this.hintsIndex] + '</p>'
        this.userGetHints = this.userGetHints + ';' + (this.hintsIndex + 1)
        this.nowResult = ''
      } else {
        this.nowResult = false
      }
    },
    pushHints () {
      this.hintsIndex++
      if (this.hintsIndex >= this.nowWord.wordTips.length) {
        this.toPush = true
        this.hints = this.hints + '<p class="color_red font12">No more hints</p>'
        return
      }
      this.hints = this.hints + '<p>' + (this.hintsIndex + 1) + '. ' + this.nowWord.wordTips[this.hintsIndex] + '</p>'
      this.userGetHints = '' + this.userGetHints + ',' + (this.hintsIndex + 1)
    },
    nextPage () {
      this.saveForm()
      this.$router.push({path: '/third'})
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
.desc_style {
  border: 1px solid #ebebeb;
  padding: 0 15px 15px;
  margin-top: 15px;
  border-radius: 3px;
}
.desc_con {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  padding: 0 15px;
  background: #fafafa;
  color: #333;
  margin-bottom: 15px;
}
.margin_but {
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
<style>
.font12 {
  font-size: 12px;
}
.color_red {
  color: #f56c6c;
}
.target_res_tip {
  margin-top: 10px !important;
}
</style>
