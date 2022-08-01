<template>
  <div class="can">
    <div v-show="!showResult">
      <h2>{{ msg.introductitle }}</h2>
      <div class="outTips">{{msg.outTimeTips}} <span>{{min}} : {{sec}}</span></div>
      <!-- 游戏界面 -->
      <div class="content" v-if="show">
        <div class="snake-grassland">
          <div
            class="snake"
            v-for="(item, index) in snake"
            :key="`snake${index}`"
            :style="location(item.x, item.y)"
          ></div>
          <div
            class="food"
            v-for="(item, index) in foods"
            :key="`food${index}`"
            :style="location(item.x, item.y)"
          ></div>
        </div>

        <!-- 结束面板 -->
        <div class="fail" v-if="showFail">
          <el-alert
            :title="`${msg.lostTips} ${msg.scoreTips}${score}`"
            type="error"
            show-icon>
          </el-alert>
          <div class="text_center">{{msg.againTips}}</div>
          <el-button @click="reStart" class="margin_but" type="danger">{{msg.againBtn}}</el-button>
        </div>
      </div>
    </div>
    <div v-show="showResult">
      <h2>{{msg.resultTitle}}</h2>
      <div v-html="msg.resultCon"></div>
      <p>The highest score is {{maxScore}}</p>
      <el-button type="primary" class="margin_but" @click="nextPage">Next</el-button>
    </div>
  </div>
</template>
<script>
import fourthplay from '../data/fourthplay'
import request from '../unit/request'

