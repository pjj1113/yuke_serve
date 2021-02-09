var express = require('express')
var utils = require('../utils')
var router = express.Router()

var request = require('request')
var sha1 = require('sha1')
var qs = require('querystring')
var Appkey = '06c5fbca705910eb5f97eb679f4ed9dc'
let now = Date.now()
let CurTime = parseInt(now / 1000) + '' //当前时间秒数
var Nonce = sha1(CurTime) //随机数
var AppSecret = '58d91afe8c00'
var str = AppSecret + Nonce + CurTime
var CheckSum = sha1(str)
var post_data = {
  templateid: 19483960,
  mobiles: '["15705547960"]',
  params: '["我是lwei"]',
} //这是需要提交的数据
var content = qs.stringify(post_data)

var options = {
  url: 'https://api.netease.im/sms/sendcode.action?' + content, //拼接也是在body 不拼接就写body:"", 封装好的
  method: 'POST',
  headers: {
    AppKey: Appkey,
    Nonce: Nonce,
    CurTime: CurTime,
    CheckSum: CheckSum,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
}

/* GET home page. */
router.get('/get', function (req, res, next) {
  console.log(options)
  request(options, (error, response, body) => {
    console.log(body)
    res.send({
      code: 200,
      message:'添加成功'
    })
  })
})
module.exports = router
