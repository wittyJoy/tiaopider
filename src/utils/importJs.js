/*
 * 导入外部js
 * @Author: 王佳宇 
 * @Date: 2021-01-26 17:15:12 
 * @Last Modified by: Joy
 * @Last Modified time: 2021-03-11 14:41:24
 */
import Vue from 'vue'
 
Vue.component('remote-script', {
  render: function (createElement) {
    var self = this;
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src
      },
      on: {
        load: function (event) {
          self.$emit('load', event);
        },
        error: function (event) {
          self.$emit('error', event);
        },
        readystatechange: function (event) {
          if (this.readyState == 'complete') {
            self.$emit('load', event);
          }
        }
      }
    });
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
});