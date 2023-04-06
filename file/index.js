import * as XLSX from '../xlsx/xlsx.js' // Vue3 版本

 const exportExcel = (name, head, date, dow) => {
  const list = date.map(item => {
    const obj = {}
    for (const k in item) {
      if (head[k]) {
        obj[head[k]] = item[k]
      }
    }
    return obj
  })
  // 创建工作表
  const data = XLSX.utils.json_to_sheet(list)
  // 创建工作簿
  const wb = XLSX.utils.book_new()
  // 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(wb, data, 'data')
  // 生成文件并下载
  if (dow) {
    const file = XLSX.write(wb, {
      // 要生成的文件类型bookType: 'xlsx',
      // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      bookSST: false,
      type: 'binary'
    })
    let buf = strToBuf(file)
    var blob = new Blob([buf], { type: 'application/octet-stream' })
    return blob
  }
  else {
    XLSX.writeFile(wb, name + '.xlsx')
  }




}
// 将字符串转 ArrayBuffer
 const strToBuf = (s) => {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff

  }
  return buf
}
 const openDownloadDialog = (blob, fileName) => {
  if (typeof blob === 'object' && blob instanceof Blob) {
    blob = URL.createObjectURL(blob) // 创建blob地址}
    var aLink = document.createElement('a')
    aLink.href = blob// HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
    aLink.download = fileName || ''
    var event
    if (window.MouseEvent)
      event = new MouseEvent('click')//   移动端
    else {
      event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    }
    aLink.dispatchEvent(event)
  }
}

export { 
  exportExcel,
  strToBuf,
  openDownloadDialog
}




