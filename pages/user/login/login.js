// pages/user/login/login.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    password: ""
  },
  /**
   * 跳转至注册页面
   */

  setName:function(e){
    this.setData({
      userName:e.detail.value
    })
  },
  setPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  toRegister: function(){
    wx.redirectTo({
      url: '../register/register',
    })
  },

  checkLogin: function(){
    var page = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'http://localhost:8088/stu/login',
      data: {
        name: this.data.userName,
        ut: this.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:'POST',
      success(res) {
        console.log(res);
        wx.hideLoading()
        if(res.data.status==1){
          wx.showToast({
            title: '登录成功',
            duration: 2000
          })
          setTimeout(
            function () {
              wx.hideToast()
              wx.reLaunch({
                url: '/pages/user/user'
              })
            }, 2000
          )
          wx.setStorage({
            key: 'current_user',
            data: res.data.obj,
          })
          app.globalData.webUserInfo = res.data.obj
        }
        else{
          wx.showModal({
            title: '错误',
            content: res.data.obj,
            showCancel: false,
            success: function () {
              page.setData({
                userName: "",
                password: ""
              })
            }
          })
        }
      },
      complete(){
        //wx.hideLoading()
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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