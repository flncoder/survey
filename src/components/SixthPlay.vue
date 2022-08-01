<template>
  <div class="commitment">
    <div v-show="!showResult">
      <h2>{{ msg.introductitle }}</h2>
      <div class="outTips">{{msg.outTimeTips}} <span>{{min}} : {{sec}}</span></div>
      <div class="pdf_title">PDF preview</div>
      <div class="pdf_con">
        <div class="pdf_text">{{nowPdf.con}}</div>
      </div>
      <div class="margin_top_15" v-html="msg.problemDesc"></div>
      <div>
        <el-input class="margin_top_15" type="textarea" :rows='10' placeholder="Please enter" v-model="pdfToText"></el-input>
      </div>
      <el-button type="primary" class="margin_but" @click="checkPdf">Next</el-button>
    </div>
    <div v-show="showResult">
      <h2>{{msg.resultTitle}}</h2>
      <div>You typed {{wordAllNum }} words. You have {{errorWordNum}} errors.</div>
      <el-button type="primary" class="margin_but" @click="nextPage">Next</el-button>
    </div>
  </div>
</template>

<script>
import sixthplay from '../data/sixthplay'
import request from '../unit/request'

export default {
  name: 'Introduction',
  data () {
    return {
      msg: {},
      min: '',
      sec: '',
      endTime: '',
      nowPdf: {},
      nowPdfIndex: 0,
      pdfToText: '',
      showResult: false,
      wordAllNum: 0,
      errorWordNum: 0
    }
  },
  mounted () {
    this.msg = sixthplay
    this.nowPdfIndex = Math.round(Math.random() * (4 - 0) + 0)
    this.endTime = Date.parse(new Date()) + (60000 * (localStorage.getItem('gameTime') || 1)) // 截止时间为5分钟（当前时间的五分钟后,1min为60000ms,5min故为300000ms,当前时间的时间戳加上毫秒数）
    this.nowPdf = sixthplay.pdfList[this.nowPdfIndex]
    this.countdownPay()
    // this.getWordNum(this.nowPdf.con)
    // this.endTime = Date.parse(new Date()) + (60000 * (localStorage.getItem('gameTime') || 1)) // 截止时间为5分钟（当前时间的五分钟后,1min为60000ms,5min故为300000ms,当前时间的时间戳加上毫秒数）
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
          participantMaxPage: 19,
          participantCurrentAppName: 'Transcription task',
          ParticipantCurrentPageName: 'Transcription task-play',
          finishedOrNo: false
        },
        taboo: {},
        dotCounting: {},
        snake: {},
        video: {},
        creatingTabooCard: {},
        transcribing: {
          computerPrice: localStorage.getItem('transcribingPrice'),
          userPrice: localStorage.getItem('transcribingUserPrice') || 0,
          BDMBinary: false,
          correctNumber: this.wordAllNum - this.errorWordNum
        },
        participantTotalPayoff: '0',
        participantTimeEnded: parseInt(new Date().getTime() / 1000) + '',
        doingGame: 'transcribing',
        doingGameState: this.showResult ? 3 : 2
      }
      request.post('/interfaceData', data).then(res => {
      })
    },
    // 检查PDF是否匹配
    checkPdf () {
      this.showResult = true
      this.getWordNum(this.nowPdf.con)
      this.pdfToText = ''
      this.saveForm()
    },
    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    getWordNum (val) {
      this.errorWordNum = 0
      var value = val
      // 将换行符，前后空格不计算为单词数
      value = value.replace(/\n|\r|^\s+|\s+$/gi, '')
      // 多个空格替换成一个空格
      value = value.replace(/\s+/gi, ' ')

      this.pdfToText = this.pdfToText.replace(/\n|\r|^\s+|\s+$/gi, '')
      this.pdfToText = this.pdfToText.replace(/\s+/gi, ' ')

      // 统计有多少错误的词
      var arrOld = value.split(/\s+/)
      var arrNew = this.pdfToText.split(/\s+/)
      this.wordAllNum = arrNew.length

      if (arrNew[0] === '' && arrNew[arrNew.length - 1] === '') {
        this.wordAllNum -= 1
      }

      for (var i = 0; i < this.wordAllNum; i++) {
        if (arrOld[i] !== arrNew[i]) {
          this.errorWordNum++
        }
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
      this.$router.push({path: '/seventh'})
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
.pdf_con {
  -moz-user-select:none; /* Firefox私有属性 */
  -webkit-user-select:none; /* WebKit内核私有属性 */
  -ms-user-select:none; /* IE私有属性(IE10及以后) */
  -khtml-user-select:none; /* KHTML内核私有属性 */
  -o-user-select:none; /* Opera私有属性 */
  user-select:none; /* CSS3属性 */
  background: #525659;
  max-height: 260px;
  overflow-y: auto;
}
.pdf_title {
  margin-top: 20px;
  background: #323639;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  padding-left: 25px;
}
.pdf_text {
  background: #fff;
  width: 397px;
  margin: 0 auto;
  padding: 30px 50px;
  line-height: 28px;
}
.font12 {
  font-size: 12px;
}
.el-radio {
  margin-bottom: 15px;
  display: block;
}
.margin_but {
  margin-bottom: 20px;
  margin-top: 10px;
}
.margin_top_15 {
  margin-top: 15px;
}
</style>
