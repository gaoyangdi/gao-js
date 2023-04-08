export const ajax = (axios,e,baseURL,Message) => { 
  // 创建axios实例
    const service = axios.create({
      baseURL:baseURL,
      timeout: 15000, // 请求超时时间
      // onUploadProgress: function (env) { 
      //   console.log(env)
      // },
      // onDownloadProgress: function (env) {
      //  console.log(env)
      // },
    });
    service.interceptors.request.use(
    
      config => {
        config.params = { timestamp: Date.now() };
        config.headers =e 
        return config;
      },
      error => {
        try { 
            Message.error({ message: "请求超时,请稍候再试..." });
            return Promise.reject(error);
        } catch(err) { 
            console.error(err+"Message-----no")
        } 
      }
    );
    service.interceptors.response.use(
      function (response) {
        //请求正常则返回
        let res = response.data;
        if (res.errno == '501') {
          try { 
            localStorage.clear()
            Message.error(res.errmsg);
            var time = setTimeout(function () {
              location.replace('./')
              clearTimeout(time)
            }, 2000)
        } catch (err){ 
            console.error(err+"Message-----no")
        } 
          return
        }

        return Promise.resolve(response);
      },
      function (error) {
        try { 
            Message.error("网络链接失败,请稍候再试...");
            return Promise.reject(error);
        } catch (err){ 
           console.error(err+"Message-----no")
        } 
        
      }
    );
  return service;
} 