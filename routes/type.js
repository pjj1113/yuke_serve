var express = require('express');
var router = express.Router();
var utils = require('../utils');

var db = require('./db') //引入数据库封装模块
/* GET users listing. */
router.get('/select', function (req, res, next) {
  //查询users表
  var sql = 'select * from type'
  var sqlArr = []
  var callBack = (err, data) => {
    console.log(data,1234566)
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
  let name = ''
  req.body.name ? name = req.body.name : '';
  var sqlArr = [];
  var sql = `INSERT INTO type (\`id\`, \`name\`) VALUES ('${ id }','${ name }')`
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
