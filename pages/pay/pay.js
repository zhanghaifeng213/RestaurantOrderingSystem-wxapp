Page({
  data: {
    detailShowed:false
  },
  onLoad(){
    try {
      this.setData({
        order: wx.getStorageSync('order')
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
  }
})