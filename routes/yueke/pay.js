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

// 添加
router.post('/add', function (req, res, next) {
  //查询users表
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let stop_open_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let name = '', phone= '', address, remark, commodityList
  console.log(req.body)
  req.body.name ? name = req.body.name : '';
  req.body.phone ? phone = req.body.phone : '';
  req.body.address ? address = req.body.address : '';
  req.body.remark ? remark = req.body.remark : '';
  req.body.commodityList ? commodityList = req.body.commodityList : '';
  var sql = `INSERT INTO order_form (\`id\`, \`name\`, \`phone\`, \`address\`, \`remark\`, \`commodityList\`,\`create_date\`) VALUES ('${ id }','${ name }','${ phone }','${ address }','${ remark }','${ commodityList }','${ stop_open_date }')`
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
  //查询users表  let name = '', phone= '', address, remark, commodityList
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
module.exports = router