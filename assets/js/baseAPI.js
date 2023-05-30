$(document).ready(function() {
  $.ajaxPrefilter(options => {
    options.url= 'http://big-event-api-t.itheima.net' + options.url
    if (options.url.indexOf('/my') !== -1) {
      options.headers = {
        Authorization:localStorage.getItem('bigEvent') || ''
      }
    }
    options.complete = response => {
      if (response.responseJSON.status === 1 && response.responseJSON.message === '身份认证失败！') {
        // 1. 强制清空 token
        localStorage.removeItem('bigEvent')
        // 2. 强制跳转到登录页面
        location.href = '/login.html'
      }
    }
  })
})