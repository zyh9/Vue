### PickerTime组件

```html
    <PickerTime ref="PickerTime" 
        :yyDay="7" 
        :startHour="7"
        :endHour="22"
        startTime="2020-04-20"
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
        handleOk(val) {
            console.log(val)
            this.reserveTime = val.value;
            this.$refs.PickerTime.modelCancel()
        },
        handleCancel(val) {
            console.log(val)
            this.$refs.PickerTime.modelCancel()
        },
    }
  }
```

> 参数说明

| 属性      | 类型   | 默认值     | 说明     |
| --------- | ------ | ---------- | -------- |
| startTime | string | 2000-01-01 | 预约时间 |
| yyDay     | number | 7          | 预约天数 |

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
