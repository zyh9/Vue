## Vue.js

### Vue简介

		一个mvvm框架(库)、和angular类似
		
		比较容易上手、小巧

### Vue和Angular区别

		vue——简单、易学
		
			指令：v-xxx
			一片html代码配合上json，在new出来vue实例
			适合: 移动端项目，小巧
		
		angular——上手难
		
			指令：ng-xxx
			所有属性和方法都挂到$scope身上
			适合: pc端项目
		
		共同点: 不兼容低版本IE

### Vue基本雏形

		angular
		
			var app=angular.module('app',[]);
			app.controller('xxx',function($scope){	//C
				$scope.msg='welcome angular'
			})
			
			html:
				<div ng-controller="xxx">{{msg}}</div>
		
		
		vue
		
			let vm=new Vue({
				el:'#box',	//选择器  id className tagName
				data:{
				    msg:'welcome vue'
				}
			});
			
			html:
				<div id="box">{{msg}}</div>

### 常用指令

		v-model		双向数据绑定（一般用于表单元素）
		
		v-for		循环		:key='index'提高循环性能
		
			**Vue2.0写法**:
				v-for="(value,index) in arr"
				
				v-for="(value,key,index) in json"
		
		v-show		显示隐藏
		
		v-on:click/dblclick/mouseover/mouseout...
			简写：
				v-on:	=>	@

### 事件

		事件对象
			
			@click="show($event)"
			
		事件冒泡
			
			阻止冒泡
			
				a). ev.cancelBubble=true;
				
				b). @click.stop		推荐
				
		默认行为(默认事件)
			
			阻止默认行为
			
				a). ev.preventDefault();
				
				b). @contextmenu.prevent	推荐
		键盘
		
			@keydown
			
				$event		事件源
				
				ev.keyCode		键值
				
			@keyup
		
			常用键
			
				回车
				
					a). @keyup.13
					
					b). @keyup.enter
					
				上、下、左、右
				
					@keyup/keydown.up
					
					@keyup/keydown.down
					
					@keyup/keydown.left
					
					@keyup/keydown.right

### 属性

		v-bind:src=""
		
			简写:
			:src=""		推荐
	
		<img src="{{url}}" alt="">	效果能出来，会报错
		
		<img v-bind:src="url" alt="">	效果可以出来，不会报错

### class和style

		:class=""		v-bind:class=""
		
			1)
				:class="[red]"		red是数据
					data:{
						red:red		后一个是class名
					}
					
				:class="[red,blue]"		可传入多个数据
			
			2)
				:class="{red:true,blue:true}"	class名
				
			3)
				:class="{red:a, blue:b}"	布尔值控制
					data:{
						a:true,
						b:false
					}
					
			4)
				:class="json"		直接传入一个json
					data:{
						json:{
							red:true, 
							blue:false
						}
					}
		
		
		:style=""		v-bind:style=""
		
			注意:  复合样式，采用驼峰命名法
			
			1)
				:style="{color:'red'}
				
				:style="[c]"
					data:{
						c:{color:'red'}
					}
	        
			2)
				:style="[c,d]"
					data:{
						c:{color:'red'},
						b:{backgroundColor:'blue'}
					}
				
			3)
				:style="json"
					data:{
						json:{
							color:'red',
							backgroundColor:'gray'
						}
					}

### 模板

		{{msg}}		数据更新模板变化
		
		{{*msg}}	数据只绑定一次
		
		{{{msg}}}	HTML转义输出（可识别html标签）	**注意{{{ }}}在Vue2.0被废弃**

### 过滤器（过滤模板数据）

		系统提供一些过滤器:
		
		{{msg| filterA}}
		
		{{msg| filterA | filterB}}
		
		uppercase		{{'welcome'| uppercase}}	转大写
		
		lowercase		{{'WELCOME'| uppercase}}	转小写
		
		capitalize		首位转大写
		
			{{'welcome'|capitalize}}
			{{'WELCOME'|lowercase|capitalize}}
		
		currency		货币
			
			{{msg| currency '参数'}}

