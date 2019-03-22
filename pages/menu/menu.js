Page({
  data: {
    totalPrice:0,
    quantity:0,
    detailShowed:false,
    menu:[
      {
        id:"00010000",
        type:"锅底类",
        icon:"/image/type-1.png",
        list: [
          {
            id: "00010001",
            title: "墨鱼丸",
            price: 28,
            unit: "份"
          }, {
            id: "00010002",
            title: "虾滑",
            price: 32,
            unit: "份"
          }, {
            id: "00010003",
            title: "墨鱼丸",
            price: 28,
            unit: "份"
          }, {
            id: "00010004",
            title: "虾滑",
            price: 32,
            unit: "份"
          }
        ]
      },{
        id: "00020000",
        type: "丸滑类",
        icon: "/image/type-2.png",
        list: [
          {
            id:"00020001",
            title: "墨鱼丸",
            price: 28,
            unit: "份"
          }, {
            id: "00020002",
            title:"虾滑",
            price: 32,
            unit: "份"
            }, {
            id: "00020003",
            title: "墨鱼丸",
            price: 28,
            unit: "份"
            }, {
            id: "00020004",
            title: "虾滑",
            price: 32,
            unit: "份"
          }
        ]
      },{
        id:"00030000",
        type: "特色菜类",
        icon:"/image/type-3.png",
        list: [
          {
            id: "00030001",
            title: "墨鱼丸",
            price: 28,
            unit: "份"
          }
        ]
      }, {
        id: "00040000",
        type: "经典火锅类",
        icon: "/image/type-4.png",
        list: [
          {
            id: "00040001",
            title: "墨鱼丸",
            price: 28,
            unit: "份"
          }, {
            id: "00040002",
            title: "虾滑",
            price: 32,
            unit: "份"
          }
        ]
      }, {
        id: "00050000",
        type: "牛肉羊肉类",
        icon: "/image/type-5.png",
        list: [
          {
            id: "00050001",
            title: "墨鱼丸",
            price: 28,
            unit: "份"
          }
        ]
      }, {
        id: "0006000-",
        type: "海鲜河鲜类",
        icon: "/image/type-6.png"
      }, {
        id: "00070000",
        type: "豆制品类",
        icon: "/image/type-7.png"
      }
    ],
    selected:[]
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