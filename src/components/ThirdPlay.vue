<template>
  <div class="commitment">
    <div v-show="!showResult">
      <h2>{{ msg.introductitle }}</h2>
      <div class="outTips">{{msg.outTimeTips}} <span>{{min}} : {{sec}}</span></div>
      <div id="main" class="scat"></div>
      <div>
        <p>{{msg.problemDesc}}</p>
        <el-radio-group v-model="changeResult">
          <el-radio v-for="(item, index) in optionList" :key="index" :label="item" @change="getResult(item)" :disabled="noEdit"></el-radio>
        </el-radio-group>
        <el-alert
          title="Correct answer"
          type="success"
          show-icon
          v-show="result===true">
        </el-alert>
        <el-alert
          title="Wrong answer"
          type="error"
          show-icon
          v-show="result===false">
        </el-alert>
      </div>
      <el-button type="primary" class="margin_but" @click="newRandomNumbersWithNoRepeat()">Next</el-button>
    </div>
    <div v-show="showResult">
      <h2>{{msg.resultTitle}}</h2>
      <div>You guessed {{trueNum}} question(s) right!</div>
      <el-button type="primary" class="margin_but" @click="nextPage">Next</el-button>
    </div>
  </div>
</template>

<script>
import thirdplay from '../data/thirdplay'
import request from '../unit/request'

export default {
  name: 'Introduction',
  data () {
    return {
      msg: {},
      min: '',
      sec: '',
      endTime: '',
      scatterNum: 100,
      dataList: [],
      optionList: [],
      changeResult: '',
      noEdit: false,
      result: '',
      showResult: false,
      trueNum: 0,
      gameRound: 0,
      userAnswer: 0
    }
  },
  mounted () {
    this.msg = thirdplay
    this.endTime = Date.parse(new Date()) + (60000 * (localStorage.getItem('gameTime') || 1)) // 截止时间为5分钟（当前时间的五分钟后,1min为60000ms,5min故为300000ms,当前时间的时间戳加上毫秒数）
    this.countdownPay()
    this.newRandomNumbersWithNoRepeat()
    // 禁用浏览器返回键
    history.pushState(null, null, '')
    window.addEventListener('popstate', this.disableBrowserBack)
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
          participantMaxPage: 9,
          participantCurrentAppName: 'Dot Counting',
          ParticipantCurrentPageName: 'Dot Counting-play',
          finishedOrNo: false
        },
        taboo: {},
        dotCounting: {
          computerPrice: localStorage.getItem('dotCountingPrice'),
          userPrice: localStorage.getItem('dotCountingUserPrice') || 0,
          BDMBinary: false,
          answerDetail: {
            round: this.gameRound,
            correctAnswer: this.scatterNum,
            userAnswer: this.userAnswer || 0,
            isRight: this.userAnswer === this.scatterNum
          }
        },
        snake: {},
        video: {},
        creatingTabooCard: {},
        transcribing: {},
        participantTotalPayoff: '0',
        participantTimeEnded: parseInt(new Date().getTime() / 1000) + '',
        doingGame: 'dotCounting',
        doingGameState: this.userAnswer ? (this.showResult ? 3 : 2) : 1
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
    // random () {
    //   return Math.floor(Math.random() * (30 - 1)) + 1
    // },

    getEchartData () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      let option = {
        grid: {
          show: true,
          left: '3%',
          top: '3%',
          right: '3%',
          bottom: '3%',
          borderWidth: '0'
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            symbolSize: 10,
            data: this.dataList,
            type: 'scatter'
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },

    // 生成一个指定范围的随机数
    newNumber (start, end) {
      return Math.round(Math.random() * (end - start) + start) // 生成在[start,end]范围内的随机数值，只支持不小于0的合法范围
    },

    /**
     * 目标数字是否已经存在于现有数字集合中
     * @param para      现有对象集合
     * @param array          目标对象
     * @returns {*}
     */
    isHaveThisArray (para, array) { // para
      // 拒绝无效的数组
      if (typeof (para) === 'object') {
        if (para.length === 0) {
          return false
        }
      }
      for (var i = 0; i < para.length; i++) {
        if (para[i][0] === array[0] && para[i][1] === array[1]) {
          return true // 与目标数组有重复
        }
      }
      return false
    },
    isHaveThisNumber (para, num) { // para
      // 拒绝无效的数组
      if (typeof (para) === 'object') {
        if (para.length === 0) {
          return false
        }
      }
      for (var i = 0; i < para.length; i++) {
        if (para[i] === num) {
          return true // 与目标数组有重复
        }
      }
      return false
    },

    /**
     * 生成一个不重复的随机数数组
     * @param start      起始值
     * @param end        终止值
     * @returns {*}
     */
    newRandomNumbersWithNoRepeat () {
      this.gameRound++
      this.noEdit = false
      this.result = ''
      this.changeResult = ''
      this.dataList = []
      const start = 1
      const end = 42
      this.scatterNum = Math.round(Math.random() * (42 - 38) + 38)

      if (start > end || start < 0 || end < 0 || this.scatterNum < 0) {
        return
      }
      if (end - start + 1 < this.scatterNum) { // 验证随机数个数是否超出随机数范围
        return
      }

      for (var i = 0; i < this.scatterNum; i++) {
        const array = [] // 当前随机对象
        array[0] = this.newNumber(start, end)
        array[1] = this.newNumber(start, end) // 获取随机对象
        if (this.isHaveThisArray(this.dataList, array)) { // 是否已经存在
          while (this.isHaveThisArray(this.dataList, array)) { // 获取新的随机对象 直到不重复
            array[0] = this.newNumber(start, end)
            array[1] = this.newNumber(start, end) // 重新获取随机对象
          }
        }
        this.dataList.push(array) // 添加到现有对象集合中
      }

      this.getEchartData()

      this.getOptionList()

      this.saveForm()
    },
    // 获取选项
    getOptionList () {
      this.optionList = []
      this.optionList.push(this.scatterNum)
      for (let i = 1; i <= 4; i++) {
        let obj = Math.round(Math.random() * (42 - 38) + 38)
        for (let j = 0; j < this.optionList.length; j++) {
          if (this.isHaveThisNumber(this.optionList, obj)) { // 是否已经存在
            while (this.isHaveThisNumber(this.optionList, obj)) { // 获取新的随机数字 直到不重复
              obj = Math.round(Math.random() * (42 - 38) + 38) // 重新获取随机数字
            }
          }
        }
        this.optionList.push(obj)
      }
    },
    // 选择结果
    getResult (item) {
      this.noEdit = true
      this.userAnswer = item
      if (item === this.scatterNum) {
        this.result = true
        this.trueNum++
      } else {
        this.result = false
      }
    },
    nextPage () {
      this.saveForm()
      this.$router.push({path: '/fourth'})
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
.scat {
  width: 500px;
  height: 300px;
  border: 1px solid #ebebeb;
  margin: 15px auto;
}
.font12 {
  font-size: 12px;
}
.el-radio {
  margin-bottom: 15px;
  display: block;
}
.margin_but {
  margin-bottom: 0px;
  margin-top: 10px;
}
.margin_top_15 {
  margin-top: 15px;
}
</style>
