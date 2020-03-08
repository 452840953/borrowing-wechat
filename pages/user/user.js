// pages/user/user.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "hasWebUserInfo":false,
    "portraitUrl":"/images/icon/user.png",//用户头像
    "jumpto":"/pages/user/login/login",//单击页首的动作
    "webUserInfo":null
  },


  toLogout: function(){
    wx.showModal({
      title: '警告',
      content: '确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'current_user'
          })
          app.globalData.webUserInfo = null
          wx.reLaunch({
            url: '/pages/user/user',
          })
        } 
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    if (app.globalData.webUserInfo){
      this.setData({
        "hasWebUserInfo":true,
        "webUserInfo": app.globalData.webUserInfo,
		"jumpto":"/pages/user/info/info"
      })
    }
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