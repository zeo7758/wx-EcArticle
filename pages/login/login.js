//logs.js
const util = require('../../utils/util.js')

Page({
  data: {

  },
  formSubmit(e){
      let data = e.detail.value;
      this.login(data)
  },
  login(data) {
      console.log(data);
      // https://juejin.im/auth/type/phoneNumber
      wx.request({
          url: 'https://juejin.im/auth/type/phoneNumber',
          method: "POST",
          data: data,
          success:(res) => {
              console.log(res);
              if(res.statusCode == 200) {
                  // 登录成功
                  wx.setStorage({
                      key:'auth',
                      data: {
                        'token': res.data.token,
                        'uid': res.data.userId,
                        'clientId': res.data.clientId,
                      }
                  })
                  wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000,
                      complete: () => {
                          console.log(222222);
                          wx.navigateBack({
                            })
                      }
                    })
              }else if(res.statusCode == 401) {
                  // 密码错误www
                  wx.showToast({
                      title: '密码错误',
                      icon: 'success',
                      duration: 2000
                  })
              }else if(res.statusCode == 404){
                  // 用户不存在
                  wx.showToast({
                      title: '用户不存在',
                      icon: 'success',
                      duration: 2000
                  })
              }else {
                  // 未知错误
                  wx.showToast({
                      title: '未知错误',
                      icon: 'success',
                      duration: 2000
                  })
              }
          }
      })
  }
})
