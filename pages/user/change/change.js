// pages/user/login/login.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: "",
    value: "",
    itemfiled:""
  },
  /**
   * 跳转至注册页面
   */

  setName: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  checkLogin: function () {
    var page = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://localhost:8088/stu/wechatchange',
      data: {
        item: this.data.item,
        id: app.globalData.webUserInfo.id,
        value: page.data.value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success(res) {
        console.log(res);
        wx.hideLoading()
        if (res.data.status == 1) {
          wx.showToast({
            title: '修改成功',
            duration: 2000
          })
          setTimeout(
            function () {
              wx.hideToast()
              wx.reLaunch({
                url: '/pages/user/info/info'
              })
            }, 2000
          )
          wx.setStorage({
            key: 'current_user',
            data: res.data.obj,
          })
          app.globalData.webUserInfo = res.data.obj
        }
        else {
          wx.showModal({
            title: '错误',
            content: res.data.obj,
            showCancel: false,
          })
        }
      },
      complete() {
        //wx.hideLoading()
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      item: options.item,
      itemfiled: options.itemfiled,
      value:options.value
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