### 数据交互

		引入: vue-resouce
		
		get:
		
			获取一个普通文本数据:
			
				this.$http.get('arr.txt').then(res=>{
				    alert(res.data);
				},err=>{
				    alert(err.status);
				});
				
			给服务发送数据:
			
				this.$http.get('get.php',{
				    a:1,
				    b:2
				}).then(res=>{
				    alert(res.data);
				},err=>{
				    alert(err.status);
				});
		post:
			
			this.$http.post('post.php',{
			    a:1,
			    b:20
			},{
			    emulateJSON:true
			}).then(res=>{
			    alert(res.data);
			},err=>{
			    alert(err.status);
			});
			
		或者直接写：Vue.http.options.emulateJSON = true;
		
		jsonp:
			
			this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
			    wd:'a'
			},{
			    jsonp:'cb'		//callback名字，默认名字就是"callback"
			}).then(res=>{
			    alert(res.data.s);
			},err=>{
			    alert(err.status);
			});

### vue生命周期

		created	->	实例已经创建
		
		beforeCompile	->	编译之前
		
		compiled	->	编译之后
		
		ready	->	插入到文档中
		
		beforeDestroy	->	销毁之前
		
		destroyed	->	销毁之后

### v-cloak

		v-cloak		防止闪烁
		
		<span>{{msg}}</span>		->		v-text
		
		{{{msg}}}		->		v-html		**注意{{{ }}}在Vue2.0被废弃**

### 计算属性的使用

		computed:{
			b(){	//默认调用get
				return 值
			}
		}
		
		computed:{
			b:{
				get(){return 值}
				set(val){...}	=>	参数val就是设置的值的形参
			}
		}
		
		* computed里面可以放置一些业务逻辑代码，一定记得return

### vue实例简单方法

		vm.$el	->	就是元素
		
		vm.$data	->	就是data
		
		vm.$mount	->	手动挂在vue程序
		
		vm.$options	->	获取自定义属性
		
		vm.$destroy	->	销毁对象
		
		vm.$log()	->	查看现在数据的状态

### 循环

		v-for="(value,index) in data"
		
		出现重复数据：
		
			track-by='$index'	提高循环性能		**track-by='$index'在Vue2.0被废弃**

### 过滤器

		vue提供过滤器
		
			capitalize	uppercase	currency...
		
		debounce	配合事件，延迟执行
			"fn|debounce 2000"		延迟2s执行函数
		
		数据配合使用过滤器
		
			limitBy 限制几个	=>limitBy 2	=>取数组前两个
			
			limitBy 取几个 从哪开始	=>limitBy 2 0	=>从第0个开始取2个（第二个参数为数字下标）
			
			filterBy 过滤数据	=>filterBy 可以是某个变量或者确定字符
			
			orderBy 排序
				1  -> 正序
				-1  -> 倒序

### 自定义过滤器

		model ->过滤 -> view
		
		Vue.filter(name,function(input){
			return 代码...
		});


### 自定义指令

		Vue.directive('指令名称',function(参数){
			this.el	-> 原生DOM元素
		});
		
		<div v-red="参数"></div>
		
		指令名称: 	v-red	->	red
		
		* 注意: 必须以 v-开头

### 自定义键盘信息

		获取键值
		
			document.onkeydown=function(ev){
				console.log(ev.keyCode);
			}
			
		Vue自身支持enter以及方向键和字母（a,b,c...）这样的写法
		也支持键值的写法，自定义就是给某个键值定义一个名字
		
		自定义键盘信息（Vue1.0）
		
			Vue.directive('on').keyCodes.ctrl=17;
			
			@keyup.ctrl		=>		自定义的ctrl就可以使用了

### 监听数据变化

		vm.$watch(name,callback);	//浅度监视
		
		vm.$watch(name,callback,{deep:true});	//深度监视
		
		被监听的数据:{
		    handler:function(val,oldVal){
		    
		    },
		    deep:true
		}

