// 客户端信息获取
export let Client = {
    // 检测设备
    detectmob() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true
        }
        else {
            return false
        }
    },
    // 获取全部信息
    getAllInfo() {
        if (this.detectmob()) {
            return { version: this.getVer(), os: this.detectOS(), size: this.getSize() }
        } else {
            return { version: this.getVer(), os: this.detectOS(), size: this.getSize(), web: { type: this.getExplorerInfo().type, version: this.getExplorerInfo().version }, }
        }
    },
    // 获取版本号
    version() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核 1 
            presto: u.indexOf('Presto') > -1, //opera内核 2
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 3
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核 4
            iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 5
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端 6
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 7
            iPad: u.indexOf('iPad') > -1, //是否iPad 8
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部 9
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）10
            qq: u.match(/\sQQ/i) == " qq" //是否QQ 11
        };
    },
    getVer() {
        var ver = this.version(), a;
        // 遍历终端对象
        for (var i in ver) {
            if (!ver.hasOwnProperty(i)) continue;
            if (ver[i]) {
                a = i;
            }
        }
        return a;
    },
    // 获取浏览器版本号
    getExplorerInfo() {
        var explorer = window.navigator.userAgent.toLowerCase();
        var info;
        //ie 
        if (explorer.indexOf("msie") >= 0) {
            var ver = explorer.match(/msie ([\d.]+)/)[1];
            info = { type: "IE", version: ver };
        }
        //firefox 
        else if (explorer.indexOf("firefox") >= 0) {
            var ver = explorer.match(/firefox\/([\d.]+)/)[1];
            info = { type: "Firefox", version: ver };
        }
        //Chrome
        else if (explorer.indexOf("chrome") >= 0) {
            var ver = explorer.match(/chrome\/([\d.]+)/)[1];
            info = { type: "Chrome", version: ver };
        }
        //Opera
        else if (explorer.indexOf("opera") >= 0) {
            var ver = explorer.match(/opera.([\d.]+)/)[1];
            info = { type: "Opera", version: ver };
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
            var ver = explorer.match(/version\/([\d.]+)/)[1];
            info = { type: "Safari", version: ver };
        }
        return info;
    },
    // 获取屏幕分辨率
    getSize() {
        return (window.screen.width + " * " + window.screen.height);
    },
    // 获取操作系统
    detectOS: function () {
        var os = navigator.platform;
        var userAgent = navigator.userAgent;
        var info = "";
        // 判断操作系统  
        if (os.indexOf("Win") > -1) {
            if (userAgent.indexOf("Windows NT 5.0") > -1) {
                info += "Win2000";
            } else if (userAgent.indexOf("Windows NT 5.1") > -1) {
                info += "WinXP";
            } else if (userAgent.indexOf("Windows NT 5.2") > -1) {
                info += "Win2003";
            } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
                info += "WindowsVista";
            } else if (userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1) {
                info += "Win7";
            } else if (userAgent.indexOf("Windows NT 6.2") > -1 || userAgent.indexOf("Windows 8") > -1) {
                info += "Win8";
            } else if (userAgent.indexOf("Windows NT 6.3") > -1 || userAgent.indexOf("Windows 8.1") > -1) {
                info += "Win8.1";
            } else if (userAgent.indexOf("Windows NT 10.0") > -1 || userAgent.indexOf("Windows 10") > -1) {
                info += "Win10";
            }
            else {
                info += "Other";
            }
        } else if (os.indexOf("Mac") > -1) {
            info += "Mac";
        } else if (os.indexOf("X11") > -1) {
            info += "Unix";
        } else if (os.indexOf("Linux") > -1) {
            info += "Linux";
        } else {
            info += "Other";
        }
        return info;
    }
}
