const cloud = require('wx-server-sdk')
cloud.init({
  env: 'dev-325389'
})
const db = cloud.database()
const Users = db.collection('users')

exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  let { data } = await Users.where({openid}).get()
  if (data.length){
    return data[0]
  }else{
    let doc = {
      openid,
      integral: 0
    }
    await Users.add({
      data:doc
    })
    return doc
  }
}