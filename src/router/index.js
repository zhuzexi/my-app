import Vue from 'vue'
import Router from 'vue-router'

//懒路由加载

//登录
const Login = r => require.ensure([], () => r(require('@/views/Login/login')), 'Login')
//用户注册
const Reg = r => require.ensure([], () => r(require('@/views/Register/reg')), 'Reg')
//密码找回
const Forget = r => require.ensure([], () => r(require('@/views/Forget/forget')), 'Forget')
//用户资料完善
const SetUserInfo = r => require.ensure([], () => r(require('@/views/SetUserInfo/set-userinfo')), 'SetUserInfo')

//添加父亲
const AddFather = r => require.ensure([], () => r(require('@/views/SetUserInfo/add-father')), 'AddFather')
//添加父亲(详细)
const AddRelativesDetail = r => require.ensure([], () => r(require('@/views/Genealogy/add-father.vue')), 'AddRelativesDetail')

//添加配偶
const AddPeiou = r => require.ensure([], () => r(require('@/views/SetUserInfo/set-peiou')), 'AddPeiou')
//添加配偶(详细)


//添加子女
const AddChild = r => require.ensure([], () => r(require('@/views/SetUserInfo/set-child')), 'AddChild')
//添加子女(详细)



// 需要左方向动画的路由用this.$router.to('****')
Router.prototype.togo = function(path) {
	this.isleft = true
	this.isright = false
	this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function(path) {
	this.isright = true
	this.isleft = false
	this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function() {
	this.isright = true
	this.isleft = false
	this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function() {
	this.isright = true
	this.isleft = false
}
// 点击浏览器前进按钮执行
Router.prototype.togoin = function() {
	this.isright = false
	this.isleft = true
}
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/guide' //引导页
		},
		{
			path: '/guide',
			component: resolve => require(['@/views/guide'], resolve),
		},
		{
			path: '/login',
			meta: {
				title: 'login',
				type: '' // 不需要鉴权
			},
			name: 'Login',
			component: Login,
		},
		{
			path: '/reg',
			meta: {
				// index: 1
			},
			component: Reg
		},
		{
			path: '/forget',
			meta: {
				// index: 1
			},
			component: Forget
		},
		{
			path: '/setuserinfo',
			meta: {
				// index: 1
			},
			component: SetUserInfo
		},
		{
			path: '/addfather',
			meta: {
				// index: 1
			},
			component: AddFather
		},
		{
			path: '/addrelativesdetail',
			meta: {
				// index: 1
			},
			component: AddRelativesDetail
		},
		{
			path: '/addpeiou',
			meta: {
				// index: 1
			},
			component: AddPeiou
		},
		{
			path: '/addchild',
			meta: {
				// index: 1
			},
			component: AddChild
		},
		{
			path: '/home',
			name: 'Home',
			component: resolve => require(['@/views/Home/home'], resolve),
			meta: {
				title: '首页',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			}
		},
		{
			path: '/homedetail',
			name: 'homedetail',
			component: resolve => require(['@/views/Detail/detail'], resolve),
			meta: {
				title: '文章详情',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/book',
			name: 'book',
			component: resolve => require(['@/views/book'], resolve),
			meta: {
				title: '谱书',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			}
		},
		{
			path: '/info',
			name: 'info',
			component: resolve => require(['@/views/Genealogy/info'], resolve),
			meta: {
				title: '族人信息',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			}
		},
		{
			path:'/toList',
			name: 'List',
			component: resolve => require(['@/views/List/list'], resolve),
			meta: {
				title: '列表页',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/culture',
			name: 'Culture',
			component: resolve => require(['@/views/Home/culture'], resolve),
			meta: {
				title: '家文化',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/genealogy',
			name: 'Genealogy',
			component: resolve => require(['@/views/Genealogy/genealogy'], resolve),
			meta: {
				title: '族谱',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/setspectrum',
			name: 'SetSpectrum',
			component: resolve => require(['@/views/Genealogy/set-spectrum'], resolve),
			meta: {
				title: '修谱',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/imgindex',
			name: 'imgindex',
			component: resolve => require(['@/views/Culture/index'], resolve),
			meta: {
				title: '修谱',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/spouse',
			name: 'spouse',
			component: resolve => require(['@/views/Genealogy/spouse'], resolve),
			meta: {
				title: '添加配偶',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			}
		},
		{
			path: '/organization',
			name: 'organization',
			component: resolve => require(['@/views/Genealogy/organization'], resolve),
			meta: {
				title: '组织机构修谱',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			}
		},
		{
			path: '/v-father',
			name: 'V-father',
			component: resolve => require(['@/views/Genealogy/view-father'], resolve),
			meta: {
				title: '查看族人信息',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/u-father',
			name: 'U-father',
			component: resolve => require(['@/views/Genealogy/update-father'], resolve),
			meta: {
				title: '编辑族人信息',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/clancircle',
			name: 'ClanCircle',
			component: resolve => require(['@/views/ClanCircle/clancircle'], resolve),
			meta: {
				title: '宗亲圈',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/mine',
			name: 'Mine',
			component: resolve => require(['@/views/Mine/mine'], resolve),
			meta: {
				title: '我的',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			},
		},
		{
			path: '/contribute',
			name: 'contribute',
			component: resolve => require(['@/views/contribute'], resolve),
			meta: {
				title: '功德',
				type: 'login' // 是否需要判断是否登录,这里是需要判断
			}
		}
	]
})
