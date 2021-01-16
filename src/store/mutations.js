import{ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

const mutations = {
  // mutations唯一的目的就是修改state状态，尽可能的完成一些比较单一的事情，多的事放入actions中去完成
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  }
}
export default mutations
