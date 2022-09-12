$(function(){
    // 自定义密码校验
    var form=layui.form
    form.verify({
    pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
    ], 
    // 一致性校验
    repwd:function(value){
        if(value!==$('[name="newPwd"]').val())
        {
        return '两次输入的密码不一致，请重新输入'
        }
    },
    samepwd:function(value){
        if(value===$('[name="oldPwd"]').val())
        {
            return '新旧密码不能相同！'
        }
    }
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
        method:'POST',
        url:'/my/updatepwd',
        data: $(this).serialize(),
        success:function(res) 
        {
            if(res.status!==0)
                {
                    return layui.layer.msg('修改密码失败！')
                } 
                layui.layer.msg('修改密码成功,请重新登录！')
               var timer = setTimeout(function(){
                  localStorage.removeItem('token')
                window.parent.location.href='../../login.html'
               },2000)
              
        } 
        })
    })
})