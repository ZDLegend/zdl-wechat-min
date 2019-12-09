const data = {
    audioStatus: 1,
    audioCtx: '',
    src: ''
};

const initMusic = src => {
    // 当页面传来新的music时，先销毁之前的audioCtx，否则页面会很嗨
    if (data.audioCtx) {
        data.audioCtx.destroy()
    }

    if (src) {
        data.src = src
        let audioCtx = wx.createInnerAudioContext()
        data.audioCtx = audioCtx
        audioCtx.autoplay = true
        audioCtx.loop = true;
        audioCtx.src = src
        audioCtx.play()
    }
};

const _switch = () => {
    // 如果是播放就停止
    if (data.audioStatus) {
        data.audioStatus = 0;
        data.audioCtx.pause();
    }
    // 如果是停止就播放
    else {
        data.audioStatus = 1;
        data.audioCtx.play();
    }
};

const switchByData = (musicOn, musicStop) => {
    // 如果是播放就停止
    if (data.audioStatus) {
        data.audioStatus = 0;
        data.audioCtx.pause();
        musicStop();
    }
    // 如果是停止就播放
    else {
        data.audioStatus = 1;
        data.audioCtx.play();
        musicOn();
    }
};

//查看当前播放是否同一个音乐
const isConcurrent = src => {
    return data.src === src
};

//查看当前播放状态
const isPlay = () => {
    return data.audioStatus
};

// 写在组件的methods中：

// 在引用组件页面的onShow()中调用
// 否则，如果当发生分享页面行为并返回时，音乐不会自动播放
const onShow = () => {
    if (data.audioStatus) {
        data.audioCtx.play()
    }
};

// 在引用组件页面的onHide()中调用
// 使在跳转到下一个页面后，音乐停止
const onHide = () => {
    if (data.audioStatus) {
        data.audioCtx.pause()
    }

    data.animationData = {}
};

module.exports = {
    initMusic: initMusic,
    _switch: _switch,
    switchByData : switchByData,
    onShow : onShow,
    onHide : onHide,
    isConcurrent : isConcurrent,
    isPlay : isPlay
}



