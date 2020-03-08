// pages/diary/book/book.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {},
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
    this.getbook();
  },
  getbook: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8088/book/myborrowing2?id=' + app.globalData.webUserInfo.id,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        console.log(res);
        if (res.data.status == 1) {
          that.setData({
            items: res.data.obj
          })
        }
        else {
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
      complete() {
        //wx.hideLoading()
      }
    })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var that = this;
        wx.request({
          url: 'http://localhost:8088/book/myborrowing?item=name&search=' + value,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'get',
          success(res) {
            console.log(res);
            resolve(res.data.obj);
          },
        })
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
    wx.navigateTo({
      url: "../info/info?id=" + e.detail.item.value
    })
  },
  dunHuanAction: function (e) {
    console.log(e);
    wx.navigateTo({
      url: "../info/info?id=" + e.target.dataset.id
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
      items: {},
      inputShowed: false,
      inputVal: ""
    })
    this.getbook();
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