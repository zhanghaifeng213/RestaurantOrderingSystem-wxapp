const app = getApp()

Page({
  data: {
    userInfo:{},
    tableNumber: app.globalData.tableNumber
  },
  onLoad () {
    wx.showLoading({
      title: '加载中...',
    })
    try{
      this.setData({
        userInfo: wx.getStorageSync("userInfo")
      })
    }catch(e){}
  },
  onShow () {
    if (this.data.userInfo.username) {
      wx.cloud.callFunction({
        name: 'login'
      }).then(({ result }) => {
        let integral = result.integral;
        this.setData({
          'userInfo.integral': integral
        },()=>{
          wx.hideLoading()
          try {
            wx.setStorageSync('userInfo', this.data.userInfo)
          } catch (e) { }
        })
      })
    } else {
      wx.hideLoading()
    }
  },
  getUserInfo(e){
    wx.showLoading({
      title: '登录中...',
    })
    let username = e.detail.userInfo.nickName
    wx.cloud.callFunction({
      name: 'login'
    }).then(({ result }) => {
      let integral = result.integral;
      this.setData({
        userInfo:{
          username,integral
        }
      },()=>{
        wx.hideLoading()
        try {
          wx.setStorageSync('userInfo', this.data.userInfo)
        } catch (e) { }
      })
    })
  },
  stop(){}
})