const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const vConsolePlugin = require("vconsole-webpack-plugin"); // 引入移动端模拟开发者工具插件

function resolve(dir) {
  return path.join(__dirname, dir);
}

// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
function getIPAddress() {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "0.0.0.0";
}

// 打包排除某些依赖
const externals = {
  vue: "Vue",
  axios: "axios",
};

// cdn资源
const cdn = {
  // 开发环境
  dev: {
    css: ["https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css"],
    js: ["https://cdn.jsdelivr.net/npm/eruda@2.4.1/eruda.min.js"],
  },
  // 生产环境
  build: {
    css: ["https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css"],
    js: ["https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js", "https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js"],
  },
};

module.exports = {
  //部署应用的的基本URL
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  //打包路径
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  //是否在开发环境下启用eslint检测
  lintOnSave: false,
  //生产环境source-map 如需线上调试可设为true
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 添加CDN参数到htmlWebpackPlugin配置中，详见public/index.html修改
    // 参考链接https://cli.vuejs.org/zh/guide/webpack.html#修改插件选项
    config.plugin("html").tap((args) => {
      args[0].cdn = process.env.NODE_ENV === "production" ? cdn.build : cdn.dev;
      return args;
    });
    // 设置目录别名alias
    config.resolve.alias.set("@", resolve("src"));
    config.resolve.alias.set("~", resolve(""));
  },
  //css相关配置
  css: {
    //是否为CSS开启source map，设置为true之后可能会影响构建的性能
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项
    loaderOptions: {},
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // externals里的模块不打包
      Object.assign(config, {
        externals,
      });
      // 上线压缩去除console等信息
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: false,
              drop_console: true,
              pure_funcs: ["console.log"], // 移除console
            },
          },
          sourceMap: false,
          parallel: true, //使用多进程并行运行来提高构建速度，默认并发运行次数:os.cpus().length-1
        })
      );
      if (process.env.npm_config_report) {
        // 打包后模块大小分析  npm run build --report
        const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
        config.plugins.push(new BundleAnalyzerPlugin());
      }
    } else {
      // 开发环境配置
      // https://github.com/diamont1001/vconsole-webpack-plugin
      // config.plugins.push(
      //   new vConsolePlugin({
      //     filter: [], // 需要过滤的入口文件
      //     enable: true, // 发布代码前记得改回 false
      //   })
      // );
      // 在 Chrome Devtools 中展示源代码
      config["devtool"] = "source-map";
    }
  },
  //devserver服务
  devServer: {
    //是否自动打开浏览器
    // open: true,
    host: getIPAddress(), // 暂时注释 运行后可在命令行工具中选择ip地址打开
    //代理服务
    proxy: {
      "/api": {
        // https://cli.vuejs.org/zh/guide/mode-and-env.html#在客户端侧代码中使用环境变量
        target: process.env.VUE_APP_BASE_URL,
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
