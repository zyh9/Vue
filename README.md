## vue

### vue

		一个mvvm框架(库)、和angular类似
		
		比较容易上手、小巧

### vue和angular区别

		vue——简单、易学
		
			指令：v-xxx
			一片html代码配合上json，在new出来vue实例
			适合: 移动端项目，小巧
		
		angular——上手难
		
			指令：ng-xxx
			所有属性和方法都挂到$scope身上
			适合: pc端项目
		
		共同点: 不兼容低版本IE

### vue基本雏形

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
		
		v-for		循环
		
		v-show		显示隐藏
		
			v-for="(value,index) in arr"		简单类型track by="$index"
			
			v-for="(value,key,index) in json"
		
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

###模板

		{{msg}}		数据更新模板变化
		
		{{*msg}}	数据只绑定一次
		
		{{{msg}}}	HTML转义输出（可识别html标签）	注意{{{ }}}在Vue2.0被丢弃

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

		v-cloak		防止闪烁，比较大段落
		
		<span>{{msg}}</span>		->		v-text
		
		{{{msg}}}		->		v-html		注意{{{ }}}在Vue2.0被丢弃

### 计算属性的使用

		computed:{
			b:function(){	//默认调用get
				return 值
			}
		}
		
		computed:{
			b:{
				get:
				set:
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
		
			track-by='$index'	提高循环性能

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


### 自定义指令:

		Vue.directive('指令名称',function(参数){
			this.el	-> 原生DOM元素
		});
		
		<div v-red="参数"></div>
		
		指令名称: 	v-red	->	red
		
		* 注意: 必须以 v-开头

### 自定义键盘信息

		Vue.directive('on').keyCodes.ctrl=17;

### 监听数据变化

		vm.$watch(name,callback);	//浅度监视
		vm.$watch(name,callback,{deep:true});	//深度监视 
