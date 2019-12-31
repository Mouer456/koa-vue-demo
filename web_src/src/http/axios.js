/**
 * http配置
 */
import axios from 'axios';
// axios 配置
// 环境的切换
let baseURL = '';
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000';
} else {
  baseURL = '';
}

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 1000 * 12;
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  res => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    // if (err && err.response) {
    //     switch (err.response.status) {
    //         case 404:
    //             err.message = '请求错误,未找到该资源'
    //             break;
    //         default:
    //             err.message = `连接错误${err.response.status}`
    //     }
    // } else {
    //     err.message = "连接到服务器失败"
    // }
    return Promise.reject(err);
  }
);

export default {
  //get请求
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  //post请求
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
