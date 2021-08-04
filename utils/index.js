module.exports =  {
  parseTime: function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
      date = time;
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return time_str;
  },
  pagination(data, sreach) {
    let pageSize = sreach.pageSize ? Number(sreach.pageSize) : null;
    let currentPage = sreach.currentPage ? Number(sreach.currentPage) : null;
    let startDate = sreach.startDate ? sreach.startDate : null;
    let endDate = sreach.endDate ? sreach.endDate : null;
    let tableList = data
    if(startDate && endDate) {
      tableList = data.filter(item => 
        this.parseTime(item.create_date, '{y}-{m}-{d}') >= this.parseTime(startDate, '{y}-{m}-{d}') &&
        this.parseTime(item.create_date, '{y}-{m}-{d}') <= this.parseTime(endDate, '{y}-{m}-{d}') 
      )
    }
    
    if(!pageSize || !currentPage) {
      return {
        list: tableList
      }
    }
    if(pageSize*currentPage >= tableList) {
      return {
        list: tableList,
        pageSize: pageSize,
        currentPage: currentPage,
        total: tableList.length
      }
    } else {
      return {
        list: tableList.slice(pageSize*(currentPage-1), pageSize*currentPage),
        pageSize: pageSize,
        currentPage: currentPage,
        total: tableList.length
      }
    }
  }
}