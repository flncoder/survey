<template>
  <div class="userinfo">
    <h2>{{ msg.title }}</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top" v-if="msg">
      <el-form-item :label="msg.item0.Q" v-if="msg.item0" prop="participantEmailAddress">
        <el-input type="text" v-model="form.participantEmailAddress" style="width: 100%" :placeholder="msg.item0.rules"></el-input>
      </el-form-item>
      <el-form-item :label="msg.item1.Q" v-if="msg.item1" prop="gender">
        <el-select v-model="form.gender" :placeholder="msg.item1.rules">
          <el-option v-for="(item, index) in msg.item1.A" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="msg.item2.Q" v-if="msg.item2" prop="age">
        <el-input type="text" v-model="form.age" style="width: 300px" :placeholder="msg.item2.rules" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      </el-form-item>
      <el-form-item :label="msg.item3.Q" v-if="msg.item3" prop="education">
        <el-select v-model="form.education" :placeholder="msg.item3.rules">
          <el-option v-for="(item, index) in msg.item3.A" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="msg.item4.Q" v-if="msg.item4" prop="race">
        <el-select v-model="form.race" :placeholder="msg.item4.rules">
          <el-option v-for="(item, index) in msg.item4.A" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="msg.item5.Q" v-if="msg.item5" prop="numberOfChildren">
        <el-input type="text" v-model="form.numberOfChildren" style="width: 300px" :placeholder="msg.item5.rules" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      </el-form-item>
      <el-form-item :label="msg.item6.Q" v-if="msg.item6" prop="maritalStatus">
        <el-select v-model="form.maritalStatus" :placeholder="msg.item6.rules">
          <el-option v-for="(item, index) in msg.item6.A" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="msg.item7.Q" v-if="msg.item7" prop="annualIncome">
        <el-select v-model="form.annualIncome" :placeholder="msg.item7.rules">
          <el-option v-for="(item, index) in msg.item7.A" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="msg.item8.Q" v-if="msg.item8" prop="employmentStatus">
        <el-select v-model="form.employmentStatus" :placeholder="msg.item8.rules">
          <el-option v-for="(item, index) in msg.item8.A" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Next</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userinfo from '../data/userinfo'
import request from '../unit/request'

export function isOneToNinetyNine (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback()
  } else if (value < 0 || value > 120) {
    callback(new Error('This is not correct.'))
  } else {
    callback()
  }
}
export function checkNumberOfChildren (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback()
  } else if (value < 0 || value > 30) {
    callback(new Error('This is not correct.'))
  } else {
    callback()
  }
}
export default {
  name: 'userinfo',
  data () {
    return {
      msg: {},
      // changeResult: false,
      toGo: true,
      noToGo: false,
      form: {
        gender: undefined,
        age: undefined,
        education: undefined,
        race: undefined,
        numberOfChildren: undefined,
        maritalStatus: undefined,
        annualIncome: undefined,
        employmentStatus: undefined,
        participantEmailAddress: undefined
      },
      rules: {
        gender: {
          required: true,
          message: 'Please select',
          trigger: 'change'
        },
        age: [
          {
            required: true,
            message: 'Please enter',
            trigger: 'blur'
          },
          { validator: isOneToNinetyNine, trigger: 'change' }
        ],
        education: {
          required: true,
          message: 'Please select',
          trigger: 'change'
        },
        race: {
          required: true,
          message: 'Please select',
          trigger: 'change'
        },
        numberOfChildren: [
          {
            required: true,
            message: 'Please enter',
            trigger: 'change'
          },
          { validator: checkNumberOfChildren, trigger: 'change' }
        ],
        maritalStatus: {
          required: true,
          message: 'Please select',
          trigger: 'change'
        },
        annualIncome: {
          required: true,
          message: 'Please select',
          trigger: 'change'
        },
        employmentStatus: {
          required: true,
          message: 'Please select',
          trigger: 'change'
        },
        // 邮箱
        participantEmailAddress: [
          { required: true, message: 'Please enter', trigger: 'blur' },
          { type: 'string',
            message: 'Email format is incorrect',
            trigger: 'blur',
            transform (value) {
              if (!/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)) {
                return true
              } else {
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.msg = userinfo
    // 禁用浏览器返回键
    history.pushState(null, null, '')
    window.addEventListener('popstate', this.disableBrowserBack)

    this.init()
  },
  destroyed () {
    // 清除popstate事件 否则会影响到其他页面
    window.removeEventListener('popstate', this.disableBrowserBack, false)
  },
  methods: {
    init () {
      var data = {
        participantIdNumber: localStorage.getItem('participantIdNumber'),
        participantSessionNumber: localStorage.getItem('participantSessionNumber'),
        participantIpAddress: localStorage.getItem('cip') + localStorage.getItem('cname'),
        participantRecruitmentId: localStorage.getItem('pid'),
        participantTimeStarted: localStorage.getItem('gameStartTime') || (parseInt(new Date().getTime() / 1000) + ''),
        participantInGroupOrNot: false,
        participantEmailAddress: '',
        gender: '-',
        age: 0,
        education: '-',
        race: '-',
        numberOfChildren: 0,
        maritalStatus: '-',
        annualIncome: '-',
        employmentStatus: '-',
        updating: {
          participantMaxPage: 4,
          participantCurrentAppName: '-',
          ParticipantCurrentPageName: 'userinfo',
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
    },
    ageChange (val, maxNum) {
      // 转换数字类型
      this.form.age = Number(val)
      // 重新渲染
      this.$nextTick(() => {
        // 比较输入的值和最大值，返回小的
        let num = Math.min(Number(val), maxNum)
        // 输入负值的情况下， = 0（可根据实际需求更该）
        if (num < 0) {
          this.form.age = 0
        } else {
          // 反之
          this.form.age = num
        }
      })
    },

    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    onSubmit () {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.saveForm()
          this.nextPage()
        }
      })
    },

    saveForm () {
      localStorage.setItem('gendergender', this.form.gender)
      localStorage.setItem('age', this.form.age)
      localStorage.setItem('education', this.form.education)
      localStorage.setItem('race', this.form.race)
      localStorage.setItem('numberOfChildren', this.form.numberOfChildren)
      localStorage.setItem('maritalStatus', this.form.maritalStatus)
      localStorage.setItem('annualIncome', this.form.annualIncome)
      localStorage.setItem('employmentStatus', this.form.employmentStatus)
      localStorage.setItem('participantEmailAddress', this.form.participantEmailAddress)

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
          ParticipantCurrentPageName: 'userinfo',
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
    },
    nextPage () {
      this.$router.push({path: '/introduction'})
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
.el-radio-group {
  display: block;
}
.el-radio {
  margin-bottom: 15px;
  display: block;
}
.margin_bot_20 {
  margin-bottom: 20px;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
    padding-bottom: 0 !important;
    line-height: 26px;
}
.el-select {
  width: 100%;
}
</style>
