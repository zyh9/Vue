### UUFE-Libs

```javascript
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

|客户端方法|PC端方法|移动端方法|
|--|--|--|
|this.Client|this.Putil|this.Mutil|

```javascript
    // 也可以在组件中直接引用
    import {Client,Putil,Mutil} from 'uufe-libs';
```
