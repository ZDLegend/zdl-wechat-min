//index.js
const musicUtil = require('../../utils/music-util.js')
const app = getApp()
Page({
  data: {
    showOrHide: "hidden",
    userInfo: {},
    hasUserInfo: false,
    music:'https://7a64-zdlegend-o1ov1-1300454709.tcb.qcloud.la/music/%E5%91%A8%E6%9D%B0%E4%BC%A6%20-%20%E5%8F%AFai%E5%A5%B3%E4%BA%BA.mp3?sign=578811e1b0a5e72fa772e220451f7631&t=1572402672',
    musicClass:'music-on',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentIndex: 0,
    oldIndex: 0,
    hinge:"",
    view: [{
      in: "",
      out: ""
    }, {
      in: "",
      out: ""
    }]
  },
  //音乐启停函数
  musicEnable: function() {
    //如果是当前歌曲，则直接调用开关接口。如果不是，则刷新播放器
    if (musicUtil.isConcurrent(this.data.music)) {
      musicUtil.switchByData(this.musicOn, this.musicStop)
    } else {
      musicUtil.initMusic(this.data.music)
      this.musicOn()
    }
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
  touchStart: function (t) {
    this.setData({
      startY: t.changedTouches[0].clientY
    })
  },
  touchEnd: function (t) {
    let e = this, n = this.data.view;

    this.setData({
      endY: t.changedTouches[0].clientY
    });

    let a = t.changedTouches[0].clientY - this.data.startY;
    if (a < -50) {
      //下滑
      if (this.data.currentIndex >= 1) return;
      this.setData({
        showOrHide: "visible",
        oldIndex: e.data.currentIndex,
        currentIndex: ++e.data.currentIndex
      });

      n[this.data.oldIndex].out = "ripple fadeOutUp";
      n[this.data.oldIndex].in = "";
      n[this.data.currentIndex].in = "ripple fadeInUp";
      n[this.data.currentIndex].out = "";

      this.setData({
        view: n
      })
      // this.cleanAnimated(),
      // this.showAnimated()
    } else if (a > 50) {
      //左滑
      if (this.data.currentIndex <= 0) return;
      this.setData({
        showOrHide: "visible",
        oldIndex: e.data.currentIndex,
        currentIndex: --e.data.currentIndex
      });
      n[this.data.oldIndex].out = "ripple fadeOutDown";
      n[this.data.oldIndex].in = "";
      n[this.data.currentIndex].in = "ripple fadeInDown";
      n[this.data.currentIndex].out = "";
      this.setData({
        view: n
      })
      // this.cleanAnimated(),
      // this.showAnimated()
    } else {
      this.setData({
        hinge:"ripple hinge"
      });
    }
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    musicUtil.onShow()
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
            wx.showToast({
                title: "小屁孩，为什么取消了",
                icon: "none"
            })
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中  为详细失败信息
            wx.showToast({
                title: "哎呀，失败了",
                icon: "none"
            })
        }
      },
      complete() {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    };
    return shareObj;
  }
})
