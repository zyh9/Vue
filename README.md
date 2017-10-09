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
		
			**Vue2.0**:
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
		bower info 插件名字		查看版本信息

### vue过渡(动画)

> 本质走的css3: transtion ,animation

```
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

> 组件: 一个大对象

### 定义一个组件

		1. 全局组件
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
		
		
		2. 局部组件（放到某个组件内部）
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
		
		2. 父级获取子级数据				**在vue2.0里面已废弃**
		
			*子组件把自己的数据，发送到父级
		
			vm.$emit(事件名,数据);
		
			vm.$dispatch(事件名,数据)	子级向父级发送数据
			
			vm.$broadcast(事件名,数据)	父级向子级广播数据
			
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
		新闻页	news
		
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
		新闻页	news
		
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
		
		{{$route.query | json}}	->  数据

### ES6: 模块化开发

		导出模块：
			export default {}
		引入模块:
			import 模块名 from 地址
