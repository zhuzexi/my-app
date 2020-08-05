<template>
	<div class="formbg">
		<m-header :mTitle="'第三步：添加直系亲属（配偶）'"></m-header>
		<span class="next" @click="changeToLogin">跳 过</span>
		<van-cell-group><van-image class="user" width="100" height="100" lazy-load :src="ava" /></van-cell-group>
		
		<section class="page">
			<div class="login-page">
				<div class="login-wrap">
					
					<div class="login-text">
						<b style="color: #ee0a24; display: block; margin-right: 15px;">*</b>
						<input @mouseenter="focusText" @mouseleave="blurText" v-model="spouse" type="text" autofocus="autofocus" class="spouse" placeholder="请填写您配偶姓名" />
						<i class="iconfont icon-close" data-close="spouse" v-show="!spouseClose" @click="clearText"></i>
					</div>
					
					<div class="login-text-other">
						<b style="color: #ee0a24; display: block; margin-right: 15px;"></b>
						<van-field name="sex" label="性别">
							<template #input>
								<van-radio-group v-model="sex" direction="horizontal">
									<van-radio name="1">男</van-radio>
									<van-radio name="0">女</van-radio>
								</van-radio-group>
							</template>
						</van-field>
					</div>

					<div class="login-text">
						<b style="color: #ee0a24; display: block; margin-right: 15px;">*</b>
						<input
							@mouseenter="focusText"
							@mouseleave="blurText"
							v-model="birthplace"
							type="text"
							autofocus="autofocus"
							class="birthplace"
							placeholder="请填写您配偶出生地址"
						/>
						<i class="iconfont icon-close" data-close="birthplace" v-show="!birthplaceClose" @click="clearText"></i>
					</div>
					
					<div class="login-text-other">
						<b style="color: #ee0a24; display: block; margin-right: 15px;">*</b>
						<van-field  readonly clickable name="areaPicker" :value="ssq" label="省市区" placeholder="请选择省市区" @click="showAreaPopup" />
						
						<van-popup v-model="cityVisable" position="bottom">
							<van-picker show-toolbar title="请选择地区" value-key="name" :columns="areaList" @change="onAreaChange" @cancel="onCancel" @confirm="onAreaConfirm" />
						</van-popup>
					</div>

					<div class="login-text">
						<b style="color: #ee0a24; display: block; margin-right: 15px;">*</b>
						<input
							@mouseenter="focusText"
							@mouseleave="blurText"
							v-model="detailedAddress"
							type="text"
							autofocus="autofocus"
							class="detailedAddress"
							placeholder="请填写您配偶详细居住地址"
						/>
						<i class="iconfont icon-close" data-close="detailedAddress" v-show="!detailedAddressClose" @click="clearText"></i>
					</div>
				</div>

				<div class="login-error"></div>

				<!-- <button class="login-button" :class="{ active: removeSpace(spouse) && removeSpace(birthplace) && removeSpace(detailedAddress) }" @click="next">下一步</button> -->
				
				<van-button round type="info" native-type="submit" style="width: 75%; margin: -20px auto 10px auto;" @click="next">下一步</van-button>
			</div>
			
		</section>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { Area, Popup, Dialog} from 'vant';
import { removeSpace } from '../../common/js/util';
import mHeader from '../../components/common/m-header-1';

