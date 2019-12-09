const musicUtil = require('../../utils/music-util.js')
let details = {}
wx.cloud.database().collection('image_info').get({
    success: function (res) {
        details = res.data[0]
    }
})

Page({
    data: {
        articles: {},
        isPlaying: false
    },
    onLoad: function (options) {
        let that = this;
        let aid = options.aid;
        this.setData({
            articles: details.articleList[--aid]
        })
        let colBool = wx.getStorageSync(`colList[${aid}]`);
        if (!colBool) {
            wx.setStorageSync(`colList[${aid}]`, false);
        }
        this.setData({
            col: wx.getStorageSync(`colList[${aid}]`)
        })
        // 检验播放器播放的是否为当前歌曲，避免点击其余文章，也出现正在播放状态
      if (musicUtil.isConcurrent(that.data.articles.music.dataUrl)) {
            that.setData({
                isPlaying: true
            })
        }
    },
    collect: function (event) {
        let id = event.currentTarget.dataset.id;
        if (this.data.col) {
            this.setData({
                col: false
            })
            wx.setStorageSync(`colList[${--id}]`, false);
            wx.showToast({
                title: "取消收藏成功~",
                icon: "none"
            })
        } else {
            this.setData({
                col: true
            })
            wx.setStorageSync(`colList[${--id}]`, true);
            wx.showToast({
                title: "收藏文章成功~",
                icon: "none"
            })
        }
    },
    share: function () {
        wx.showActionSheet({
            itemList: [
                "分享到QQ",
                "分享到微信好友",
                "分享到朋友圈",
                "分享到新浪微博"
            ],
            itemColor: "#000",
            success(res) {
                var toast = [
                    "你确定要分享到QQ吗？",
                    "你确定要分享给微信好友吗？",
                    "你确定要分享到朋友圈吗？",
                    "你确定要分享到新浪微博吗？"
                ]
                wx.showModal({
                    title: toast[res.tapIndex],
                    content: '你分享了也没用，哈哈哈哈！',
                    showCancel: true,
                    success(res) {
                        if (res.confirm) {
                            wx.showToast({
                                title: "不给分享，逗你玩的！",
                                icon: "none"
                            })
                        } else if (res.cancel) {
                            wx.showToast({
                                title: "小屁孩，为什么取消了！",
                                icon: "none"
                            })
                        } else {
                            wx.showToast({
                                title: "分享失败！",
                                icon: "none"
                            })
                        }
                    },
                    fail(err) {
                        console.log(err)
                    }
                })
            }
        })
    },
    onMusic: function (event) {
        let that = this;
        //如果是当前歌曲，则直接调用开关接口。如果不是，则刷新播放器
        if (musicUtil.isConcurrent(that.data.articles.music.dataUrl)) {
            musicUtil.switchByData(this.musicOn, this.musicStop)
        } else {
            musicUtil.initMusic(that.data.articles.music.dataUrl)
            this.musicOn()
        }
    },
    musicOn: function () {
        this.setData({
            isPlaying: true
        })
    },
    musicStop: function () {
        this.setData({
            isPlaying: false
        })
    }
});