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

> 示例代码，仅供参考（以问卷答题活动为例）

```javascript
    logInSuccess(val) {
        // 接收子组件返回信息
        let {token,success} = val;
        if (success) {
            //用户信息请求所需参数（可忽略）
            this.checkUser = {
                serverPort: this.serverPort,
                useType: this.usePerson,
                token: token,
                usePlat: this.client
            }
            //获取用户信息
            this.userInformation(token)
            sessionStorage.setItem('loginok', JSON.stringify({
                loginok: true
            }))
            this.loginok = true;
        }
    }


    //微信授权判断
    scenes() {
        if (this.client == 1) { //微信端活动
            if (!this.isSq) {
                this.wxData();
            } else { //授权成功之后
                if (navigator.userAgent.indexOf('MicroMessenger') > -1) { //微信端打开链接
                    if (this.usePerson != 0) { //使用对象不等于0
                        // 请求授权接口后openid不存在
                        if (!(['openid'] in this.urlObj) && this.isSq) {
                            if (['token'] in this.urlObj && this.urlObj.token != '{$token}') {
                                //防止再次作答请求所需参数（可忽略）
                                this.joinData = {
                                    activityId: this.acId,
                                    usePlat: this.client,
                                    token: this.urlObj.token,
                                    serverPort: this.serverPort
                                }
                                //防止再次作答
                                this.isJoin()
                                //用户信息请求所需参数（可忽略）
                                this.checkUser = {
                                    serverPort: this.serverPort,
                                    useType: this.usePerson,
                                    token: this.urlObj.token,
                                    usePlat: this.client
                                }
                                //获取用户信息
                                this.userInformation(this.urlObj.token)
                            } else { //授权失败，显示登录框
                                this.public = 0; //预留参数，可以修改大众以及非大众用户login组件信息
                                this.loginMask = true;
                            }
                        } else { //授权失败，显示登录框
                            this.public = 0;
                            this.loginMask = true;
                        }
                    } else { //面向大众用户，获取用户头像and昵称  需要用户信息和防止再次回答
                        // console.log(this.urlObj.headimg, this.urlObj.nickname)
                        this.public = 0;
                        this.loginMask = true;
                    }
                    //session信息存储获取判断是否回答过
                    let userInfo = JSON.parse(sessionStorage['userInfo'])
                    if (this.loginok) {
                        //防止再次作答请求所需参数（可忽略）
                        this.joinData = {
                            activityId: this.acId,
                            usePlat: this.client,
                            token: userInfo.token,
                            serverPort: this.serverPort
                        }
                        //防止再次作答
                        this.isJoin()
                    }
                } else { //链接非微信打开显示提示
                    this.tipsTxt = '请在微信端打开活动链接';
                    this.tips = true;
                }
            }
        } else { //app端活动
            //防止再次作答请求所需参数（可忽略）
            this.joinData = {
                activityId: this.urlObj.activityId,
                usePlat: this.client,
                userId: this.urlObj.userid,
            }
            //防止再次作答
            this.isJoin()
            //用户信息请求所需参数（可忽略）
            this.checkUser = {
                serverPort: this.serverPort,
                useType: this.usePerson,
                token: this.urlObj.usertoken
            }
            //获取用户信息
            this.userInformation()
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
            //isShow 地址栏无参数； show 走演示； formal 走正式
            return obj=='nodata'?'isShowErr':obj.activityId=='0'?{url:obj,isshow:'show'}:{url:obj,isshow:'formal'}
        },
        //platform 所在场景；  auth 是否授权； wxData 微信授权接口函数
        scenes(platform,auth,wxData){
            if(platform==1){//微信端活动
                if(!auth){
                    wxData()
                }else{//授权成功之后
                    let obj = this.filter();
                    // if (navigator.userAgent.indexOf('MicroMessenger') > -1) {//微信端
                    //     if(obj=='nodata'){
                    //         return 'paramErr';//地址栏无参数
                    //     }else{
                    //         if(!(['openid'] in obj)&&auth){
                    //             //问卷答题针对公众，地址栏参数无token={$token}
                    //             if(['token'] in obj && obj.token!='{$token}'){
                    //                 return true;//可直接参与活动，调用用户信息
                    //             }else return 'noToken';//token不存在，显示登录框
                    //         }else return 'openId';//openid存在，显示登录框
                    //     } 
                    // }else return 'browser';//浏览器打开微信端活动，给出提示
                    return navigator.userAgent.indexOf('MicroMessenger') > -1?obj=='nodata'?'paramErr':!(['openid'] in obj)&&auth?['token'] in obj && obj.token!='{$token}'?true:'noToken':'openId':'browser';
                }
            }else return 'app';//app端活动   
        }
    }
```
