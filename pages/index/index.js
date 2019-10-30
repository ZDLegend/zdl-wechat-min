//index.js
const musicUtil = require('../../utils/music-util.js')
const app = getApp()
Page({
  data: {
    motto: 'welcome to my board',
    userInfo: {},
    hasUserInfo: false,
    music:'https://7a64-zdlegend-o1ov1-1300454709.tcb.qcloud.la/music/%E5%91%A8%E6%9D%B0%E4%BC%A6%20-%20%E5%8F%AFai%E5%A5%B3%E4%BA%BA.mp3?sign=578811e1b0a5e72fa772e220451f7631&t=1572402672',
    musicClass:'music-on',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //音乐启停函数
  bindViewTap: function() {
    musicUtil.switchByData(this.musicOn, this.musicStop)
  },
  musicOn: function () {
    this.setData({
      musicClass: 'music-on'
    })
  },
  musicStop: function () {
    this.setData({
      musicClass: ''
    })
  },
  onLoad: function () {
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
    musicUtil.initMusic(this.data.music)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    let shareObj = {
      title: "看星星一颗两颗三颗四颗连成线",
      path: '/pages/index/index',
      success(res) {
        // 转发成功之后的回调
      },
      fail(res) {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中  为详细失败信息
        }
      },
      complete() {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    };
    return shareObj;
  }
})
