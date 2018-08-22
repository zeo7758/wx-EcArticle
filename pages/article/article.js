//logs.js
const util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
      article: '',
      articleInfo:{},
  },
  onLoad: function(options){
      let id  = options.id || '';
      this.getArticle(id,'entry');
      this.getArticle(id,'entryView');

  },
  goUser() {
      let id=this.data.articleInfo.user.objectId
      wx.navigateTo({
          url:`/pages/me/me?id=${id}`
      })
  },
  getArticle(id,type) {
      // type == entryView 获取文章主内容，type == entry 获取文章title,user等信息
       let auth = wx.getStorageSync('auth') || '';
      wx.request({
        url: 'https://post-storage-api-ms.juejin.im/v1/getDetailData',
        data: {
            src: "web",
            uid: auth.uid,
            device_id: auth.clientId,
            token: auth.token,
            type: type,
            postId:id
        },
        success: (res) => {
            if(type == 'entryView') {
                if(res.data.m == 'ok') {
                    let article = res.data.d.content;
                    // console.log(article);
                    let that = this;
                     WxParse.wxParse('article', 'html', article, that, 5);
                }
            }else {
                // console.log(res.data);
                let data = res.data.d;
                data.formatTime = data.createdAt.substr(0,10)
                this.setData({
                    articleInfo:data
                })
            }
        }
      })
  }
})
