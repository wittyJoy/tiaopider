import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login.vue'),
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/pages/home/home.vue'),
  },
  {
    path: '/',
    // path: "/daohang",
    name: '导航',
    component: () => import('@/pages/daohang'),
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('@/pages/mini-music-player'),
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