### bower

		（前端）包管理器
			npm install bower -g
			验证: bower --version
		
		bower install 插件名字
		bower uninstall 插件名字
		bower info 插件名字	=>查看版本信息

### vue过渡(动画)

> 本质走的css3: transtion,animation

```html
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<script src="bower_components/vue/dist/vue.js"></script>
		<style>
			#div1{
				width:100px;
				height:100px;
				background: red;
			}
			//动画
			.fade-transition{
				transition: 1s all ease;	
			}
			//进入
			.fade-enter{
				opacity: 0;
			}
			//离开
			.fade-leave{
				opacity: 0;
				transform: translateX(200px);
			}
		</style>
	</head>
	<body>
		<div id="box">
			<input type="button" value="按钮" @click="toggle">
			<div id="div1" v-show="bSign" transition="fade"></div>
		</div>
		<script>
			new Vue({
				el:'#box',
				data:{
					bSign:true
				},
				methods:{
					/*toggle:function(){
						alert(1);
					}*/
					toggle(){
						this.bSign=!this.bSign;
					}
				}
			});
		</script>
	</body>
	</html>
```

### vue组件

		组件: 一个大对象

### 定义一个组件

		1.全局组件
			var Aaa=Vue.extend({
				template:'<h3>我是标题</h3>'
			});
			
			Vue.component('aaa',Aaa);
			
			*组件里面放数据:
				data必须是函数的形式，函数必须返回一个对象(json)
				data(){
					return{
					
					}
				}
		
		
		2.局部组件（放到某个组件内部）
			var Aaa=Vue.extend({
				template:'<h3>我是标题</h3>'
			});
			
			var vm=new Vue({
				el:'#box',
				components:{	//局部组件
					aaa:Aaa
				}
			});
			
			另一种编写方式:
				var vm=new Vue({
					el:'#box',
					components:{
						'my-aaa':{
							template:'<h2>标题</h2>'
						}
					}
				});
			
			
		3.配合模板
		
				a). 单独放到某个地方
				
					<script type="text/v-template" id="aaa">
						<h2>标题</h2>
					</script>
					
					var vm=new Vue({
					el:'#box',
					components:{
						'my-aaa':{
							template:'#aaa'
						}
					}
				});
				
				
				b). 直接写在HTML里
				
					<template id="aaa">
						<h1>标题</h1>
					</template>
					
					var vm=new Vue({
					el:'#box',
					components:{
						'my-aaa':{
							template:'#aaa'
						}
					}
					
					
		4.动态组件
		
			<component :is="组件名称"></component>		和切换选项卡类似
			
			<div id="box">
				<input type="button" @click="a='aaa'" value="aaa组件">
				<input type="button" @click="a='bbb'" value="bbb组件">
				<component :is="a"></component>
			</div>
			
			<script>
				var vm=new Vue({
					el:'#box',
					data:{
						a:'aaa'
					},
					components:{
						'aaa':{
							template:'<h2>我是aaa组件</h2>'
						},
						'bbb':{
							template:'<h2>我是bbb组件</h2>'
						}
					}
				});
			</script>

### 组件数据传递

		1. 子组件就想获取父组件data
		
			调用子组件：
				<bbb :m="数据"></bbb>
		
			子组件之内:
				props:['m','myMsg']
		
				props:{
					'm':String,
					'myMsg':Number
				}
		
		2. 父级获取子级数据
		
			*子组件把自己的数据，发送到父级
		
			vm.$emit(事件名,数据);
		
			vm.$dispatch(事件名,数据)	子级向父级发送数据	**在Vue2.0被废弃**
			
			vm.$broadcast(事件名,数据)	父级向子级广播数据	**在Vue2.0被废弃**
			
				配合: event:{}

### slot

		位置、槽口
		
		作用: 占个位置
		
		<div id="box">
			<aaa>
				<ul slot="ul-slot">
					<li>1111</li>
					<li>2222</li>
					<li>3333</li>
				</ul>
				<ol slot="ol-slot">
					<li>111</li>
					<li>222</li>
					<li>333</li>
				</ol>
			</aaa>
			<aaa><aaa>	=>	这个标签就会显示默认的的情况
		</div>
		
		<template id="aaa">
			<h1>xxxx</h1>
			<slot name="ol-slot">这是默认的情况1</slot>
			<p>welcome vue</p>
			<slot name="ul-slot">这是默认的情况2</slot>
		</template>
		
		<script>
			var vm=new Vue({
				el:'#box',
				data:{
					a:'aaa'
				},
				components:{
					'aaa':{
						template:'#aaa'
					}
				}
			});
		</script>


### vue-router(路由)

		根据不同url地址，出现不同效果		**注意这是Vue1.0版本**
		
		主页		home
		新闻页		news
		
		html:
			</div id="box">
				<a v-link="{path:'/home'}">主页</a>		跳转链接
				<a v-link="{path:'/news'}">新闻</a>
			<div>
			展示内容:
			<router-view></router-view>
			
		js:
			//1. 准备一个根组件
			var App=Vue.extend();
			
			//2. Home News组件都准备
			var Home=Vue.extend({
				template:'<h3>我是主页</h3>'
			});
			
			var News=Vue.extend({
				template:'<h3>我是新闻</h3>'
			});
			
			//3. 准备路由
			var router=new VueRouter();
			
			//4. 关联
			router.map({
				'home':{
					component:Home
				},
				'news':{
					component:News
				}
			});
			
			//5. 启动路由
			router.start(App,'#box');
			
			//6. 跳转(重定向)
			router.redirect({
				'/':'home'
			});

### 路由嵌套(多层路由)

		主页		home
			登录		home/login
			注册		home/reg
		新闻页		news
		
		subRoutes:{
			'login':{
				component:{
					template:'<strong>我是登录信息</strong>'
				}
			},
			'reg':{
				component:{
					template:'<strong>我是注册信息</strong>'
				}
			}
		}

### 路由其他信息

		/detail/:id/age/:age
		
		{{$route.path}}		->  当前路径
		
		{{$route.params | json}}	->	当前参数
		
		{{$route.query | json}}		->  数据

### ES6: 模块化开发

		导出模块：
			export default {}
		引入模块:
			import 模块名 from '地址'

###	脚手架

		vue-cli——vue脚手架
		
			帮你提供好基本项目结构
			
		模板：
		
			1).webpack	可以使用(大型项目)
					1.Eslint 检查代码规范
					2.单元测试
					
			2).webpack-simple	个人推荐使用，没有代码检查	√
		
		基本使用流程:
		
		1. npm install vue-cli -g	安装 vue命令环境
			验证安装ok?	=>	vue --version
				
		2. 生成项目模板
			vue init <模板名> 本地文件夹名称
			
		3. 进入到生成目录里面
			cd xxx
			npm install
			
		4. npm run dev

