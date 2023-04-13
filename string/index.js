/**
 * strSplit 指定分隔符风格字符串 返回数组
 * @str 字符串
 * @limit 分隔符
 */
const strSplit = (str, limit) => {
    return str.split(limit)
}


/**
 * strReplace 去除字符串指定字符
 * @str 字符串
 * @limit 去除的字符串
 */
const strReplace = (str, limit) => {
  //var reg = /@/g;
   var newReg=new RegExp(limit,"g")
    return str.replace(newReg, '');

}

/**
 * strWeight 字符串去重
 * @str 字符串
 */
const strWeight= (str) => {
    return str.replace(/(.)(?=.*\1)/g,"");

}

/**
 * ArrayBuffer转字符串
 * @buffer ArrayBuffer类型
 * @encoding 指定编码
 */
const ArrayBufferUTF8ToStr = (buffer, encoding = 'utf-8') => {
  const decoder = new TextDecoder(encoding);
  return decoder.decode(buffer);
}

/**
 * randomString 随机字符串
 * @len 随机长度
 */
const randomString =(len)=> {
      let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
      let maxPos = chars.length
      let character = ''
      for (let i = 0; i < len; i++) {
        character += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return character 
}

/**
 * resPhone 正则手机
 * @phone 手机号
 */
const resPhone = (phone) => { 
  var reg = /^1[3|4|5|6|7|8|9]\d{9}$/
  return reg.test(phone)
}

/**
 * resPhone 正则身份证
 * @phone 身份证
 */
const resIdNumber = (idNumber) => { 
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(idNumber)
}

/**
 * resPhone 正则邮箱
 * @phone 邮箱
 */
const resEmail = (email) => { 
  var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(email)
}

/**
 * resPhone 正则网址
 * @url 网址
 */
const resUrl = (url) => { 
  var reg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  return reg.test(url)
}


export {
  strSplit,
  strReplace,
  ArrayBufferUTF8ToStr,
  randomString,
  strWeight,
  resPhone,
  resIdNumber,
  resEmail,
  resUrl
}