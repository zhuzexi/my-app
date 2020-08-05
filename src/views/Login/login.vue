<template>
	<div>
		<!-- <img src="../../assets/login_bg.png" class="login" /> -->
		<van-cell-group>
			<van-image class="login"  lazy-load :src="headbg" />
		</van-cell-group>
		<section class="page">
			<div class="login-page">
				<div class="login-wrap">
					<div class="login-text">
						<input
							@mouseenter="focusText"
							@mouseleave="blurText"
							v-model="username"
							type="tel"
							autofocus="autofocus"
							class="login-username"
							placeholder="请输入您的手机号"
						/>
						<i class="iconfont icon-close" data-close="username" v-show="!usernameClose" @click="clearText"></i>
					</div>
					<div class="login-text">
						<input
							@mouseenter="focusText"
							@mouseleave="blurText"
							ref="passwordText"
							v-model="password"
							type="password"
							class="login-password"
							placeholder="请输入密码"
						/>
						<div>
							<i class="iconfont icon-close" data-close="password" v-show="!passwordClose" @click="clearText"></i>
							<i class="iconfont icon-eye1 eye" @click="changeType" v-if="!passwordType"></i>
							<i class="iconfont icon-eye eye" @click="changeType" v-else></i>
						</div>
					</div>
				</div>

				<div class="login-error"></div>

				<button class="login-button" :class="{ active: removeSpace(username) && removeSpace(password) }" @click="loginSubmit">登 录</button>

				<div class="quick-nav">
					<span class="register-button" @click="toReg">快速注册</span>

					<span class="register-button" @click="toForget">忘记密码</span>

					<!-- <router-link tag="span" class="register-button" to="">密码找回</router-link> -->
				</div>

				<div class="other-login">
					<div class="other-head">
						<i></i>
						<span>第三方账号登录</span>
						<i></i>
					</div>
					<div class="other-con">
						<div class="login-icon"><img src="../../assets/wechat.png" class="wechat" /></div>
						<div class="login-icon"><img src="../../assets/qq.png" class="wechat" /></div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script type="text/babel">
import { Indicator, Toast } from 'mint-ui';
import { Icon } from 'vant';
import { removeSpace } from '../../common/js/util';
export default {
	components: {},
	data() {
		return {
			headbg:require('../../assets/login_bg.png'),
			username: '',
			password: '',
			errMsg: '',
			usernameClose: true,
			passwordClose: true,
			passwordType: 0
		};
	},
	mounted() {
		// this.$route.params.phone == '' ? this.username = '' : this.username = this.$route.params.phone;
		// 通过$once来监听定时器
		// 在beforeDestroy钩子触发时清除定时器
		// this.$once('hook:beforeDestroy', () => {
		// clearInterval(this.timeName);
		// })
		
		
//		mui.plusReady(function() {
//			plus.device.getInfo({
//              success: function(e) {
//              	console.log(e)
//              },
//              fail: function(e) {
//                  console.log('getDeviceInfo failed: ' + JSON.stringify(e));
//              }
//          });
//		})
	},
	methods: {
		focusText(e) {
			let $className = e.currentTarget.className;
			$className === 'login-username' ? (this.usernameClose = false) : (this.passwordClose = false);
		},

		blurText(e) {
			let $className = e.currentTarget.className;
			$className === 'login-username' ? (this.usernameClose = true) : (this.passwordClose = true);
		},

		clearText(e) {
			let $close = e.currentTarget.getAttribute('data-close');
			console.log($close);
			this[$close] = '';
		},

		changeType() {
			let $type = this.$refs.passwordText.getAttribute('type'),
				value = '';
			console.log($type);
			$type === 'password' ? (value = 'text') : (value = 'password');
			this.$refs.passwordText.setAttribute('type', value);
			this.passwordType = !this.passwordType;
		},

		removeSpace(value) {
			return removeSpace(value);
		},

		loginSubmit() {
			let re = /^1\d{10}$/;

			if (this.username.trim() == '') {
				this.$toast('请输入手机号码');
				return false;
			} else if (!re.test(this.username)) {
				this.$toast('请输入正确的手机号码');
				return false;
			}

			if (this.password.trim() == '') {
				this.$toast('请输入密码');
				return false;
			}

			let params = '?phone=' + this.username + '&password=' + this.password;
			Indicator.open({
				text: '登录中...',
				spinnerType: 'fading-circle'
			});
			this.$axios.post('/member-server/vmall/memberInfoLoginAndOut/login' + params, {}).then(res => {
				
				console.log(res, '<-----info');

				if (res.data.status == '200') {
					// this.$toast('登录成功');
					localStorage.setItem('memberKey', JSON.stringify(res.data.data.memberKey));
					localStorage.setItem('memberInfo', JSON.stringify(res.data.data.memberInfo));

					let _this = this;
					

					this.timer = setTimeout(function() {

						_this.$router.push('./setuserinfo');
						// _this.$router.push('./addchild');
						
						Indicator.close();
					}, 2000);
				} else {
					Indicator.close();
					this.$toast(res.data.message);
				}
			})
			.catch(err => {
				Indicator.close();
				this.$toast(err);
			})

		},

		//跳转到注册页面
		toReg() {
			this.$router.push('./reg');
		},
		//跳转到找回密码页面
		toForget() {
			this.$router.push('./forget');
		}
	}
};
</script>

