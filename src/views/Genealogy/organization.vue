<template>
	<div>
		<m-header v-if="noHeader" :mTitle="'组织修谱'"></m-header>
		<van-form>
			<van-popup v-model="policeShow" position="bottom" :overlay="true">
				<el-table :data="tableData" style="width: 100%;" row-key="id" border height="60vh" ref="multipleTable" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
					<el-table-column prop="memberName" label="姓名">
						<template slot-scope="scope">
							<span>{{scope.row.memberName}}</span>
							<van-field v-if="scope.row.index == 1" name="sex" style="width: 70%;padding-top: 0; float: right;">
								<template #input>
									<van-radio-group v-model="scope.row.code" direction="horizontal">
										<van-radio name="-1">下级</van-radio>
										<van-radio name="1">上级</van-radio>
									</van-radio-group>
								</template>
							</van-field>
						</template>
					</el-table-column>
				</el-table>
				<div @click="handleTableSelect" class="btn" style="width: 100%;padding: 10px 0;background: #fff;">
					<van-button round type="info" style="width: 80%;">确定</van-button>
				</div>
			</van-popup>
			<van-popup v-model="infoForm.cityVisable" position="bottom">
				<van-picker show-toolbar title="请选择地区" value-key="name" :columns="areaList" @change="onAreaChange" @cancel="onCancel" @confirm="onAreaConfirm" />
			</van-popup>
			<van-field required readonly clickable name="areaPicker" :value="infoForm.address" label="省市区" placeholder="请选择省市区" @click="showAreaPopup" />
			<van-field required v-model="infoForm.detailedAddress" name="详细地址" label="详细地址" />
			<van-button @click="handleAddress" round type="info" style="width: 80%">查询</van-button>
			<hr style="margin: 10px 0;height: 2px;background: #CCCCCC;" />
			<van-field required v-model="infoForm.surnames" name="姓氏" label="姓氏" placeholder="请填写姓氏" />
			<van-field v-model="infoForm.memberName" name="姓名" label="姓名" placeholder="请填写姓名" />
			<van-field v-model="infoForm.phone" name="手机号" label="手机号" placeholder="请填写手机号" />
			<van-field name="sex" label="性别">
				<template #input>
					<van-radio-group v-model="infoForm.sex" direction="horizontal">
						<van-radio name="1">男</van-radio>
						<van-radio name="0">女</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field v-model="infoForm.theAlias" name="别名" label="别名" placeholder="请填写别名" />
			<van-field v-model="infoForm.formerName" name="曾用名" label="曾用名" placeholder="请填写曾用名" />
			<van-field name="isMarriage" label="婚姻状态">
				<template #input>
					<van-radio-group v-model="infoForm.isMarriage" direction="horizontal">
						<van-radio name="-1">未婚</van-radio>
						<van-radio name="0">已婚</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field name="isMarriage" label="婚姻状态">
				<template #input>
					<van-radio-group v-model="infoForm.isLiving" direction="horizontal">
						<van-radio name="-1">去世</van-radio>
						<van-radio name="0">在世</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field v-model="infoForm.wordsSuchAs" name="字辈" label="字辈" placeholder="请填写字辈" />
			<van-field readonly clickable name="datetimePicker" :value="infoForm.aBirthTime" label="出生日期" placeholder="请选择出生日期" @click="showDatePopup(1)" />
			<van-field readonly clickable name="datetimePicker" :value="infoForm.deathTime" label="去世日期" placeholder="去世日期" @click="showDatePopup(2)" />
			<van-popup v-model="show_date" position="bottom">
				<van-datetime-picker v-model="infoForm.currentDate" type="date" title="请选择年月日" :loading="isLoadingShow" :min-date="infoForm.minDate" :max-date="infoForm.maxDate" @confirm="confirmPicker" @cancel="show_date = false" />
			</van-popup>
			<van-field v-model="infoForm.nationality" name="国籍" label="国籍" placeholder="请填写国籍" />
			<van-field v-model="infoForm.deathLocation" name="逝世地点" label="逝世地点" placeholder="请填写逝世地点" />
			<van-field v-model="infoForm.burialSite" name="安葬地点" label="安葬地点" placeholder="请填写安葬地点" />
			<van-field readonly clickable name="picker" :value="mz_name" label="民族" placeholder="点击选择民族" @click="showMzPopup" />
			<van-popup v-model="show_mz" position="bottom">
				<van-picker title="请选择民族" show-toolbar :columns="mz" @confirm="onMzConfirm" @cancel="onMzCancel" @change="onMzChange" />
			</van-popup>
			<van-button @click="saveUserInfo" round type="info" native-type="submit" style="width: 75%; margin: 20px auto;">确定添加</van-button>
		</van-form>
	</div>
	
	
