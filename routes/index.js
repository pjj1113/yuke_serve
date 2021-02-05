var express = require('express')
var utils = require('../utils');
var router = express.Router()

var db = require('./db') //引入数据库封装模块

/* GET home page. */
router.get('/', function (req, res, next) {
  //查询users表
  var sql = 'select * from myInfo'
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
router.get('/stop/user/select', function (req, res, next) {
  //查询users表
  var sql = 'select * from stopUser'
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
// INSERT INTO `stopUser`(`stop_id`, `stop_name`, `stop_open_date`, `principal`, `binding`) VALUES ('223213213','世纪华联','2020-12-12 :12:12;13','万艺豪',11)
// 新增表
router.post('/stop/user/add', function (req, res, next) {
  //查询users表
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let stop_open_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let stop_name = '',principal= '';
  console.log(req.body)
  req.body.stop_name ? stop_name = req.body.stop_name : '';
  req.body.principal ? principal = req.body.principal : '';
  var sql = `INSERT INTO stopUser (\`stop_id\`, \`stop_name\`, \`stop_open_date\`, \`principal\`, \`binding\`) VALUES ('${ id }','${ stop_name }','${ stop_open_date }','${ principal }',0)`
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
})
module.exports = router
