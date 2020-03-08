// pages/user/register/register.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    email:"",
    password:"",
    pwdConfirm:""
  },

  setName:function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  setEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  setPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  setPwdConfirm: function (e) {
    this.setData({
      pwdConfirm: e.detail.value
    })
  },
  toRegister:function(){
    var page = this;
    if(this.data.password!==this.data.pwdConfirm)
    {
      wx.showModal({
        title: '错误',
        content: '两次密码不一致',
        showCancel: false,
        success:function(){
          page.setData({
            password:"",
            pwdConfirm:""
          })
        }
      })
    }else{
      wx.request({
        url: 'http://www.codeband.top:8080/finalwork/getregisterinfo',
        data: {
          userName: this.data.userName,
          email:this.data.email,
          password: this.data.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success(res) {
          if ("email" in res.data) {
            wx.setStorage({
              key: 'current_user',
              data: res.data,
            })
            wx.showToast({
              title: '注册成功',
              duration:3000,
            })
            setTimeout(
              function () {
                wx.reLaunch({
                  url: '/pages/user/user'
                })
              }, 2000
            )
            app.globalData.webUserInfo = res.data
          }
          else {
            wx.showModal({
              title: '错误',
              content: res.data.msg,
              showCancel: false,
              success: function () {
                page.setData({
                  userName: "",
                  password: "",
                  pwdConfirm: ""
                })
              }
            })
          }
        },
        complete() {
          
        }
      })


    }

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
});
