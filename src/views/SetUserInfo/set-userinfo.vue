<template>
	<div class="formbg">
		<m-header :mTitle="'用户资料完善'"></m-header>

<!--		<van-cell-group><van-image class="user" width="100" height="100" lazy-load :src="ava" /></van-cell-group>-->

		<van-form @submit="saveUserInfo">
			<van-field required disabled v-model="surnames" name="姓氏" label="姓氏" placeholder="请填写您的姓氏" />

			<van-field required v-model="memberName" name="名字" label="名字" placeholder="请填写您的名字" />

			<van-field required readonly clickable name="datetimePicker" :value="timeValue" label="出生日期" placeholder="请选择出生日期" @click="showDatePopup" />

			<van-popup v-model="show_date" position="bottom">
				<van-datetime-picker
					v-model="currentDate"
					type="date"
					title="请选择年月日"
					:loading="isLoadingShow"
					:min-date="minDate"
					:max-date="maxDate"
					@confirm="confirmPicker"
					@cancel="show_date = false"
				/>
			</van-popup>

			<!--<van-field required readonly clickable name="areaPicker" :value="ssq" label="省市区" placeholder="请选择省市区" @click="showAreaPopup" />-->

			<!--<van-popup v-model="cityVisable" position="bottom">
				<van-picker show-toolbar title="请选择地区" value-key="name" :columns="areaList" @change="onAreaChange" @cancel="onCancel" @confirm="onAreaConfirm" />
			</van-popup>-->

			<!--<van-field required v-model="detailedAddress" name="详细地址" label="详细地址" placeholder="请填写您的详细地址" />-->
			<van-field name="sex" label="性别">
				<template #input>
					<van-radio-group v-model="sex" direction="horizontal">
						<van-radio name="1">男</van-radio>
						<van-radio name="0">女</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<!--<van-field name="sex" label="性别">
				<template #input>
					<van-radio-group v-model="sex" direction="horizontal">
						<van-radio name="1">男</van-radio>
						<van-radio name="0">女</van-radio>
					</van-radio-group>
				</template>
			</van-field>

			<van-field name="isMarriage" label="婚姻状态">
				<template #input>
					<van-radio-group v-model="isMarriage" direction="horizontal">
						<van-radio name="0">已婚</van-radio>
						<van-radio name="1">未婚</van-radio>
					</van-radio-group>
				</template>
			</van-field>

			<van-field v-model="theAlias" name="别名" label="别名" placeholder="请填写您的别名" />

			<van-field v-model="formerName" name="曾用名" label="曾用名" placeholder="请填写您的曾用名" />

			<van-field v-model="wordsSuchAs" name="字辈" label="字辈" placeholder="请填写您的字辈" />

			<van-field v-model="nationality" name="国籍" label="国籍" placeholder="请填写您的国籍" />-->

			<van-field readonly clickable name="picker" :value="mz_name" label="民族" placeholder="点击选择民族" @click="showMzPopup" />

			<van-popup v-model="show_mz" position="bottom">
				<van-picker title="请选择民族" show-toolbar :columns="mz" @confirm="onMzConfirm" @cancel="onMzCancel" @change="onMzChange" />
			</van-popup>

			<van-button round type="info" native-type="submit" style="width: 75%; margin: 20px auto;">下一步</van-button>
		</van-form>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { Area, Popup, Dialog } from 'vant';
import mHeader from '../../components/common/m-header-1';
// import DateTime from 'vue-date-time-m';

