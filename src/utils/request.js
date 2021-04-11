import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'; // 注意要引入css样式文件
import axios from 'axios';
// import { getToken } from '@/utils/auth';

/** 创建axios实例 */
const service = axios.create({
  //配置基础路径
  baseURL: '/api',
  timeout: 6000,
});

/** 请求拦截器 */
service.interceptors.request.use(
  config => {
    //发送请求，开始进度条
    Nprogress.start();
    // //携带Token
    // if (store.getters.token) {
    //   config.headers['Authorization'] = getToken() || '天王盖地虎，宝塔镇河妖';
    // }
    return config;
  },
  error => {
    console.error(error);
    Nprogress.done();
    return Promise.reject(error);
  }
);

/** 响应拦截器 */
service.interceptors.response.use(
  response => {
    Nprogress.done();
    return response.data;
  },
  error => {
    console.error(error.message);
    Nprogress.done();
    return Promise.reject(error);
  }
);

export default service;
