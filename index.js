
import * as index$1 from "./format/index.js"
import * as index$2 from "./string/index.js"
import * as index$3 from "./file/index.js"
import * as index$4 from "./utils/index.js"

export const formatTimeToStr = index$1.formatTimeToStr
export const formatDateSetHours = index$1.formatDateSetHours
export const formatDateSetDay = index$1.formatDateSetDay
export const formatNumber = index$1.formatNumber
export const formatPercent = index$1.formatPercent
export const strSplit = index$2.strSplit
export const strReplace = index$2.strReplace
export const arrayBufferUTF8ToStr = index$2.ArrayBufferUTF8ToStr
export const randomString = index$2.randomString
export const resPhone = index$2.resPhone
export const resIdNumber = index$2.resIdNumber
export const resEmail = index$2.resEmail
export const resUrl = index$2.resUrl
export const strWeight = index$2.strWeight
export const arrayWeight = index$4.arrayWeight
export const exportExcel = index$3.exportExcel
export const strToBuf = index$3.strToBuf
export const creatorDownload = index$3.creatorDownload
export const creatorFile = index$3.creatorFile
export const fileZIP = index$3.fileZIP
export const openFile = index$3.openFile
export const saveFile = index$3.saveFile
export const revampFile = index$3.revampFile
export const fileType = index$3.fileType
export const onKey = index$4.onKey
export const onTableScroll = index$4.onTableScroll
export const onWidowScroll = index$4.onWidowScroll




import { ajax } from "./axios/index.js"
export const axios = ajax  



export const openWin = (e) => { 
 window.open(e)
}
