export default {
	data() {
		return {
			isLoadingShow: true,
			minDate: new Date(1900, 0, 1), //最小时间
			maxDate: new Date(2010, 11, 31), //最大时间
			currentDate: new Date(), //获取当前时间

			cityVisable: false, //遮罩层显示或隐藏
			areaList: [{ values: [] }, { values: [] }, { values: [] }], //自定义数据三级结构
			checkCity: '', //Picker拿到的值

			province: '', //省
			city: '', //市
			area: '', //区
			ssq: '', //省市区拼接

			ava: require('../../assets/user/man.png'), //头像

			memberName: '', //姓名
			surnames: '何', //姓氏
			formerName: '', //曾用名
			aBirthTimes: '', //生日
			sex: '1', //性别

			timeValue: '', //生日
			theAlias: '', //别名
			isMarriage: '0', //婚姻状态
			wordsSuchAs: '', //子辈
			nationality: '', //国籍

			mz: [], //民族Array
			mz_name: '汉', //民族名称
			tpMzInfoId: 1,
			// tpMzId: 1, //民族id

			areaId: '', //区域id
			provinceAndCity:'',//省市区字符
			detailedAddress: '', //详细地址

			data: '',
			show_date: false, //弹显示窗是否
			show_mz: false, //弹显示窗是否

			formData: new FormData(),
			pa: new URLSearchParams(),

			memberInfo: JSON.parse(localStorage.getItem('memberInfo')),
			memberKey: JSON.parse(localStorage.getItem('memberKey'))
		};
	},
	mounted() {
		this.demo();
		this.getArea(100000, 0); //渲染页面时请求第一层省级数据
	},
	created() {},
	methods: {
		
		// 显示日期弹窗
		showDatePopup() {
			this.show_date = true;
			this.isLoadingShow = true;
			setTimeout(() => {
				this.isLoadingShow = false;
			}, 500);
		},

		// 显示省市区弹窗
		showAreaPopup() {
			this.cityVisable = true;
			this.isLoadingShow = true;
			setTimeout(() => {
				this.isLoadingShow = false;
			}, 500);
		},

		// 显示弹民族弹窗
		showMzPopup() {
			this.show_mz = true;
			this.isLoadingShow = true;
			this.getMzList();
			setTimeout(() => {
				this.isLoadingShow = false;
			}, 500);
		},

		//确定选择日期
		confirmPicker(val) {
			let year = val.getFullYear();
			let month = val.getMonth() + 1;
			let day = val.getDate();
			if (month >= 1 && month <= 9) {
				month = `0${month}`;
			}
			if (day >= 1 && day <= 9) {
				day = `0${day}`;
			}
			this.timeValue = `${year}-${month}-${day}`;
			this.show_date = false;
		},

		onMzConfirm(value, index) {
			let mz = value;
			this.tpMzInfoId = index + 1;
			this.mz_name = `${mz}`;
			this.show_mz = false;

			// this.show_mz = false;
		},

		onMzChange(picker, value, index) {
			this.tpMzInfoId = index + 1;
			console.log(`当前值：${value}, 当前索引：${this.tpMzId}`);
		},

		onMzCancel() {
			this.show_mz = false;
		},

		//---------省市区部分---------

		//网络请求地区数据(难点在如何拼装三级结构)
		getArea(ParentId, index) {
			//拼接参数
			let params = '?parentId=' + ParentId;

			//接口调用
			this.$axios
				.get('/system-server/vmall/area/list' + params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				})
				.then(res => {
					// console.log(res,'arealist...');
					if (res.data.status == '200') {
						//当请求成功时
						const { data } = res.data;
						// console.log(data[0].id,'省级');

						this.areaList[index].values = [{ name: '请选择' }, ...data];

						if (index < 2) {
							//当请求的是三级内的内容时
							this.areaList[index + 1].values = [];
						}
						//更新areaList
						this.areaList = [...this.areaList];
					} else {
						this.$notify(res.msg);
					}
				});
		},

		//当地区选择变化时
		onAreaChange(picker, values, index) {
			if (index < 2) {
				//传参 参数为上层选择的地区的code
				this.getArea(values[index].id, index + 1);
			}
		},

		//点击取消
		onCancel() {
			this.cityVisable = false;
		},

		//点击确定
		onAreaConfirm(value) {
			if (value[2] && value[2].id) {
				if (value[2].name == '请选择') {
					return false;
				} else {
					this.checkCity = value[2].name;
				}
			} else if (value[1] && value[1].id) {
				if (value[1].name == '请选择') {
					return false;
				} else {
					this.checkCity = value[1].name;
				}
			} else if (value[0] && value[0].id) {
				if (value[0].name == '请选择') {
					return false;
				} else {
					this.checkCity = value[0].name;
				}
			} else {
				this.checkCity = null;
			}

			this.ssq = value[0].name + value[1].name + value[2].name;
			this.ssq = this.ssq.replace('请选择', '');
			
			this.provinceAndCity = value[0].name + value[1].name + value[2].name;
			this.provinceAndCity = this.provinceAndCity.replace('请选择', '');

			this.areaId = value[0].id + ',' + value[0].id + ',' + value[2].id;
			this.areaId = this.areaId.replace(',undefined', '');

			console.log(this.ssq, '...ssq');
			console.log(this.areaId, '...id');

			this.cityVisable = false;
		},

		//---------省市区部分---------

		//获取民族信息
		async getMzList() {
			//拼接参数
			let params = '?pageSize=100';
			//接口调用
			this.$axios
				.get('/system-server/vmall/tpMz/list' + params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				})
				.then(res => {
					let List = res.data.data.list;

					// console.log(List,'<-----info');

					if (res.status == '200') {
						List.forEach(item => {
							this.mz.push(item.name);
						});
					} else {
						let info = res.message;
						this.$toast(info);
					}
				});
		},

		//用户资料保存
		async saveUserInfo() {
			if (this.memberName.trim() == '') {
				this.$toast('请输入您的名字');
				return false;
			}

//			if (this.surnames.trim() == '') {
//				this.$toast('请输入您的名字');
//				return false;
//			}

			if (this.timeValue.trim() == '') {
				this.$toast('请输入您的出生日期');
				return false;
			}
			
//			if(this.ssq ==''){
//				this.$toast('请选择省市区');
//				return false;
//			}

//			if (this.detailedAddress.trim() == '') {
//				this.$toast('请输入您的详细地址');
//				return false;
//			} else {
//				this.detailedAddress = this.ssq + this.stripscript(this.detailedAddress.trim());
//			}

			if (this.theAlias == 'undefined') {
				this.theAlias = '';
			}

			if (this.formerName == 'undefined') {
				this.formerName = '';
			}

			if (this.wordsSuchAs == 'undefined') {
				this.wordsSuchAs = '';
			}

			if (this.nationality == 'undefined') {
				this.nationality = '';
			}
			this.surnames = "何";
			//构建form表单参数
			this.formData.append('memberName', this.memberName.trim());
			this.formData.append('sex', parseInt(this.sex));
			this.formData.append('surnames', this.surnames.trim());
//			this.formData.append('theAlias', this.theAlias.trim());
//			this.formData.append('formerName', this.formerName.trim());
//			this.formData.append('isMarriage', parseInt(this.isMarriage));
//			this.formData.append('wordsSuchAs', this.wordsSuchAs.trim());
			this.formData.append('aBirthTimes', this.timeValue + ' 00:00:00');
//			this.formData.append('nationality', this.nationality.trim());
			this.formData.append('tpMzInfoId', this.tpMzInfoId);
//			this.formData.append('areaId', this.areaId);
//			this.formData.append('provinceAndCity', this.provinceAndCity.trim());
//			this.formData.append('detailedAddress', this.detailedAddress.trim());
			await this.$axios
				.post('/member-server/vmall/memberInfo/updateMemberInfo', this.formData, {
					headers: {
						'content-type': 'multipart/form-data',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				})
				.then(res => {
					// console.log(res);

					if (res.data.status == '200') {
						Dialog.confirm({
							// title: '标题',
							message: '恭喜您，用户资料保存成功！'
						})
							.then(() => {
								this.$router.push('/home');
							})
							.catch(() => {
								let info = res.data.message;
								this.$toast(info);
							});
					} else {
						let info = res.data.message;
						this.$toast(info);
					}
				});
		},

		async demo() {
			this.formData.append('id', this.memberInfo.id);
			this.$axios
				.post('/member-server/vmall/memberInfo/verificationMember', this.formData, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				})
				.then(res => {
					let _this = this;
					let Ts = res.data.data;
					if (Ts == null) {
						this.$router.push('./home');
					} else {
						let code = Ts.map(item => item.code);
						if(code.indexOf(0) == -1) {
							this.$router.push('./home');
						}
//						let code = Ts.map(item => item.code);
//						if(code.indexOf(0) != -1){
//							
//						} else if(code.indexOf(1) != -1) {
//							this.$router.push('./addfather');
//						} else if(code.indexOf(2) != -1){
//							this.$router.push('./addpeiou');
//						} else if(code.indexOf(3) != -1){
//							this.$router.push('./addchild');
//						}
						// Ts.forEach(items => {
						// console.log(items.code); //Number
						// else if(item.code == 2){
						// 		_this.$router.push('./addpeiou');
						// 		return false;
						// 	}else if(item.code == 3){
						// 		_this.$router.push('./addchild');
						// 		return false;
						// 	}
						// });
					}
				});
		},

		// 过滤所有特殊字符
		stripscript(s) {
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]");
			var rs = '';
			for (var i = 0; i < s.length; i++) {
				rs = rs + s.substr(i, 1).replace(pattern, '');
			}
			return rs;
		}
	},
	components: {
		mHeader
		// DateTime
		// VDistpicker
	}
};
</script>

