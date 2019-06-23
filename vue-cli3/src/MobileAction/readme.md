### action组件

```html
    <Actions ref="Action" 
        :actions="actions" 
        @z-action-cancel="handleActionCancel" 
        @z-action-ok="handleActionOk"
    ></Actions>
```

```javascript
  export default {
    data() {
      return {
        actions: [{
            text: '操作一'
        }, {
            text: '操作二'
        }, {
            text: '操作三'
        }],
      }
    },
    methods: {
        //显示actions动作面板
        action() {
            this.$refs.Action.showAction()
        },
        //取消选项
        handleActionCancel(val) {
            console.log(val)
            this.$refs.Action.hideAction()
        },
        //返回索引
        handleActionOk(val) {
            console.log(val)
            this.$refs.Action.hideAction()
        }
    }
  }
```

> 参数说明

| 属性    | 类型            | 默认值 | 说明     |
| ------- | --------------- | ------ | -------- |
| actions | arrayOf(object) | [ ]    | 动作列表 |

>使用方法

```javascript
    //组件内引用
    import Actions from './MobileAction/index';
    components: {
        Actions
    }

    //全局使用
    import Actions from './MobileAction/index';
    Vue.use(Actions);
```

![截图](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/bomb/images/1543993282979.gif)
