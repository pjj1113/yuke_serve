var express = require('express')
var utils = require('../../utils');
var router = express.Router()

var db = require('../db') //引入数据库封装模块

/* GET home page. */
router.get('/type/getlist', function (req, res, next) {
  //查询users表
  var sql = 'select * from commodity_type'
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
router.post('/type/add', function (req, res, next) {
  //查询users表
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let stop_open_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let name = '', model, barcode, creatr_date, imgList, remark, price;
  console.log(req.body)
  req.body.name ? name = req.body.name : '';
  req.body.model ? model = req.body.model : '';
  req.body.barcode ? barcode = req.body.barcode : '';
  req.body.creatrDate ? creatr_date = req.body.creatrDate : '';
  req.body.imgList ? imgList = req.body.imgList : '';
  req.body.remark ? remark = req.body.remark : '';
  req.body.price ? price = req.body.price : '';
  var sql = `INSERT INTO commodity_type (\`id\`, \`name\`,\`model\`,\`barcode\`,\`creatr_date\`,\`imgList\`,\`remark\`,\`price\`) VALUES ('${ id }','${ name }','${ model }','${ barcode }','${ stop_open_date }','${ imgList }','${ remark }','${ price }')`
  var sqlArr = []
  var callBack = (err, data) => {
    console.log(data)
    if (err) {
      console.log('连接错误', err)
      res.send({
        code: 400,
        message:err
      })
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
router.post('/type/update', function (req, res, next) {
  //查询users表
  var modelId = req.body.modelId;
  var name = req.body.name;
  var model = req.body.model;
  var barcode = req.body.barcode;
  var imgList = req.body.imgList;
  var remark = req.body.remark;
  var sql = `UPDATE commodity_type SET \`name\`='${ name }',\`model\`='${ model }',\`barcode\`='${ barcode }',\`imgList\`='${ imgList }',\`remark\`='${ remark }' WHERE \`id\`='${ modelId }';`
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
router.post('/type/delete', function (req, res, next) {
  //查询users表
  let id
  req.body.id ? id = req.body.id : '';
  // var sql = 'select * from commodity'
  var sql = `DELETE FROM commodity_type WHERE \`id\`='${ id }'`
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