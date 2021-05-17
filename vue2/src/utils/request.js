import axios from "axios";
import router from "@/router";
import { Toast } from "vant";
const qs = require("querystring");

// 显示加载框
const showLoad = (message = "加载中") => {
  if (message && typeof message === "string") {
    Toast.loading({
      message,
      forbidClick: true,
      duration: 0,
    });
  }
};

// 隐藏加载框
const hideLoad = () => Toast.clear();

const _headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

axios.defaults.headers = _headers;

axios.create({
  baseURL: "",
  timeout: 5000, //超时设置
});

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // config.headers["token"] = "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    if (error.status) {
      switch (error.status) {
        // 401 未登录
        case 401:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
          break;
        // 403 token过期
        case 403:
          Toast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true,
          });
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;
        // 404 请求不存在
        case 404:
          Toast({
            message: "请求不存在",
            duration: 1000,
            forbidClick: true,
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.data.message,
            duration: 1000,
            forbidClick: true,
          });
      }
    }
    return Promise.reject(error);
  }
);

/**
 * @method 请求get方法
 * @param {Sting} url
 * @param {Object} data
 */
const GET = (opt = {}) => {
  let option = {
    method: "get",
    url: `${opt.url}?${qs.stringify(opt.data)}`,
    isLoad: opt.isLoad != undefined ? opt.isLoad : true,
  };
  return REQUEST(option);
};

/**
 * @method 请求post方法
 * @param {Sting} url
 * @param {Object} data
 */
const POST = (opt = {}) => {
  let option = {
    method: "post",
    url: opt.url,
    params: opt.data,
    isLoad: opt.isLoad != undefined ? opt.isLoad : true,
  };
  return REQUEST(option);
};

const REQUEST = ({ isLoad, ...option }) => {
  isLoad && showLoad();
  if (option.method == "get") {
    return new Promise((resolve, reject) => {
      axios
        .get(option.url)
        .then((res) => {
          isLoad && hideLoad();
          if (res.status == 200) {
            if (res.data.code == 200) {
              resolve(res.data);
            } else {
              Toast(res.data.message);
            }
          } else {
            Toast("服务器跟别人私奔了");
            reject({
              status: res.status,
            });
          }
        })
        .catch((error) => {
          Toast("服务器跟别人私奔了");
          reject({ error });
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      axios
        .post(option.url, option.params)
        .then((res) => {
          isLoad && hideLoad();
          if (res.status == 200) {
            if (res.data.code == 200) {
              resolve(res.data);
            } else {
              Toast(res.data.message);
            }
          } else {
            Toast("服务器跟别人私奔了");
            reject({
              status: res.status,
            });
          }
        })
        .catch((error) => {
          Toast("服务器跟别人私奔了");
          reject({ error });
        });
    });
  }
};

export { GET, POST };
