<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view class="Router"></router-view>
		</transition>
		<tabbar></tabbar>
	</div>
</template>

<script>
import tabbar from "./components/vant/tabbar.vue";  //引用组件的地址	
import { Toast } from 'vant';
export default {
	components: {
		tabbar
		// [Tabbar.name]: Tabbar,
		// [TabbarItem.name]: TabbarItem
	},
	name: 'app',
	data() {
		return {
			transitionName: '',
		};
	},
	mounted() {
		let _this = this;
		this.plusReady(() => {
			var webview = plus.webview.currentWebview();
//    		webview.setBounce({position:{top:'100px'},changeoffset:{top:'0px'}});//设置Webview窗口的回弹效果
      		var first = null;
      		plus.key.addEventListener('backbutton', function() {
      			webview.canBack(function (e) {
      				if(e.canBack) {
      					let path = _this.$route.path;
      					if(path == '/home') {
      						if (!first) {// first没有值时
				                first = new Date().getTime();
				                Toast('再按一次退出应用');
//				                _this.$toast({message:"再按一次退出应用",duration:1000});
				                setTimeout(function () {
				                  	first = null
				                }, 1000)
				            } else {
				                if (new Date().getTime() - first < 1500) {
//				                  	localStorage.clear();
				                  	plus.runtime.quit();
				                }
				            }
      					} else {
      						webview.back();
      					}
      				} else {
      					if (!first) {// first没有值时
			              	first = new Date().getTime();
			              	Toast('再按一次退出应用');
//			              	_this.$toast({message:"再按一次退出应用",duration:1000});
			              	setTimeout(function () {
			                	first = null
			              	}, 1000)
			            } else {
			              	if (new Date().getTime() - first < 1500) {
//			                	localStorage.clear();
			                	plus.runtime.quit();
			              	}
			            }
      				}
      			})
      		})
		})
		// this.tabbarActive();
	},
	computed: {
		tabbarShow() {
			return this.$store.getters.getTabbarShow;
		},

	}
};
</script>

<style lang="scss" type="text/scss">
@import './common/style/base1';

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.Router {
	// padding-bottom: 50px;
	// position: absolute;
	// top: 0;
	// left: 0;
	// right: 0;
	// width: 100%;
	// height: 100%;
	// background-color: @body-bg-color;
	transition: all 0.5s ease;
	-webkit-transition: all 0.5s ease;
	-moz-transition: all 0.5s ease;
}
.slideleft-enter,
.slideright-leave-active {
	opacity: 1;
	transform: translate3d(90% 0, 0);
	-webkit-transform: translate3d(90%, 0, 0);
	-moz-transform: translate3d(90%, 0, 0);
}
.slideleft-leave-active,
.slideright-enter {
	opacity: 1;
	transform: translate3d(-90% 0, 0);
	-webkit-transform: translate3d(-90%, 0, 0);
	-moz-transform: translate3d(-90%, 0, 0);
}
body {
	margin: 0px;
}
</style>
