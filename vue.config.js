// 配置别名方便到时候访问文件
module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'router':'@/router',
        'view':'@/views'
      }
    }
  }
}
