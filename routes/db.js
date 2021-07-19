var mysql = require('mysql');
module.exports = {
  config: {
    host: "rm-bp1p8sz30w86zoq34so.mysql.rds.aliyuncs.com", //这是数据库的地址
    user: "root", //需要用户的名字
    password: "Pjj19951113", //用户密码 ，如果你没有密码，直接双引号就是
    database: "yueke", //数据库名字
    port: '3306'
  },
  sqlConnect: function(sql, sqlArr, callBack){
    var poll = mysql.createPool(this.config)
    poll.getConnection((err, conn)=> {
      console.log(1221)
      if(err) {
        console.log('连接失败')
      }
      if(conn) {
        console.log(sql, sqlArr, callBack)
        conn.query(sql,sqlArr,callBack)
        conn.release()
      }
    })
  }
}