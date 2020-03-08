// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    way: ["邮箱", "QQ号"],
    wayIndex: 0,
    tips:["请输入邮箱","请输入号码"]
  },

  bindWayChange: function (e) {
    console.log('picker way 发生选择改变，携带值为', e.detail.value);

    this.setData({
      wayIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  contract:function(options){
    this.setData({
      contract: options.detail.value
    })
  },
  info: function (options) {
    this.setData({
      info:options.detail.value
    })
  },
  showTopTips:function(options){
    var that = this;
    var type = "";
    if(that.data.wayIndex==0){
      type="邮箱";
    }else{
      type = "QQ";
    }
    wx.request({
      url: 'http://localhost:8088/report/insert?sid=' +type+":"+that.data.contract+"&info="+that.data.info,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        wx.showModal({
          title: '操作成功',
          showCancel: false,
        })
      },
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