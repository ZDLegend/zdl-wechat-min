let details = {}
wx.cloud.database().collection('image_info').get({
    success: function (res) {
        details = res.data[0]
    }
})
let app = getApp();
Page({
    data: {
        articles: {},
        isPlaying: false
    },
    onLoad(options) {
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
        // 检验播放的文章ID是否一致，避免点击其余文章，也出现正在播放状态
        if (app.globalData.MUSICID === that.data.articles.id) {
            that.setData({
                isPlaying: app.globalData.ISPLAYING
            })
        }
        // 监听音乐启动
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlaying: true
            })
        })
        // 监听音乐暂停
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlaying: false
            })
        })
        // 监听音乐停止，图标初始化
        wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlaying: false
            })
            app.globalData.ISPLAYING = false;
            app.globalData.MUSICID = null;
        })
    },
    collect(event) {
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
    share() {
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
    onMusic(event) {
        let that = this;
        let isPlaying = this.data.isPlaying;
        if (!isPlaying) {
            that.setData({
                isPlaying: true
            })
            app.globalData.ISPLAYING = true;
            app.globalData.MUSICID = that.data.articles.id;
            wx.playBackgroundAudio(that.data.articles.music)
        } else {

            that.setData({
                isPlaying: false
            })
            app.globalData.ISPLAYING = false;
            wx.pauseBackgroundAudio();
        }
    }
});