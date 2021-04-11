import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//引入svg组件
import './icons';

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount('#app');
