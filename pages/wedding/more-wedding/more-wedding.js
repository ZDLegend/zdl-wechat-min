// pages/more-wedding/more-wedding.js
let utils = require('../../../utils/util.js');
const imageData = require('../my-data/my-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weddings: [],
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let [that, categroy] = [this, options.categroy];
    this.data.barTitle = categroy;
    let interfaceUrl = null;
    switch (categroy) {
      case "9月28日 甘肃天水":
        this.getData(imageData)
        break;
      case "10月4日 浙江嘉兴":
        this.getData(imageData)
        break;
      default:
        this.getData(imageData)
    }
    // 保存当前页面的数据请求地址，方便其他函数使用
    this.data.requestUrl = interfaceUrl;
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

  getData(data){
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
    // 保存当前电影总共条数，方便下拉加载使用
    this.data.totalCount += 20;
    // 去除下拉Loding
    wx.stopPullDownRefresh();
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
    this.data.movies = [];
    let requestUrl = this.data.requestUrl + "?count=" + this.data.totalCount;
    utils.http(requestUrl, this.getData);
    this.data.totalCount -= 20;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    let requestUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    utils.http(requestUrl, this.getData);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})