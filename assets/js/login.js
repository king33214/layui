
$(document).ready(function() {

    // 工具变量
    let layer = layui.layer
    let form = layui.form
    // 自定义校验规则
    form.verify({
      // Array
      username:[],
      password:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
      // Function
      regpwd: value => {
        let pwd = $('#layui-form-res [name=password]').val()
        if(pwd !== value){
          return '两次密码不一致'
        }
      }
    })
    // 点击切换页面
    $('#register_account').on('click', () => {
      $('.login-box').hide()
      $('.reg-box').show()
    })
    $('#enter_reg').on('click', () => {
      $('.login-box').show()
      $('.reg-box').hide()
    })
    // 注册
    form.on('submit(demo-reg)', data =>{
      console.log(data)
      const {username,password,agreement,nickname} = data.field
      if(!agreement){
        layer.msg('你必须勾选同意用户协议才能注册')
        return false
      }
      $.post('/api/reguser',{username,password},response => {
        if(response.status !== 0){
          return layer.msg('注册失败' + response.message)
        }
        // 弹出提示框
        layer.msg('注册成功',{
          icon:1,
          time:5000
        },() => {
          $('#enter_reg').click()
        })
      }) 
      return false
    })
    // 登录
    form.on('submit(demo-login)', data => {
      const {username,password,verification,forgetpassword} = data.field
      $.post('/api/login',{username,password},response => {
        if(response.status !== 0){
          return layer.msg('登录失败' + response.message)
        }
        layer.msg('登录成功',{
          icon:1,
          time:5000
        },() => {
          localStorage.setItem('bigEvent',response.token)
          location.href = '/index.html'
        })
      })
      return false
    })
})