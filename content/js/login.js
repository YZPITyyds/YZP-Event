$(function(){
    // 给去注册链接绑定事件
    $('#link-reg').on('click',function(){
        $('.loginBox').hide()
        $('.regBox').show()
    })
    // 给去登陆链接绑定事件
    $('#link-login').on('click',function(){
        $('.regBox').hide()
        $('.loginBox').show()
    })
    // 从layui获取form对象
    var form=layui.form
    // 自定义校验方法
    form.verify({
        // 密码校验
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        // 一致性校验
        repwd:function(value){
        var pwd = $('#firstpwd').val()
        if(pwd!==value)
        {
        return '两次输入的密码不一致，请重新输入'
        }
        }
    })
    // 监听注册事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault();
        var data={
            username:$('#form-reg [name="username"]').val(),
            password:$('#form-reg [name="password"]').val()
        };
        $.post('/api/reguser',data,
        function(res)
        {
            if(res.status!==0)
            {
              return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录', function(){
                time:1500
                //方法一    
                // $('.regBox').hide()
                // $('.loginBox').show()
                // 方法二
                $('#link-login').click()
              }); 
        })
    })
   // 监听登录事件
   $('#form-login').submit(function(e){
    e.preventDefault();
    var data=$(this).serialize() //快速获得表单中的数据
    $.post('/api/login',data,
    function(res)
    {
        if(res.status!==0)
        {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // 登录成功后，将token保存在localstorage中
        localStorage.setItem('token',res.token)
        // 登录跳转
        location.href='../大事件项目/index.html'
    })
   })
})
