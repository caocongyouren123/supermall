import {request} from "./request";

// 获取分类的数据
export function getCategory(){
  return request({
    url:'/category',
  })
}

export function getSubcategory(maitKey) {
  return request({
    url:'/subcategory',
    params:{
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey,type) {
  return request({
    url:'/subcategory/detail',
    params:{
      miniWallkey,
      type
    }
  })
}
