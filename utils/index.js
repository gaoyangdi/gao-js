
 /**
  * 屏蔽某个键
 * @key 键的cod  123F12
 */
const onKey = (key) => {
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


/**
  * 某个dom绑定滚动条事件
 * @dom dom元素
 * @funBottom 滚到低触发方法
 * @funTop 滚到头触发方法
 * @funAll 滚动中触发方法
 * @return 返回监听的方法 用于解绑绑定的方法
 */
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

/**
  * 整个页面绑定滚动条事件
 * @funBottom 滚到低触发方法
 * @funTop 滚到头触发方法
 * @funAll 滚动中触发方法
 * @return 返回监听的方法 用于解绑绑定的方法
 */
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

const arrayWeight = (result,limit) => {

						var len=result.length
						for(var i = 0; i < len; i++){
							for(var j = i + 1; j < len; j++){
								if(result[i][limit] == result[j][limit]){
									result.splice(j,1);
									len--;
									j--;
								}
							}
  }
  return result
}



export { 
  onKey,
  onTableScroll,
  onWidowScroll,
  arrayWeight
}
