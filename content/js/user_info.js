$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6)
            {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    initUserInfo()
    // 初始化用户基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res)
            {
                if(res.status!==0)
                {
                    return layer.msg('获取信息失败')
                } 
                form.val('fromUserInfo',res.data)
            }
        })
    }
   $('#btnReset').on('click',function(e){
    e.preventDefault();
    initUserInfo()
   })
   $('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        method:'POST',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res)
        {
            if(res.status!==0)
                {
                    return layer.msg('修改信息失败！')
                } 
                layer.msg('修改信息成功！')
// 调用父页面中的渲染头像的方法，重新渲染昵称的头像
        }
    })
   })
})