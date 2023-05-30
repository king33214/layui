$(document).ready(function() {

  // 工具变量
  let layer = layui.layer
  // 工具函数
  // 1.获取用户信息
  function getUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success: response => {
        if(response.status !== 0){
          return layer.msg('获取用户信息失败!')
        }
        renderAvatar(response.data)
      }
    })
  }
  // 2.渲染用户头像和名称
  function renderAvatar(data){
    let name = data.username
    $('#welcome').html(`欢迎&nbsp&nbsp;${name}`)
    if(data.user_pic !== null){
      $('.layui-nav-img').attr('src', data.user_pic).show()
      $('text-avatar').hide()
    } else {
      $('.layui-nav-img').hide()
      let firstName = name[0].toUpperCase()
      $('.text-avatar').html(firstName).show()
    }
  }

  getUserInfo()

  // 退出
  $('#btnLogout').on('click',() => {
    layer.confirm('您确定退出登录吗?',{icon:3,title:'提示'},index => {
      localStorage.removeItem('bigEvent')
      location.href = '/login.html'
      layer.close(index)
    })
  })
})