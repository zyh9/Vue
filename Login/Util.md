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
