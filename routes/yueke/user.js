var express = require('express')
var utils = require('../../utils');
var router = express.Router()

var db = require('../db') //引入数据库封装模块

// 查询手机号对应的用户
router.post('/getList', function (req, res, next) {
  req.body.phone ? phone = req.body.phone : '';
  var sql = `SELECT * FROM user WHERE phone='${ phone }';`
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
        data: data.length ? data[0]: null,
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
  let name = '', phone= '', addres = '', remark = ''
  req.body.name ? name = req.body.name : '';
  req.body.phone ? phone = req.body.phone : '';
  req.body.addres ? addres = req.body.addres : '';
  req.body.remark ? remark = req.body.remark : '';
  var sql = `INSERT INTO user (\`id\`, \`name\`, \`phone\`, \`addres\`, \`remark\`,\`create_date\`) VALUES ('${ id }','${ name }','${ phone }','${ addres }','${ remark }','${ stop_open_date }')`
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
  var addres = req.body.addres;
  var remark = req.body.remark;
  var sql = `UPDATE user SET \`name\`='${ name }',\`addres\`='${ addres }' WHERE \`id\`='${ id }';`
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