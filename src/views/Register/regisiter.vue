<template>
	<div class="container" id="register">
		<div class="form-container sign-in-container">
			<form action="#">
				<h3 style="font-size:16px;margin-bottom:25px">欢迎注册</h3>
				<input v-model="phone" autofocus style="border:none" ref="phone" placeholder="请输入11位手机号码" />
				<div style="position:relative;width:100%">
					<input
						type="text"
						ref="checkCode"
						readonly
						v-model="checkCode"
						style="position:absolute;left:0px;width:60%;background-color:#eee;border:none"
						placeholder="请输入验证码"
					/>
					&nbsp;&nbsp;
					<input type="button" class="getcode" ref="getCode" @click="getCode" v-model="getcode" />
				</div>
				<input type="password" style="background-color:#eee;border:none" v-model="password" placeholder="密码" />
				<input type="password" style="background-color:#eee;border:none" v-model="confirm" placeholder="确认密码" />
				<button @click.prevent="register">注册</button>
			</form>
		</div>
	</div>
</template>

<script type="text/babel">
import { Indicator, Toast } from 'mint-ui';
export default {
	data() {
		return {
			phone: '',
			password: '',
			confirm: '',
			getcode: '获取验证码',
			checkCode: '',
			time: 60
		};
	},
	mounted() {
		document.getElementById('register').style.height = window.innerHeight - 80 + 'px';
	},
	methods: {
		getCode() {
			//移除readOnly属性
			this.$refs.checkCode.removeAttribute('readOnly');
			var re = /^1\d{10}$/;
			if (!re.test(this.phone)) {
				//this.$refs.phone.style.color="red"
				//    this.$refs.phone.value="手机号格式不正确！"
				//       this.$refs.phone.onclick=()=>{
				//          this.$refs.phone.value=""}
				this.$toast('手机格式不正确');
				return false;
			}
			var phone = this.phone;
			this.$refs.getCode.setAttribute('disabled', true);
			this.$refs.getCode.style.backgroundColor = '#ccc';
			var timeId = setInterval(() => {
				this.time--;
				this.getcode = '重新获取(' + this.time + ')';
				if (this.time == 0) {
					clearInterval(timeId);
					this.$refs.getCode.style.backgroundColor = '#FF4B2B';
					this.$refs.getCode.removeAttribute('disabled');
					this.time = 10;
					this.getcode = '获取验证码';
				}
			}, 1000);
			this.$axios
				.get('http://javawebs.cn:3000/getCode', {
					params: {
						phone: phone
					}
				})
				.then(res => {
					console.log('success');
				})
				.catch(err => {
					console.log('error');
				});
		},
		register() {
			var phone = this.phone;
			var password = this.password;
			var re = /^1\d{10}$/;
			if (!re.test(this.phone)) {
				this.$toast('手机号码格式不正确');
				return false;
			}
			if (this.checkCode.trim() == '') {
				this.$toast('验证码不能为空');
				return false;
			}
			if (this.password.trim() == '' || this.confirm.trim() == '') {
				this.$toast('密码不能为空');
				return false;
			}
			if (this.password != this.confirm) {
				this.$toast('两次密码不一致');
				return false;
			}

			this.$axios
				.get('/register', {
					params: {
						checkCode: this.checkCode,
						userPhone: phone,
						userPassword: password
					}
				})
				.then(res => {
					if (res.data.msg == 'success') {
						Toast({
							message: '注册成功!',
							iconClass: 'iconfont icon-caozuochenggong',
							//position: 'top',
							duration: 1000
						});
						this.$router.push({ path: '/my/login' });
						// window.location.href="/#/my/login"
					} else if (res.data.msg == '验证码错误') {
						this.$toast('验证码错误');
					} else {
						this.$toast('手机号已经注册');
					}
				});
		}
	}
};
</script>
<style scoped>
/* // @import "../../common/login/all.min.css"; */
/* @import '../../common/login/style.css'; */
.icon {
	width: 30px;
	height: 30px;
}
.getcode {
	float: right;
	width: 35%;
	background-color: #ff4b2b;
	color: #fff;
	border: none;
}
.getcode :active {
	border: 1px solid #ccc;
}
</style>
