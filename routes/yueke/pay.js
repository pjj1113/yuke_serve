var express = require('express')
var utils = require('../../utils');
var router = express.Router()

var db = require('../db') //引入数据库封装模块

/* GET home page. */
router.get('/getlist', function (req, res, next) {
  //查询users表
  var sql = 'select * from order_form'
  var sqlArr = []
  var callBack = (err, data) => {
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
// 查询手机号对应的订单数据
router.post('/user/list', function (req, res, next) {
  req.body.phone ? phone = req.body.phone : '';
  var sql = `SELECT * FROM order_form WHERE phone='${ phone }';`
  var sqlArr = []
  var callBack = (err, data) => {
    if (err) {
      console.log('连接错误', err)
      res.send({
        code: 500,
        data: err
      })
    } else {
      res.send({
        list: data,
      })
    }
  }
  db.sqlConnect(sql, sqlArr, callBack)
})

// 添加
router.post('/add', function (req, res, next) {
  //查询users表
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let stop_open_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let name = '', phone= '', address, remark, commodityList,price
  name = req.body.name ?  req.body.name : '';
  phone = req.body.phone ?  req.body.phone : '';
  address = req.body.address ?  req.body.address : '';
  remark = req.body.remark ?  req.body.remark : '';
  commodityList = req.body.commodityList ? req.body.commodityList : '';
  let start = 0;
  var sql = `INSERT INTO order_form (\`id\`, \`name\`, \`phone\`, \`address\`, \`remark\`, \`commodityList\`,\`create_date\`,\`start\`) VALUES ('${ id }','${ name }','${ phone }','${ address }','${ remark }','${ commodityList }','${ stop_open_date }','${ start }')`
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
  //查询users表  let name = '', phone= '', address, remark, commodityList,price
  var id = req.body.id;
  var name = req.body.name;
  var phone = req.body.phone;
  var address = req.body.address;
  var commodityList = req.body.commodityList;
  var remark = req.body.remark;
  var sql = `UPDATE order_form SET \`name\`='${ name }',\`phone\`='${ phone }',\`address\`='${ address }',\`commodityList\`='${ commodityList }',\`remark\`='${ remark }' WHERE \`id\`='${ id }';`
  //查询users表
  console.log(req.body)
  var sqlArr = []
  var callBack = (err, data) => {
    console.log(data)
    if (err) {
      console.log('连接错误', err)
    } else {
      res.send({
        code: 200,
        message:'修改成功'
      })
    }
  }
  db.sqlConnect(sql, sqlArr, callBack)
})
// 修改状态
router.post('/update/start', function (req, res, next) {
  //查询users表  let name = '', phone= '', address, remark, commodityList,price
  var id = req.body.id;
  var start = req.body.start;
  var sql = `UPDATE order_form SET \`start\`='${ start }' WHERE \`id\`='${ id }';`
  //查询users表
  console.log(req.body)
  var sqlArr = []
  var callBack = (err, data) => {
    console.log(data)
    if (err) {
      console.log('连接错误', err)
    } else {
      res.send({
        code: 200,
        message:'修改成功'
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
  var sql = `DELETE FROM order_form WHERE \`id\`='${ id }'`
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