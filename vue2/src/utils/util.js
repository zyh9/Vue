/**
 * @method 存取session
 * @param {string} key 键
 * @param {*} val 值
 */
const session = (key, val) => {
  if (typeof key !== "string") throw new Error("key must be a string!");
  if (val === undefined) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (err) {
      return sessionStorage.getItem(key);
    }
  } else {
    val = typeof val === "string" ? val : JSON.stringify(val);
    sessionStorage.setItem(key, val);
  }
};

/**
 * @method 清除session
 * @param {string} key 键
 */
const removeSession = (key) => {
  if (!key) {
    sessionStorage.clear();
    return;
  }
  if (typeof key !== "string") throw new Error("key must be a string!");
  sessionStorage.getItem(key) && sessionStorage.removeItem(key);
};

/**
 * @method 存取local
 * @param {*} key 键
 * @param {*} val 值
 */
const local = (key, val) => {
  if (typeof key !== "string") throw new Error("key must be a string!");
  if (val === undefined) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return localStorage.getItem(key);
    }
  } else {
    val = typeof val === "string" ? val : JSON.stringify(val);
    localStorage.setItem(key, val);
  }
};

/**
 * @method 清除local
 * @param {*} key 键
 */
const removeLocal = (key) => {
  if (!key) {
    localStorage.clear();
    return;
  }
  if (typeof key !== "string") throw new Error("key must be a string!");
  localStorage.getItem(key) && localStorage.removeItem(key);
};

/**
 * @method 创建cookie
 * @param {Sting} a cookie对应的键
 * @param {Value} b cookie对应的值
 * @param {Number} c 存储的天数
 * @param {String} d 存储的路径
 */
const createCookie = (a, b, c, d) => {
  var d = d ? d : "/";
  if (c) {
    var e = new Date();
    e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c);
    var f = "; expires=" + e.toGMTString();
  } else {
    var f = "";
  }
  document.cookie = a + "=" + b + f + "; path=" + d;
};

/**
 * @method 读取cookie
 * @param {Sting} a cookie的名称
 */
const readCookie = (a) => {
  for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
    for (var e = c[d]; " " == e.charAt(0); ) e = e.substring(1, e.length);
    if (0 == e.indexOf(b)) return e.substring(b.length, e.length);
  }
  return null;
};

/**
 * @method 删除cookie
 * @param {String} a cookie的名称
 */
const delCookie = (a) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = readCookie(a);
  if (cval != null) document.cookie = a + "=" + cval + ";expires=" + exp.toGMTString();
};

/**
 * @method 过滤手机号空格以及+86
 * @param {Number} tel 手机号
 */
const filterPhone = (tel) => {
  var phone = String(tel)
    .replace(/[^\d.]+/g, "")
    .replace(/^\+?86/g, "")
    .substring(0, 11);
  return phone;
};

/**
 * @method 获取当前数据类型
 * @param {*} obj
 */
const getType = (obj) => {
  var toString = Object.prototype.toString;
  var map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  if (obj instanceof Element) {
    return "element";
  }
  return map[toString.call(obj)];
};

/**
 * @method 对象深克隆
 * @param {Object} data 源对象
 * @returns {Object}} 拷贝后的对象
 */
const deepClone = (data) => {
  var type = getType(data);
  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

/**
 * @method 处理输入框获取焦点安卓机型布局上移问题
 */
const dealWithInput = () => {
  if (/Android [4-8]/.test(navigator.appVersion)) {
    window.addEventListener("resize", function() {
      if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
        window.setTimeout(function() {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    });
  }
};

/**
 * @method 格式化时间
 * @param {Date} date 传入的时间对象
 * @param {Sting} fmt  例如YYYY/MM/dd hh:mm:ss
 */
const FmtTime = (date, fmt) => {
  // TODO 处理ios时间NaN问题
  date = new Date(date.replace(/(\.|-)/g, "/"));
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
  return fmt;
};

/**
 * @method 获取地址栏参数
 */
const getQuery = (name) => {
  let reg = new RegExp("([&,?])" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.match(reg) || window.location.hash.match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};

/**
 * @method 获取浏览器版本
 */
const versions = () => {
  var u = navigator.userAgent;
  return {
    trident: u.indexOf("Trident") > -1, //IE内核
    presto: u.indexOf("Presto") > -1, //opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
    iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
    webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
    weiXin: u.indexOf("MicroMessenger") > -1, //是否是微信
  };
};

/**
 * @method 移动端textarea输入框自动撑大高度
 * @param {*} elem  当前textarea元素
 * @param {*} intHeight 默认高度
 * @param {*} extra 额外高度
 * @param {*} maxHeight 最大高度
 */
const autoTextarea = (elem, intHeight, extra, maxHeight) => {
  extra = extra || 0;
  var isFirefox = !!document.getBoxObjectFor || "mozInnerScreenX" in window,
    isOpera = !!window.opera && !!window.opera.toString().indexOf("Opera"),
    addEvent = function(type, callback) {
      elem.addEventListener ? elem.addEventListener(type, callback, false) : elem.attachEvent("on" + type, callback);
    },
    getStyle = elem.currentStyle
      ? function(name) {
          var val = elem.currentStyle[name];
          if (name === "height" && val.search(/px/i) !== 1) {
            var rect = elem.getBoundingClientRect();
            return rect.bottom - rect.top - parseFloat(getStyle("paddingTop")) - parseFloat(getStyle("paddingBottom")) + "px";
          }
          return val;
        }
      : function(name) {
          return getComputedStyle(elem, null)[name];
        },
    minHeight = parseFloat(getStyle("height"));
  elem.style.resize = "none"; //如果不希望使用者可以自由的伸展textarea的高宽可以设置其他值
  var change = function() {
    var scrollTop,
      height,
      padding = 0,
      style = elem.style;
    if (elem._length === elem.value.length) return;
    elem._length = elem.value.length;
    if (!isFirefox && !isOpera) {
      padding = parseInt(getStyle("paddingTop")) + parseInt(getStyle("paddingBottom"));
    }
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (intHeight) {
      elem.style.height = intHeight / 75 + "rem";
    } else {
      elem.style.height = minHeight + "px";
    }
    if (elem.scrollHeight > minHeight) {
      if (maxHeight && elem.scrollHeight > maxHeight) {
        height = maxHeight - padding;
        style.overflowY = "auto";
      } else {
        // height = elem.scrollHeight - padding;
        height = elem.scrollHeight;
        style.overflowY = "hidden";
      }
      style.height = height + extra + "px";
      scrollTop += parseInt(style.height) - elem.currHeight;
      document.documentElement.scrollTop = scrollTop;
      elem.currHeight = parseInt(style.height);
    }
  };
  addEvent("propertychange", change);
  addEvent("input", change);
  addEvent("focus", change);
  change();
};

export default {
  session,
  removeSession,
  local,
  removeLocal,
  createCookie,
  readCookie,
  delCookie,
  filterPhone,
  getType,
  deepClone,
  dealWithInput,
  FmtTime,
  getQuery,
  versions,
  autoTextarea,
};
