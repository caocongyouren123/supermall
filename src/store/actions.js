import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
const actions = {
  addCart(context, payload) {
    // 1.查看是否添加过
    return new Promise((resolve, reject) => {
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.+1或者新添加
      if (oldProduct) {
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        payload.checked = true
        context.commit(ADD_TO_CART,payload)
        resolve('新商品添加成功！')
      }
    })
  }
}
export default actions
