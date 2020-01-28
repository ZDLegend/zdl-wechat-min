let utils = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    cardRightIn:false,
    cardLeftIn:false,
    weddings: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let categroy = options.categroy;
    this.data.barTitle = categroy;
    switch (categroy) {
      case "9月28日 甘肃天水":
        this.getImage(1)
        break;
      case "10月4日 浙江嘉兴":
        this.getImage(2)
        break;
      default:
        this.getImage(3)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    wx.setNavigationBarTitle({
      title: that.data.barTitle
    })
  },

  getImage: function (type) {
    let that = this;
    utils.getImageData(type, that.getData)
  },

  getData: function (data){
    let wedding = [];
    for (let subject of data) {
      let temp = {}
      temp.title = subject.explain;
      temp.coverageUrl = subject.coverageUrl;
      wedding.push(temp);
    }
    let weddingList = this.data.weddings.concat(wedding);
    this.setData({
      weddings: weddingList
    })
    wx.hideNavigationBarLoading();
  },

  toAgree: function(e){
    let id = e.currentTarget.dataset.id;
    let list = this.data.weddings
    for(let i of list){
      if(i._id === id){
        i.agree = !i.agree
      }
      if (i._id === id && i.agree){
        i.agreeNum = i.agreeNum + 1
      } else if (i._id === id && !i.agree){
        i.agreeNum = i.agreeNum - 1
      }
      this.setData({ list })
    }
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let idx = e.currentTarget.dataset.index;
    let startX = this.data.startX,//开始X坐标
        startY = this.data.startY,//开始Y坐标
        touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
        touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
        //获取滑动角度
        angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    //滑动超过45度角 return
    if (Math.abs(angle) > 45) return;

    if (touchMoveX > startX) { //右滑
      this.setData({
        currentIndex: idx === 0 ? 0 : idx-1,
        cardRightIn: false,
        cardLeftIn: true
      })
    }else{
      this.setData({
        currentIndex: idx === this.data.weddings.length - 1 ? idx : idx + 1,
        cardRightIn:true,
        cardLeftIn: false
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    })

  },

  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
        _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})