// pages/diary/info/info.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasWebUserInfo: false,
    webUserInfo: null,
    time:"",
    showModal: false,
    ifcollect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.geto(options);
  },
  ifcollects:function(){
    var userid = app.globalData.webUserInfo.id;
    var bookid = this.data.item.id;
    console.log(bookid);
    console.log(userid);
    var that = this;
    wx.request({
      url: 'http://localhost:8088/book/ifcollect?stuid=' + userid + '&bookid=' + bookid,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        if (res.data.status == 1) {
          that.setData({
            ifcollect: true
          })
        } else {
          that.setData({
            ifcollect: false
          })
        }
      },
    })
  },
  showDialogBtn: function () {
    var that = this;
    if (that.data.item.kj == 0) {
      wx.showModal({
        title: '当前馆藏不足！',
        showCancel: false,
      })
      return false;
    }
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp); 
    timestamp = timestamp+30*24*60*60;

    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log("归还时间：" + Y + "-" + M + "-" +  D);
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
  collect: function () {
    var userid = app.globalData.webUserInfo.id;
    var bookid = this.data.item.id;
    console.log(bookid);
    console.log(userid);
    var that =this;
    wx.request({
      url: 'http://localhost:8088/book/collect?stuid=' + userid + '&bookid=' + bookid,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        if(res.data.status==1){
          wx.showToast({
            title: "已收藏",
            duration: 2000
          })
          that.setData({
            ifcollect: true
          })
        }else{
          that.setData({
            ifcollect: false
          })
          wx.showToast({
            title: "已取消收藏",
            duration: 2000
          })
        }
      },
    })
  },
  geto: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8088/book/get?id=' + options.id,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        console.log(res);
        if (res.data.status == 1) {
          that.setData({
            item: res.data.obj
          })
          that.ifcollects();
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
  setName: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  lent: function (e) {
    var that = this;
    var bagin_r = /^(\d{4})(-)(\d{2})(-)(\d{2})$/;
    console.log(e);
    if (that.data.item.kj==0) {
      wx.showModal({
        title: '当前馆藏不足！',
        showCancel: false,
      })
      return false;
    }
    if (!bagin_r.test(that.data.time)) {
      wx.showModal({
        title: '格式错误或者未填写！参考示例例如：2020-01-01',
        showCancel: false,
      })
      return false;
    }
    console.log(that.data.webUserInfo.id);
    console.log(that.data.item.id);
    var stuid = that.data.webUserInfo.id;
    var bookid = that.data.item.id;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://localhost:8088/borrowing/add?stuid=' + stuid + "&bookid=" + bookid + "&rd=" + that.data.time + "&status=借阅中",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        wx.hideLoading();
        if (res.data.status != 0) {
          wx.showToast({
            title: "借阅成功",
            duration: 2000
          })
          setTimeout(
            function () {
              wx.hideToast()
              wx.reLaunch({
                url: '/pages/user/return/return?id='+res.data.status
              })
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
  yuyue: function (e) {
    var that = this;
    if (that.data.item.kj == 0) {
      wx.showModal({
        title: '当前馆藏不足！',
        showCancel: false,
      })
      return false;
    }
    var stuid = that.data.webUserInfo.id;
    var bookid = that.data.item.id;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://localhost:8088/borrowing/add2?stuid=' + stuid + "&bookid=" + bookid + "&status=预约中",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success(res) {
        wx.hideLoading();
        if (res.data.status != 0) {
          wx.showToast({
            title: "预约成功",
            duration: 2000
          })
          setTimeout(
            function () {
              wx.hideToast()
              wx.reLaunch({
                url: '/pages/user/lent/lent?id=' + res.data.status
              })
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