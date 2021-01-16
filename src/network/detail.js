import {request} from "./request";
// 获取详情页的数据
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

// 获取推荐的数据
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

// 整合商品信息
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title=itemInfo.title
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.Price
    this.oldPrice=itemInfo.oldPrice
    this.discount=itemInfo.discountDesc
    this.columns=columns
    this.services=services
    this.realPrice=itemInfo.lowNowPrice
  }
}

//整合商家信息
export class Shop{
  constructor(shopInfo) {
    this.logo=shopInfo.shopLogo
    this.name=shopInfo.name
    this.fans=shopInfo.cFans
    this.sells=shopInfo.cSells
    this.score=shopInfo.score
    this.goodsCount=shopInfo.cgoods
  }
}

// 整合参数信息
export class GoodsParams{
  constructor(info,rule) {
    this.image=info.image?info.images[0]:','
    this.infos=info.set
    this.sizes=rule.tables
  }
}