</template>

<script>
	import { Tab, Tabs, Divider, Button, TreeSelect, Notify } from 'vant';
	import mHeader from '../../components/common/m-header';
	import TreeChart from '../../components/common/TreeChart.vue';
	export default {
		components: {
			mHeader,
			TreeChart
		},
		props: {
	      	getLine: {
	        	type: Function,
	        	default: null
	     	},
	     	noHeader : {
	     		type: Boolean,
	     		default: true
	     	},
	     	fun: {
	     		type: String,
	     		default: "edit"
	     	}
	  	},
		data() {
			return {
				tableData: [],
				tableDatas: [],
				selectData: [],
				policeShow: false,
				items: [],
				activeId: 1,
				activeIndex: 0,
				isLoadingShow: true,
				show_date: false,
				dateType: 1, //1出生日期，2去世日期
				infoForm: {
					currentDate: new Date(),
					cityVisable: false,
					address: '', //省市区地址
					detailedAddress: '', //详细地址
					minDate: new Date(1970, 0, 1), //最小时间
					maxDate: new Date(), //最大时间
					memberName: '', //姓名
					phone: '',
					sex: '', //性别
					surnames: '', //姓氏
					theAlias: '', //别名
					formerName: '', //"曾用名",
					isMarriage: '', //"0:已婚 -1未婚",
					isLiving: '', //"是否在世 0:在世 ,-1去世",
					wordsSuchAs: '', //"字辈",
					aBirthTime: '', //"出身日期",
					nationality: '', //:"国籍",
					deathTime: '', //"去世日期",
					deathLocation: '', //:"逝世地点",
					burialSite: '', //"安葬地点",
					tpMzId: '' //"名族表ID"
				},
				show_mz: false,
				mz: [], //民族Array
				mz_name: '', //民族名称
				tpMzInfoId: 1,
				areaList: [{
					values: []
				}, {
					values: []
				}, {
					values: []
				}], //自定义数据三级结构
				checkCity: '', //Picker拿到的值
				areaId: '', //省市区地址id
				addressId: '',
				memberInfo: JSON.parse(localStorage.getItem('memberInfo')),
				memberKey: JSON.parse(localStorage.getItem('memberKey')),
				detailId: this.$route.query.id
			}
		},
		mounted() {
			if(this.fun == 'edit'){
				this.getDetail();
			}
			this.getArea(100000,0); //渲染页面时请求第一层省级数据
		},
		methods: {
			//获取详情
			getDetail() {
				this.$axios.get("/member-server/vmall/memberRepairSpectrum/selectByRepairSpectrum", {
					headers: { 
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					},
					params: {id: this.detailId}
				})
				.then(({data}) => {
					if(data.status == 200){
						let {memberInfo, memberInfoAddressManage} = data.data;
						memberInfo.sex = memberInfo.sex + "";
						memberInfo.isMarriage = memberInfo.isMarriage + "";
						memberInfo.isLiving = memberInfo.isLiving + "";
						this.infoForm = Object.assign({}, this.infoForm, memberInfo);
						this.infoForm.address = memberInfoAddressManage[0].provinceAndCity;
						let detailedAddress = memberInfoAddressManage[0].detailedAddress.replace(memberInfoAddressManage[0].provinceAndCity , "");
						this.infoForm.detailedAddress = detailedAddress;
						this.addressId = memberInfoAddressManage[0].id;
						this.areaId = memberInfoAddressManage[0].areaId;
					}
				})
				.catch(err => console.log(err))
			},
			//组织修谱
			//用户修改资料保存
			async saveUserInfo() {
				let memberInfo = JSON.parse(JSON.stringify(this.infoForm))
				memberInfo.tpMzId = this.tpMzInfoId;
				memberInfo.aBirthTime = memberInfo.aBirthTime;
				memberInfo.deathTime = memberInfo.deathTime;
				delete memberInfo.cityVisable;
				delete memberInfo.address;
				delete memberInfo.detailedAddress;
				delete memberInfo.minDate;
				delete memberInfo.maxDate;
				delete memberInfo.currentDate;
				let memberInfoId = this.memberKey.memberInfoId;
				if(!this.infoForm.detailedAddress || !this.infoForm.address){
					Notify({ type: 'danger', message: '请选择地址' });
					return false;
				}
				if(!memberInfo.surnames){
					Notify({ type: 'danger', message: '请填写姓氏' });
					return false;
				}
				let memberInfoAddressManage = {
					areaId: this.areaId,
	        		detailedAddress: this.infoForm.address + this.stripscript(this.infoForm.detailedAddress.trim()),
	        		provinceAndCity: this.infoForm.address
				}
				if(this.fun == 'edit') {
					memberInfoAddressManage.id = this.addressId;
				}
				let memberInfoIdS = this.selectData;
				let jsonObj = {
					memberInfoId,
					memberInfoIdS,
					memberInfo,
					memberInfoAddressManage
				}
				let params = new FormData();
				params.append('jsonObj',JSON.stringify(jsonObj));
				if(this.fun == 'add') {
					this.saveAdd(params)
				}else {
					this.saveEdit(params)
				}
			},
			//保存添加
			saveEdit(params) {
				this.$axios.post('/member-server/vmall/memberOrganizationRepairSpectrum/upRepairSpectrum', params, {
						headers: { 
							'content-type': 'application/json',
							memberAccessToken: this.memberKey.memberAccessToken
						}
					})
					.then(res => {
						if (res.data.status == '200') {
							Notify({ type: 'danger', message: '修改成功' });
							setTimeout(() => {
								this.$router.push({path: "/setspectrum"});
							}, 1000)
//							this.getLine();
						} else {
							let info = res.data.message;
							this.$toast(info);
						}
					});
			},
			//保存添加
			saveAdd(params) {
				this.$axios.post('/member-server/vmall/memberOrganizationRepairSpectrum/repairSpectrum', params, {
						headers: { 
							'content-type': 'application/json',
							memberAccessToken: this.memberKey.memberAccessToken
						}
					})
					.then(res => {
						if (res.data.status == '200') {
							Notify({ type: 'danger', message: '添加成功' });
							this.getLine();
						} else {
							let info = res.data.message;
							this.$toast(info);
						}
					});
			},
			selectInit(row) {
				if(row.disabled){
	            	return false  //不可勾选
		        }else{    
		            return true  //可勾选
		        }
			},
			handleTableSelect() {
				this.tableData.forEach(item => {
					if(item.code){
						this.selectData.push({code: item.code, id: item.id})
					}
				});
				this.policeShow = false;
			},
			//点击取消
			onCancel() {
				this.cityVisable = false;
			},
			//当地区选择变化时
			onAreaChange(picker, values, index) {
				if (index < 2) {
					//传参 参数为上层选择的地区的code
					this.getArea(values[index].id, index + 1); 
				}
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
				this.infoForm.address = value.map(item => item.name).join("");
				this.areaId = value.map(item => item.id).join(",");
				this.infoForm.cityVisable = false;
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
				let time = `${year}-${month}-${day}`
				if(this.dateType == 1){
					this.infoForm.aBirthTime = time;
				}else {
					this.infoForm.deathTime = time;
				}
				
	//			this.infoForm.timeInputValue = ;
				this.show_date = false;
			},
			// 显示日期弹窗
			showDatePopup(type) {
				this.dateType = type;
				this.show_date = true;
				this.isLoadingShow = true;
				setTimeout(() => {
					this.isLoadingShow = false;
				}, 500);
			},
			// 显示省市区弹窗
			showAreaPopup() {
				this.infoForm.cityVisable = true;
				this.isLoadingShow = true;
				setTimeout(() => {
					this.isLoadingShow = false;
				}, 500);
			},
			//查询地址
			async handleAddress() {
				if(!this.infoForm.address || !this.infoForm.detailedAddress){
					Notify({ type: 'danger', message: '请填写省市区和详细地址' });
					return false;
				}
				//接口调用
				let params = {
					detailedAddress: this.infoForm.address + this.stripscript(this.infoForm.detailedAddress.trim())
				}
				this.$axios
					.post('/member-server/vmall/memberOrganizationRepairSpectrum/queryMemberInfoAndAddress?detailedAddress=' + params.detailedAddress,{}, {
						headers: {
							'content-type': 'application/json',
							memberAccessToken: this.memberKey.memberAccessToken
						}
					})
					.then(res => {
						if(res.data.status == '200'){
							let list = res.data.data;
							this.tableData = list.map(item => {
								item.index = 1;
								return item;
							});
							this.selectData = [];
							this.policeShow = true;
						}else{
							this.$toast(res.message);
						}
					})
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
			// 过滤所有特殊字符
			stripscript(s) {
				var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]");
				var rs = '';
				for (var i = 0; i < s.length; i++) {
					rs = rs + s.substr(i, 1).replace(pattern, '');
				}
				return rs;
			},
		}
	}
</script>

<style>

</style>