//logs.js
const util = require('../../utils/util.js')

Page({
  data: {

  },
  onLoad: function () {

  },
  getArticle() {
       let auth = wx.getStorageSync('auth') || '';
      wx.request({
        url: 'https://post-storage-api-ms.juejin.im', //仅为示例，并非真实的接口地址
        data: {
            src: "web",
            uid: auth.uid,
            device_id: auth.clientId,
            token: auth.token,
            type: 'entryView'
            postId: "5b7a50c0e51d4538af60d995"
        },
        success: (res) => {

             console.log(res.data);
        }
      })
  }
})