### webpack路由配置

		vue-router		**注意这是Vue1.0版本**
		
		如何查看版本:
			bower info vue-router
			
		配合vue-loader使用:
		
			1. 下载vue-router模块
			
				cnpm install vue-router@0.7.13
				
			2. import VueRouter from 'vue-router'
			
			3. Vue.use(VueRouter);  // VueRouter基于Vue来开发项目
			
			4. 配置路由
				var router=new VueRouter();
				router.map({
					路由规则
				})
			5. 开启
				router.start(App,'#app');

## 到了2.0以后，有哪些变化?

### 在每个组件模板，不再支持片段代码

		组件中模板:
		
			之前:
				<template>
					<h3>我是组件</h3><strong>我是加粗标签</strong>
				</template>
			
			现在:  必须有根元素，包裹住所有的代码
				<template id="aaa">
				        <div>
				            <h3>我是组件</h3>
				            <strong>我是加粗标签</strong>
				        </div>
				</template>

### 关于组件定义

		Vue.extend	
			1.这种方式，在2.0里面有，但是有一些改动
			2.这种写法，即使能用，也不必使用——废弃
		
		Vue.component(组件名称,{	// 在2.0继续能用
			data(){
				return {
				}
			}
			methods:{}
			template:
		});
		
		2.0推出一个组件，简洁定义方式：
			var Home={
				template:''		->   Vue.extend()
			};
			Vue.component('my-aaa',Home);

