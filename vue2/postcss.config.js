module.exports = {
  plugins: {
    // "postcss-import": {},
    // "postcss-url": {},
    // "postcss-aspect-ratio-mini": {},
    // "postcss-write-svg": { utf8: false },
    // "postcss-cssnext": {}, //由于cssnext和cssnano都具有autoprefixer，事实上只需要一个，所以把默认的autoprefixer删除掉，然后把cssnano中的autoprefixer设置为false
    // "postcss-px-to-viewport": {
    //   viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
    //   viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
    //   unitPrecision: 3, // 指定px转换为视窗单位值的小数位数（很多时候无法整除）
    //   viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
    //   selectorBlackList: [".ignore"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加，建议定义一至两个通用的类名
    //   minPixelValue: 1, // 小于或等于1px不转换为视窗单位，你也可以设置为你想要的值
    //   mediaQuery: false, // 允许在媒体查询中转换px
    // },
    // cssnano: {
    //   preset: "advanced",
    //   autoprefixer: false,
    //   "postcss-zindex": false,
    // },
    autoprefixer: {},
    // 移动端项目开启此插件，将px转为rem
    // "postcss-plugin-px2rem": {
    //   rootValue: 75, //换算基数，默认100，这样的话把根标签的字体规定为1rem为50px，这样就可以从设计稿上量出多少个px直接在代码中写上px了。
    //   unitPrecision: 5, //允许REM单位增长到的十进制数字。
    //   propWhiteList: [], //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
    //   propBlackList: [], //黑名单
    //   exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
    //   selectorBlackList: [], //要忽略并保留为px的选择器
    //   ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
    //   replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
    //   mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
    //   minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。默认0
    // },
    "postcss-pxtorem": {
      rootValue: 75, // 指定转换倍率，我现在设置这个表示1rem=75px;
      propList: ["*"], // 属性列表，表示你要把哪些css属性的px转换成rem，这个*表示所有
      minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
      unitPrecision: 6, // 转换成rem单位的小数点后的保留位数
      selectorBalckList: [], // 匹配不被转换为rem的选择器
      replace: true, // 替换包含rem的规则，而不是添加回退
      mediaQuery: false, // 允许在媒体查询中转换px
      exclude: /node_modules/i,
    },
  },
};