<style lang="scss" type="text/scss" scoped>
@import '../../common/style/mixin1';
.login {
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
	position: relative;
}

.register {
	position: absolute;
	top: 0.8rem;
	right: 0.8rem;
	color: #ffffff;
	font-size: 0.4rem;
	font-weight: bold;
	font-family: PingFang SC;
}

.login-page {
	margin-top: 0.8rem;
}

.login-page .login-wrap {
	width: 100%;
}

.login-page .login-wrap .iphone {
	width: 6%;
	height: 0.533333rem;
	margin: 2% 4%;
}

.login-page .login-wrap .code {
	width: 6%;
	height: 0.533333rem;
	margin: 2% 4%;
}

.login-page .login-wrap .login-text {
	display: flex;
	justify-content: space-between;
	width: 90%;
	margin: 0 auto;
	height: 0.8rem;
	line-height: 0.8rem;
	padding: 0.266667rem 0;
	margin-top: 0.266667rem;
	border-bottom: 0.013333rem solid #dcdcdc;
}

.login-page .login-wrap .login-text .iconfont {
	font-size: 0.346667rem;
	color: #cccccc;
}

.login-page .login-wrap .login-text .iconfont.eye {
	padding: 0 0.4rem;
	font-size: 0.533333rem;
}

.login-page .login-wrap .login-text input {
	width: 100%;
	height: 100%;
	margin-right: 0.266667rem;
	line-height: 0.8rem;
	color: #222;
	font-size: 0.426667rem;
}

.login-page .login-wrap .login-text input.login-password {
	width: 50%;
}

.login-page .login-wrap .login-text span {
	font-size: 0.4rem;
}

.login-page .login-wrap .login-text div {
	display: flex;
}

.login-page .login-error {
	width: 100%;
	height: 0.533333rem;
	line-height: 0.533333rem;
	padding: 0.4rem 0;
	color: #f63515;
	font-size: 0.346667rem;
}

.login-page .login-button {
	width: 100%;
	height: 1.333333rem;
	text-align: center;
	line-height: 1.333333rem;
	color: #fff;
	font-size: 0.426667rem;
	background: #a8a8a8;
	border-radius: 0.48rem;
	-webkit-border-radius: 0.8rem;
	-moz-border-radius: 0.8rem;
	-ms-border-radius: 0.8rem;
	-o-border-radius: 0.8rem;
	border-radius: 0.8rem;
}

.login-page .login-button.active {
	background: #ee0a24;
}

.login-page .quick-nav {
	padding: 0.533333rem 0;
	width: 100%;
	// text-align: center;
	display: -webkit-flex; /* Safari */
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}

.login-page .quick-nav .register-button {
	color: #999;
	font-size: 0.45rem;
}

.login-page .other-login {
	width: 100%;
}

.login-page .other-login .other-head {
	display: flex;
	justify-content: space-between;
}

.login-page .other-login .other-head i {
	flex: 1;
	height: 0.013333rem;
	margin-top: 0.24rem;
	background: #dcdcdc;
}

.login-page .other-login .other-head span {
	flex: 1;
	text-align: center;
	font-size: 0.373333rem;
	color: #dcdcdc;
}

.login-page .other-login .other-con {
	display: flex;
	width: 4.266667rem;
	padding: 0.533333rem 0;
	margin: 0 auto;
}

.login-page .other-login .other-con .login-icon {
	display: flex;
	flex-direction: column;
	width: 1.28rem;
	margin: 0 auto;
	text-align: center;
}

.login-page .other-login .other-con .login-icon .iconfont {
	width: 100%;
	height: 1.28rem;
	line-height: 1.28rem;
	font-size: 0.8rem;
	color: #15b8f5;
	background: #e7f7fe;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	-ms-border-radius: 50%;
	-o-border-radius: 50%;
	border-radius: 50%;
}

.login-page .other-login .other-con .login-icon .iconfont.icon-weixin1 {
	font-size: 0.666667rem;
	color: #09bb07;
	background: #e6f8e6;
}

.wechat {
	width: 1.066667rem;
	height: 1.066667rem;
	border-radius: 50%;
}
</style>
