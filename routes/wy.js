var express = require('express')
var utils = require('../utils')
var router = express.Router()
var request = require('request')
var qs = require('querystring')
var db = require('./db') //引入数据库封装模块

/* GET home page. */
router.post('/sms', function (req, res, next) {
  let user_name = '',user_mobile= '',user_address='',user_WeChat='',smCode="";
  let stop_id = req.body.stop_id;
  console.log(req.body)
  req.body.user_name ? user_name = req.body.user_name : '';
  req.body.user_mobile ? user_mobile = req.body.user_mobile : '';
  req.body.user_address ? user_address = req.body.user_address : '';
  req.body.user_WeChat ? user_WeChat = req.body.user_WeChat : '';
  var str = 'hushen_hy' + 'hushen@123' + utils.parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
  var md5 = require('md5-node');
  var CheckSum = md5(str)
  var code = utils.parseTime(new Date(), '{h}{i}{s}')
  var post_data = {
    userid:'375',
    timestamp: utils.parseTime(new Date(), '{y}{m}{d}{h}{i}{s}'),
    sign: CheckSum,
    mobile: user_mobile,
    action: 'send',
    content:  ("【验证码】" + `您的验证码${ code }，该验证码1分钟内有效，请勿泄漏于他人`),
    sendTime:'',
    extno: ''
  } //这是需要提交的数据
  var content = qs.stringify(post_data)
  var options = {
    url: 'http://121.43.168.71:8888/v2sms.aspx?' + content, //拼接也是在body 不拼接就写body:"", 封装好的
    method: 'POST',
  }
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');

  // INSERT INTO `user` (`user_id`, `stop_id`, `user_name`, `user_mobile`, `user_address`, `user_WeChat`) VALUES ('213213', '321321', '321321', 1232323232, '321321', '321321321321')
  var sql = `INSERT INTO user (\`user_id\`, \`stop_id\`, \`user_name\`, \`user_mobile\`, \`user_address\`, \`user_WeChat\`,\`date\`,\`smCode\`) VALUES ('${ id }','${ stop_id }','${ user_name }','${ user_mobile }','${user_address}','${ user_WeChat }','${ date }','${ code }')`
  console.log(req.body)
  var sqlArr = []
  var callBack = (err, data) => {
    console.log(data)
    if (err) {
      console.log('连接错误', err)
    } else {
      res.send({
        code: 200,
        message:'添加成功'
      })
    }
  }
  db.sqlConnect(`SELECT * FROM user WHERE user_mobile='${ user_mobile }';`, sqlArr,  (err, data) => {
    if (err) {
      console.log('连接错误', err)
    } else {
      if(data.length) {
        res.send({
          code: 400,
          message:'该手机号已领取！'
        })
        return
      } else {
        request(options, (error, response, body) => {
          db.sqlConnect(sql, sqlArr, callBack)
        })
      }
    }
  })  
})
module.exports = router
