$(function () {

    getUserInfo()
    //点击按钮 实现退出功能
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        console.log('aaa');
        // alert('aaa')

        // 提示用户是否确认退出登录
        layer.confirm("你确定退出登录吗？", {
            icon: 3,
            title: "提示"
        }, function (index) {
            //说明你点击了确定
            localStorage.removeItem('token');
            // 重新跳转到登录页面
            location.href = '/login.html';
            //关闭 confim 询问框
            layer.close(index);
        })

        return false
    })
})

// 获取用户的基本信息

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}

// 渲染用户的头像

function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show
    }
}