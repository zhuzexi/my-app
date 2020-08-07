<template>
	<div class="info_wrap">
		<m-header :mTitle="queryTitle"></m-header>
		<van-field name="uploader" label="上传头像">
			<template #input>
			    <van-uploader v-model="fileList" :after-read="afterRead" :disabled="queryType == 'detail' ? true : false" />
			</template>
		</van-field>
		<van-cell class="basicInfor" center title="基本资料">
		  	<template #right-icon>
		  		<span style="padding-right: 8px;">无历史资料或无法考证</span>
		    	<van-switch v-model="checked" size="16" />
		  	</template>
		</van-cell>
		
		<!--完整信息-->
		<van-form v-show="checked">
		  	<van-field
		  		required
		  		disabled
		    	v-model="infoForm.surnames"
		    	label="姓氏"
		    	placeholder="姓氏"
		    	:rules="[{ required: true, message: '请填写姓氏' }]"
		  	/>
		  	<van-field
		  		required
		    	v-model="infoForm.memberName"
		    	label="名字"
		    	placeholder="名字"
		    	:rules="[{ required: true, message: '请填写名字' }]"
		  	/>
		  	<van-field required label="在世">
				<template #input>
				    <van-radio-group v-model="infoForm.isLiving" direction="horizontal">
				      	<van-radio name="0">在世</van-radio>
				      	<van-radio name="-1">逝世</van-radio>
				    </van-radio-group>
				</template>
			</van-field>
			<div class="die_info" v-if="infoForm.isLiving == '-1'">
				<van-field 
					clickable 
					name="datetimePicker" 
					:value="infoForm.deathTime" 
					label="去世日期" 
					placeholder="请选择去世日期" 
					@click="timeClick('deathTime')" 
				/>
				<van-field v-model="infoForm.deathLocation" label="逝世地点" placeholder="逝世地点" />
				<van-field v-model="infoForm.burialSite" label="安葬地点" placeholder="安葬地点" />
			</div>
			<van-field label="排行" required>
			  	<template #input>
			    	<van-stepper v-model="infoForm.ranking" min="0" />
			  	</template>
			</van-field>
			<van-field v-model="infoForm.theAlias" label="别名" placeholder="别名" />
			<van-field v-model="infoForm.formerName" label="曾用名" placeholder="曾用名" />
			<van-field v-model="infoForm.wordsSuchAs" label="字辈" placeholder="字辈" />
			<van-field v-model="infoForm.nationality" label="国籍" placeholder="国籍" />
			<van-field name="radio" label="性别">
				<template #input>
				    <van-radio-group v-model="infoForm.sex" direction="horizontal">
				      	<van-radio name="1">男</van-radio>
				      	<van-radio name="0">女</van-radio>
				    </van-radio-group>
				</template>
			</van-field>
			<van-field 
				readonly 
				clickable 
				name="datetimePicker" 
				:value="infoForm.aBirthTime" 
				label="出生日期" 
				placeholder="请选择出生日期" 
				@click="timeClick('aBirthTime')" 
			/>
			<van-field @click="nationVisable = true"  v-model="mz" label="民族" placeholder="民族" />
			<van-field v-model="infoForm.password" label="婚姻">
				<template #input>
				    <van-radio-group v-model="infoForm.isMarriage" direction="horizontal">
				      	<van-radio name="0">已婚</van-radio>
				      	<van-radio name="-1">未婚</van-radio>
				    </van-radio-group>
				</template>
			</van-field>
			<van-field class="special" label="特殊情况">
				<template #input>
					<div class="special_radio">
						<div 
							v-for="item in special" 
							:key="item.typeName" 
							@click="specialClick(item)"
							:class="{'active': item.id == special_radio_active}" 
							class="special_radio_item"
						>
							{{item.typeName}}
						</div>
					</div>
				</template>
			</van-field>
		</van-form>
		<van-form v-if="specialStatus && special_radio_active != '0'">
			<van-field v-model="specialAddress.address" :label="specialLabel[0] + '到哪里？'" placeholder="请输入地址" />
			<van-field v-model="specialAddress.InAddress" :label="specialLabel[1] + '给了谁'" placeholder="请输入地址" />
		</van-form>
		<van-form v-if="!specialStatus && special_radio_active != '0'">
			<van-field
			    :label="specialLabel1 + '给了谁？'"
			    right-icon="search"
			    @click-right-icon="searchStatus = true"
			    placeholder="请选择"
			/>
		</van-form>
		<!--无历史资料或无法考证信息-->
		<van-form class="noInfo" v-show="!checked">
			<van-field
				v-model="noInfoForm.surname"
				disabled
		  		required
		    	label="姓氏"
		    	placeholder="姓氏"
		    	:rules="[{ required: true, message: '请填写姓氏' }]"
		  	/>
		  	<van-field
		  		v-model="noInfoForm.name"
		  		required
		    	label="名字"
		    	placeholder="名字"
		    	:rules="[{ required: true, message: '请填写名字' }]"
		  	/>
		  	<van-field label="排行" required>
			  	<template #input>
			    	<van-stepper v-model="noInfoForm.ranking" min="0" />
			  	</template>
			</van-field>
			<van-field required name="radio" label="性别">
				<template #input>
				    <van-radio-group v-model="noInfoForm.sex" direction="horizontal">
				      	<van-radio name="1">男</van-radio>
				      	<van-radio name="0">女</van-radio>
				    </van-radio-group>
				</template>
			</van-field>
		  	<van-field
		  		v-model="moreInfoForm.remarks"
				rows="4"
				autosize
				label="简介"
				type="textarea"
				placeholder="请输入个人生平经历"
			/>
		</van-form>
		<div v-if="checked">
			<van-cell class="basicInfor" center title="更多信息">
			  	<template #right-icon>
			    	<van-switch v-model="moreInfo" size="16" />
			  	</template>
			</van-cell>
			<van-form v-if="moreInfo">
				<div class="address" v-for="(item, index) in addressList" :key="index">
					<van-field readonly @click="handleAddress(index)" v-model="item.provinceAndCity" label="地址" placeholder="地址" />
					<van-field v-model="item.detailedAddress" label="详细地址" placeholder="详细地址" />
				</div>
				<van-button @click="addAddress" size="small" round block type="info" style="width: 50%; margin: 10px auto;">新增地址</van-button>
				<van-field v-model="moreInfoForm.word" label="字" placeholder="字" />
				<van-field v-model="moreInfoForm.number" label="号" placeholder="号" />
				<van-field v-model="moreInfoForm.phone" label="手机" placeholder="手机" />
				<van-field v-model="moreInfoForm.qq" label="QQ" placeholder="QQ" />
				<van-field v-model="moreInfoForm.mailbox" label="微信" placeholder="微信" />
				<van-field v-model="moreInfoForm.wx" label="邮箱" placeholder="邮箱" />
				<van-field
					v-model="moreInfoForm.briefIntroduction"
					rows="4"
					autosize
					label="简介"
					type="textarea"
					placeholder="请输入个人生平经历"
				/>
			</van-form>
		</div>
		<div style="margin: 16px;" v-if="queryType != 'detail'">
	    	<van-button @click="submitClick" round block type="info" native-type="submit">提交</van-button>
		</div>
		<!--时间-->
		<van-popup v-model="show_date" position="bottom">
			<van-datetime-picker
				v-model="currentDate"
				type="date"
				title="请选择年月日"
				:min-date="minDate"
				:max-date="maxDate"
				@confirm="confirmPicker"
				@cancel="show_date = false"
			/>
		</van-popup>
		<!--民族-->
		<van-popup v-model="nationVisable" position="bottom">
			<m-nation @on-sure="nationSure" @on-cancel="nationVisable = false"></m-nation>
		</van-popup>
		<!--地址-->
		<van-popup v-model="cityVisable" position="bottom">
			<m-address @on-sure="onSure" @on-cancel="cityVisable = false"></m-address>
		</van-popup>
		<!--搜索-->
		<van-dialog class="search_wrap" v-model="searchStatus" title="" :showConfirmButton='false' :showCancelButton="false">
			<div class="search_input">
				<van-field @click-left-icon="clickLeftIcon" clearable left-icon="search" placeholder="请输入名字" />
			</div>
			<div class="cont">
				
			</div>
		  	<div class="search_footer">
	    		<van-button @click="searchStatus = false">取消</van-button>
	    		<van-button @click="searchSureClcik">确定</van-button>
			</div>
		</van-dialog>
	</div>
