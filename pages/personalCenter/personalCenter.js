//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    auth:{}
  },
    onLoad: function () {
    },
    onShow() {
        let auth =  wx.getStorageSync('auth') || {}
        this.setData({
            auth
        })
        this.getUserInfos()
    },
    goLogin() {
        wx.navigateTo({
            url:'/pages/login/login'
        })
    },
    goMeCenter() {
        wx.navigateTo({
            url:'/pages/me/me'
        })
    },
    getUserInfos() {
        let auth = wx.getStorageSync('auth');
        wx.request({
            url:'https://user-storage-api-ms.juejin.im/v1/getUserInfo',
            data:{
                  src: "web",
                  uid: auth.uid,
                  token: auth.token,
                  device_id: auth.clientId,
                  current_uid: auth.uid
            },
            success:(res) => {
                console.log(res.data);
                this.setData({
                    userInfo: res.data.d
                })
            }

        })
    }
})
