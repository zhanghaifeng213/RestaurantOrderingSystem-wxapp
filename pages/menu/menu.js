const db = wx.cloud.database()
const menu = db.collection('menu')

Page({
  data: {
    totalPrice:0,
    quantity:0,
    detailShowed:false,
    selected:[]
  },
  onLoad(){
    menu.get().then(({data})=>{
      this.setData({
        menu:data
      })
    })
  },
  switchType(e){
    const index = e.currentTarget.dataset.index
    this.setData({
      ['menu[' + index + '].opened']: !this.data.menu[index].opened
    })
  },
  select(e){
    let that = this
    let item = e.currentTarget.dataset.item
    let selected = that.data.selected
    let result = selected.find(t => t.id === item.id)
    if (result){
      result.count++
    }else{
      item.count = 1
      selected.push(item)
    }
    this.setData({ 
      selected, 
      quantity: ++that.data.quantity, 
      totalPrice: Math.round((that.data.totalPrice + e.currentTarget.dataset.item.price) * 100) / 100
    })
  },
  toggleDetail(){
    this.setData({
      detailShowed: !this.data.detailShowed
    })
  },
  onPageScroll(){
    this.setData({
      detailShowed:false
    })
  },
  increase(e) {
    let that = this
    let selected = that.data.selected
    let index = selected.findIndex(t => t.id === e.currentTarget.dataset.item.id)
    this.setData({
      ['selected[' + index + '].count']: ++selected[index].count,
      quantity: ++that.data.quantity,
      totalPrice: Math.round((that.data.totalPrice + e.currentTarget.dataset.item.price) * 100) / 100
    })
  },
  decrease(e) {
    let that = this
    let selected = that.data.selected
    let index = selected.findIndex(t => t.id === e.currentTarget.dataset.item.id)
    let count = selected[index].count
    if (count > 1) {
      this.setData({
        ['selected[' + index + '].count']: --count
      })
    } else {
      selected.splice(index, 1)
      this.setData({
        selected
      })
    }
    this.setData({
      quantity: --that.data.quantity,
      totalPrice: Math.round((that.data.totalPrice - e.currentTarget.dataset.item.price) * 100) / 100
    })
  },
  submit(){
    let that = this
    if (that.data.totalPrice!==0){
      try{
        wx.setStorageSync('order', {
          selected: that.data.selected,
          totalPrice: that.data.totalPrice,
          quantity: that.data.quantity,
          timestampe: new Date().getTime()
        })
      } catch(e){

      }
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }else{
      wx.showModal()
    }
  },
  stop(){}
})