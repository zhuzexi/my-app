<template>
	<div class="formbg">
		<m-header :mTitle="type == 2 ? '添加配偶' : '添加子女'"></m-header>

		<!--<van-cell-group><van-image class="user" width="100" height="100" lazy-load :src="ava" /></van-cell-group>-->

		<van-form @submit="saveUserInfo">
			<van-field name="uploader" label="上传头像">
				<template #input>
				    <van-uploader v-model="fileList" :after-read="afterRead" />
				</template>
			</van-field>
			<van-field name="uploader" label="上传背景">
				<template #input>
				    <van-uploader v-model="bgList" :after-read="bgAfterRead" />
				</template>
			</van-field>
			<van-field v-model="surnames" name="姓氏" label="姓氏" placeholder="请填写您的姓氏" />
			<van-field v-model="memberName" name="姓名" label="姓名" placeholder="请填写您的姓名" />
			<van-field readonly clickable name="datetimePicker" :value="timeInputValue" label="出生日期" placeholder="请选择出生日期" @click="showDatePopup" />
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
			
			<van-field v-model="birthplace" name="出生地址" label="出生地址" />

			<van-field readonly clickable name="areaPicker" :value="ssq" label="省市区" placeholder="请选择省市区" @click="showAreaPopup" />

			<van-popup v-model="cityVisable" position="bottom">
				<van-picker show-toolbar title="请选择地区" value-key="name" :columns="areaList" @change="onAreaChange" @cancel="onCancel" @confirm="onAreaConfirm" />
			</van-popup>

			<van-field v-model="detailedAddress" name="详细地址" label="详细地址" />
			

			<van-field name="sex" label="性别">
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
						<van-radio name="1">未婚</van-radio>
						<van-radio name="0">已婚</van-radio>
					</van-radio-group>
				</template>
			</van-field>

			<van-field v-model="theAlias" name="别名" label="别名"/>

			<van-field v-model="formerName" name="曾用名" label="曾用名"/>

			<van-field v-model="wordsSuchAs" name="字辈" label="字辈"/>

			<van-field v-model="nationality" name="国籍" label="国籍"/>

			<van-field readonly clickable name="picker" :value="mz_name" label="民族" placeholder="点击选择民族" @click="showMzPopup" />

			<van-popup v-model="show_mz" position="bottom">
				<van-picker title="请选择民族" show-toolbar :columns="mz" @confirm="onMzConfirm" @cancel="onMzCancel" @change="onMzChange" />
			</van-popup>

			<van-button round type="info" native-type="submit" style="width: 75%; margin: 20px auto;">确定添加</van-button>
		</van-form>
	</div>
</template>

<script>
import mHeader from '../../components/common/m-header';
import { Indicator, Toast } from 'mint-ui';
import { Area, Popup, Dialog, Uploader } from 'vant';

