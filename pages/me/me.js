//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
      peopleInfo: {}
  },
  onLoad: function (options) {

      let id = options.id || '';
      if(id) {
          // 获取他人信息
          this.getMultiUser(id)
      }else{
          // 获取自己的信息
          this.getPeopleInfo()
      }
  },
  goUndev() {
      wx.navigateTo({
          url: '/pages/undev/undev'
      })
  },
  getPeopleInfo() {
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
                  peopleInfo: res.data.d
              })
          }

      })
  },
  // 获取其他用户信息
  getMultiUser(ids) {
    let auth = wx.getStorageSync('auth');
    wx.request({
      url: `https://lccro-api-ms.juejin.im/v1/get_multi_user`,
      data: {
        uid: auth.uid,
        src: 'web',
        device_id: auth.clientId,
        token: auth.token,
        ids,
        cols: 'objectId|username|avatar_large|avatarLarge|role|company|jobTitle|self_description|selfDescription|blogAddress|isUnitedAuthor|isAuthor|authData|totalHotIndex|postedEntriesCount|postedPostsCount|collectedEntriesCount|likedPinCount|collectionSetCount|subscribedTagsCount|followeesCount|followersCount|pinCount',
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          this.setData({
              peopleInfo:data.d && data.d[ids],
          })
        } else {
          wx.showToast({
            title: data.m.toString(),
            icon: 'none',
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '网路开小差，请稍后再试',
          icon: 'none',
        })
      },
    })
  },
})