### 生命周期

		之前:
			created		实例已经创建
			beforeCompile	编译之前
			compiled	编译之后
			ready		插入到文档中	=>	mounted
			beforeDestroy	销毁之前
			destroyed	销毁之后
			
		现在:
			beforeCreate	组件实例刚刚被创建，属性都没有
			created		实例已经创建完成，属性已经绑定
			beforeMount	模板编译之前
			mounted		模板编译之后，代替之前ready	**
			beforeUpdate	组件更新之前
			updated		组件更新完毕	**
			beforeDestroy	组件销毁前
			destroyed	组件销毁后

### 循环

		2.0里面默认就可以添加重复数据
		
		之前:
			v-for="(index,val) in array"
			v-for="(key,val) in json"
		现在:
			v-for="(val,index) in array"
			v-for="(val,key,index) in json"

### track-by="$index"

		变成:		<li v-for="(val,index) in list" :key="index">

### 自定义键盘指令

		之前:		Vue.directive('on').keyCodes.ctrl=17;	
		
		现在:		Vue.config.keyCodes.ctrl=17

### 过滤器

		之前:
			系统就自带很多过滤
				{{msg | currency}}
				{{msg | json}}
				limitBy
				filterBy...
			
		到了2.0， 内置过滤器，全部删除了
		
		
		lodash	工具库	_.debounce(fn,200)
		
		
		自定义过滤器：
			但是，自定义过滤器传参
		
			之前:{{msg | toDou '12' '5'}}
			现在:{{msg | toDou('12','5')}}

### 组件通信

		vm.$emit()
		vm.$on();
		父组件和子组件:
		
			子组件想要拿到父组件数据:
				通过  props
			
			之前，子组件可以更改父组件信息，可以是同步	sync
			现在，不允许直接给父级的数据，做赋值操作
			
			问题，就想更改：
				a). 父组件每次传一个对象给子组件，对象之间引用	√
				b). 只是不报错，mounted中转
			
			
		可以单一事件管理组件通信:	vuex
		
			var Event=new Vue(); // 准备一个空的实例对象
			
			Event.$emit(事件名称, 数据)
			
			Event.$on(事件名称,function(data){
				//data
			}.bind(this));
			
			箭头函数写法：
				Event.$on(事件名称,data=>{
					//data
				});

### debounce		**在Vue2.0被废弃**

		lodash	工具库	_.debounce(fn,200)

### vue2.0 动画

		transition	之前属性
			<p transition="fade"></p>
			
			.fade-transition{}
			.fade-enter{}
			.fade-leave{}
		
		到2.0以后 transition 组件
		
			<transition name="fade">
				运动东西(元素，属性、路由....)
			</transition>
		
		class定义:
			.fade-enter{}	//初始状态
			.fade-enter-active{}	//变化成什么样	->	当元素出来(显示)
			.fade-leave{}
			.fade-leave-active{}	//变成成什么样	->	当元素离开(消失)
		
		如何animate.css配合用？
			<transition enter-active-class="animated zoomInLeft"
				leave-active-class="animated zoomOutRight">
				<p v-show="show"></p>
			</transition>
		
		多个元素运动:
			<transition-group enter-active-class="" leave-active-class="">
				<p :key="1"></p>
				<p :key="2"></p>
			</transition-group>

