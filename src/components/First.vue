<template>
  <div class="commitment">
    <div v-if="!showRes">
      <div v-show="!again && !againAns">
        <h2>{{ msg.title }}</h2>
        <div>
          <p class="q_title" v-html="msg.items1 && msg.items1.Q"></p>
          <el-radio-group v-model="firstResult">
            <el-radio v-for="(item, index) in (msg.items1 && msg.items1.A)" :key="index" :label="item.con" @change="getObjResult(item, msg.items1)" :disabled="msg.items1.disable"></el-radio>
          </el-radio-group>
          <!-- <el-alert
            title="Please fix the errors"
            type="error"
            show-icon
            v-if="msg.items1 && msg.items1.ansTips === false">
          </el-alert> -->
        </div>
        <div>
          <p class="q_title" v-html="msg.items2 && msg.items2.Q"></p>
          <el-radio-group v-model="secondResult">
            <el-radio v-for="(item, index) in (msg.items2 && msg.items2.A)" :key="index" :label="item.con" @change="getObjResult(item, msg.items2)" :disabled="msg.items2.disable"></el-radio>
          </el-radio-group>
          <!-- <el-alert
            title="Please fix the errors"
            type="error"
            show-icon
            v-if="msg.items2 && msg.items2.ansTips === false">
          </el-alert> -->
        </div>
        <el-button type="primary" class="margin_but" v-if="(msg.items1 && msg.items1.ansTips === false) || (msg.items2 && msg.items2.ansTips === false)" @click="again = true">Next</el-button>
        <el-button type="primary" class="margin_but" v-else @click="showResult">Next</el-button>
      </div>
      <div v-show="again && !againAns">
        <h3>{{msg.resTitle}}</h3>
        <div v-html="msg.firstWrong"></div>
        <el-button type="primary" class="margin_but"  @click="againAns = true">Next</el-button>
      </div>
      <div v-show="againAns">
        <h2>{{ msg.title }}</h2>
        <div>
          <p class="q_title" v-html="msg.items3 && msg.items3.Q"></p>
          <el-radio-group v-model="thirdResult">
            <el-radio v-for="(item, index) in (msg.items3 && msg.items3.A)" :key="index" :label="item.con" @change="getObjResult(item, msg.items3)" :disabled="msg.items3.disable"></el-radio>
          </el-radio-group>
          <!-- <el-alert
            title="Please fix the errors"
            type="error"
            show-icon
            v-if="msg.items3 && msg.items3.ansTips === false">
          </el-alert> -->
        </div>
        <div>
          <p class="q_title" v-html="msg.items4 && msg.items4.Q"></p>
          <el-radio-group v-model="fourthResult">
            <el-radio v-for="(item, index) in (msg.items4 && msg.items4.A)" :key="index" :label="item.con" @change="getObjResult(item, msg.items4)" :disabled="msg.items4.disable"></el-radio>
          </el-radio-group>
          <!-- <el-alert
            title="Please fix the errors"
            type="error"
            show-icon
            v-if="msg.items4 && msg.items4.ansTips === false">
          </el-alert> -->
        </div>
        <el-button type="primary" class="margin_but" @click="showResult">Next</el-button>
      </div>
    </div>
    <div v-else>
      <h3>{{msg.resTitle}}</h3>
      <div v-if="(this.msg.items1.ansTips === true && this.msg.items2.ansTips === true) || (this.msg.items3.ansTips === true && this.msg.items4.ansTips === true)">
        <div v-html="msg.resCon"></div>
        <el-button type="primary" class="margin_but"  @click="nextPage">Next</el-button>
      </div>
      <div v-else>
        <div v-html="msg.secondWrong"></div>
      </div>
    </div>
  </div>
</template>

<script>
import first from '../data/first'
import request from '../unit/request'

export default {
  name: 'Introduction',
  data () {
    return {
      msg: {},
      changeResult: false,
      toGo: true,
      firstResult: '',
      secondResult: '',
      thirdResult: '',
      fourthResult: '',
      showRes: false,
      again: false,
      againAns: false
    }
  },
  mounted () {
    this.msg = first
    this.msg.items1.disable = false
    this.msg.items2.disable = false
    this.msg.items3.disable = false
    this.msg.items4.disable = false
    this.msg.items1.ansTips = ''
    this.msg.items2.ansTips = ''
    this.msg.items3.ansTips = ''
    this.msg.items4.ansTips = ''
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
    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    getObjResult (item, obj) {
      // obj.disable = true
      obj.ansTips = item.res
      if ((this.msg.items1.ansTips === true && this.msg.items2.ansTips === true) || (this.msg.items3.ansTips === true && this.msg.items4.ansTips === true)) {
        this.toGo = false
      } else {
        this.toGo = true
      }
    },
    showResult () {
      this.showRes = true
    },
    nextPage () {
      this.$router.push({path: '/second'})
    },
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
          participantMaxPage: 4,
          participantCurrentAppName: '-',
          ParticipantCurrentPageName: 'Quiz',
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
.el-radio {
  margin-bottom: 15px;
}
.margin_but {
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
<style>
  .q_title > span {
    background: #faf9e5;
  }
</style>
