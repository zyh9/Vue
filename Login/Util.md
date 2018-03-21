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
     * @param   :public="public"  预留参数，针对大众及非大众用户
     * 
     * @example
     * <login v-if="loginMask" @log-in="logInSuccess" :public="public"></login>
    */
```

```javascript
    logInSuccess(val) {
        // 接收子组件返回信息
        let {token,success} = val;
        if (success) {
            sessionStorage.setItem('loginok', JSON.stringify({
                loginok: true
            }))
            this.loginok = true;
            //发起用户信息接口请求
        }
    }
```

> 地址栏参数获取以及微信授权判断

```javascript
    const querystring=require('querystring');
    export let wxAuth = {
        //地址栏参数获取1
        getUrl() {
            let urlHref = window.location.href;
            let urlObj = {};
            if (urlHref.indexOf('?')!=-1) {
                let getArr = urlHref.split('?')[1].split('&');
                getArr.forEach(e => {
                    if (!(e.split('=')[0] in urlObj)) {
                        urlObj[e.split('=')[0]] = e.split('=')[1];
                    }
                })
                return urlObj;
            }else return 'nodata';
        },
        //地址栏参数获取2
        getUrlData(){
            let urlHref = window.location.href;
            if (urlHref.indexOf('?')!=-1) {
                let getStr = urlHref.split('?')[1];
                let urlObj = querystring.parse(getStr);
                return urlObj;
            }else return 'nodata'; 
        },
        //针对hash路由做参数处理
        filter(){
            let urlObj = this.getUrl();
            if ( urlObj!= 'nodata') {
                for (let e in urlObj) {
                    urlObj[e] = urlObj[e].replace(/#\/$/g, '')
                }
                return urlObj;
            }else return 'nodata';
        },
        //演示 && 正式
        isShow(){
            let obj = this.filter()
            /**
             * @return 'isShowErr' //地址栏无参数
             * @return {isShow:'show'} //走演示
             * @return {isShow:'formal'} //走正式
            */
            return obj=='nodata'?'isShowErr':obj.activityId=='0'?{url:obj,isShow:'show'}:{url:obj,isShow:'formal'}
        },
        /**
         * @param platform 所在场景
         * @param auth 是否授权
         * @param wxData 微信授权接口函数
        */
        scenes(platform,auth,wxData){
            if(platform==1){//微信端活动
                if(!auth){
                    wxData()
                }else{//授权成功之后
                    let obj = this.filter();
                    /**
                     * 问卷答题针对公众，地址栏参数无token={$token}
                     * @return 'browser' //浏览器打开微信端活动，给出提示
                     * @return 'paramErr' //地址栏无参数
                     * @return 'openId' //openid存在，显示登录框
                     * @return 'noToken' //token不存在，显示登录框
                     * @return true //可直接参与活动，调用用户信息
                    */
                    return navigator.userAgent.indexOf('MicroMessenger') > -1?obj=='nodata'?'paramErr':!(['openid'] in obj)&&auth?['token'] in obj && obj.token!='{$token}'?true:'noToken':'openId':'browser';
                }
            }else return 'app';//app端活动   
        }
    }
```

> 引入之后的用法

```javascript
    // 地址栏参数获取
    let urlData = aiatsUtil.isShow();
    if (urlData == 'isShowErr') {//无参数
        console.log('无参数')
    } else if (urlData.isShow == 'show') {//走演示
        console.log('走演示')
    } else if (urlData.isShow == 'formal') {//走正式
        console.log('走正式')
    }
    //微信授权
    console.log(this.client, this.isSq, this.wxData)
    let wx = aiatsUtil.scenes(this.client, this.isSq);
    this.tipText = wx;
    if (wx == 'app') {
        console.log('app端活动')
    } else if (wx == 'browser') {
        console.log('浏览器打开')
    } else if (wx == 'paramErr') {
        console.log('地址栏无参数')
    } else if (wx == 'openid') {
        console.log('openid存在，显示登录框')
    } else if (wx == 'noToken') {
        console.log('token不存在，显示登录框')
    } else if (wx) {
        console.log('token存在，可直接参与活动')
    }
```
