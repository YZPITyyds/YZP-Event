// 在每次调用get,post,ajax时，都会先调用ajaxprefilter函数
// 在这个函数中，我们可以拿到ajax给我们提供的配置对象
$.ajaxPrefilter(function (options) {
    // 统一的跟路径   针对每一次的url地址，都进行url拼接
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 统一为有权限的接口，设置headers请求头
    if(options.url.indexOf('/my/')!==-1)//如果链接中有my借口，就不会返回-1，则带着token发请求
   {
    options.headers =
     {
        Authorization: localStorage.getItem('token') || ''
    }
   }
    // 全局统一挂载complete函数
    options.complete=function(res)
    {
             // 无论成功，还是失败，都会执行complete回调函数
                // 防止用户输入index进入
            // 在complete回调函数中，可以使用res.responseJSON拿到响应的数据
        if(res.responseJSON.status===1 &&res.responseJSON.message==='身份认证失败！')
        {
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.强制调转到登录页
            location.href='../大事件项目/login.html'
        }    
       
    }
})