### vue2.0 路由

		1.布局
			<router-link to="/home">主页</router-link>
			
			<router-view></router-view>
			
		2.路由具体写法
			//组件
			var Home={
			    template:'<h3>我是主页</h3>'
			};
			var News={
			    template:'<h3>我是新闻</h3>'
			};
		
			//配置路由
			const routes=[
			    {path:'/home', componet:Home},
			    {path:'/news', componet:News},
			];
		
			//生成路由实例
			const router=new VueRouter({
			    routes
			});
		
			//最后挂到vue上
			new Vue({
			    router,
			    el:'#box'
			});
			
		3.重定向
			之前  router.rediect	废弃了
			{path:'*', redirect:'/home'}
		
		4.路由嵌套
			/user/username
			
			const routes=[
			    {path:'/home', component:Home},
			    {
			        path:'/user',
			        component:User,
			        children:[  //核心
			            {path:'username', component:UserDetail}
			        ]
			    },
			    {path:'*', redirect:'/home'}
			];
			
		5.路由实例方法
			router.push({path:'home'});  // 直接添加一个路由，表现切换路由，本质往历史记录里面添加一个
			
			router.replace({path:'news'}) // 替换路由，不会往历史记录里面添加
			
		6.路由发生变化
			watch:{
				$route(to,from){
					console.log(to,from);	//to:到哪里，from:从哪来
					console.log(to.path);	//可以获取到你点击的路由路径
					if(to.path=='/home'){
						this.$store.dispatch('');	//发起action
					}else{
						this.$store.dispatch('');
					}
				}
			}

### UI组件

		目的: 为了提高开发效率
		
		原则: 拿过来直接使用

### bootstrap

		twitter 开源
		
		简洁、大方
		
		基于 jquery
		
		栅格化系统+响应式工具 

### elementUI（PC）

> 官网 [http://element.eleme.io/](http://element.eleme.io/)

		1.安装 element-ui
		
			npm i element-ui -D
			
			npm install element-ui --save-dev
		
			//   i	->	install
			//   D	->	--save-dev
			//   S	->	--save
			
			
		2.引入 main.js 入口文件
		
			import ElementUI from 'element-ui'
			import 'element-ui/lib/theme-default/index.css'
		
		
		3.使用组件
		
			Vue.use(ElementUI)
			
			css-loader		引入css
			字体图标	file-loader
			
			less
				less less-loader
				
				
		按需加载相应组件:	√	**推荐**
		
			1.babel-plugin-component
				cnpm install babel-plugin-component -D
				
			2.在.babelrc文件里面新增一个配置
			
				  "plugins": [["component", [
				    {
				      "libraryName": "element-ui",
				      "styleLibraryName": "theme-default"
				    }
				  ]]]
				  
			3.想用哪个组件就用哪个
				引入:
					import {Button,Radio} from 'element-ui'
				使用:
					a). Vue.component(Button.name, Button);		个人不太喜欢
					b). Vue.use(Button);		√	**推荐使用**

### 数据交互

		axios		交互
		
		axios.get(xxx,{}).then(res=>{
			// 成功
		}).catch(err=>{
			// 失败
		})

### mint-ui（移动端）

