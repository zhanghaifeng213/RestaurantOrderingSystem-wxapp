const db = wx.cloud.database()
const Menu = db.collection('menu')

Page({
  data: {
    totalPrice:0,
    quantity:0,
    detailShowed:false,
    selected:[],
    typeCount:[]
  },
  onLoad(){
    Menu.get().then(({data})=>{
      this.setData({
        menu: data,
        // typeCount: new Array(data.length).fill(0)
      })
    })
  },
  onShow(){
    try {
      let order = wx.getStorageSync('order')
      if(order){
        this.setData({
          selected: order.selected,
          totalPrice: order.totalPrice,
          quantity: order.quantity,
          typeCount: order.typeCount,
        })
      }else{
        this.setData({
          selected: [],
          totalPrice: 0,
          quantity: 0,
          typeCount:[]
        })
      }
    } catch (e) { }
  },
  onHide() {
    try {
      wx.setStorageSync('order', {
        selected: this.data.selected,
        totalPrice: this.data.totalPrice,
        quantity: this.data.quantity,
        typeCount: this.data.typeCount,
        timestampe: new Date().getTime()
      })
    } catch (e) { }
  },
  onUnload() {
    try {
      wx.setStorageSync('order', {
        selected: this.data.selected,
        totalPrice: this.data.totalPrice,
        quantity: this.data.quantity,
        typeCount: this.data.typeCount,
        timestampe: new Date().getTime()
      })
    } catch (e) { }
  },
  switchType(e){
    const index = e.currentTarget.dataset.index
    this.setData({
      ['menu[' + index + '].opened']: !this.data.menu[index].opened
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
    let name = e.currentTarget.dataset.name
    let typeIndex = that.data.menu.findIndex(t => t.list.findIndex(t => t.name === name) + 1)
    let item = that.data.menu[typeIndex].list.find(t => t.name === name)
    let selected = that.data.selected
    let selectedIndex = selected.findIndex(t => t.name === name)
    let typeCount = that.data.typeCount
    if (selectedIndex + 1) {
      selected[selectedIndex].count++
    } else {
      item.count = 1
      selected.push(item)
    }
    this.setData({
      selected,
      quantity: ++that.data.quantity,
      totalPrice: Math.round((that.data.totalPrice + item.price) * 100) / 100,
      ['typeCount[' + typeIndex + ']']: this.data.typeCount[typeIndex] ? ++this.data.typeCount[typeIndex]:1
    })
  },
  decrease(e) {
    let that = this
    let name = e.currentTarget.dataset.name
    let typeIndex = that.data.menu.findIndex(t => t.list.findIndex(t => t.name === name) + 1)
    let item = that.data.menu[typeIndex].list.find(t => t.name === name)
    let selected = that.data.selected
    let selectedIndex = selected.findIndex(t => t.name === name)
    let typeCount = that.data.typeCount
    if (selected[selectedIndex].count > 1) {
      selected[selectedIndex].count--
    } else {
      selected.splice(selectedIndex, 1)
    }
    this.setData({
      selected,
      quantity: --that.data.quantity,
      totalPrice: Math.round((that.data.totalPrice - item.price) * 100) / 100,
      ['typeCount[' + typeIndex + ']']: --this.data.typeCount[typeIndex]
    })
  },
  submit(){
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },
  stop(){},
})