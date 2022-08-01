<template>
  <div class="commitment">
    <div v-if="step === 'one'">
      <h2>{{ msg.introductitle }}</h2>
      <div v-html="msg.introducCon"></div>
      <p class="egtip" v-html="msg.egTips"></p>
      <img class="taboo_eg" src="../../static/images/snake-1.png" />
      <img class="taboo_eg" src="../../static/images/snake-2.png" />
      <el-button type="primary" class="margin_but fl_left" @click="step = 'two'">Next</el-button>
    </div>
    <div v-show="step === 'two'">
      <h2>{{msg.setPriceTitle}}</h2>
      <p>{{msg.setPriceTips}}</p>
      <el-input class="game_price" v-model.number="setPrice" auto-complete="off" oninput="value=value.replace(/[^\d]/g,'')">
        <template slot="append">ECU</template>
      </el-input>
      <el-button type="primary" class="margin_but" :disabled="setPrice === ''" @click="getPrice">Next</el-button>
    </div>
  </div>
</template>

<script>
import fourth from '../data/fourth'
import request from '../unit/request'

export default {
  name: 'Introduction',
  data () {
    return {
      msg: {},
      step: 'one',
      setPrice: '',
      istrue: '',
      computerNum: localStorage.getItem('snakePrice'),
      pricetimerFourth: null
    }
  },
  mounted () {
    this.msg = fourth
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
          participantMaxPage: 14,
          participantCurrentAppName: 'Snake',
          ParticipantCurrentPageName: 'Snake-introduction',
          finishedOrNo: false
        },
        taboo: {},
        dotCounting: {},
        snake: {
          computerPrice: localStorage.getItem('snakePrice'),
          userPrice: this.setPrice || 0,
          BDMBinary: !this.istrue,
          roundDetail: {
            round: 0,
            result: false
          },
          highestScore: 0
        },
        video: {},
        creatingTabooCard: {},
        transcribing: {},
        participantTotalPayoff: '0',
        participantTimeEnded: parseInt(new Date().getTime() / 1000) + '',
        doingGame: 'snake',
        doingGameState: 1
      }
      request.post('/interfaceData', data).then(res => {
      })
    },
    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    getPrice () {
      localStorage.setItem('snakeUserPrice', this.setPrice)
      if (this.setPrice <= this.computerNum) {
        this.istrue = true
      } else {
        this.istrue = false
      }
      this.saveForm()
      this.$router.push({name: 'QuizResults', query: {step: 'Fourth', nextstep: 'fourthplay', nextGame: 'fifth', result: this.istrue, setPrice: this.setPrice, computerNum: this.computerNum}})
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
  margin-top: 20px;
  display: block;
  clear: both;
}
.fl_left {
  float: left;
}
.margin_top_15 {
  margin-top: 15px;
}
.taboo_eg {
    width: 50%;
    float: left;
  }
</style>
<style>
  .q_title > span {
    background: #faf9e5;
  }
  ul {
  margin-left: 40px;
  padding: 0;
}
.game_price {
    width: 50%;
  }
  .egtip > span {
    color: red
  }
</style>