> 官网 [http://mint-ui.github.io/](http://mint-ui.github.io/)

		1.下载
		
			npm install mint-ui -S
		
		2.引入
		
			import Vue from 'vue';
			import Mint from 'mint-ui';
			import 'mint-ui/lib/style.css'
			Vue.use(Mint);
		
			按需引入:		**推荐使用**
				import { Cell, Checklist } from 'minu-ui';
				Vue.component(Cell.name, Cell);
				Vue.component(Checklist.name, Checklist);
			
		3.中文使用文档 
		
			http://mint-ui.github.io/docs/#/zh-cn2

### 自定义vue全局组件use使用

		首先在components中创建一个Loading文件夹，再新建一个index.js文件（位置可自已定义）
		
		再新建一个组件内容文件	=>	name.vue
		
		以简单的Loading为例：
		
			**index.js内容如下**：
			
				import LoadingComponent from './Loading.vue'
			
				const Loading = {
					install: function(Vue) {
						Vue.component('Loading', LoadingComponent)
					}
				};
				
				export default Loading
			
			
			**Loading.vue内容如下**：
			
				<template>
					<div class="loading-box">
						{{msg}}
					</div>
				</template>
				<script>
					export default{
						data(){
							return {
								msg:'Loading...^_^'
							}
						}
					}
				</script>
				<style scoped>
					.loading-box{
						color: red;
						font-size: 40px;
						font-family: "微软雅黑";
						text-shadow: 2px 2px 5px #000;
					}
				</style>
			
			
			**main.js内容如下**：
			
				import Loading from './components/loading'
				
				Vue.use(Loading)

### 自定义vue过滤器

		首先创建一个filter文件夹，再新建一个index.js文件（位置可自已定义）
		
		再新建一个组件内容文件	=>	name.vue
		
		以简单的Time为例：
		
			**index.js内容如下**：
			
				import {Time} from './Time';
				
				export default{ // 可放置多个过滤器组件，中间以逗号隔开
					Time
				};
				
				
			**Time.js内容如下**：
			
				export const Time=(time)=>{
					if(time){
						let oDate=new Date();
						oDate.setTime(time);
				
						let y=oDate.getFullYear();
						let m=oDate.getMonth()+1;
						let d=oDate.getDate();
				
						let hh=oDate.getHours();
						let mm=oDate.getMinutes();
						let ss=oDate.getSeconds();
				
						return y+'-'+two(m)+'-'+two(d)+' '+two(hh)+':'+two(mm)+':'+two(ss);
						
						function two(n)=>{
							return n<10?'0'+n:''+n;
						}
					}
				}
				
				
			**main.js内容如下**：
			
				import filters from './filters'
				//循环遍历所有的过滤器
				Object.keys(filters).forEach(e => Vue.filter(e, filters[e]))
			
			
			在其他页面使用：
			
				{{ 时间 | Time }}

### 其它设置

		1).路由的一些配置
		
			import routes from './routeConfig.js'
			
			const router=new VueRouter({
				mode: 'history', //切换路径模式，变成history模式
			  	scrollBehavior: () => ({ y: 0 }),
				routes //引入的路由配置
			});
			
			
			scrollBehavior: () => ({ y: 0 })
			
				滚动条滚动的行为，不加这个在页面切换时，默认就会记忆原来滚动条的位置
		
		2).axios的一些配置
			
			import axios from 'axios'
			import store from './store/store'
			import Loading from './components/Loading'
			
			//比如发送请求显示loading，请求回来loading消失之类的
			axios.interceptors.request.use(function (config) {  //配置发送请求的信息
			  	store.dispatch('showLoading')  
			  	return config;
			}, function (error) {
			  	return Promise.reject(error);
			});
			
			axios.interceptors.response.use(function (response) { //配置请求回来的信息
			  	store.dispatch('hideLoading')
			  	return response;
			}, function (error) {
			  	return Promise.reject(error);
			});
		
			//设置post请求头部信息
			axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			
			//配置请求根路径
			axios.defaults.baseURL='http://localhost:8080/';
			
			//把axios对象挂载到Vue的原型上，其他页面在使用axios的时候直接this.$http就可以了
			Vue.prototype.$http = axios;

### 使用less

		安装less loader
			npm install less-loader less --save-dev
		
		在style标签里加上lang="less"
			<style lang="less"></style>

### 用官方脚手架（vue-cli）搭建环境无法调起浏览器

		找到config文件夹里的index.js
		
		将 autoOpenBrowser: false, 修改为 autoOpenBrowser: true,

