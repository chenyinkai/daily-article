var WxParse = require('../../wxParse/wxParse.js');
//index.js
Page({
  data: {
    articleInfo: {},//文章信息
    article: null,//文章正文
    btnShow: false,
    articleCurr: "" //本篇文章日期 yyyy-mm-dd
  },
  onLoad: function () {
    this.getArticle();
  },
  again: function(){
    this.getArticle();
  },
  getArticle:function(){
    var that = this;
    wx.showLoading({
      title: "加载中"
    });
    wx.request({
      url: "https://interface.meiriyiwen.com/article/random?dev=1",
      dataType: "json",
      success: function (data) {
        wx.hideLoading();
        var str = data.data.data.content;
        var curr = data.data.data.date.curr;
        var currFormat = curr.substring(0, 4) + "-" + curr.substring(4, 6) + "-" + curr.substring(6, curr.length);
        WxParse.wxParse('article', 'html', str, that, 0);
        that.setData({
          articleInfo: data.data.data,
          articleCurr: currFormat,
          btnShow: true
        });
        //回到顶部
        wx.pageScrollTo({
          scrollTop: 0
        })
      },
      fail: function () {
        wx.showToast({
          title: '哇哦，出错啦',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  }
})
