//引入axios
import Ajax from "axios"
//引入qs，针对字符串解析
import Qs from "qs"
//get参数获取
const querystring=require('querystring'); 

function ajax(data) {
    Ajax({
        method: data.method || "get",
        url: Ajax.baseUrl + data.url,
        headers: data.headers,
        params: data.params,
        data: data.data,
        transformRequest: [function(data) {
            data = Qs.stringify(data);
            return data
        }]
    }).then(function(result) {
        if (typeof data.success == 'function') {
            data.success(result.data);
        }
    }).catch(function(error) {
        if (typeof data.error == 'function') {
            data.error(error);
        }
    })
}
export let Mutil = {
    // get请求
    /*参数:{
        url:'',请求地址
        params:{},传输的数据
        success:res=>{}, 成功后的回调函数
        error:err=>{} 失败后的回调函数
    }*/
    get(data) {
        ajax({
            method: "get",
            url: data.url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: data.params,
            success: data.success,
            error: data.error,
        });
    },
    // post请求
    /*参数:{
        url:'',请求地址
        data:{},传输的数据
        success:res=>{}, 成功后的回调函数
        error:err=>{} 失败后的回调函数
    }*/
    post(data) {
        ajax({
            method: "post",
            url: data.url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: data.data,
            success: data.success,
            error: data.error,
        });
    },
    // session存储  如果只传入key则返回当前key对应的session值
    /*
     * key:存储名称
     * val:存储的数据
     */
    session(key, val) {
        if (val) {
            if (typeof val == "object") {
                val = JSON.stringify(val);
            }
            sessionStorage.setItem(key, val);
            return;
        }
        var sessionMes;
        try {
            sessionMes = JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            sessionMes = sessionStorage.getItem(key);
        }
        return sessionMes
    },
    // 移除session
    removeSession(key) {
        if (sessionStorage.getItem(key)) {
            sessionStorage.removeItem(key);
        }
    },
    // 禁止双击上移
    ProMove() {
        try {
            var agent = navigator.userAgent.toLowerCase(); //检测是否是ios
            var iLastTouch = null; //缓存上一次tap的时间
            if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
                document.body.addEventListener('touchend', function(event) {
                    var iNow = new Date().getTime();
                    iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
                    var delta = iNow - iLastTouch;
                    if (delta < 500 && delta > 0) {
                        event.preventDefault();
                        return false;
                    }
                    iLastTouch = iNow;
                }, false);
            }
        } catch (e) {
            console.info(e);
        }
    },
    // 格式化时间  date时间对象  fmt时间格式 如yyyy/MM/dd hh:mm:ss
    FmtTime(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份   
            "d+": date.getDate(), //日   
            "h+": date.getHours(), //小时   
            "m+": date.getMinutes(), //分   
            "s+": date.getSeconds(), //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    // 获取浏览器版本
    Versions() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核                
            presto: u.indexOf('Presto') > -1, //opera内核                
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端                
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                
            iPad: u.indexOf('iPad') > -1, //是否iPad                
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部      
            weiXin: u.indexOf('MicroMessenger') > -1 //是否是微信
        };
    },
    // 创健cookie  
    /*
     * a cookie名称
     * b cookie值
     * c cookie过期时间
     */
    CreateCookie(a, b, c, d) {
        var d = d ? d : "/";
        if (c) {
            var e = new Date;
            e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c);
            var f = "; expires=" + e.toGMTString();
        } else {
            var f = "";
        }
        document.cookie = a + "=" + b + f + "; path=" + d;
    },
    // 读取 cookie
    ReadCookie(a) {
        for (var b = a + "=",
                c = document.cookie.split(";"), d = 0; d < c.length; d++) {
            for (var e = c[d];
                " " == e.charAt(0);) e = e.substring(1, e.length);
            if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
        }
        return null
    },
    // 删除 cookie
    DelCookie(name) {
        var that = this;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = that.ReadCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    // 获取url参数
    Request(name) {
        var reg = new RegExp("([&,?])" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    // 针对Vue路由跳转获取地址栏参数
    VueRequest(name) {
        var reg = new RegExp("([&,?])" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.hash.match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    // 检测手机号
    checkPhone(m) {
        var regTel = /^[1]{1}[3,4,5,6,7,8,9]\d{9}$/;
        if (regTel.test(m)) {
            return true
        } else {
            return false
        }
    },
    // 倒计时
    setTimer() {
        var endDate = new Date("2017/12/7 18:29:32");
        // var seconds=Math.floor(Date.parse(statrDate)/1000-Date.parse(endDate)/1000);
        var timer1 = null;
        var day, hour, minutes, seconds, allCounts;
        if (timer1 == null) {
            timer1 = setInterval(() => {
                var startDate = new Date();
                allCounts = Math.floor(Date.parse(endDate) / 1000 - Date.parse(startDate) / 1000);
                if (allCounts <= 0) {
                    // console.log(timer);
                    clearInterval(timer1);
                    // timer = null;
                } else {
                    day = Math.floor(allCounts / 60 / 60 / 24);
                    hour = Math.floor(allCounts / 60 / 60 % 24);
                    minutes = Math.floor(allCounts / 60 % 60);
                    seconds = Math.floor(allCounts % 60);
                    day = day > 10 ? day : "0" + day;
                    hour = hour > 10 ? hour : "0" + hour;
                    minutes = minutes > 10 ? minutes : "0" + minutes;
                    seconds = seconds > 10 ? seconds : "0" + seconds;
                    console.log(day + "天" + hour + "时" + minutes + "分" + seconds + "秒");
                }
            }, 1000)
        }
    },
    // pc设备判断
    device() {
        var n = navigator.userAgent.toLowerCase();
        if (n.indexOf('iphone') == -1 && n.indexOf('ipad') == -1 && n.indexOf('android') == -1) {
            return 'pc';
        }
    },
    // 地址栏参数获取1
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
    // 地址栏参数获取2
    getUrlData(){
        let urlHref = window.location.href;
        if (urlHref.indexOf('?')!=-1) {
            let getStr = urlHref.split('?')[1];
            let urlObj = querystring.parse(getStr);
            return urlObj;
        }else return 'nodata'; 
    }
}
