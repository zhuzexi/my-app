<template>
	<div class="formbg">
		
		<!-- <m-header :mTitle="'查看' + role + '信息'"></m-header> -->
		<m-header :mTitle="'族人信息'"></m-header>
		
		<van-cell-group>
			<van-image class="user" width="100" height="100" lazy-load :src="ava" />
		</van-cell-group>

		<van-field disabled v-model="surnames" name="姓氏" label="姓氏" />

		<van-field disabled v-model="memberName" name="姓名" label="姓名" />

		<van-field disabled v-model="aBirthTimes" name="出生日期" label="出生日期" />

		<van-field disabled v-model="detailedAddress" name="详细地址" label="详细地址" />

		<van-field disabled v-model="sex" name="性别" label="性别" />

		<van-field disabled v-model="isMarriage" name="婚姻状态" label="婚姻状态" />

		<van-field disabled v-model="theAlias" name="别名" label="别名" />

		<van-field disabled v-model="formerName" name="曾用名" label="曾用名" />

		<van-field disabled v-model="wordsSuchAs" name="字辈" label="字辈" />

		<van-field disabled v-model="nationality" name="国籍" label="国籍" />

		<van-field disabled v-model="mz_name" name="民族" label="民族" />
		
		<div style="width: 100%; height: 25px;"></div>
	</div>
</template>

<script>
import mHeader from '../../components/common/m-header';
import { Indicator, Toast } from 'mint-ui';
import { Area, Popup, Dialog } from 'vant';
export default {
	components: {
		mHeader
	},
	data() {
		return {
			
			id: this.$route.query.id,//路由传参
			role: this.$route.query.role,
			
			ava:'',//头像

			memberName: '', //姓名
			surnames: '', //姓氏
			formerName: '', //曾用名
			aBirthTimes: '', //生日
			sex: '', //性别

			timeValue: '', //生日
			theAlias: '', //别名
			isMarriage: '', //婚姻状态
			wordsSuchAs: '', //子辈
			nationality: '', //国籍
			mz_name: '', //民族名称
			detailedAddress: '', //详细地址

			memberInfo: JSON.parse(localStorage.getItem('memberInfo')),
			memberKey: JSON.parse(localStorage.getItem('memberKey'))
		};
	},
	mounted() {
		this.selectElderInfo();
	},
	methods: {
		
		//查询族人信息
		async selectElderInfo() {
			
			//拼接参数
			let params = '?id=' + this.id;

			//接口调用
			this.$axios.get('/member-server/vmall/memberRepairSpectrum/selectByRepairSpectrum' + params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				}).then(res => {
					
					const memberInfo = res.data.data.memberInfo;
					
					const memberInfoAddressManage = res.data.data.memberInfoAddressManage;
					
					console.log(res, '<res');
					
					if(memberInfo.surnames == '' || memberInfo.surnames == null){
						this.surnames = '未填写'
					}else{
						this.surnames = memberInfo.surnames;
					}
					
					if(memberInfo.memberName == '' || memberInfo.memberName == null){
						this.memberName = '未填写'
					}else{
						this.memberName = memberInfo.memberName;
					}
					
					if(memberInfo.aBirthTime == '' || memberInfo.aBirthTime == null){
						this.aBirthTimes = '未填写'
					}else{
						this.aBirthTimes = memberInfo.aBirthTime.substring(0,11);
					}
					
					if(memberInfoAddressManage.length == 0){
						this.detailedAddress = '未填写';
					}else{
						this.detailedAddress = memberInfoAddressManage[0].detailedAddress;
					}
					
					if(memberInfo.sex == 1){
						this.sex = '男';
						this.ava = require('../../assets/user/man.png');
					}else{
						this.sex = '女';
						this.ava = require('../../assets/user/woman.png');
					}
					
					if(memberInfo.isMarriage == 1){
						this.isMarriage = '已婚';
					}else{
						this.isMarriage = '未婚';
					}
					
					if(memberInfo.theAlias == '' || memberInfo.theAlias == null){
						this.theAlias = '未填写'
					}else{
						this.theAlias = memberInfo.theAlias;
					}
					
					if(memberInfo.formerName == '' || memberInfo.formerName == null){
						this.formerName = '未填写'
					}else{
						this.formerName = memberInfo.formerName;
					}
					
					if(memberInfo.wordsSuchAs == '' || memberInfo.wordsSuchAs == null){
						this.wordsSuchAs = '未填写'
					}else{
						this.wordsSuchAs = memberInfo.wordsSuchAs;
					}
					
					if(memberInfo.nationality == '' || memberInfo.nationality == null){
						this.nationality = '未填写'
					}else{
						this.nationality = memberInfo.nationality;
					}
					
					if(memberInfo.tpMzInfoId == null){
						this.mz_name = '未填写'
					}else{
						this.getMzList(memberInfo.tpMzInfoId);
					}
						
				});
		},
		
		//获取民族信息
		async getMzList(tpMzInfoId) {
			//拼接参数
			let params = '?pageSize=100';
			//接口调用
			this.$axios.get('/system-server/vmall/tpMz/list' + params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				}).then(res => {
					
					let List = res.data.data.list;
					
					// console.log(List,'<-----info');
					
					if (res.status == '200') {
						List.forEach(item => {
							// this.mz.push(item);
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
		
	
	}
};
</script>

<style scoped="scoped">
.user{
	margin: 20px 10px 10px 10px;
}
.input{
	width: 48%;
}	
/deep/ .van-field__control{
	color:#333;
}
/deep/ .van-radio__icon--checked .van-icon {
	background-color: #ee0a24;
	border-color: #ee0a24;
}
/deep/ .van-cell {
	/* border-bottom: 1px dashed #ccc!important; */
	color:#333;
	padding: 10px 16px;
	line-height: 36.5px;
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
</style>
