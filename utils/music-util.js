const data = {
    icon: 'https://7a64-zdlegend-o1ov1-1300454709.tcb.qcloud.la/images/jay/jay_head.jpg?sign=50745acce385cf237332a89501ec4706&t=1572416787',
    audioStatus: 1,
    audioCtx: '',
    musicClass: 'music-on'
};

const initMusic = src => {
    // 当页面传来新的music时，先销毁之前的audioCtx，否则页面会很嗨
    if (data.audioCtx) {
        data.audioCtx.destroy()
    }

    if (src) {
        let audioCtx = wx.createInnerAudioContext()
        data.audioCtx = audioCtx
        if (data.audioStatus === '1') {
            audioCtx.autoplay = true
        }
        audioCtx.loop = true;
        audioCtx.src = src
        audioCtx.play()
    }
}

const _switch = () => {
    // 如果是播放就停止
    if (data.audioStatus) {
        data.audioStatus = 0;
        data.musicClass = '';
        data.audioCtx.pause()
        // 如果是停止就播放
    } else {
        data.audioStatus = 1;
        data.musicClass = 'music-on';
        data.audioCtx.play()
    }
}

// 写在组件的methods中：

// 在引用组件页面的onShow()中调用
// 否则，如果当发生分享页面行为并返回时，音乐不会自动播放
const onShow = function () {
    if (data.music && data.audioStatus) {
        data.audioCtx.play()
    }
};

// 在引用组件页面的onHide()中调用
// 使在跳转到下一个页面后，音乐停止
const onHide = function () {
    if (data.music && this.data.audioStatus) {
        data.audioCtx.pause()
    }

    data.animationData = {}
};

module.exports = {
    initMusic: initMusic,
    _switch: _switch,
    onShow : onShow,
    onHide : onHide
}



