// pages/index3/index3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "msg":"hello world1",
    "notice": {},
    "book":{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得所有公告
    console.log("用户进入首页");
    this.getnotice();
    this.getbook();
  },
  getnotice: function (){
    var that = this;
    wx.request({
      url: 'http://localhost:8088/notice/all',
      method:"get",
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data.obj)
        that.setData({
          notice: res.data.obj
        })
      }  
    })
  },
  getbook: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8088/book/indexall',
      method: "get",
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data.obj)
        that.setData({
          book: res.data.obj
        })
      }
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