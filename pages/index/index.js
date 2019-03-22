Page({
  data: {
    userInfo:{}
  },
  onLoad () {
    try{
      this.setData({
        userInfo: wx.getStorageSync("userInfo")
      })
    }catch(e){}
  },
  getUserInfo(e){
    let username = e.detail.userInfo.nickName
    let integral = 1234
    try{
      wx.setStorageSync('userInfo', {
        username,integral
      })
    }catch(e){}
    this.setData({
      userInfo: {
        username, integral
      }
    })
  },
  stop(){}
})