# UUFE-Libs

UUFE-Libs整理企业级内部通用组件，公共方法，常用css组件，动态组建，功能组件；

Quick start
---
```
// 也可以在组件中直接引用
import {Client,Putil,Mutil} from 'uufe-libs';
// main.js文件
// 引入axios
import Ajax from "axios";
// 接口访问地址
Ajax.baseURL='http://localhost:8080';
// 引入公共方法
import {Client,Putil,Mutil} from 'uufe-libs';
// 挂载到Vue原型上
Vue.prototype.Client = Client;
Vue.prototype.Putil = Putil;
Vue.prototype.Mutil = Mutil;
```
Programmatic usage
---
- this.Client ：客户端方法
- this.Putil ：PC端方法
- this.Mutil ：移动端方法

MORE
---

>更改npm指向

```
npm set registry http://192.168.5.59:4873

```

>登录

```
npm login

```

>测试是否登录成功

```
npm who

```

>退出

```
npm unlogin

```

>提交

```
npm publish 插件名字
		
npm publish uufe-libs

```

>删除

```
npm unpublish uufe-libs

```

