// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// eslint-disable-next-line no-extend-native

Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

  const  formatTimeToStr=(times, pattern) =>{
  var d = new Date(times).Format('yyyy-MM-dd hh:mm:ss')
  if (pattern) {
    d = new Date(times).Format(pattern)
  }
  return d.toLocaleString()
}



 /**
  * 格式化时间格式 能加减小时数
 * @time 格式化的时间
 * @numberHours 增加减小时数 
 * @pattern 时间格式 yyyy-MM-dd hh:mm:ss
 * @returns返回设置小时数 
 */
   const formatDateSetHours=(time, numberHours, pattern) => {
  if (time !== null && time !== '') {
    var date = new Date(time)
    if (numberHours) { 
      date.setHours(date.getHours() + numberHours); //num正数为后一天，负数为前一天
    }
    return pattern?formatTimeToStr(date, pattern):formatTimeToStr(date, 'yyyy-MM-dd hh:mm:ss')
  }
}


 /**
  * 格式化时间格式 能加减天数
 * @time 格式化的时间
 * @numberDay 增加减小天数
 * @pattern 时间格式 yyyy-MM-dd hh:mm:ss
 * @returns返回设置天数
 */
  const  formatDateSetDay =(time,numberDay,pattern) => {
  if (time !== null && time !== '') {
    var date = new Date(time)
    if (numberDay) { 
      date.setDate(date.getDay() + numberDay); //num正数为后一天，负数为前一天
    }
    return pattern?formatTimeToStr(date, pattern):formatTimeToStr(date, 'yyyy-MM-dd hh:mm:ss')
  }
}

/**
 * 数字千分位展示并显示n位小数
 * @num 需要格式化的值
 * @precision 保留几位小数，不传小数不处理，不够会填充0
 * @qian 是否显示千分位 true或false
 * @return返回0或者格式化的值
 */
const formatNumber = (num,precision,qian) => {
  let parts;
  // 判断是否为数字
  if (!isNaN(parseFloat(num)) && isFinite(num) ){
    num = Number(num);
    // 处理小数点位数
    num = (
      typeof precision !== 'undefined' ? num.toFixed(precision) : num
    ).toString();
    // 分离数字的小数部分和整数部分
    parts = num.split('.');
   qian?parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):''
    return parts.join('.');
  }
  return 0;
};

const judgeIsNumber = (value) =>
  typeof value === 'number' && !isNaN(value) && Math.abs(value) !== Infinity;

/**
 * 将值转换为百分数
 * @value 任何值
 * @precision 小数位
 */
function formatPercent(value, precision) {
  let result = '0';
  precision?'':precision=2
  if (judgeIsNumber(value) && value !== 0) {
    result =
      value % 1 === 0 ? `${value * 100}` : (value * 100).toFixed(precision);
  }
  return `${result}%`;
}

export { 
  formatTimeToStr,
  formatDateSetHours,
  formatDateSetDay,
  formatNumber,
  formatPercent
}




