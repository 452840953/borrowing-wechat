// pages/diary/info/info.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasWebUserInfo: false,
    webUserInfo: null,
    time: "",
    img: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.geto(options);
  },
  geto: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8088/book/get3?id=' + options.id + '&sid=' + app.globalData.webUserInfo.id,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        console.log(res);
        if (res.data.status == 1) {
          that.setData({
            img: res.data.obj.book.img
          })
          res.data.obj.book.img = res.data.obj.book.img.substring(0, 10);
          that.setData({
            item: res.data.obj
          })
          if (app.globalData.webUserInfo) {
            that.setData({
              "hasWebUserInfo": true,
              "webUserInfo": app.globalData.webUserInfo,
            })
          }
        }
        else {
          wx.showModal({
            title: '错误',
            content: res.data.obj,
            showCancel: false,
            success: function () {
            }
          })
        }
      },
      complete() {
        //wx.hideLoading()
      }
    })
  },
  showDialogBtn: function () {
    var that = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    timestamp = timestamp + 30 * 24 * 60 * 60;

    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log("归还时间：" + Y + "-" + M + "-" + D);
    this.setData({
      showModal: true,
      time: Y + "-" + M + "-" + D
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  onCancel: function () {
    this.hideModal();
  },
  onConfirm: function () {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    this.hideModal();
  },
  lent: function (e) {
    var that = this;
    var stuid = that.data.webUserInfo.id;
    var bookid = that.data.item.book.id;
    wx.request({
      url: 'http://localhost:8088/borrowing/return?stuid=' + stuid + "&bookid=" + bookid + "&status=预约中",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        console.log(res);
        if (res.data.status == 1) {
          wx.showModal({
            title: "成功",
            content: "取消成功",
            showCancel: false,
          })
          setTimeout(
            function () {
              wx.hideToast();
              wx.navigateBack();
            }, 2000
          )
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
  xujie: function (e) {
    var that = this;
    var id = that.data.item.borrowing.id;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://localhost:8088/borrowing/continue2?id=' + id + "&rd=" + that.data.time,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        wx.hideLoading();
        if (res.data.status != 0) {
          wx.showToast({
            title: "续借成功",
            duration: 2000
          })
          setTimeout(
            function () {
              wx.hideToast();
              wx.navigateBack();
            }, 2000
          )
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