### 本地IP调起浏览器

		找到 config 文件夹里的 index.js
		
		const os = require('os');
		
		//node.js 的一个方法，os.networkInterfaces()返回一个对象，包含只有被赋予网络地址的网络接口
		//根据对象里面的信息来获取 IP 地址
		const obj = os.networkInterfaces();
		console.log(obj);
		
		//定义一个变量
		let ip;
		
		//得到如下信息:
		
			{ WLAN:
		      [ { address: 'fe80::e113:47e3:b04b:70cd',
		          netmask: 'ffff:ffff:ffff:ffff::',
		          family: 'IPv6',
		          mac: '68:07:15:9d:fe:9a',
		          scopeid: 10,
		          internal: false },
		        { address: '192.168.1.101',
		          netmask: '255.255.255.0',
		          family: 'IPv4',
		          mac: '68:07:15:9d:fe:9a',
		          internal: false } ],
		      'Loopback Pseudo-Interface 1':
		      [ { address: '::1',
		          netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
		          family: 'IPv6',
		          mac: '00:00:00:00:00:00',
		          scopeid: 0,
		          internal: true },
		        { address: '127.0.0.1',
		          netmask: '255.0.0.0',
		          family: 'IPv4',
		          mac: '00:00:00:00:00:00',
		          internal: true } ] }
		
			/*
				以Win10系统为例，系统之间可能存在差异，WLAN连接的时候获取到的对象第一个key为WLAN，
				宽带连接的时候获取到的对象第一个key为宽带连接，本地连接的时候获取到的对象第一个key为以太网，
				因系统之间存在差异，故不能一味根据对象提供的值来一级一级向下找
			*/
			
			/*
				先循环此对象，来获取到两个数组，然后遍历这两个数组，拿到e.family=="IPv4"的对象
				最后通过字符串的方法（没找到返回-1），来获取到最终想要的对象的e.address赋值给ip
			*/
		
			for(let value in obj){
				obj[value].forEach(e => {
					if(e.family=="IPv4"){
						if(e.address.indexOf('127.0.0.1')==-1){
							ip = e.address;
						}
					}
				})
			}
	    
		//此常量（ip）就是电脑的IP地址
		将 host: 'localhost', 修改为 host: ip,

### 安装swiper

		npm i swiper -D
		
		//引入swiper
		import Swiper from 'swiper';
		
		//引入swiper.css
		//注意：以组件名称开始向内部依次寻找css文件
		import 'swiper/dist/css/swiper.min.css';
		
		//将swiper挂载到Vue的原型上，后续直接使用this.swiper可以了
		Vue.prototype.Swiper = Swiper;

### vue实现九宫格转盘

		利用延时和重复定时器来控制抽奖速度的变化，虽说方法有些差强人意，但还是实现了最基本的功能
		
		结构使用浮动的方式来解决，因为涉及到中间有一个元素为其添加了点击事件，所以将数据做分割处理
		
		抽奖的数据均是模拟数据，可以自定义快速和慢速的时间以及速度切换的位置
		
		皮肤的切换也是根据数据的索引来切换，达到一套代码适应多个模板
		
		九宫格高亮的顺序根据自定义索引来控制，let arr = [0,1,2,7,3,6,5,4];
		
		先拟定一个空数组，根据arr提供的索引将获取到的数据重新排序
		
		再将arr的数组每项插入每个奖品的对象中，根据插入的索引来进行高亮显示

[点此查看示例Demo](https://github.com/zyh19941109/Vue.js/tree/master/vue九宫格)

### div模拟textarea文本域实现高度自适应以及输入纯文本

		<div contenteditable="true"></div>
		
		与contenteditable属性无关的CSS控制法
		
			user-modify: write-only;
			user-modify: read-write-plaintext-only;
			read-write和read-write-plaintext-only会让元素表现得像个文本域一样，可以focus以及输入内容
			
		由此延伸：
			
			最近要在移动端做一套关于问卷的活动，第一个想到的是用div来模拟textarea，
			其中会用到contenteditable="true"的属性来达到可输入文本的功能（用在移动端足够）
			然后通过vue的@input="updata($event)"来实时获取用户输入的文字
		
		如何让contenteditable元素只能输入纯文本，可参考以下文章

[张鑫旭博客：如何让contenteditable元素只能输入纯文本](http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/)
