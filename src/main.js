import 'lib-flexible/flexible'
import 'amfe-flexible'
import Vue from 'vue'
import App from './App.vue'

import service from './utils/http'
// import http from './service/ajax'
Vue.prototype.$axios = service
// Vue.prototype.$http = http

//导入vue状态管理
import Vuex from 'vuex'
import store from './store'

//导入vue路由管理
import router from './router/index.js'

// 引入mockjs
require('./mock/mock.js')

//导入全局css/reset.css
// import "@assets/css/reset.css";

// 导入Mint UI包
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/common/font/iconfont.css'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// js-300ms
import FastClick from 'fastclick'
FastClick.attach(document.body);

//放大缩小拖拽容器
import VueDragResize from 'vue-drag-resize'
Vue.component('vue-drag-resize', VueDragResize)

import plusReady from './utils/plusready.js'
Vue.prototype.plusReady = plusReady;

import * as d3 from 'd3'

Vue.prototype.$d3 = d3
window.d3 = d3
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(Mint)
Vue.use(Vuex)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  let memberKeys = JSON.parse(localStorage.getItem("memberKey"));
  let memberKey = memberKeys && memberKeys.memberAccessToken;
  
  // if(memberKey){
	 // memberKey = '';
  // }
  
  // let memberKey = '';
  if(to.path == "/login") {
  	if(memberKey) {
  		next("/home")
  	} else {
  		next();
  	}
  } else {
  	if(type == 'login') {
  		if(memberKey){
  			next();
  		} else {
  			next("/login")
  		}
  	} else {
  		next();
  	}
  }
  // 判断该路由是否需要登录权限
//if (type === 'login') {
//  if (memberKey) {
//    next()
//  } else {
//    next('/login')
//  }
//} else {
//  next()  // 确保一定要有next()被调用
//}
})
//router.beforeEach((to, from, next) => {
//
//	if (to.meta.title) {
//		document.title = to.meta.title
//	}
//	const type = to.meta.type
//	let memberKeys = JSON.parse(localStorage.getItem("memberKey"));
//	let memberKey = memberKeys && memberKeys.memberAccessToken;
//
//	// 18285057199
//	/* 
//	* 1，判断路由是否为引导页，如果是，直接进入引导页
//	* 2，不是引导页，判断该路由是否为登陆页
//	* 3，为登陆页时，判断是否登陆，已登陆跳转到首页，否则跳转到登陆页
//	* 4，不为登陆页时。判断是否登陆，已登陆则正常跳转，否则跳转到登陆页
//	*/
//	console.log(type)
//	if (to.path === '/guide' || type != 'login') {
//		next();
//	} else {
//		if(to.path === '/login') {
//			if(memberKey) {
//				next('/home')
//			} else {
//				next()
//			}
//		} else {
//			if(memberKey) {
//				next()
//			} else {
//				next('/login')
//			}
//		}
//	}
//})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
