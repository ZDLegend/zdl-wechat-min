const util = require('../../utils/util.js')
const imageData = require('my-data/my-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerShow: true,
    closeImgShow: false,
    showOrHide: "hidden"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(1, "tianshui", "9月28日 甘肃天水");
    this.getData(2, "jiaxing", "10月4日 浙江嘉兴");
    this.getData(3, "wedding", "婚纱照");
  },
  /**
   * 获取数据
   * @param type
   * @param setKey
   * @param slogans
   */
  getData: function(type, setKey, slogans) {
    console.log(imageData)
    let wedding = [];
    for (let subject of imageData) {
      let temp = {}
      temp.title = subject.explain;
      temp.coverageUrl = subject.coverageUrl;
      wedding.push(temp);
    }
    this.setData({
      [setKey]: {
        slogan: slogans,
        weddings: wedding
      },
      showOrHide: "visible"
    });
    // util.getImageData(res => {
    //   console.log(res)
    //   let wedding = [];
    //   for (let subject of data.tolkData) {
    //     let temp = {}
    //     temp.title = subject.explain;
    //     temp.coverageUrl = subject.coverageUrl;
    //     wedding.push(temp);
    //   }
    //   this.setData({
    //     [setKey]: {
    //       slogan: slogans,
    //       wedding: wedding
    //     },
    //     showOrHide: "visible"
    //   });
    // })
  },

  //进入更多
  onMoreTap: function(e) {
    let categroy = e.currentTarget.dataset.categroy;
    wx.navigateTo({
      url: 'more-wedding/more-wedding?categroy=' + categroy,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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