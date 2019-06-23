### modal组件

```html
    <Modal ref="Modal" 
        title="确认信息" 
        message="你确定要这样做吗？" 
        @z-modal-cancel="handleModalCancel" 
        @z-modal-ok="handleModalOk"
    ></Modal>
```

```javascript
  export default {
    data() {
      return {
      }
    },
    methods: {
        //显示modal弹窗
        modal() {
            this.$refs.Modal.showModal()
        },
        //取消
        handleModalCancel(val) {
            console.log(val)
            this.$refs.Modal.hideModal()
        },
        //确认
        handleModalOk(val) {
            console.log(val)
            this.$refs.Modal.hideModal()
        },
    }
  }
```

> 参数说明

| 属性    | 类型   | 默认值 | 说明        |
| ------- | ------ | ------ | ----------- |
| title   | string | '  '   | 弹窗title   |
| message | string | '  '   | 弹窗message |

>使用方法

```javascript
    //组件内引用
    import Modal from './MobileModal/index';
    components: {
        Modal
    }

    //全局使用
    import Modal from './MobileModal/index';
    Vue.use(Modal);
```

![截图](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/bomb/images/1543993303337.gif)