export default {
	components: {
		mHeader
	},
	data() {
		return {
			fileList: [],
			fileLists: [],
			bgList: [],
			bgLists: [],
			id: this.$route.query.id, //路由传参
			type: this.$route.query.type,
			role: this.$route.query.role,

			isLoadingShow: true,
			minDate: new Date(1900, 0, 1), //最小时间
			maxDate: new Date(2010, 11, 31), //最大时间
			currentDate: new Date(), //获取当前时间

			cityVisable: false, //遮罩层显示或隐藏
			areaList: [{ values: [] }, { values: [] }, { values: [] }], //自定义数据三级结构
			checkCity: '', //Picker拿到的值
			
			province:'',//省
			city:'',//市
			area:'',//区
			ssq: '',//省市区
 
			ava: '', //头像
			
			memberName: '', //姓名
			surnames: '', //姓氏
			formerName: '', //曾用名
			aBirthTimes: '', //生日
			sex: '', //性别

			timeInputValue: '', //生日
			theAlias: '', //别名
			isMarriage: '', //婚姻状态
			wordsSuchAs: '', //子辈
			nationality: '', //国籍
			phone:'',//电话

			mz: [], //民族Array
			mz_name: '', //民族名称
			tpMzInfoId: 1,

			areaId: '', //区域id
			provinceAndCity: '',//省市区字符
			birthplace:'',//出生地
			detailedAddress: '', //详细地址

			data: '',
			show_date: false, //弹显示窗是否
			show_mz: false, //弹显示窗是否
			
			params : new FormData(),
			pa: new URLSearchParams(),

			memberInfo: JSON.parse(localStorage.getItem('memberInfo')),
			memberKey: JSON.parse(localStorage.getItem('memberKey'))
			
		};
	},
	mounted() {
//		this.selectPeopleInfo();
		this.getArea(100000,0); //渲染页面时请求第一层省级数据
	},
	methods: {
		afterRead(file) {
　　　		var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
		　　formData.append('files', file.file); //接口需要传的参数
		　　this.$axios.post('/file-server/file/multiUploadImg', formData, {
				headers: {
					'content-type': 'multipart/form-data',
					memberAccessToken: this.memberKey.memberAccessToken
				}
			})
			.then(res => {//将formDate文件上传到阿里云服务器，会返回图片地址
				if(res.data.status == 200){
					this.fileLists = res.data.data.map(item => {
						return 'http://api1.hejiawh.com/' + item;
					})
				}
		　　});
	    },
	    bgAfterRead(file) {
	    	var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
		　　formData.append('files', file.file); //接口需要传的参数
		　　this.$axios.post('/file-server/file/multiUploadImg', formData, {
				headers: {
					'content-type': 'multipart/form-data',
					memberAccessToken: this.memberKey.memberAccessToken
				}
			})
			.then(res => {//将formDate文件上传到阿里云服务器，会返回图片地址
				if(res.data.status == 200){
					this.bgLists = res.data.data.map(item => {
						return 'http://api1.hejiawh.com/' + item;
					})
				}
		　　});
	    },
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
			this.timeInputValue = `${year}-${month}-${day}`;
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
			console.log(`当前值：${value}, 当前索引：${this.tpMzInfoId}`);
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
			this.$axios.get('/system-server/vmall/area/list' + params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				}).then(res => {
					// console.log(res,'arealist...');
					if (res.data.status == '200') {
	
						//当请求成功时
						const { data } = res.data;
						// console.log(data[0].id,'省级');
						
						this.areaList[index].values = [
							{ name: '请选择' },
							...data 
						];
				
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

		//查询族人信息
		async selectPeopleInfo() {
			
			//拼接参数
			let params = '?id=' + this.id;

			//接口调用
			this.$axios
				.get('/member-server/vmall/memberRepairSpectrum/selectByRepairSpectrum' + params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				})
				.then(res => {
					console.log(res, '<-----res');

					const memberInfo = res.data.data.memberInfo; 
					
					const memberInfoAddressManage = res.data.data.memberInfoAddressManage;


					if (memberInfo.surnames == null || memberInfo.surnames == '') {
						this.surnames = '未填写';
					} else {
						this.surnames = memberInfo.surnames;
					}

					if (memberInfo.memberName == null || memberInfo.memberName == '') {
						this.memberName = '未填写';
					} else {
						this.memberName = memberInfo.memberName;
					}

					if (memberInfo.aBirthTime == null || memberInfo.aBirthTime == '') {
						this.timeInputValue = '未选择日期';
					} else {
						this.timeInputValue = memberInfo.aBirthTime.substring(0, 11);
					}
					
					if (memberInfoAddressManage.length == 0 || memberInfoAddressManage[0].areaId == null) {
						this.ssq = '未选择省市区';
						this.detailedAddress = '未填写';
					} else {
						
						this.areaId = memberInfoAddressManage[0].areaId;
						this.ssq = memberInfoAddressManage[0].detailedAddress;
						this.detailedAddress = memberInfoAddressManage[0].detailedAddress;
						
					}

					if (memberInfo.sex == 1) {
						this.sex = '1';
						this.ava = require('../../assets/user/man.png');
					} else {
						this.sex = '0';
						this.ava = require('../../assets/user/woman.png');
					}

					this.isMarriage = memberInfo.isMarriage + '';

					if (memberInfo.theAlias == '' || memberInfo.theAlias == null) {
						this.theAlias = '未填写';
					} else {
						this.theAlias = memberInfo.theAlias;
					}
					if (memberInfo.formerName == '' || memberInfo.formerName == null) {
						this.formerName = '未填写';
					} else {
						this.formerName = memberInfo.formerName;
					}

					if (memberInfo.wordsSuchAs == '' || memberInfo.wordsSuchAs == null) {
						this.wordsSuchAs = '未填写';
					} else {
						this.wordsSuchAs = memberInfo.wordsSuchAs;
					}

					if (memberInfo.nationality == '' || memberInfo.nationality == null) {
						this.nationality = '未填写';
					} else {
						this.nationality = memberInfo.nationality;
					}

					if (memberInfo.tpMzInfoId == null) {
						this.mz_name = '未选择民族';
					} 
						this.getMzList(memberInfo.tpMzInfoId);
					
				});
		},

		//获取民族信息
		async getMzList(tpMzInfoId) {
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
							if(tpMzInfoId == item.id){
								this.mz_name = item.name;
							}
						});
					} else {
						let info = res.message;
						this.$toast(info);
					}
				});
		},

		//用户修改资料保存
		async saveUserInfo() {
			if (this.surnames.trim() == '') {
				this.$toast('请输入您的姓氏');
				return false;
			}
			
			if (this.memberName.trim() == '') {
				this.$toast('请输入您的姓名');
				return false;
			}

			if (this.timeInputValue.trim() == '') {
				this.$toast('请输入您的出生日期');
				return false;
			}
			if(this.fileLists.length == 0){
				this.$toast('请上传会员头像');
				return false;
			}
			if (this.detailedAddress.trim() == '') {
				this.$toast('请输入您的详细地址');
				return false;
			}else{
				this.detailedAddress = this.ssq + this.stripscript(this.detailedAddress.trim());
			}

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
			
			//构建form表单参数
			// this.formData.append('id', this.memberInfo.id);
			// this.formData.append('memberName', this.memberName.trim());
			// this.formData.append('sex', parseInt(this.sex));
			// this.formData.append('surnames', this.surnames.trim());
			// this.formData.append('theAlias', this.theAlias.trim());
			// this.formData.append('formerName', this.formerName.trim());
			// this.formData.append('isMarriage', parseInt(this.isMarriage));
			// this.formData.append('wordsSuchAs', this.wordsSuchAs.trim());
			// this.formData.append('aBirthTimes', this.timeValue + ' 00:00:00');
			// this.formData.append('nationality', this.nationality.trim());

			// this.formData.append('tpMzInfoId', this.tpMzInfoId);
			// this.formData.append('areaId', this.areaId);
			// this.formData.append('detailedAddress', this.detailedAddress.trim());
			
			//拼接参数
			let params = new Object();
			params.type = this.type;
			params.memberInfoId = this.memberInfo.id;
			params.memberInfo = {
					memberHeadPortrait: this.fileLists.map(item => item).join(""),//会员头像
					backgroundChart: this.bgLists.map(item => item).join(""),//会员头像
					memberName: this.memberName.trim(), //族人姓名
					// phone: '', //电话
					sex: parseInt(this.sex),//性别
					surnames: this.surnames.trim(), //姓氏
					aBirthTime: this.timeInputValue.trim(),//出生日期
					
					theAlias: this.theAlias.trim(),//别名
					formerName: this.formerName.trim(),//曾用名
					wordsSuchAs: this.wordsSuchAs.trim(), //子辈
						
					isMarriage: '', //婚姻状态
					isLiving: '', //是否在世
					
					nationality: this.nationality.trim(),//国籍
					tpMzId:0,//民族id
					
					birthDetailedAddress: this.birthplace.trim(), //出生地
					detailedAddress: this.stripscript(this.detailedAddress.trim()) //详细地址
					
				};
				params.memberInfoAddressManage = {
						//区域id
						areaId: this.areaId,
						//省市区
						provinceAndCity:this.provinceAndCity,
						//详细地址
						detailedAddress: this.stripscript(this.detailedAddress.trim())
						
				};
			
			//构建参数
			this.params.append('jsonObj',JSON.stringify(params));
			console.log(this.params)
			console.log(params,'<-----this params');
//			{
//  "type":"1:长辈 2：妻子 3:子女",
//  "memberInfoId":"当前登录会员ID",
//  "memberInfo":{
//      "memberName":"会员姓名",
//      "phone":"会员电话",
//      "sex":"性别 0女 1男",
//      "surnames":"姓氏",
//      "memberHeadPortrait":"会员头像",
//      "backgroundChart":"会员背景图",
//      "theAlias":"别名",
//      "formerName":"曾用名",
//      "isMarriage":"0:已婚 -1未婚",
//      "isLiving":"是否在世 0:在世 ,-1去世",
//      "wordsSuchAs":"字辈",
//      "aBirthTime":"出身日期",
//      "nationality":"国籍",
//      "deathTime":"去世日期",
//      "deathLocation":"逝世地点",
//      "burialSite":"安葬地点",
//      "tpMzId":"名族表ID",
//      "birthDetailedAddress":"出生地址 （字符串）",
//      "detailedAddress":"现居地址（字符串）"
//  },
//  "memberInfoAddressManage":{
//      "areaId":"地址ID",
//      "detailedAddress":"详细地址",
//      "provinceAndCity":"省市区"
//  },
//  "memberSpecialSituationInfo":{
//      "memberInfoIdS":"祧 会员ID",
//      "address":"出地址",
//      "InAddress":"入地址",
//      "memberSpecialSituationTypeId":"特殊情况类型信息数据表ID"
//  }
//}
			this.$axios.post('/member-server/vmall/memberRepairSpectrum/repairSpectrum' ,this.params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				})
				.then(res => {
					
					console.log(res);
					if (res.data.status == '200') {
						
						Dialog.confirm({
							// title: '标题',
							message: '恭喜您，用户资料保存成功！'
						})
							.then(() => {
								this.$router.push('/setspectrum');
								// on confirm
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
		
		// 过滤所有特殊字符
		stripscript(s) {
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]");
			var rs = '';
			for (var i = 0; i < s.length; i++) {
				rs = rs + s.substr(i, 1).replace(pattern, '');
			}
			return rs;
		}
	
	}
};
</script>

<style scoped="scoped">
body {
	background-color: #ccc;
}
.user {
	margin: 20px 10px 10px 10px;
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
	line-height: 40px;
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
}
</style>
