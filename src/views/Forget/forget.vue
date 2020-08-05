<template>
	<div>
		<m-header :mTitle="'找回密码'"></m-header>
		<!-- <img src="../../assets/forgotpassword_bg.png" class="register_bg" /> -->
		<van-cell-group>
			<van-image class="register_bg"  lazy-load :src="headbg" />
		</van-cell-group>

		<section class="page">
			<div class="register-page">
				<div class="register-wrap">
					<div class="register-text">
						<input @mouseenter="focusText" @mouseleave="blurText" v-model="phone" type="tel" autofocus="autofocus" clasautofocus="autofocus" s="register-phone" placeholder="请输入手机号" />
						<i class="iconfont icon-close" data-close="phone" v-show="!phoneClose" @click="clearText"></i>
					</div>

					<div class="register-text">
						<input @mouseenter="focusText" @mouseleave="blurText" v-model="captcha" type="number" class="register-captcha" placeholder="请输入验证码" />
						<i style="position: relative; top:-5px;" class="iconfont icon-close" data-close="captcha" v-show="!captchaClose" @click="clearText"></i>
						<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">{{ text }}</button>
					</div>

					<div class="register-text">
						<input @mouseenter="focusText" @mouseleave="blurText" v-model="password" type="password" class="register-password" placeholder="请输入密码" />
						<i class="iconfont icon-close" data-close="password" v-show="!passwordClose" @click="clearText"></i>
					</div>

					<div class="register-text">
						<input @mouseenter="focusText" @mouseleave="blurText" v-model="password2" type="password" class="register-password2" placeholder="再次输入密码" />
						<i class="iconfont icon-close" data-close="password2" v-show="!password2Close" @click="clearText"></i>
					</div>

				</div>
			</div>

			<div class="register-error"></div>

			<button
				class="register-button"
				@click="register"
				:class="{ active: removeSpace(phone) && removeSpace(captcha) && removeSpace(password) && removeSpace(password2) && removeSpace(invitation) }"
			>
				完 成 修 改
			</button>
			
			<div class="register-error"></div>
		</section>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import sendVerifyCode from '../../mixins/SendVerifyCode';
import mHeader from '../../components/common/m-header';
import { removeSpace } from '../../common/js/util';

// import { userRegister } from '../../service/getData';

export default {
	mixins: [sendVerifyCode],
	data() {
		return {
			headbg:require('../../assets/forgotpassword_bg.png'),
			phone: '',
			password: '',
			password2: '',
			captcha: '',
			invitation: '',
			phoneClose: true,
			passwordClose: true,
			password2Close: true,
			captchaClose: true,
			invitationClose: true
		};
	},

	mounted() {},
	methods: {
		focusText(e) {
			this.judgeText(e, false);
		},
		blurText(e) {
			this.judgeText(e, true);
		},
		judgeText(event, boolean) {
			let $className = event.currentTarget.className;
			switch ($className) {
				// captcha
				case 'register-phone':
					this.phoneClose = boolean;
					break;
				case 'register-captcha':
					this.captchaClose = boolean;
					break;
				case 'register-password':
					this.passwordClose = boolean;
					break;
				case 'register-password2':
					this.password2Close = boolean;
					break;
				case 'register-invitation':
					this.invitationClose = boolean;
					break;
			}
		},

		clearText(e) {
			let $close = e.currentTarget.getAttribute('data-close');
			console.log($close);
			this[$close] = '';
		},
		removeSpace(value) {
			return removeSpace(value);
		},

		//获取短信验证码
		async code() {
			let that = this;
			let re = /^1\d{10}$/;

			if (this.phone.trim() == '') {
				this.$toast('请输入手机号码');
				return false;
			} else if (!re.test(this.phone)) {
				this.$toast('请输入正确的手机号码');
				return false;
			}

			//拼接参数
			let params = '?phone=' + this.phone;
			//接口调用
			this.$axios.post('/member-server/vmall/memberInfoRegister/authCode' + params, {}).then(res => {
				// console.log(res,'<-----info');
				if (res.data.status == '200') {
					this.$toast('验证码发送成功，请注意查收!');
					that.sendCode();
				} else {
					let info = res.data.message;
					this.$toast(info);
					// this.$toast('获取验证码失败，请重新获取!');
				}
			});
		},

		//完成修改
		async register() {
			
			//手机号正则
			let re = /^1\d{10}$/;
			//验证码正则
			let cap = /^\d{6}$/;
			//密码正则
			let m = /^[a-zA-Z0-9@\$\^\.\*\\?]{6,15}$/;

			if (this.phone.trim() == '') {
				this.$toast('请输入手机号码');
				return false;
			} else if (!re.test(this.phone)) {
				this.$toast('请输入正确的手机号码');
				return false;
			}

			if (this.captcha.trim() == '') {
				this.$toast('请输入验证码');
				return false;
			} else if (!cap.test(this.captcha)) {
				this.$toast('请输入六位数验证码');
				return false;
			}
			
			if (this.password.trim() == '') {
				this.$toast('请输入密码');
				return false;
			} 
			// else if (!m.test(this.password)) {
			// 	this.$toast('请输入六位数验证码');
			// 	return false;
			// }
			
			if (this.password2.trim() == '') {
				this.$toast('请再次输入第二次密码');
				return false;
			} 
			if(this.password != this.password2){
				this.$toast('两次输入密码不一致，请检查后重新输入！');
				return false;
			}
			// else if (!m.test(this.password2)) {
			// 	this.$toast('请输入六位数验证码');
			// 	return false;
			// }

			//拼接参数
			let params = '?phone=' + this.phone + '&password=' + this.password + '&password2=' + this.password2 + '&code=' + this.captcha;

			//接口调用
			this.$axios.post('/member-server/vmall/memberInfo/codeUpdateMemberInfoPwd' + params, {}).then(res => {
				// console.log(res,'<-----info');
				if (res.data.status == '200') {
					this.$toast('恭喜您，密码修改成功！');
					this.$router.push('./login', { params: { phone: this.phone } });
				} else {
					let info = res.data.message
					this.$toast(info);
				}
			});
		}
	},
	components: {
		mHeader
	}
};
</script>

