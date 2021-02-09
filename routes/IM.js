var express = require('express')
var utils = require('../utils')
var router = express.Router()
const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI4G6YQWedwhh3AqXHwtts',
  accessKeySecret: 'uHgOkFEUYhQ6Zb2PN5nyBbmK9Acicc',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

var params = {
  "RegionId": "cn-hangzhou",
  "PhoneNumbers": "15705547960"
}

var requestOption = {
  method: 'POST'
};



/* GET home page. */
router.get('/get', function (req, res, next) {
  client.request('SendSms', params, requestOption).then((result) => {
    console.log(JSON.stringify(result));
    res.send({
      code: 200,
      message:'添加成功'
    })
  }, (ex) => {
    res.send({
      code: 200,
      message:'失败'
    })
    console.log(ex);
  })
})
module.exports = router
