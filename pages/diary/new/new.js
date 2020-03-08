// pages/diary/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxLength:500,
		texts:0,
		content:"",
		isPublic:false,
		publicString:"私密",
		publicIconClass:"icon-eyeclose-fill"
  },

  updateInput: function(e){
	  var length = e.detail.value.length;
	  this.setData({
		  texts:length,
		  content: e.detail.value
	  })
  },

  changePublic:function(){
	  if(this.data.isPublic===true){
			this.setData({
				isPublic:false,
				publicString:"私密",
				publicIconClass: "icon-eyeclose-fill"
			})
		}else{
			this.setData({
				isPublic: true,
				publicString: "公开",
				publicIconClass: "icon-eye-fill"
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
})