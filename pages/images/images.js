let tolkData = require("my-data/my-data");
Page({
  data: {},
  onLoad(options) {
    this.setData(tolkData);
  },
  onShareAppMessage() {
    let that = this;
    let shareObj = {
      title: "你出现在我诗的每一页",
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
  },
  likeThis(e) {
    let [that, index] = [
      this,
      --e.target.dataset.id
    ];
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
  details(e) {
    let aid = e.currentTarget.dataset.aid;
    wx.navigateTo({
      url: "../image-details/image-details?aid=" + aid
    })
  }
});