### switch组件

```html
    <Switchs title="switch开关" 
        :defaultChecked="false" 
        :disabled="false" 
        @z-switch="handleSwitch"
    ></Switchs>
```

```javascript
  export default {
    data() {
      return {
      }
    },
    methods: {
        //checked属性值发生改变
        handleSwitch(val) {
            console.log(val)
        }
    }
  }
```

> 参数说明

| 属性           | 类型    | 默认值 | 说明      |
| -------------- | ------- | ------ | --------- |
| title          | string  | ''     | 弹窗title |
| defaultChecked | boolean | false  | 初始值    |
| disabled       | boolean | false  | 是否禁用  |

>使用方法

```javascript
    //组件内引用
    import Switchs from './MobileSwitch/index';
    components: {
        Switchs
    }

    //全局使用
    import Switchs from './MobileSwitch/index';
    Vue.use(Switchs);
```

![截图](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/bomb/images/1543993317845.gif)
