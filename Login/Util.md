### login组件

```javascript
    /**
     * @param   {token:'',success:boolean}  获取到用户信息之后弹射至父组件
     * @return  {token: this.token,success: true}
    */
    let lg = {
        token: this.token,
        success: true
    }
    this.$emit('log-in', lg)
```

### 父组件

```javascript
    /**
     * @param   @log-in="logInSuccess"  接收子级信息
     * 
     * @example
     * <login v-if="loginMask" @log-in="logInSuccess"></login>
    */
```

```javascript
    logInSuccess(val) {
        // 接收子组件返回信息
        let {token,success} = val;
        if (success) {
            //登录成功之后隐藏登录组件
            this.loginMask = false;
            sessionStorage.setItem('loginok', JSON.stringify({
                loginok: true
            }))
            this.loginok = true;
            //发起用户信息接口请求
        }
    }
```

### 函数的封装

	地址栏参数获取的方法提供了两种：
		1.纯手工切（推荐）
		2.引入node系统模块（貌似会过滤掉某些字符，比如“+”号）
	
	微信授权根据地址栏参数判断是否需要登录，大量使用了三目的嵌套，但是代码维护性降低
	
	貌似三目的性能会优于if else的判断，但我对此没有深入研究过...
