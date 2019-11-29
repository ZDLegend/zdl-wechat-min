Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleImage:"https://pic1.zhimg.com/v2-ae4bb50457a4908130e780e02bdcf938_r.jpg",
    ganshuImage:"https://pic3.zhimg.com/80/v2-39e403095b9b047a6f5aeb243910c0ba_hd.jpg",
    jiaxinImage:"https://pic2.zhimg.com/80/v2-8471d82ae88cff2c485b45f46e9a79a9_hd.jpg",
    wedImage:"https://pic4.zhimg.com/80/v2-5cd4e384dc3994b870d941fa0bd38067_hd.jpg",
    gansu:"9月28日 甘肃天水",
    zhejiang:"10月4日 浙江嘉兴",
    wed:"婚纱照",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      bounceInRight: "ripple bounceInRight",
      bounceInLeft: "ripple bounceInLeft",
      bounceIn: "ripple swing",
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