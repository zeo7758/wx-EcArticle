//index.js
//获取应用实例
const app = getApp()
// cdcdcd
// d81e06
Page({
  data: {
    swiperList:[],
    userInfo: {},
    hasUserInfo: false,
    autoplay: true,
    interval: 5000,
    duration: 300,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      this.getSwiper()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getSwiper: function() {
    //
        wx.request({
          url: 'https://event-storage-api-ms.juejin.im/v2/getEventList?uid=58e099f061ff4b006b1a9ba0&src=web&orderType=startTime&cityAlias=&pageNum=4&pageSize=5', //仅为示例，并非真实的接口地址
          data: {
          },
          header: {
          	'content-type': 'application/json' // 默认值
          },
          success: (res) => {
            this.setData({
                swiperList: res.data.d
            })
          }
        })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
