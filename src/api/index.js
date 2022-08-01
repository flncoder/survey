import request from '../unit/request.js'
import {transData} from '../unit/requestData'

// 参与者ID生成接口
// export function start () {
//   return new Promise((resolve, reject) => {
//     request.get('/start', function (res) {
//       return resolve(res.data)
//     })
//   })
// }
export function start(params) {
  return request({
    url: '/start',
    method: 'get',
    params: transData(params),
  })
}
// 行为数据接口
// export function interfaceData (data) {
//   return new Promise((resolve, reject) => {
//     request.postForm('/interfaceData', data, function (res) {
//       return resolve(res.data)
//     })
//   })
// }
//审计模板-新增、修改
export function interfaceData(params, headers) {
  return request({
    url: '/interfaceData',
    method: 'post',
    params: transData(params)
  })
}
// 管理接口
// export function manage (data) {
//   return new Promise((resolve, reject) => {
//     request.postForm('/manage', data, function (res) {
//       return resolve(res.data)
//     })
//   })
// }
