<template>
  <div class="manage">
    <h3>后台参数配置</h3>
    <el-form ref="form" label-width="260px">
      <el-form-item label="Export Data">
        <el-button type="primary" @click="handleExport"> Excel</el-button>
      </el-form-item>
      <el-form-item label="Mode">
        <el-radio-group v-model="gameMode" size="medium">
          <el-radio border label="1">single player</el-radio>
          <el-radio border label="2">dual player</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Time">
        <el-input-number v-model="gameTime" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="BDM random price range">
        <el-input class="win_20" v-model="minPrice"></el-input> -- <el-input class="win_20" v-model="maxPrice"></el-input>
      </el-form-item>
      <el-form-item label="Number of games for dual player">
        <el-input-number v-model="doubleGameNum" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="participation fee">
        <el-input-number v-model="fee"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
      <div id="a"></div>
    </el-form>
  </div>
</template>

<script>
import request from '../unit/request'

export default {
  name: 'Introduction',
  data () {
    return {
      gameTime: 0,
      doubleGameNum: 0,
      gameMode: 0,
      minPrice: 0,
      maxPrice: 0,
      fee: 0
    }
  },
  mounted () {
    // 禁用浏览器返回键
    history.pushState(null, null, '')
    window.addEventListener('popstate', this.disableBrowserBack)
  },
  destroyed () {
    // 清除popstate事件 否则会影响到其他页面
    window.removeEventListener('popstate', this.disableBrowserBack, false)
  },
  methods: {
    disableBrowserBack () {
      history.pushState(null, null, '')
    },
    onSubmit () {
      var data = {
        gameMode: this.gameMode,
        gameTime: this.gameTime,
        computerMinPrice: this.minPrice,
        computerMaxPrice: this.maxPrice,
        doubleGameNum: this.doubleGameNum,
        fixedParticipationFee: this.fixedParticipationFee
      }
      request.post('/manage', data).then(res => {
      })
    },
    handleExport () {
      request.get('/export', {responseType: 'blob'}).then(res => {
        // console.log('res', res, new Blob(res))
        let url = window.URL.createObjectURL(new Blob([res]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xlsx')

        document.body.appendChild(link)
        link.click()
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
.win_20 {
  width: 95px;
}
</style>
<style>
  .q_title > span {
    background: #faf9e5;
  }
</style>
