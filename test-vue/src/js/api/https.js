import axios from 'axios';
// var qs = require('qs');
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://192.168.28.121';
axios.defaults.baseURL = 'http://127.0.0.1:2020' // node + express搭建的后台
// axios.defaults.baseURL = 'http://123.123.123.123: 2020'
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 查询储存在本地的token值
    // 这边可根据自己的需求设置headers，我司采用basic基本认证
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let authToken = localStorage.token;
    if (authToken) {
      config.headers.Authorization = authToken
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
);
// http response 拦截器
axios.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    console.log(err.response);
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break;
      case 401:
        err.message = '未授权，请重新登录'
        break;
      case 403:
        err.message = '拒绝访问'
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        break;
      case 405:
        err.message = '请求方法未允许'
        break;
      case 408:
        err.message = '请求超时'
        break;
      case 500:
        err.message = '微服务故障, 请稍后再试'
        break;
      case 501:
        err.message = '网络未实现'
        break;
      case 502:
        err.message = '网络错误'
        break;
      case 503:
        err.message = '服务不可用'
        break;
      case 504:
        err.message = '网络超时'
        break;
      case 505:
        err.message = 'http版本不支持该请求'
        break;
      default:
        err.message = `连接错误`
    }
  } else {
    // err.message = "连接到服务器失败"
    // parent.location.href ='/';
  }
  console.log(err.message);
  return Promise.resolve(err.response)
});

export const ApiService = {
  // 获取excel表数据
  getDatasFromNode: (params) => {
    return axios.get('/process_get', {params: params}).then(res => res.data);
  },
  // 测试
  getTest: (params) => {
    return axios.get('/arry', {params: params}).then(res => res.data);
  },
  // 历史会议--会议--查看明细
  participantsList: (meetingId, params) => {
    return axios.get('mock/97/v2/meetings/' + meetingId + '/participants', {params: params}).then(res => res.data);
  },
  // 账号管理--获取数据
  getAccountSDatas: (params) => {
    return axios.get('mock/97/v2/users', {params: params}).then(res => res.data);
  },
  // 账号管理--删除账号
  deleteAccount: (userId) => {
    return axios.delete('mock/97/v2/users/' + userId + '').then(res => res.data);
  },
  // 账号管理--创建账号
  addNewAccount: (params) => {
    return axios.post('mock/97/v2/users', params).then(res => res.data);
  },
  // 修改租户（激活/禁用）
  activeOrDisabledTenant: (userId, params) => {
    return axios.put('v2/users/ ' + userId + '', params).then(res => res.data)
  }
};
