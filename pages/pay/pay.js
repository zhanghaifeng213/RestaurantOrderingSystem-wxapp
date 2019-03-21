Page({
  data: {

  },
  onLoad(){
    try {
      this.setData({
        order: wx.getStorageSync('order')
      })
    } catch (e) { }
  },
  pay(){
    wx.showModal()
  }
})