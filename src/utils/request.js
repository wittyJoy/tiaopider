import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'; // 注意要引入css样式文件
import axios from 'axios';
// import { getToken } from '@/utils/auth';

/** 创建axios实例 */
const service = axios.create({
  //配置基础路径
  baseURL: '',
  timeout: 1000 * 60,
});

/** 请求拦截器 */
service.interceptors.request.use(
  config => {
    //发送请求，开始进度条
    Nprogress.start();
    // //携带Token
    // if (store.getters.token) {
    //   config.headers['Authorization'] = getToken() || encodeURIComponent('天王盖地虎，宝塔镇河妖');
    // }
    return config;
  },
  error => {
    //请求失败，结束进度条
    Nprogress.done();
    console.error(error);
    return Promise.reject(error);
  }
);

/** 响应拦截器 */
service.interceptors.response.use(
  response => {
    //响应完成，结束进度条
    Nprogress.done();
    return response.data;
  },
  error => {
    //响应报错，结束进度条
    Nprogress.done();
    console.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