<style lang="scss" type="text/scss" scoped>
@import '../../common/style/mixin1';
.code {
	border-radius: 10px;
	background: #c31a1f;
	color: #fff;
	display: block;
	width: 100px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	position: relative;
	top: -12px;
}
.register_bg {
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
	position: relative;
}

.register {
	position: absolute;
	left: 10%;
	top: 10%;
	color: #ffffff;
	font-size: 1.013333rem;
}

.register-page {
	// margin-top: 0.2rem;
	padding: 0 0.4rem;
}

.register-page .register-wrap {
	width: 100%;
}

.register-page .register-wrap .register-text {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 0.6rem;
	line-height: 0.8rem;
	padding: 0.266667rem 0;
	margin-top: 0.266667rem;
	border-bottom: 0.013333rem solid #dcdcdc;
}

.register-page .register-wrap .register-text .iconfont {
	font-size: 0.346667rem;
	color: #cccccc;
}

.register-page .register-wrap .register-text .iconfont.eye {
	padding: 0 0.4rem;
	font-size: 0.533333rem;
	border-right: 0.013333rem solid #dcdcdc;
}

.register-page .register-wrap .register-text input {
	width: 100%;
	height: 100%;
	margin-right: 0.266667rem;
	line-height: 0.8rem;
	color: #222;
	font-size: 0.426667rem;
}

.register-page .register-wrap .register-text input.register-captcha {
	width: 40%;
}

.register-page .register-wrap .register-text span {
	padding-left: 0.266667rem;
	font-size: 0.4rem;
}

.register-page .register-wrap .register-text div {
	display: flex;
}

.register-error {
	width: 100%;
	height: 0.533333rem;
	line-height: 0.533333rem;
	padding: 0.4rem 0;
	color: #f63515;
	font-size: 0.346667rem;
}

.register-button {
	width: 90%;
	// margin-left: 5%;
	height: 1.333333rem;
	text-align: center;
	line-height: 1.333333rem;
	color: #fff;
	font-size: 0.426667rem;
	background: #a8a8a8;
	font-weight: bold;
	-webkit-border-radius: 0.8rem;
	-moz-border-radius: 0.8rem;
	-ms-border-radius: 0.8rem;
	-o-border-radius: 0.8rem;
	border-radius: 0.8rem;
}

.register-button.active {
	background: #c31a1f;
}

.set-security {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	background: #fff;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.set-security p {
	font-size: 0.4rem;
	color: #999;
	padding-top: 0.4rem;
	padding-left: 0.4rem;
}

.set-security .set-security-head {
	position: relative;
	width: 100%;
	height: 1.333333rem;
	text-align: center;
	line-height: 1.173333rem;
	font-size: 0.453333rem;
	border-bottom: 0.026667rem #ededed solid;
	padding: 0 0.4rem;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.set-security .set-security-head .iconfont {
	position: absolute;
	left: 0;
	top: 0;
	font-size: 0.666667rem;
	font-weight: bold;
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
	transform: translate3d(100%, 0, 0);
}
</style>