export default {
	data() {
		return {
			
			ava: require('../../assets/user/man.png'), //头像
			
			spouse: '', //配偶姓名
			sex: '0', //性别
			birthplace: '', //出生地
			
			cityVisable: false, //遮罩层显示或隐藏
			areaList: [{ values: [] }, { values: [] }, { values: [] }], //自定义数据三级结构
			checkCity: '', //Picker拿到的值
			
			province: '', //省
			city: '', //市
			area: '', //区
			ssq: '', //省市区拼接
			provinceAndCity:'',//省市区
			
			areaId: '', //区域id
			detailedAddress: '', //详地址细

			spouseClose: true,
			birthplaceClose: true,
			detailedAddressClose: true,

			params : new FormData(),
			memberInfo: JSON.parse(localStorage.getItem('memberInfo')),
			memberKey: JSON.parse(localStorage.getItem('memberKey'))
		};
	},
	mounted() {
		this.getArea(100000, 0); //渲染页面时请求第一层省级数据
	},
	created() {},
	methods: {
		changeToLogin() {
			this.$router.push('./addchild');
		},
		focusText(e) {
			this.judgeText(e, false);
		},
		blurText(e) {
			this.judgeText(e, true);
		},
		judgeText(event, boolean) {
			let $className = event.currentTarget.className;
			switch ($className) {
				case 'wife':
					this.wifeClose = boolean;
					break;
				case 'birthplace':
					this.birthplaceClose = boolean;
					break;
				case 'detailedAddress':
					this.detailedAddressClose = boolean;
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


		// 显示省市区弹窗
		showAreaPopup() {
			this.cityVisable = true;
			this.isLoadingShow = true;
			setTimeout(() => {
				this.isLoadingShow = false;
			}, 500);
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
		
		async next() {
			
			if (this.spouse.trim() == '') {
				this.$toast('请输入您配偶的姓名');
				return false;
			}
			
			if(this.ssq ==''){
				this.$toast('请选择省市区');
				return false;
			}

			if (this.detailedAddress.trim() == '') {
				this.$toast('请输入您配偶详细居住地址');
				return false;
			}


			//拼接参数
			let params = new Object();
			params.type = 2;
			params.memberInfoId = this.memberInfo.id;
			params.memberInfo = [
				{
					memberName: this.spouse.trim(), //配偶姓名
					sex: parseInt(this.sex),
					surnames: '', //别名
					isMarriage: 0, //婚姻状态
					isLiving: 0, //是否在世
					wordsSuchAs: '', //子辈
					phone: '', //电话
					birthDetailedAddress: this.birthplace.trim(), //出生地
					detailedAddress: this.provinceAndCity + this.stripscript(this.detailedAddress.trim()), //详细地址
					
					memberInfoAddressManage: {
						//区域id
						areaId: this.areaId,
						//省市区
						provinceAndCity:this.provinceAndCity,
						//详细地址
						detailedAddress: this.provinceAndCity + this.stripscript(this.detailedAddress.trim())
					}
				}
			];
			
			//构建参数
			this.params.append('jsonObject',JSON.stringify(params));
			
			//接口调用
			this.$axios
				.post('/member-server/vmall/memberInfo/addRelatives' ,this.params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				})
				.then(res => {
					
					console.log(res,'<-----info');
					
					if (res.status == '200') {
						
						Dialog.confirm({
							// title: '标题',
							message: '恭喜您，添加配偶资料成功！'
						})
							.then(() => {
								this.$router.push('./addchild');
							})
							.catch(() => {
								let info = res.data.message;
								this.$toast(info);
							});
					} else {
						let info = res.message;
						this.$toast(info);
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
	}
};
</script>

<style lang="scss" type="text/scss" scoped>
@import '../../common/style/mixin1';

.user {
	margin: 20px 10px 20px 10px;
}

/deep/ .van-button--info {
	background-color: #ee0a24;
	border: 1px solid #ee0a24;
}

/deep/ .van-radio__icon--checked .van-icon {
	background-color: #ee0a24;
	border-color: #ee0a24;
}

/deep/ .van-radio__label{
	padding-right: 10px;
}

.formbg {
	width: 100%;
	height: 100%;
	display: block;
	position: relative;
}
.formbg::after{
	content: "";
	background: url(../../assets/addbg/addbg3.png) no-repeat;
	background-size: 100% 100%;
	opacity: 0.3;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	position: absolute;
	z-index: -1;   
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
.login-text-other {
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
	background: none;
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
.next {
	border-radius: 4px;
	background-color: rgba(0, 0, 0, 0.2);
	color: #ffffff;
	font-size: 14px;
	display: block;
	/*width: 100px;*/
	/*height: 38px;*/
	/*line-height: 38px;*/
	padding: 5px;
	text-align: center;
	position: absolute;
	top: 15px;
	right: 10px;
	z-index: 999;
}
</style>