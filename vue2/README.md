#### 公用方法使用

```js
import util from "@/utils/util";
import compute from "@/utils/compute";
import validate from "@/utils/validate";

const prototype = {
  $util: util, // 工具函数
  $compute: compute, //浮点运算
  $validate: validate, //正则校验
};

// 挂载原型
for (const [key, value] of Object.entries(prototype)) {
  Vue.prototype[key] = value;
}
```

| `this.$util` | `this.$compute` | `this.$validate` |
| :----------: | :-------------: | :--------------: |
|   工具函数   |    浮点运算     |     正则校验     |

#### 发起 action

> 页面中直接发起

```js
//示例
/**
 * @param action名称
 * @param 所需参数
 */
this.$store.dispatch("handleCount", 2);
```

> 通过`mapActions`发起

```js
methods: {
  ...mapActions({
    handleCount: "handleCount",
  })
  // ...mapActions(["handleCount"]),
}
// 发起action
this.handleCount(2);
```

> 非页面文件

```js
import store from "@/store";

store.dispatch("handleCount", 2);
```

#### 使用装饰器

```js
import {debounce} from "@/utils/descriptor";

@debounce(20)
handleScroll(){}
```