export default {
  // snake-grassland 50*50的格子
  data () {
    return {
      msg: {},
      min: '',
      sec: '',
      endTime: '',
      score: 0, // 得分
      // showLogin: true,
      show: false,
      showFail: false,
      foods: [],
      direction: 3, // 初始方向向右
      timer: null,
      snake: [
        { x: 0, y: 0 }, // 蛇尾
        { x: 1, y: 0 },
        { x: 2, y: 0 } // 蛇头
      ], // (x, y) 组成蛇的每一块儿的位置
      xStep: 1,
      yStep: 1,
      showResult: false,
      maxScore: 0,
      gameRount: 0
    }
  },
  computed: {
    btnState () {
      return this.form.name !== ''
    }
  },
  created () {
    // 随机生成3个食物
    this.foods = this.generateFoods(3)
  },
  mounted () {
    this.msg = fourthplay
    this.endTime = Date.parse(new Date()) + (60000 * (localStorage.getItem('gameTime') || 1)) // 截止时间为5分钟（当前时间的五分钟后,1min为60000ms,5min故为300000ms,当前时间的时间戳加上毫秒数）
    this.countdownPay()
    this.active()
    window.addEventListener('keyup', (event) => {
      // event.key = ArrowUp 上
      switch (event.key) {
        case 'ArrowUp':
          this.direction = 0
          this.snakeMove()
          break
        case 'ArrowDown':
          this.direction = 1
          this.snakeMove()
          break
        case 'ArrowLeft':
          this.direction = 2
          this.snakeMove()
          break
        case 'ArrowRight':
          this.direction = 3
          this.snakeMove()
          break
        default:
          break
      }
    })
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
          participantMaxPage: 15,
          participantCurrentAppName: 'Snake',
          ParticipantCurrentPageName: 'Snake-play',
          finishedOrNo: false
        },
        taboo: {},
        dotCounting: {},
        snake: {
          computerPrice: localStorage.getItem('snakePrice'),
          userPrice: localStorage.getItem('snakeUserPrice') || 0,
          BDMBinary: false,
          roundDetail: {
            round: this.gameRount,
            result: this.score || 0
          },
          highestScore: this.maxScore || 0
        },
        video: {},
        creatingTabooCard: {},
        transcribing: {},
        participantTotalPayoff: '0',
        participantTimeEnded: parseInt(new Date().getTime() / 1000) + '',
        doingGame: 'snake',
        doingGameState: this.gameRount > 0 ? (this.showResult ? 3 : 2) : 1
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
    // 暂停游戏
    stopGame () {
      clearInterval(this.timer) // 清除了定时器
      this.timer = null // 清除了timer的内存占用
    },
    // 继续游戏
    continueGame () {
      this.timer = setInterval(() => {
        this.snakeMove()
      }, 200)
    },

    // 重新开始
    reStart () {
      this.gameRount++
      this.showFail = false

      this.snake = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 }
      ] // (x, y) 组成蛇的每一块儿的位置
      this.foods = this.generateFoods(3)
      this.direction = 3
      this.score = 0
      this.timer = setInterval(() => {
        this.snakeMove()
      }, 200)
    },
    // 退出游戏
    exitGame () {
      this.showFail = false
      // this.showLogin = !this.showLogin;
      this.show = !this.show
      this.form.name = ''
      this.score = 0
      clearInterval(this.timer) // 清除了定时器
      this.timer = null // 清除了timer的内存占用
    },
    // 碰撞检测是否吃到食物
    isEat () {
      // 小蛇移动就是除头部以外的部分向前移动一个身位,即前一个状态的最后一个身位丢弃
      let head = this.snake[this.snake.length - 1]
      let isEat = false
      // 消除吃掉的食物
      this.foods = this.foods.filter((food) => {
        if (head.x === food.x && head.y === food.y) {
          isEat = true
          this.eat() // 加长蛇身
          // 碰撞一次加10分
          this.score = this.score + 10
          return false
        }
        return true
      })
      // 添加一个新食物，使食物总量保持不变
      if (isEat) {
        this.foods.push(...this.generateFoods(1))
      }
    },
    // 吃食物
    eat () {
      let tail = this.snake[0]
      let xStep = 0
      let yStep = 0

      if (this.direction === 0) {
        yStep = -1
      } else if (this.direction === 1) {
        yStep = 1
      } else if (this.direction === 2) {
        xStep = -1
      } else if (this.direction === 3) {
        xStep = 1
      }
      // 添加到数组的开头
      this.snake.unshift({ x: tail.x - xStep, y: tail.y - yStep })
    },
    // 开始游戏
    active () {
      this.gameRount++
      this.show = true
      // this.showLogin = false;

      // if (this.form.name.length <= 2) {
      //   // this.showLogin = !this.showLogin;
      //   this.show = !this.show;
      //   return alert("用户名不可小于三位字符");
      // } else {
      this.snake = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 }
      ] // (x, y) 组成蛇的每一块儿的位置
      this.foods = this.generateFoods(3)
      this.direction = 3
      this.timer = setInterval(() => {
        this.snakeMove()
      }, 200)
      // }
    },

    // 随机生成食物
    generateFoods (total) {
      const foods = []
      for (let i = 0; i < total; i++) {
        // 食物的随机x轴坐标，也就是第几行
        const foodX = Math.floor(Math.random() * 50)
        // 食物的随机x轴坐标，也就是第几列
        const foodY = Math.floor(Math.random() * 50)
        foods.push({ x: foodX, y: foodY })
      }
      return foods
    },
    // 获取位置
    location (x, y) {
      return {
        left: x * 10 + 'px',
        top: y * 10 + 'px'
      }
    },
    // 蛇开始动 判断是否超出界限 head表示贪吃蛇的头部，当头部超过地图的范围时
    // 先获取下一步数据，坐标值，判断坐标值是否非法，如果不非法就可以动了
    move (xStep, yStep) {
      // 定义蛇的头部位置
      let head = this.snake[this.snake.length - 1]
      // 需要监听蛇头的方向而且判断
      if (
        (this.direction === 2 && head.x <= 0) ||
        (this.direction === 0 && head.y <= 0) ||
        (this.direction === 3 && head.x >= 49) ||
        (this.direction === 1 && head.y >= 49)
      ) {
        clearInterval(this.timer)
        this.timer = null
        this.endGame()
      } else {
        this.snake.push({ x: head.x + xStep, y: head.y + yStep })
        this.snake.shift()
      }
    },
    // 结束游戏
    endGame () {
      this.showFail = true
      if (this.score > this.maxScore) {
        this.maxScore = this.score
      }
      this.saveForm()
    },
    // 改变方向
    changeDirection (direction) {
      this.direction = direction
      this.snakeMove()
    },
    // 控制蛇的方向
    snakeMove () {
      switch (this.direction) {
        case 0: // 上  网上移动就是列的改变，列减1行
          this.move(0, -1)
          break
        case 1: // 下
          this.move(0, 1)
          break
        case 2: // 左
          this.move(-1, 0)
          break
        case 3: // 右
          this.move(1, 0)
          break
        default:
          break
      }
      this.isEat()
    },
    nextPage () {
      this.saveForm()
      this.$router.push({path: '/fifth'})
    }
  }
}
</script>
<style scope="lang">
* {
  padding: 0;
  margin: 0;
}
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
.margin_but {
  margin-bottom: 20px;
  margin-top: 10px;
}
.margin_left_20 {
  margin-left: 15px;
}
.content {
  width: 500px;
  /* height: 500px; */

  /* margin-left: 520px; */
  position: relative;
  border: 1px solid gainsboro;
  display: flex;
  margin: 15px auto;
}
.snake-grassland {
  position: relative;
  background-color: #fff;
  width: 500px;
  height: 500px;
}
.snake-grassland .snake {
  background-color: #409eff;
  position: absolute;
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 10px;
  height: 10px;
}

.snake-grassland .food {
  background-color: #f56c6c;
  position: absolute;
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.button {
  display: flex;
  justify-content: space-evenly;
  margin: 20px auto;
}
.ruleForm {
  padding: 180px 60px 20px;
}
.fail {
  position: absolute;
  width: 500px;
  height: 500px;
  background: #fff;
  text-align: center;
}
.fail > .el-alert {
  margin: 100px 20px 30px !important;
  width: auto !important;
  padding: 16px;
}
.fail-title {
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
}
.total-score {
  margin: 15px auto 20px;
  font-size: 20px;
  font-weight: bold;
}
.text_center {
  text-align: center;
}
.fail .el-alert__title {
  font-size: 20px;
}
</style>
