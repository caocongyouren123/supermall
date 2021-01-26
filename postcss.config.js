module.exports={
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:375,   // 视窗的宽度,对应的是我们设计稿的宽度 (iphone 6的标准750*1334高清屏乘以了2
                                // 实际上是375*667 )
      viewportHeight:667,  // 视窗的高度,对应的是我们设计稿的高度
      unitPrecision:5,     // 指定‘px’转换为时窗单位值的小数位数（很多时候无法整除）
      viewpointUnit:'vw',      // 指定需要转换成的视窗单位，建议使用xw(视口宽度，1.vw：1vw等于视口宽度的1%。)
      selectorBlackList:['ignore','tab-bar','tab-bar-item'], // 指定不需要转换的类
      minPixelValue:1,        //  小于或者等于1px不转换为视窗单位
      mediaQuery:false,          // 允许在媒体查询中转换'px'
      exclude:[/TabBar/]
    }
  }
}
