var express = require('express')
var utils = require('../utils');
var router = express.Router()

var db = require('./db') //引入数据库封装模块

/* GET home page. */
router.get('/select', function (req, res, next) {
  //查询users表
  var sql = 'select * from commodity'
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
// 新增表
router.post('/add', function (req, res, next) {
  //查询users表
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let stop_open_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let item_id = '',name= '',type='',price='',betray='',num='', classify = '';
  console.log(req.body)
  req.body.item_id ? item_id = req.body.item_id : '';
  req.body.name ? name = req.body.name : '';
  req.body.type ? type = req.body.type : '';
  req.body.price ? price = req.body.price : '';
  req.body.betray ? betray = req.body.betray : '';
  req.body.num ? num = req.body.num : '';
  req.body.classify ? classify = req.body.classify : '';
  var sql = `INSERT INTO commodity (\`id\`, \`item_id\`, \`name\`, \`type\`, \`price\`, \`betray\`,\`push_date\`,\`start\`,\`num\`,\`classify\`) VALUES ('${ id }','${ item_id }','${ name }','${ type }','${ price }','${ betray }','${ stop_open_date }',1,'${ num }','${ classify }')`
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

// 修改
router.post('/update', function (req, res, next) {
  //查询users表
  let stop_open_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let id='', item_id = '',name= '',type='',price='',betray='',num='', classify='';
  console.log(req.body)
  req.body.id ? id = req.body.id : '';
  req.body.item_id ? item_id = req.body.item_id : '';
  req.body.name ? name = req.body.name : '';
  req.body.type ? type = req.body.type : '';
  req.body.price ? price = req.body.price : '';
  req.body.betray ? betray = req.body.betray : '';
  req.body.num ? num = req.body.num : '';
  req.body.classify ? classify = req.body.classify : '';
  var sql = `UPDATE commodity SET \`item_id\`='${ item_id }',\`betray\`='${ betray }',\`num\`='${ num }',\`name\`='${ name }',\`type\`='${ type }',\`price\`='${ price }',\`classify\`='${ classify }' WHERE \`id\`='${ id }';`
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

// 离库记录
router.post('/leaveBank', function (req, res, next) {
  //查询users表
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let stop_open_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let item_id = '',name= '',type='',price='',betray='',pop_num='', classify= '';
  console.log(req.body)
  req.body.item_id ? item_id = req.body.item_id : '';
  req.body.name ? name = req.body.name : '';
  req.body.type ? type = req.body.type : '';
  req.body.price ? price = req.body.price : '';
  req.body.betray ? betray = req.body.betray : '';
  req.body.pop_num ? pop_num = req.body.pop_num : '';
  req.body.classify ? classify = req.body.classify : '';
  var sql = `INSERT INTO commodity (\`id\`, \`item_id\`, \`name\`, \`type\`, \`price\`, \`betray\`,\`pop_date\`,\`start\`,\`pop_num\`,\`classify\`) VALUES ('${ id }','${ item_id }','${ name }','${ type }','${ price }','${ betray }','${ stop_open_date }',2,'${ pop_num }','${ classify }')`
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

// 删除
router.post('/delete', function (req, res, next) {
  //查询users表
  let id
  req.body.id ? id = req.body.id : '';
  // var sql = 'select * from commodity'
  var sql = `DELETE FROM commodity WHERE \`id\`='${ id }'`
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
