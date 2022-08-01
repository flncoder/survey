<template>
  <div class="commitment">
    <div v-if="istrue">
      <h2>{{ msg.introductitle }}</h2>
      <div>Your value was {{setPrice}} ECU. Your counteroffer is {{computerNum}} ECU.
Since your value is lower than your counteroffer, you are SELECTED to participate in this activity.
Your compensation is {{computerNum}} ECU.</div>
      <el-button type="primary" class="margin_but" @click="nextPage">Next</el-button>
    </div>
    <div v-else-if="!istrue">
      <h2>{{msg.introductitle}}</h2>
      <div>Your value was {{setPrice}} ECU. Your counteroffer is {{computerNum}} ECU. Since your value is higher than your counteroffer, you are NOT selected to participate in this activity.
Your compensation is 0 ECU.</div>
      <el-button type="primary" class="margin_but" @click="nextGameStep">Next</el-button>
    </div>
  </div>
</template>

<script>
import quizresults from '../data/quizresults'

export default {
  name: 'Introduction',
  data () {
    return {
      msg: {},
      step: '',
      istrue: false,
      nextstep: '',
      setPrice: 0,
      computerNum: 0,
      nextGame: ''
    }
  },
  mounted () {
    this.msg = quizresults
    this.step = this.$route.query.step
    this.istrue = this.$route.query.result
    this.nextstep = this.$route.query.nextstep
    this.setPrice = this.$route.query.setPrice
    this.computerNum = this.$route.query.computerNum
    this.nextGame = this.$route.query.nextGame
    // 禁用浏览器返回键
    history.pushState(null, null, '')
    window.addEventListener('popstate', this.disableBrowserBack)
    if (this.istrue === true) {
      localStorage.setItem('userHasPrice', (+localStorage.getItem('userHasPrice')) + (+this.computerNum))
    }
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
      this.$router.push({path: this.nextstep})
    },
    nextGameStep () {
      this.$router.push({path: this.nextGame})
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