<style scoped>
/* // @import '../../common/style/mixin1'; */

.user {
	margin: 10px 10px 10px 10px;
}
/deep/ .van-button--info {
	background-color: #ee0a24;
	border: 1px solid #ee0a24;
}
/deep/ .van-radio__icon--checked .van-icon {
	background-color: #ee0a24;
	border-color: #ee0a24;
}
.van-cell {
	padding: 10px 16px;
	line-height: 32px;
	/* background-color: rgba(255,255,255,0.90); */
	background: none;
	width: 87%;
	margin: 0 auto;
}
.van-field__body {
	position: relative !important;
	top: 5px !important;
}

.van-checkbox--horizontal {
	margin-right: 25px !important;
}
.v-distpicker {
	width: 100%;
}
.formbg {
	width: 100%;
	height: 100%;
	position: relative;
}
.formbg::after {
	content: '';
	background: url(../../assets/addbg/addbg1.png) no-repeat;
	background-size: 100% 100%;
	opacity: 0.25;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	position: absolute;
	z-index: -1;
	height: 100vh;
}
.date-bt {
	background: #c31a1f;
	border-radius: 10px;
	color: #fff;
	display: block;
	width: 120px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	position: relative;
	top: -8px;
}
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
	background: #c31a1f;
}

.login-page .quick-nav {
	padding: 0.533333rem 0;
	width: 100%;
	/* // text-align: center; */
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
