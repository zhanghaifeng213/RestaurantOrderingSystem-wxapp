const cloud = require('wx-server-sdk')
cloud.init({
  env: 'dev-325389'
})
const db = cloud.database()
const Orders = db.collection('orders')

exports.main = async (event, context) => {
  let data = event
  data.openid = cloud.getWXContext().OPENID
  try {
    const {total} = await Orders.count()
    await Orders.add({data})
    return {
      orderCode: (total + 10000).toString().slice(-4)
    }
  } catch (e) {
    console.error(e)
  }
}