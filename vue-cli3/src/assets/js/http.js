//  基于axios 封装的http请求插件
const axios = require('axios');

// 以下这种方式需要调用Vue.use方法 调用的时候调用 this.$fetch, this.$post, this.$axios, this.$put, this.$del 方法
const http = {
  install(Vue, Option) {
    if (Option) {
      // 超时设置
      axios.defaults.timeout = Option.timeout || 10000;
      // 默认请求地址设置
      axios.defaults.baseURL = Option.baseURL || "";
      // 头部设置
      for (let key in Option.headers) {
        if (!Option.hasOwnProperty(key)) continue;
        axios.defaults.headers[key] = Option.headers[key];
      }
      // 请求/响应拦截器
      Option.inRequest && axios.interceptors.request.use(Option.inRequest);
      Option.inResponse && axios.interceptors.response.use(Option.inResponse);
    }
    /**
     * @param  {string} url
     * @param  {object} params={}  参数可以根据需要自行处理
     */
    const get = (url, params = {}) => {
      const str = Object.keys(params).map(item => {
        return item + '=' + params[item];
      }).join('&');
      return new Promise((resolve, reject) => {
        let address = url;
        if (str) {
          address += '?' + str;
        }
        axios.get(address).then(res => {
          resolve(res.data);
        }).catch(error => {
          reject(error);
        });
      });
    };

    /**
     * @param  {string} url
     * @param  {object} data={} 参数可以根据需要自行处理
    
     */
    const post = (url, data = {}) => {
      return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
          resolve(res.data);
        }).catch(error => {
          reject(error);
        });
      });
    };

    /**
     * @param  {string} url
     * @param  {object} data={} 参数可以根据需要自行处理
     */
    const put = (url, data = {}) => {
      return new Promise((resolve, reject) => {
        axios.put(url, data).then(res => {
          resolve(res.data);
        }).catch(error => {
          reject(error);
        });
      });
    };

    /**
     * @param  {string} url
     * @param  {object} params={}
     */

    const del = (url) => {
      return new Promise((resolve, reject) => {
        axios.delete(url, {}).then(res => {
          resolve(res.data);
        }).catch(error => {
          reject(error);
        });
      });
    };
    const data = { axios, get, post, put, del };
    Object.keys(data).map(item => Object.defineProperty(Vue.prototype, '$' + item, { value: data[item] }));
  }
};

export default http;
