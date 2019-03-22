const app = getApp()

Page({
  data: {
    detailShowed:false,
    userInfo: {},
    tableNumber: app.globalData.tableNumber
  },
  onLoad(){
    try {
      this.setData({
        order: wx.getStorageSync('order'),
        userInfo: wx.getStorageSync("userInfo")
      })
    } catch (e) { }
  },
  switchDetail(){
    this.setData({
      detailShowed:!this.data.detailShowed
    })
  },
  pay(){
    wx.showModal()
  },
  getUserInfo(e) {
    let username = e.detail.userInfo.nickName
    let integral = 1234
    try {
      wx.setStorageSync('userInfo', {
        username, integral
      })
    } catch (e) { }
    this.setData({
      userInfo: {
        username, integral
      }
    })
  },
  stop() { }
})