var express = require('express')
var utils = require('../../utils');
var router = express.Router()

var db = require('../db') //引入数据库封装模块

/* GET home page. */
router.get('/enter/getlist', function (req, res, next) {
  //查询users表
  var sql = 'select * from store_enter'
  var sqlArr = []
  var callBack = (err, data) => {
    // console.log(data)
    if (err) {
      console.log('连接错误', err)
    } else {
      if(req.query) {
        res.send({
          list: data,
          ...utils.pagination(data,req.query)
        })
      } else {
        res.send({
          list: data,
          ...utils.pagination(data)
        })
      }
    }
  }
  db.sqlConnect(sql, sqlArr, callBack)
})

// 添加
router.post('/enter/add', function (req, res, next) {
  //查询users表
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let stop_open_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let type_id = '', num = '', price = '', remark = '', barcode = '';

  req.body.type_id ? type_id = req.body.type_id : '';
  req.body.num ? num = req.body.num : '';
  req.body.price ? price = req.body.price : '';
  req.body.remark ? remark = req.body.remark : '';
  req.body.barcode ? barcode = req.body.barcode : '';
  var sql = `INSERT INTO store_enter (\`id\`, \`type_id\`,\`num\`,\`barcode\`,\`create_date\`,\`price\`,\`remark\`) VALUES ('${ id }','${ type_id }','${ num }','${ barcode }','${ stop_open_date }','${ price }','${ remark }')`
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
router.post('/enter/update', function (req, res, next) {
  //查询users表 let type_id = '', num, price, remark, barcode;
  var id = req.body.id;
  var type_id = req.body.type_id;
  var num = req.body.num;
  var price = req.body.price;
  var barcode = req.body.barcode;
  var remark = req.body.remark;
  var sql = `UPDATE store_enter SET \`type_id\`='${ type_id }',\`num\`='${ num }',\`barcode\`='${ barcode }',\`price\`='${ price }',\`remark\`='${ remark }' WHERE \`id\`='${ id }';`
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
router.post('/enter/delete', function (req, res, next) {
  //查询users表
  let id
  req.body.id ? id = req.body.id : '';
  // var sql = 'select * from commodity'
  var sql = `DELETE FROM store_enter WHERE \`id\`='${ id }'`
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



// 出库

/* GET home page. */
router.get('/out/getlist', function (req, res, next) {
  //查询users表
  var sql = 'select * from store_out'
  var sqlArr = []
  var callBack = (err, data) => {
    console.log(data)
    if (err) {
      console.log('连接错误', err)
    } else {
      if(req.query) {
        res.send({
          list: data,
          ...utils.pagination(data,req.query)
        })
      } else {
        res.send({
          list: data,
          ...utils.pagination(data)
        })
      }
    }
  }
  db.sqlConnect(sql, sqlArr, callBack)
})

// 添加
router.post('/out/add', function (req, res, next) {
  //查询users表
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let stop_open_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let type_id = '', num, price, remark, barcode;

  req.body.type_id ? type_id = req.body.type_id : '';
  req.body.num ? num = req.body.num : '';
  req.body.price ? price = req.body.price : '';
  req.body.remark ? remark = req.body.remark : '';
  req.body.barcode ? barcode = req.body.barcode : '';
  var sql = `INSERT INTO store_out (\`id\`, \`type_id\`,\`num\`,\`barcode\`,\`create_date\`,\`price\`,\`remark\`) VALUES ('${ id }','${ type_id }','${ num }','${ barcode }','${ stop_open_date }','${ price }','${ remark }')`
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
router.post('/out/update', function (req, res, next) {
  //查询users表 let type_id = '', num, price, remark, barcode;
  var id = req.body.id;
  var type_id = req.body.type_id;
  var num = req.body.num;
  var price = req.body.price;
  var barcode = req.body.barcode;
  var remark = req.body.remark;
  var sql = `UPDATE store_out SET \`type_id\`='${ type_id }',\`num\`='${ num }',\`barcode\`='${ barcode }',\`price\`='${ price }',\`remark\`='${ remark }' WHERE \`id\`='${ id }';`
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
router.post('/out/delete', function (req, res, next) {
  //查询users表
  let id
  req.body.id ? id = req.body.id : '';
  // var sql = 'select * from commodity'
  var sql = `DELETE FROM store_out WHERE \`id\`='${ id }'`
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

