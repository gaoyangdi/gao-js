const onKey=(key) => {
  setInterval(() => {
        debugger
      })
      document.onkeydown = function (e) {
        var currKey = 0,
          evt = e || window.event
        currKey = evt.keyCode || evt.which || evt.charCode
        if (currKey == key) {
          window.event.cancelBubble = true
          window.event.returnValue = false
        }
      }
}
const onTableScroll = (dom, funBottom, funTop,funAll) => { 
      const fun = () => {
          var contentHeight = dom.scrollHeight
            var scrollTop = dom.scrollTop; //滚动高度
            var viewHeight = dom.clientHeight
        if (scrollTop / (contentHeight - viewHeight) == 1) {
          funBottom()
        } else if (scrollTop / (contentHeight - viewHeight) == 0) {
          funTop()
        } else { 
          funAll()
        }
        
      }
    dom.addEventListener('scroll', fun)
    return fun
}


const onWidowScroll = (funBottom, funTop,funAll) => { 
  const fun = () => {
          var contentHeight = document.documentElement.scrollHeight
            var scrollTop = document.documentElement.scrollTop; //滚动高度
            var viewHeight = document.documentElement.clientHeight
        if (scrollTop / (contentHeight - viewHeight) == 1) {
          funBottom()
        } else if (scrollTop / (contentHeight - viewHeight) == 0) {
          funTop()
        } else { 
          funAll()
        }
        
      }
    window.addEventListener('scroll', fun)
    return fun
}





export { 
  onKey,
  onTableScroll,
  onWidowScroll
}
