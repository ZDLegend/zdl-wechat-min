const util = require('../../utils/util.js')
Page({
  data: {},
  onLoad: function (options) {
    let that = this;
    util.getImageInfo(that.precessImageData)
  },
  precessImageData: function (res) {
    let imageData = res.data[0]
    this.setData({
      ["articleList"]: imageData.articleList,
      ["bannerList"]: imageData.bannerList
    });
  },
  onShareAppMessage: function () {
    return {
      title: "你出现在我诗的每一页",
      path: '/pages/index/index',
      success(res) {
        wx.showToast({
          title: "转发成功啦~",
          icon: "none"
        })
      },
      fail(res) {
        // 转发失败之后的回调
        if (res.errMsg === 'shareAppMessage:fail cancel') {
          wx.showToast({
            title: "小屁孩，为什么取消了",
            icon: "none"
          })
        } else if (res.errMsg === 'shareAppMessage:fail') {
          wx.showToast({
            title: "哎呀，失败了",
            icon: "none"
          })
        }
      },
      complete() {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      bounceInRight: "ripple bounceInRight",
      bounceInLeft: "ripple bounceInLeft",
      bounceIn: "ripple bounceIn",
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      bounceInRight: "",
      bounceInLeft: "",
      bounceIn: "",
    })
  },

  likeThis: function (e) {
    let [that, index] = [
      this,
      --e.target.dataset.id
    ];
    console.log(that.data)
    let status = that.data.articleList[index].canLike;
    if (status) {
      let likeCount = that.data.articleList[index].likes;
      that.setData({
        ["articleList[" + index + "].likes"]: ++likeCount,
        ["articleList[" + index + "].canLike"]: false
      })
    } else {
      wx.showToast({
        title: '您已经点过赞啦~',
        icon: "none",
        duration: 2000
      })
    }
  },
  details: function (e) {
    let aid = e.currentTarget.dataset.aid;
    wx.navigateTo({
      url: "../image-details/image-details?aid=" + aid
    })
  }
});