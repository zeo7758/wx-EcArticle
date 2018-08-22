//index.js
//获取应用实例
const app = getApp()
// cdcdcd
// d81e06
Page({
  data: {
    swiperList:[],
    hotRecomonList:[],
    userInfo: {},
    hasUserInfo: false,
    autoplay: true,
    interval: 5000,
    duration: 300,
    auth: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow: function () {
      // let auth = wx.getStorageSync('auth') || '';
      // if(auth) {
      //     this.setData({
      //       auth: auth
      //     })
      // }
  },
  onPullDownRefresh: function() {
      // console.log(111111);
      // wx.startPullDownRefresh()
      this.getData();
  },
  onReachBottom: function() {
      let auth = wx.getStorageSync('auth') || '';
      if(auth) {
          // 有登录态
          this.getEntryRank(auth)
      }else {
          // 无登录态
          this.getHotList()
      }
  },
  onShow: function () {
      wx.showLoading({
        title: '数据加载中',
      })
      this.init();
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  goArticle(evt) {
      let url = evt.currentTarget.dataset.url;
      let arr = url.split('/post/'),
          id = arr[1];
          console.log(url);
          console.log(id);
          let goUrl = '/pages/article/article?id='+ id
          wx.navigateTo({
              url:goUrl
          })
  },
  getData(){
      console.log();
      let auth = wx.getStorageSync('auth') || '';
      if(auth) {
          // 有登录态
          this.getSwiper(auth)
          this.getEntryRank(auth)
      }else {
          // 无登录态
          this.getHotList()
      }
  },
  init:function() {
      this.setData({
          hotRecomonList:[]
      })
      this.getData()
  },
  getEntryRank(data) {
      wx.request({
        url: 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank', //仅为示例，并非真实的接口地址
        data: {
            src: "web",
            uid: data.uid,
            device_id: data.clientId,
            token: data.token,
            limit: 20,
            category: 'all',
            recomment: 1
        },
        success: (res) => {

          wx.hideLoading()
          this.setData({
              hotRecomonList: this.data.hotRecomonList.concat(res.data.d.entrylist)
          })
        }
      })
  },
  getSwiper: function(data) {
        wx.request({
          url: 'https://event-storage-api-ms.juejin.im/v2/getEventList', //仅为示例，并非真实的接口地址
          data: {
              src: "web",
              uid: data.uid,
              device_id: data.clientId,
              token: data.token,
              orderType:'startTime',
              pageNum: 4,
              pageSize: 5
          },
          header: {
          	'content-type': 'application/json' // 默认值
          },
          success: (res) => {
           console.log(res.data);
            this.setData({
                swiperList: res.data.d
            })
          }
        })
  },
  getHotList(pageNum) {
    wx.request({
        // https://recommender-api-ms.juejin.im/v1/get_recommended_entry?suid=rfaBMiNJezFqBayeufVa&ab=welcome_3&src=web
        url:'https://recommender-api-ms.juejin.im/v1/get_recommended_entry',
        data:{
            suid:"rfaBMiNJezFqBayeufVa",
            ab:"welcome_3",
            src: "web"
        },
        success: (res)=> {
            console.log(res.data.d);

            wx.hideLoading()
            this.setData({
                hotRecomonList: this.data.hotRecomonList.concat(res.data.d)
            })
        },
        fail: (res) => {
            wx.showModal({
              title: '提示',
              content:JSON.stringify(res),
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
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
