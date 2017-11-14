//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    articleInfo: {}
  },
  onShareAppMessage: function (res) {
    return {
      title: '每日一文推荐',
      path: '/pages/welcome/welcome',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '分享失败',
          icon: 'loading',
          duration: 2000
        })
      }
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  torandom: function(){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
