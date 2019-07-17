const os = require('os');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin'); // 引入移动端模拟开发者工具插件
// prerender-spa-plugin
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

function resolve(dir) {
	return path.join(__dirname, dir);
}
const getIp = function () {
	var ifaces = os.networkInterfaces();
	for (var i in ifaces) {
		if (!ifaces[i].length) {
			continue;
		}
		let ips = ifaces[i];
		for (var i = 0; i < ips.length; i++) {
			if (ips[i].family != 'IPv4') continue;
			if (ips[i].address === '127.0.0.1') continue;
			if (ips[i].address.substring(0, 3) == '10.') {
				continue;
			}
			if (ips[i].address.substring(0, 4) == '172.') {
				continue;
			}
			if (ips[i]) return ips[i].address;
		}
	}
};

// 打包排除某些依赖
const externals = {
	vue: 'Vue',
	axios: 'axios'
}
// cdn资源
const cdn = {
	// 开发环境
	dev: {
		css: [],
		js: []
	},
	// 生产环境
	build: {
		css: [],
		js: [
			'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
			'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
		]
	}
}

module.exports = {
	//部署应用的的基本URL
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	//打包路径
	outputDir: process.env.VUE_APP_OUTPUT_DIR,
	//是否在开发环境下启用eslint检测
	lintOnSave: false,
	//生产环境source-map 如需线上调试可设为true
	productionSourceMap: false,
	chainWebpack: config => {
		// 添加CDN参数到htmlWebpackPlugin配置中，详见public/index.html修改
		// 参考链接https://cli.vuejs.org/zh/guide/webpack.html#修改插件选项
		config.plugin('html').tap(args => {
			args[0].cdn = process.env.NODE_ENV === 'production' ? cdn.build : cdn.dev;
			return args
		})
		// 设置目录别名alias
		config.resolve.alias
			.set('@', resolve('src'));
	},
	//css相关配置
	css: {
		//是否为CSS开启source map，设置为true之后可能会影响构建的性能
		sourceMap: false,
		//向 CSS 相关的 loader 传递选项
		loaderOptions: {
			postcss: {
				// 这是rem适配的配置
				// plugins: [
				//     require('postcss-px2rem')({
				//         remUnit: 75
				//     })
				// ]
			},
			sass: {
				// data: '@import "style/_mixin.scss";@import "style/_reset.scss";' // 全局引入
			}
		}
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// externals里的模块不打包
			Object.assign(config, {
				externals
			})
			// 上线压缩去除console等信息
			config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						warnings: false,
						compress: {
							drop_debugger: false,
							drop_console: true,
							pure_funcs: ['console.log'] // 移除console
						}
					},
					sourceMap: false,
					parallel: true //使用多进程并行运行来提高构建速度，默认并发运行次数:os.cpus().length-1
				})
			);
			// SPA插件
			// config.plugins.push(
			// 	new PrerenderSPAPlugin({
			// 		// 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示
			// 		staticDir: path.join(__dirname, process.env.VUE_APP_OUTPUT_DIR),
			// 		// 对应自己的路由文件，比如index有参数，就需要写成 /index/param1
			// 		routes: [ '/', '/home', '/about' ],
			// 		// html文件压缩
			// 		minify: {
			// 			minifyCSS: true, // css压缩
			// 			removeComments: true // 移除注释
			// 		},
			// 		// 如果没有配置这段，也不会进行预编译
			// 		renderer: new Renderer({
			// 			// 不打开chromium浏览器
			// 			headless: false,
			// 			// 在main.js中配置document.dispatchEvent(new Event('render-event'))
			// 			renderAfterDocumentEvent: 'render-event'
			// 		})
			// 	})
			// );
			if (process.env.npm_config_report) {
				// 打包后模块大小分析  npm run build --report
				const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
				config.plugins.push(new BundleAnalyzerPlugin())
			}
			//生产环境去除hash
			Object.assign(config.output, {
				filename: 'js/[name].js',
				chunkFilename: 'js/[name].js'
			})
		} else { // 开发环境配置
			// https://github.com/diamont1001/vconsole-webpack-plugin
			// config.plugins.push(
			// 	new vConsolePlugin({
			// 		filter: [], // 需要过滤的入口文件
			// 		enable: true // 发布代码前记得改回 false
			// 	})
			// )
			// 在 Chrome Devtools 中展示源代码
			config['devtool'] = 'source-map';
		}
	},
	//devserver服务
	devServer: {
		//是否自动打开浏览器
		// open: true,
		host: getIp(), // 暂时注释 运行后可在命令行工具中选择ip地址打开
		//代理服务
		proxy: {
			'/api': {
				target: '<url>',
				ws: true,
				changeOrigin: true
			}
		}
	},
};