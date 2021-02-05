var express = require('express');
var router = express.Router();
var utils = require('../utils');

var db = require('./db') //引入数据库封装模块
/* GET users listing. */
router.get('/get', function (req, res, next) {
  //查询users表
  var sql = 'select * from user'
  var sqlArr = []
  var callBack = (err, data) => {
    console.log(data)
    if (err) {
      console.log('连接错误', err)
    } else {
      res.send({
        list: data,
      })
    }
  }
  db.sqlConnect(sql, sqlArr, callBack)
})
router.post('/add', function(req, res, next) {
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let user_name = '',user_mobile= '',user_address='',user_WeChat='';
  let stop_id = req.body.stop_id;
  console.log(req.body)
  req.body.user_name ? user_name = req.body.user_name : '';
  req.body.user_mobile ? user_mobile = req.body.user_mobile : '';
  req.body.user_address ? user_address = req.body.user_address : '';
  req.body.user_WeChat ? user_WeChat = req.body.user_WeChat : '';
  // INSERT INTO `user` (`user_id`, `stop_id`, `user_name`, `user_mobile`, `user_address`, `user_WeChat`) VALUES ('213213', '321321', '321321', 1232323232, '321321', '321321321321')
  var sql = `INSERT INTO user (\`user_id\`, \`stop_id\`, \`user_name\`, \`user_mobile\`, \`user_address\`, \`user_WeChat\`,\`date\`) VALUES ('${ id }','${ stop_id }','${ user_name }','${ user_mobile }','${user_address}','${ user_WeChat }','${ date }')`
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
  db.sqlConnect(sql, sqlArr, callBack)
});

module.exports = router;
