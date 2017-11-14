var WxParse = require('../../wxParse/wxParse.js');
//index.js
Page({
  data: {
    articleInfo: {},//文章信息
    article: null,//文章正文
    nextShow: false,//下一篇按钮状态
    prevShow: false, //上一篇状态
    nowTime:null, //当前时间
    articleCurr: "" //本篇文章日期 yyyy-mm-dd
  },
  onShareAppMessage: function (res) {
    return {
      title: '今日美文',
      path: '/pages/index/index',
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
  onLoad: function () {
    var that = this;
    // console.log('onLoad')
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 9) {
      month = "0" + month;
    }
    var time = year + month + day;
    wx.showLoading({
      title: "加载中"
    });
    wx.request({
      url: "https://interface.meiriyiwen.com/article/day?dev=1&date="+time,
      dataType: "json",
      success: function (data) {
        wx.hideLoading();
        var str = data.data.data.content;
        var curr = data.data.data.date.curr;
        var currFormat = curr.substring(0,4)+"-"+curr.substring(4,6)+"-"+curr.substring(6,curr.length);
        WxParse.wxParse('article', 'html', str, that, 0);
        that.setData({
          articleInfo : data.data.data,
          nowTime: time,
          prevShow: true, //文章加载完再出现按钮
          articleCurr: currFormat
        })
      },
      fail:function(){
        wx.showToast({
          title: '哇哦，出错啦',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
  prev: function(){
    //加载loading
    wx.showLoading({
      title: "加载中"
    });
    var that = this;
    var prevTime = this.data.articleInfo.date.prev;
    wx.request({
      url: "https://interface.meiriyiwen.com/article/day?dev=1&date=" + prevTime,
      dataType: "json",
      success: function (data) {
        wx.hideLoading();//取消loading
        var str = data.data.data.content;
        var curr = data.data.data.date.curr;
        var currFormat = curr.substring(0, 4) + "-" + curr.substring(4, 6) + "-" + curr.substring(6, curr.length);
        WxParse.wxParse('article', 'html', str, that, 0);
        that.setData({
          articleInfo: data.data.data,
          nextShow: true,
          articleCurr: currFormat
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
  },
  next: function(){
    //加载loading
    wx.showLoading({
      title: "加载中"
    });
    var that = this;
    var nextTime = this.data.articleInfo.date.next;
    if (nextTime == this.data.nowTime){
      this.setData({
        nextShow : false
      })
    }
    wx.request({
      url: "https://interface.meiriyiwen.com/article/day?dev=1&date=" + nextTime,
      dataType: "json",
      success: function (data) {
        wx.hideLoading();//取消loading
        var curr = data.data.data.date.curr;
        var currFormat = curr.substring(0, 4) + "-" + curr.substring(4, 6) + "-" + curr.substring(6, curr.length);
        var str = data.data.data.content;
        WxParse.wxParse('article', 'html', str, that, 0);
        that.setData({
          articleInfo: data.data.data,
          articleCurr: currFormat
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
