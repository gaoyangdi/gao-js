import * as XLSX from '../xlsx/xlsx.js' // Vue3 版本
import * as JsZip from '../jszip/dist/jszip.js' // Vue3 版本


 /**
  * 生成Excel下载  或文件流
 * @name Excel名称 "name.xls"
 * @head Excel表头{id:data.id,name:data.name}
 * @date 生成Excel的数据
 * @dow  下载Excel或Excel流  true生成返回文件  false下载
 */
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
    var blob = new Blob([buf], { type:'application/octet-stream' })
    return blob
  }
  else {
    XLSX.writeFile(wb, name + '.xlsx')
  }

}


 /**
  * 将字符串转 ArrayBuffer
 * @s 字符串 string
 * @return ArrayBuffer
 */
 const strToBuf = (s) => {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff

  }
  return buf
}


 /**
  * 点击下载模拟a标签
 * @blob 下载的文件 File类型
 * @fileName  文件名称 后缀自定义
 */
 const creatorDownload = (blob, fileName) => {
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

 /**
  * 返回后缀类型
 * @type doc
 * @return "application/msword
 */
const fileType = (type) => { 
  var typeList = {
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "dot": "application/msword",
    "dotx":"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "ppt": "application/vnd.ms-powerpoint",
    "pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "pdf": "application/pdf",
    "txt": "text/plain",
    "gif": "image/gif",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg" ,
    "png": "image/png" ,
    "css": "text/css" ,
    "html": "text/html" ,
    "htm": "text/html" ,
    "xsl": "text/xml" ,
    "xml": "text/xml" ,
    "mpeg": "video/mpeg" ,
    "mpg": "video/mpeg" ,
    "avi": "video/x-msvideo" ,
    "movie": "video/x-sgi-movie" ,
    "bin": "application/octet-stream" ,
    "exe": "application/octet-stream" ,
    "so": "application/octet-stream" ,
    "dll": "application/octet-stream" ,
    "ai": "application/postscript" ,
    "dir": "application/x-director" ,
    "js": "application/x-javascript" ,
    "swf": "application/x-shockwave-flash" ,
    "xhtml": "application/xhtml+xml" ,
    "xht": "application/xhtml+xml" ,
    "zip": "application/zip" ,
    "mid": "audio/midi" ,
    "midi": "audio/midi" ,
    "mp3": "audio/mpeg" ,
    "rm": "audio/x-pn-realaudio" ,
    "rpm": "audio/x-pn-realaudio-plugin" ,
    "wav": "audio/x-wav" ,
    "bmp": "image/bmp" 
  }
  return typeList[type]
}

 /**
  * 生成File文件
 * @file 下载的文件 ArrayBuffer类型或blob
 * @name  文件名称 后缀自定义
 * obj 文件类型配置 使用fileType(xlsx) 可以返回type { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', lastModified: new Date() }
 */
const creatorFile = (file, name, obj) => {
    return new File([file],name,obj)
}


 /**
  * 读取zip目录结构
 * @file zip文件
 * @return 返回zip目录结构
 */
const fileZIP = async (file) => { 
  var new_zip = new JSZip();
  const zipFile = await new_zip.loadAsync(file)
  return Object.values(zipFile.files)
}


 /**
  * 读取文件
 * @return 
 * {
          handle: 该文件的句柄,
          file:文件file
        }
 */
const openFile = async () => {
  let fileHandle;
      [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile()
        return {
          handle: fileHandle,
          file:file
        }
}

/**
 * showSaveFilePicker保存文件
 *@text 文本内容 string类型
 *type 文件类型 {
            accept: {
                "text/plain": [".txt"],
            },
        }
 */
const saveFile=async (text,type)=>{
         const options = {
           types: [type],
            };
            const handle = await window.showSaveFilePicker(options);
            const writable = await handle.createWritable();
            await writable.write(text);
            await writable.close();
            return true
  
}
/**
 * 保存文件
 * handle 如果文件句柄有的 保存该句柄的文件，没有创建新文件
 *@text 文本内容 string类型
 *@addTo true或false   true为追加传入handle文件
 *type 文件类型 {
            accept: {
                "text/plain": [".txt"],
            },
        }
 */
const revampFile = async (handle, text, addTo,type) => {
              if (handle) { 
                var  file = await handle.getFile();
                var writable = await handle.createWritable();
                 if (addTo) {
                const y = await file.text()
                await writable.write(y + text);
                } else { 
                  await writable.write(text);
                }
                
                await writable.close();
              } else {
                saveFile(text,type)
              }
       
             
            return true
  
}

export { 
  exportExcel,
  strToBuf,
  creatorDownload,
  creatorFile,
  fileZIP,
  openFile,
  saveFile,
  revampFile,
  fileType
}




