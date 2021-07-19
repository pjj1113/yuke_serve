var express = require('express')
var utils = require('../../utils');
var router = express.Router()

var db = require('../db') //引入数据库封装模块

/* GET home page. */
router.get('/', function (req, res, next) {
  //查询users表
  var sql = 'select * from sy'
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

module.exports = router