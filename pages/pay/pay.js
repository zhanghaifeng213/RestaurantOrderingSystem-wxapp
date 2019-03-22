const app = getApp()

Page({
  data: {
    detailShowed:false,
    userInfo: {},
    tableNumber: app.globalData.tableNumber,
    restaurantName: app.globalData.restaurantName
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
    let that = this
    if (!that.data.userInfo.username){
      wx.showModal({
        title: '提示',
        content: '请先登录'
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '功能未实现',
      success({confirm}) {//模拟支付成功
        if (confirm) {
          wx.cloud.callFunction({
            name:'order',
            data: that.data.order
          }).then(({result})=>{
            wx.removeStorage({
              key: 'order',
              success(res) {
                wx.redirectTo({
                  url: '/pages/result/result?code=' + result.orderCode,
                })
              }
            })
          })
        }
      }
    })
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