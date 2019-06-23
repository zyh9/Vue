### PickerTime组件

```html
    <PickerTime ref="PickerTime"
        :reserveTime="reserveTime" 
        @changeTime="changeTime" 
        @handleOk="handleOk" 
        @handleCancel="handleCancel"
    ></PickerTime>
```

```javascript
  export default {
    data() {
      return {
        reserveTime: '立即配送', //默认方式
      }
    },
    methods: {
        //预约弹窗
        onReserve() {
            this.$refs.PickerTime.showTimeModel()
        },
        //更改时间
        changeTime(val) {
            console.log(val)
            let {
            value
            } = val;
            this.reserveTime = value;
        },
        //确认
        handleOk(val) {
            console.log(val)
            this.$refs.PickerTime.modelCancel()
        },
        //取消
        handleCancel(val) {
            console.log(val)
            this.$refs.PickerTime.modelCancel()
        },
    }
  }
```

> 参数说明

| 属性    | 类型            | 默认值 | 说明     |
| ------- | --------------- | ------ | -------- |
| reserveTime | string | '立即配送'    | 预约时间 |

>使用方法

```javascript
    //组件内引用
    import PickerTime from './PickerTime/index';
    components: {
        PickerTime
    }

    //全局使用
    import PickerTime from './PickerTime/index';
    Vue.use(PickerTime);
```

![截图](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/bomb/images/PickerTime_1559095098287.gif)
