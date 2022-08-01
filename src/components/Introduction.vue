<template>
  <div class="commitment">
    <!-- <h2>Experiment Explanation</h2>
    <p>Carefully read the following page.There will be a mandatory 2-question quiz after this page to determine if you can pariticpate in this study.</p> -->
    <!-- <h3>Instructions:</h3> -->
    <h2>Instructions</h2>

    <p>Please read the following page carefully. There will be a mandatory 2-question quiz after this page to <span style="color: red">determine if you can participate in this study.</span></p>
    <h3>Activities:</h3>
    <p>You may be invited to some of the activities and you will have an opportunity to receive payments for your participation. We will use experimental currency unit (ECU) with the following conversion rate:</p>
    <p style="padding-left: 20px">1 dollar = 10 ECU</p>
    <p>Please think carefully about how much you want to be paid to engage in each of the activities. You will be asked to enter the amount you want to be paid. </p>
    <p>For each activity, you will get a counter-offer! Think of the counteroffer as the maximum price that might be paid to you. This counter-offer will be randomly drawn from an interval of 0 ECU to an unrevealed maximum ECU payment for the activity. The unrevealed maximum ECU will be the same across all activities. </p>
    <ul>
      <li>If the counter-offer is greater than or equal to your valuation, you WILL participate in the activity and you WILL be paid the value of the random counter-offer.</li>
      <li>If the counter-offer is lower than your valuation, you WILL NOT participate in the activity and you WILL NOT be paid.</li>
    </ul>
    <h3>Examples</h3>
    <p>Let us go through two examples.</p>
    <h3>Example 1:</h3>
    <p>Scenario: Emily values one activity at 5 ECU. She receives a counteroffer of 4 ECU.</p>
    <p>Conclusion: Since the counteroffer is lower than her valuation, she will not participate in the activity at the end of the study.</p>
    <h3>Example 2:</h3>
    <p>Scenario: Richard values one activity at 33 ECU. He receives a counteroffer of 50 ECU. </p>
    <p>Conclusion: Since the counteroffer is higher than his valuation, he will participate in the activity and be paid the counteroffer value of 50 ECU at the end of the study.</p>
    <el-button type="primary" class="margin_bot_20" @click="nextPage">Next</el-button>
  </div>
</template>

<script>
import request from '../unit/request'
export default {
  name: 'Introduction',
  data () {
    return {
      msg: {},
      changeResult: false,
      toGo: true
    }
  },
  mounted () {
    this.msg = ''
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
    nextPage () {
      this.$router.push({path: '/first'})
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
          participantMaxPage: 5,
          participantCurrentAppName: '-',
          ParticipantCurrentPageName: 'introduction',
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
.el-radio {
  margin-bottom: 15px;
}
.margin_bot_20 {
  margin-bottom: 20px;
}
ul {
  margin-left: 40px;
  padding: 0;
}
</style>
