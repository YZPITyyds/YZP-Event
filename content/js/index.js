$(function () {
    // 调用获取用户的基本信息
    getUserInfo();
    // 提示用户是否退出
    var layer=layui.layer
    $('#btn-goOut').on('click',function(){
        layer.confirm('确定退出登陆？', {icon: 3, title:'提示'}, 
        function(index){
            // 1、清空本地的token
            localStorage.removeItem('token')
            // 2、重新跳转到登陆页面
            location.href='../大事件项目/login.html'
            layer.close(index);
          });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers是请求头的配置对象，携带着token发请求
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用渲染用户信息的函数
            renderAvatar(res.data);
        },
    //     // 无论成功，还是失败，都会执行complete回调函数
    //     complete:function(res){
    //         // 防止用户输入index进入
    //     // 在complete回调函数中，可以使用res.responseJSON拿到响应的数据
    // if(res.responseJSON.status===1 &&res.responseJSON.message==='身份认证失败！')
    // {
    //     // 1.强制清空token
    //     localStorage.removeItem('token')
    //     // 2.强制调转到登录页
    //     location.href='../大事件项目/login.html'
    // }    
    // }
    })
}
// 渲染用户信息
function renderAvatar(user){
    // 第一步  获取用户昵称
    var name=user.nickname || user.username;
    // 第二步  渲染用户昵称
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
    // 第三步  获取用户头像
    if(user.user_pic!==null)
    {
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }
    else{
        // 渲染文字头像
        $('.layui-nav-img').hide()
        var firstname=name[0].toUpperCase()
        $('.text-avatar').html(firstname).show()
    }
}