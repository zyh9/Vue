const querystring = require('querystring');
//地址栏参数获取1
function getUrl() {
    let urlHref = window.location.href;
    let urlObj = {};
    if (urlHref.indexOf('?') != -1) {
        let getArr = urlHref.split('?')[1].split('&');
        getArr.forEach(e => {
            if (!(e.split('=')[0] in urlObj)) {
                urlObj[e.split('=')[0]] = e.split('=')[1];
            }
        })
        return urlObj;
    } else return 'nodata';
}
//地址栏参数获取2
function getUrlData() {
    let urlHref = window.location.href;
    if (urlHref.indexOf('?') != -1) {
        let getStr = urlHref.split('?')[1];
        let urlObj = querystring.parse(getStr);
        return urlObj;
    } else return 'nodata';
}
//针对hash路由做参数处理
function filter() {
    let urlObj = getUrl();
    if (urlObj != 'nodata') {
        for (let e in urlObj) {
            urlObj[e] = urlObj[e].replace(/#\/$/g, '')
        }
        return urlObj;
    } else return 'nodata';
}
//演示 && 正式
function isShow() {
    let obj = filter()
    /**
     * @return 'isShowErr' //地址栏无参数
     * @return {isShow:'show'} //走演示
     * @return {isShow:'formal'} //走正式
    */
    return obj == 'nodata' ? 'isShowErr' : obj.activityId == '0' ? { url: obj, isShow: 'show' } : { url: obj, isShow: 'formal' }
}
//微信授权
function auth() {
    let obj = filter();
    /**
     * 问卷答题针对公众，地址栏参数无token={$token}
     * @return 'browser' //浏览器打开微信端活动，给出提示
     * @return 'paramErr' //地址栏无参数
     * @return 'openId' //openid存在，显示登录框
     * @return 'noToken' //token不存在，显示登录框
     * @return true //可直接参与活动，调用用户信息
    */
    return navigator.userAgent.indexOf('MicroMessenger') > -1 ? obj == 'nodata' ? 'paramErr' : !(['openid'] in obj) ? ['token'] in obj && obj.token != `${encodeURI('{$token}')}` ? true : 'noToken' : 'openId' : 'browser';
}
//最小宽度处理
function device() {
    let html = document.getElementsByTagName('html')[0];
    if (html.getBoundingClientRect().width >= 1250) {
        html.style.cssText += `font-size:75px;max-width:750px;margin:0 auto;overflow:hidden;`;
    }
}

export { filter, isShow, auth, device }
