const querystring=require('querystring');
export let aiats = {
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
        }else{
            return 'nodata'
        }
    },
    //platform 所在场景；  auth 是否授权； wxData 微信授权接口函数
    scenes(platform,auth,wxData){
        if(platform==1){//微信端活动
            if(!auth){
                wxData()
            }else{//授权成功之后
                let obj = this.filter();
                if (navigator.userAgent.indexOf('MicroMessenger') > -1) {//微信端
                    if(obj=='nodata'){
                        return 'paramErr';//地址栏无参数
                    }else{
                        if(!(['openid'] in obj)&&auth){
                            //问卷答题针对公众，地址栏参数无token={$token}
                            if(['token'] in obj && obj.token!='{$token}'){
                                return true;//可直接参与活动，调用用户信息
                            }else return 'noToken';//token不存在，显示登录框
                        }else return 'openId';//openid存在，显示登录框
                    } 
                }else return 'browser';//浏览器打开微信端活动，给出提示
            }
        }else return 'app';//app端活动   
    }
}