</template>

<script>
	import { Notify, Dialog } from 'vant';
	import mHeader from '../../components/common/m-header';
	import mAddress from '../../components/address'
	import mNation from '../../components/mNation'
	export default {
		components: {
			mHeader,
			mAddress,
			mNation
		},
		data() {
			return {
				searchValue: "",
				memberInfo: JSON.parse(localStorage.getItem('memberKey')),
				searchStatus: false,
				specialAddress: {
					address: "",
					InAddress: ""
				},
				specialStatus: false,
				specialStatus1: true,
				specialLabel1: "",
				specialLabel: ["出继", "入继"],
				nationVisable: false,
				cityVisable: false,
				addressList: [{
					areaId: '', //区域id
					provinceAndCity: '',//省市区字符
					detailedAddress: '', //详细地址
				}],
				addressIndex: 0,//选择地址时，确定添加地址在数组的第几个
				moreInfo: false,
				show_date: false,
				minDate: new Date(1970, 0, 1), //最小时间
				maxDate: new Date(), //最大时间
				currentDate: new Date(), //获取当前时间
				timeInputValue: '',
				special: [],
				special_radio_active: "0",
				queryRole: this.$route.query.role,
				queryTitle: this.$route.query.title || "添加族人",
				queryType: this.$route.query.type,
				nodeId: this.$route.query.nodeId,
				mate: this.$route.query.mate,
				idType: this.$route.query.idType,
				mTitle: "添加族人",
				checked: true,
				fileList: [],
				mz: "",
				infoForm: {
					"id":"",//主键ID
			        "memberName":"",//会员姓名
			        "phone":"",//会员电话
			        "sex":"1",//性别 0女 1男
			        "surnames":"何",//姓氏
			        "memberHeadPortrait":"",//会员头像
			        "backgroundChart":"",//会员背景图
			        "theAlias":"",//别名
			        "formerName":"",//曾用名
			        "isMarriage":"-1",//0:已婚 -1未婚
			        "isLiving": "0",//是否在世 0:在世 ,-1：去世
			        "wordsSuchAs":"",//字辈
			        "aBirthTime":"",//出身日期
			        "nationality":"",//国籍
			        "deathTime":"",//去世日期
			        "deathLocation":"",//逝世地点
			        "burialSite":"",//安葬地点
			        "tpMzInfoId":"",//名族表ID
			        "ranking":"0"//排行
				},
				//更多信息
				moreInfoForm: {
					"id":"",//主键ID
			        "word":"",//字
			        "number":"",//号
			        "phone":"",//手机号
			        "qq":"",//QQ
			        "mailbox":"",//邮箱
			        "wx":"",//微信
			        "briefIntroduction":""//简介
				},
				//无历史资料或无法考证信息
				noInfoForm: {
					"surname":"何",//姓氏
			        "name":"",//名字
			        "sex":"1",//性别 0女 1男
			        "remarks":"",//备注
			        "ranking":""//排行
				},
				timeType: ""//时间类型，出生日期还是逝世日期
			}
		},
		mounted() {
			this.getType();
			if(this.queryType != 'add') {
				this.selectElderInfo();
			}
		},
		methods: {
			clickLeftIcon() {
				
			},
			//提价信息
			submitClick() {
				if(this.queryType == 'add') {
					this.addFamily();
				}
			},
			//添加人员
			submitClick() {
				if(this.checked) {
					if(!this.infoForm.memberName){
						Notify({ type: 'danger', message: '请填写名字' });
						return false;
					}
				} else {
					if(!this.noInfoForm.name){
						Notify({ type: 'danger', message: '请填写名字' });
						return false;
					}
				}
//				let memberInfoId = "";
//				if(this.idType == '父亲') {
//					memberInfoId = this.nodeId;
//				} else {
//					memberInfoId = this.memberInfo.memberInfoId
//				}
				let memberInfo = this.infoForm;
				if(this.queryType == 'add') {
					delete memberInfo['id'];
				}
				let memberNoInfo = this.noInfoForm;
				let memberMoreInfo = this.moreInfoForm;
				let memberInfoAddressManage = this.addressList;
				let memberSpecialSituationInfo = {
					memberInfoIdS: '',
					address: this.specialAddress.address,
					InAddress: this.specialAddress.InAddress,
					memberSpecialSituationTypeId: this.special_radio_active == '0' ? "" : this.special_radio_active
				}
				let title = this.queryRole;
				let type = "";
				switch (title){
					case "父亲":
						type = '1';
						break;
					case "配偶":
						type = '2';
						break;
					case "子女":
						type = '3';
						break;
					default:
						type = '4';
						break;
				};
				let jsonObj = {
					type,
					thisId: this.memberInfo.memberInfoId,
					treeId: this.nodeId,
					memberInfoId: this.memberInfo.memberInfoId,
					memberInfo,
					memberInfoAddressManage,
					memberSpecialSituationInfo,
					memberMoreInfo,
					memberNoInfo
				}
				let params = new FormData();
				params.append("jsonObj", JSON.stringify(jsonObj))
				if(this.queryType == 'add' && this.mate != '配偶') {
					this.addFamily(params);
				} else if (this.queryType == 'add' && this.mate == '配偶') {
					this.addSpouse();
				}
				else if(this.queryType == 'edit') {
					this.editFamily(params)
				}
			},
			//配偶添加人员（子女）
			addSpouse() {
				let memberInfoId = this.memberInfo.memberInfoId;
				let memberInfo = this.infoForm;
				if(this.queryType == 'add') {
					delete memberInfo['id'];
				}
				let memberNoInfo = this.noInfoForm;
				let memberMoreInfo = this.moreInfoForm;
				let memberInfoAddressManage = this.addressList;
				let memberSpecialSituationInfo = {
					memberInfoIdS: '',
					address: this.specialAddress.address,
					InAddress: this.specialAddress.InAddress,
					memberSpecialSituationTypeId: this.special_radio_active == '0' ? "" : this.special_radio_active
				}
				let jsonObj = {
					thisId: this.memberInfo.memberInfoId,
					memberInfoId: this.nodeId,
					treeId: this.nodeId,
					memberInfoWifeId: this.$route.query.mateId,
					memberInfo,
					memberInfoAddressManage,
					memberSpecialSituationInfo,
					memberMoreInfo,
					memberNoInfo
				}
				let params = new FormData();
				params.append("jsonObj", JSON.stringify(jsonObj));
				this.$axios.post("/member-server/vmall/memberWifeRepairSpectrum/repairSpectrum", params)
				.then(res => {
					if(res.data.status == 200) {
						Dialog.confirm({
							message: '添加成功！'
						})
						.then(() => {
							this.$router.push('/setspectrum');
						})
						.catch(() => {
							this.$toast(res.data.message);
						});
					}
				})
				.catch(err => this.$toast(err))
			},
			//除配偶外添加人员
			addFamily(params) {
				this.$axios.post("/member-server/vmall/memberRepairSpectrum/repairSpectrum", params)
				.then(res => {
					if(res.data.status == 200) {
						Dialog.confirm({
							message: '添加成功！'
						})
						.then(() => {
							this.$router.push('/setspectrum');
						})
						.catch(() => {
							this.$toast(res.data.message);
						});
					}
				})
				.catch(err => this.$toast(err))
			},
			//修改人员信息
			editFamily(params) {
				this.$axios.post("/member-server/vmall/memberRepairSpectrum/upRepairSpectrum", params)
				.then(res => {
					if(res.data.status == 200) {
						Dialog.confirm({
							message: '修改成功！'
						})
						.then(() => {
							this.$router.push('/setspectrum');
						})
						.catch(() => {
							this.$toast(res.data.message);
						});
					}
				})
				.catch(err => this.$toast(err))
			},
			searchSureClcik() {
				//
			},
			//弹出时间选择框
			timeClick(type) {
				this.show_date = true;
				this.timeType = type;
			},
			//获取信息详情
			selectElderInfo() {
				this.$axios.get('/member-server/vmall/memberRepairSpectrum/selectByRepairSpectrum?id=' + this.nodeId)
				.then(res => {
					if(res.data.status == 200) {
						let {
							memberInfo, //基本资料
							memberInfoAddressManage, //地址管理
							memberMoreInfo, //更多信息
							memberNoInfo, //无历史资料或无法考证
							memberSpecialSituationInfo //特殊情况
						} = res.data.data;
						//基本资料
						Object.keys(this.infoForm).forEach(item => {
							if(memberInfo[item] == null) memberInfo[item] = "";
							this.infoForm[item] = memberInfo[item] + "";
						});
//						this.infoFrom.memberHeadPortrait = 'http://api1.hejiawh.com/' + res.data.data[0];
						if(this.infoForm.memberHeadPortrait) {
							this.fileList = [{url: this.infoForm.memberHeadPortrait}];
						}
						//更多信息
						if(memberMoreInfo && memberMoreInfo.length) {
							Object.keys(this.moreInfoForm).forEach(item => {
								if(memberMoreInfo[0][item] == null) memberMoreInfo[0][item] = "";
								this.moreInfoForm[item] = memberMoreInfo[0][item] + "";
							});
						}
						//地址管理
						if(memberInfoAddressManage && memberInfoAddressManage.length){
							this.addressList = memberInfoAddressManage;
						};
						//无历史资料或无法考证
						this.noInfoForm.id = "";
						if(memberNoInfo && memberNoInfo.length) {
							Object.keys(this.noInfoForm).forEach(item => {
								if(memberNoInfo[0][item] == null) memberNoInfo[0][item] = "";
								this.noInfoForm[item] = memberNoInfo[0][item] + "";
							});
							this.noInfoForm.surname = "何"; 
						}
						//特殊情况
						if(memberSpecialSituationInfo.length == 0) return false;
						this.specialAddress.address = memberSpecialSituationInfo[0].address;
						this.specialAddress.InAddress = memberSpecialSituationInfo[0].InAddress;
						this.special_radio_active = memberSpecialSituationInfo[0].memberSpecialSituationTypeId 
													? memberSpecialSituationInfo[0].memberSpecialSituationTypeId
													: "0"
					
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			//民族确定
			nationSure(value) {
				this.infoForm.tpMzInfoId = value.id;
				this.mz = value.name;
				this.nationVisable = false;
			},
			//地址确定
			onSure(value) {
				this.cityVisable = false;
				this.addressList[this.addressIndex].areaId = value.map(item => item.id).join(",");
				this.addressList[this.addressIndex].provinceAndCity = value.map(item => item.name).join("");
			},
			handleAddress(index) {
				this.cityVisable = true;
				this.addressIndex = index;
			},
			//新增地址
			addAddress() {
				this.addressList.push({
					areaId: '', //区域id
					provinceAndCity: '',//省市区字符
					detailedAddress: '', //详细地址
				});
			},
			//上传头像
			afterRead(file) { 
	　　　		var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
			　　	formData.append('files', file.file); //接口需要传的参数
			　　	this.$axios.post('/file-server/file/multiUploadImg', formData)
				.then(res => {//将formDate文件上传到阿里云服务器，会返回图片地址
					if(res.data.status == 200){
						this.infoForm.memberHeadPortrait = 'http://api1.hejiawh.com/' + res.data.data[0];
						this.fileList = [{url: 'http://api1.hejiawh.com/' + res.data.data[0]}]
//						this.fileLists = res.data.data.map(item => {
//							return 'http://api1.hejiawh.com/' + item;
//						})
					}
			　　});
		    },
		    //特殊情况点击
		    specialClick(item) {
		    	this.special_radio_active = item.id;
		    	let list = ["出继", "入继", "招赘", "招赘", "孀赘"];
		    	let list1 = ["出嗣", '入嗣', '兼祧', '承祧'];
		    	if(item.typeName == "出继" || item.typeName == "入继"){
		    		this.specialLabel = ["出继", "入继"];
		    		this.specialStatus = true;
		    	}
		    	if(item.typeName == "招赘" || item.typeName == "招赘"){
		    		this.specialLabel = ["招赘", "招赘"];
		    		this.specialStatus = true;
		    	}
		    	if(item.typeName == "孀赘" || item.typeName == "孀赘"){
		    		this.specialLabel = ["孀赘", "孀赘"];
		    		this.specialStatus = true;
		    	}
		    	if(list1.indexOf(item.typeName) != -1){
		    		this.specialStatus = false;
		    		this.specialLabel1 = item.typeName;
		    	}
		    	
		    },
		    //时间点击确认
		    confirmPicker(val){
		    	let time = new Date(val).format('yyyy-MM-dd');
		    	if(this.timeType == 'aBirthTime') {
		    		this.infoForm.aBirthTime = time
		    	} else {
		    		this.infoForm.deathTime = time
		    	}
		    	this.show_date = false;
		    },
		    //查询特殊情况类型
		    getType() {
		    	this.$axios.get("/member-server/vmall/memberSpecialSituationType/list?sortKey=id&sortValue=asc")
		    	.then(res => {
		    		res.data.data.list.unshift({
		    			id: "0",
						typeName: "无"
		    		});
		    		this.special = res.data.data.list;
		    	})
		    	.catch(err => this.$toast(res.message))
		    	
		    }
		}
	}
</script>

<style lang="less" scoped>
	.info_wrap{
		.search_footer{
			border-top: 1px solid #ccc;
			display: flex;
			button{
				flex: 1;
				color: red;
				&:first-child{
					border-right: 1px solid #000;
				}
			}
		}
		.search_wrap .cont{
			height: 240px;
			background: #eaeaea;
		}
		.basicInfor{
			background: #eaeaea;
			/deep/ .van-cell__title{
				text-align: left;
			}
		}
		/deep/ .special {
			 .special_radio{
				display: flex;
				flex-wrap: wrap;
				.special_radio_item{
					width: 20%;
					text-align: center;
				}
				.special_radio_item.active{
					background: #e40c0c;
					color: #FFFFFF;
					border-radius: 15px;

				}
			}
		}
		.van-cell /deep/ textarea{
			height: 178px;
    		border: 1px solid #ccc;
    		border-radius: 5px;
    		padding: 5px;
		}
	}
	
</style>