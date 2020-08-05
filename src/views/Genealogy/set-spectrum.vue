<template>
	<div>
		<m-header :mTitle="'我要修谱'" :share="true"></m-header>
		<van-divider class="user_divider">
			<div class="user_divider_div">
				我要修谱 
				<van-icon v-if="roleType == 1" @click="isUserManual = true" class="user_manual" name="fail" />
			</div>
		</van-divider>
		<van-tabs v-model="activeName" type="card">
			<van-tab title="吊线图" name="a" style="background: #e8e4d8;">
				<div id="TreeChart" style="overflow-x:auto; overflow-y:auto; height: 420px; margin-top: 25px; position: relative; width: 100%;">
					<TreeChart :json="data" @click-node="clickNode" :style="{ transform: 'scale(' + multiples + ')', transformOrigin: 'top left' }" />
				</div>
			</van-tab>
			<van-tab title="直系图" name="b">
				<ul class="list">
					<li class="list_item" v-for="item in tableDatas" :key="item.name + item.index">
						<div class="title">第{{item.index}}代：</div>
						<div class="cont">
							<div class="name">{{item.name}}（{{item.role}}）</div>
							<div class="desc" v-if="item.mate">配偶：{{item.mate}}</div>
						</div>
					</li>
				</ul>
			</van-tab>
			 <van-tab title="世系图" name="c">
			 	<div class="book">
			 		<img src="../../assets/index.jpg"/>
			 		<van-button @click="toBook">查看谱书</van-button>
			 	</div>
			 </van-tab> 
		</van-tabs>
		
		<van-popup class="userManual_popup" v-model="isUserManual" closeable close-icon="close" position="bottom" :style="{'min-height': '100%', padding:'5% 0'}">
			<userManual />
		</van-popup>
		<!--操作弹出层-->
		<van-overlay class="handle_wrapper" :show="handleModal" @click="handleModalClick">
		  	<div class="wrapper" @click.stop v-show="isHandle">
		    	<div class="detail item" @click="editOrDetailClcik('detail')">
		    		<div class="icon">
		    			<van-icon name="manager" />
		    		</div>
		    		<div class="text">查看<br />详情</div>
		    	</div>
		    	<div @click="addFamily" class="add item" :class="{'addActive': !addActive}">
		    		<div class="icon">
		    			<van-icon name="plus" />
		    		</div>
		    		<div class="text">添加<br />亲属</div>
		    	</div>
		    	<div class="edit item" @click="editOrDetailClcik('edit')" :class="{'addActive': !addActive}">
		    		<div class="icon">
		    			<van-icon name="edit" />
		    		</div>
		    		<div class="text">编辑<br />资料</div>
		    	</div>
		  	</div>
		  	<div class="wrapper wrapper1" v-show="!isHandle" @click.stop>
		  		<div class="item_wrap" :class="{'active': nodeData.role != '本人' || codeList.indexOf(0) != -1}">
		  			<div @click="addLine('父亲')" class="item">父亲</div>
		  		</div>
		    	<div class="hang">
		    		<div class="item_wrap" :class="{'active': nodeData.role != '本人' && nodeData.role != '配偶'}">
		    			<div @click.stop="addLine('子女')" class="item" >子女</div>
		    		</div>
					<div class="item_wrap">
						<div class="add_icon item"><van-icon name="plus" /></div>
					</div>
		    		<div class="item_wrap" :class="{'active': nodeData.role != '本人' && nodeData.role != '父亲'}">
		    			<div  @click.stop="addLine('配偶')"  class="item" >配偶</div>
		    		</div>
		    	</div>
		  	</div>
		</van-overlay>
	</div>
</template>

<script>
import { Tab, Tabs, Divider, Button, TreeSelect, Notify, List } from 'vant';
import mHeader from '../../components/common/m-header';
import TreeChart from "@/components/TreeChart";
//import TreeChart from '../../components/common/TreeChart.vue';
import organization from './organization.vue'
import userManual from './user-manual.vue'
import { genealogy as net } from "@/api"
export default {
	components: {
		mHeader,
		TreeChart,
		organization,
		userManual
		// VueDragResize
	},
	data() {
		return {
			isHandle: true,
			handleModal: false,
			isUserManual: false,
			tableDatas: [],
			cf_id:0,
			role:'',//角色
			showMenu: false,//自己
			showMenuOther:false,//其他人
			
			showAddMenu:false,//添加菜单
			showUpdateMenu:false,//编辑菜单
			
			showConfirmButton:false,
			
			width: document.body.clientWidth,
			fullscreen: false,
			multiples: 1,
			activeName: 'a',
			user_memberInfoId: JSON.parse(localStorage.getItem('memberKey')).memberInfoId,
			user_node_id: '',
			memberInfo: JSON.parse(localStorage.getItem('memberInfo')),
			memberKey: JSON.parse(localStorage.getItem('memberKey')),
			roleType: JSON.parse(JSON.parse(window.localStorage.getItem("memberKey")).memberListAll).type,
//			roleType: 1,
			datadx: {
				memberName: '吊线图',
				image_url: require('../../assets/dxt/timg.jpg'),
				children: []
			},
			data: {},
			node_id: "",
			nodeData: {},
			codeList: [],//返回的身份类型
			addActive: false
		};
	},
	mounted() {
		this.getLine(this.memberInfo.id);
	},
	methods: {
		toBook() {
			this.$router.push({path: "/book"});
		},
		addFamily() {
			if(this.addActive) this.isHandle = false;
		},
		addLine(type) {
			if(this.nodeData.role == '父亲' && type == "配偶") {
				this.$router.push({
					path: "/info",
					query: {
						type: "add",
						title: '添加' + type,
						role: type,
						nodeId: this.node_id,
						idType: "父亲"
					}
				})
			} else if (this.nodeData.role == '本人') {
				this.$router.push({
					path: "/info",
					query: {
						type: "add",
						title: '添加' + type,
						role: type,
						nodeId: this.node_id
					}
				})
				
			} else if (this.nodeData.role == '配偶' && type == '子女'){
				this.$router.push({
					path: "/info",
					query: {
						type: "add",
						title: '添加' + type,
						role: type,
						nodeId: this.nodeData.memberInfoId,
						mateId: this.node_id,
						mate: "配偶"
					}
				})
			}
//			父亲: this.nodeData.role ！= '本人' && this.codeList.indexOf(0) != -1
//			配偶: this.nodeData.role ！= '本人' && this.nodeData.role ！= '父亲'
//			子女: this.nodeData.role ！= '本人' && this.nodeData.role ！= '配偶'
//			this.nodeData.role == '父亲' 配偶可以点
//			this.nodeData.role == '本人' 父亲,配偶,子女
//			this.nodeData.role == '配偶' 子女
//			this.nodeData.role == '子女' 无
		},
		editOrDetailClcik(type) {
			let title = "";
			if(!this.addActive) {
				return false;
			}
			if(type == 'detail') title = "查看详情"
			else if(type == 'edit') title = "编辑信息"
			this.$router.push({
				path: "/info",
				query: {
					type,
					title,
					role: this.nodeData.role,
					nodeId: this.node_id
				}
			})
		},
		handleModalClick() {
			this.handleModal = false;
			setTimeout(() => this.isHandle = true, 1000)
		},
		clickNode: function(node) {
			this.nodeData = node;
			this.addActive = node.thisId == this.memberKey.memberInfoId;
//			this.handleModal = false;
			if(this.node_id != node.id) {
				if(node.role == '配偶') {
					//获取配偶数据
					this.getSpouseLine(node);
				} else {
					this.getLine(node.id);
				}
				this.node_id = node.id;
			} else {
				this.handleModal = true;
			}
		},
		//获取配偶的吊线图数据
		getSpouseLine(node) {
			this.$axios.get('/member-server/vmall/memberWifeRepairSpectrum/orgQueryMemberTree?id=' + node.id)
			.then(res => {
				let list = res.data.data;
				if (res.status == '200') {
					this.yz(list);
				} else {
					this.$toast(res.message);
				}
			})
			.catch(err => console.log(err))
		},
		showViewMenuInfo:function(){
			this.$router.push({
				path:'./v-father',
				query:{
					id:this.cf_id,
					role:this.role
			}});
		},
		showAddMenuInfo:function(){
			this.showAddMenu = true;
			this.showMenu = false;
		},
		showUpdateMenuInfo:function(){
			if(this.role){
				this.$router.push({
					path:'./u-father',
					query:{
						id:this.cf_id,
						role:this.role
				}});
			}else{
				this.$router.push({
					path: '/organization',
					query:{
						id:this.cf_id
					}
				})
			}
			
		},

		//获取吊线信息
		async getLine(id) {
			net.getLine(id)
				.then(res => {
					let list = res.data.data;
					if (res.status == '200') {
						this.yz(list);
					} else {
						this.$toast(res.message);
					}
				})
			//拼接参数
			//接口调用
			this.$axios
				.get('/member-server/vmall/memberRepairSpectrum/orgQueryMemberTree?id=' + id, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				})
				.then(res => {
					let list = res.data.data;
					if (res.status == '200') {
						this.yz(list);
					} else {
						this.$toast(res.message);
					}
				});
		},
		async yz(list) {
			//拼接参数
			let params = '?id=' + this.memberInfo.id;
			//接口调用
			this.$axios
				.get('/member-server/vmall/memberRepairSpectrum/wfpz' + params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				})
				.then(res1 => {
					if (res1.status == '200') {
						this.codeList = res1.data.data.map(item => item.code);
						let index = 0;
						let data = this.handleChild(list, res1.data.data, index, []);
						this.data = data.list[0];
						this.tableDatas = data.tableData.sort(function(a, b) {
							return a.index - b.index
						});
					} else {
						let info = res1.message;
						this.$toast(info);
					}
				});
		},
		handleChild(list, codeList, index, tableData) {
			var id = this.memberInfo.id;
			index++;
			list.forEach(item => {
				item.name = item.memberName;
				for(let i = 0; i < codeList.length; i++){
					item.image_url = require('../../assets/dxt/2.png');
					if(codeList[i].id == item.id && codeList[i].code == 0){//父亲
						item.role = '父亲';
					}
					if(codeList[i].id == item.id && codeList[i].code == 1){//本人
						item.role = '本人';
					}
					if (codeList[i].id == item.id && codeList[i].code == 3) {//子女
						item.role = '子女';
					}
					item.index = index;
				}
				if(item.mate && item.mate.length != 0) {
					item.mate = item.mate.map(items => {
						items.name = items.memberName;
						items.image_url = require('../../assets/dxt/1.png');
						items.role = '配偶';
						return items;
					});
				}
				tableData.push({
					index: index,
					role: item.role,
					name: item.memberName,
					mate: item.mate && item.mate.length != 0 ? item.mate.map(item => item.name).join(",") : ""
				});
				if(item.children && item.children.length){
					this.handleChild(item.children, codeList, index, tableData)
				}
			})
			return {list, tableData};
		},
		//添加配偶
		addInfo(type) {
			this.$router.push({path:'/spouse', query: {type}});
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
<style scoped lang="less">
	.book{
		padding-top: 15%;
		img{
			width: 150px;
			height: auto;
			display: block;
			margin: 20px auto;
		}
		button{
			background: #ee0a24;
			color: #fff;
			border-radius: 5px;
		}
	}
	.list{
		margin: 0 0.426667rem;
    	border-top: 1px solid #ccc;
    	margin-top: 10px;
	}
	.list li{
		display: flex;
		padding: 10px 0;
		border-bottom: 1px solid #ccc;
		text-align: left;
	}
	.list li .desc{
		padding-top: 10px;
	}
	.user_divider_div{
		position: relative;
	}
	.user_manual {
		position: absolute;
		width: 15px;
		height: 15px;
		border: 1px solid red;
		border-radius: 50%;
		top: 0;
		bottom: 0;
		right: -20px;
		margin: auto 0;
		color: red;
	}
/deep/ .van-popup{
	background: none;
}	
/deep/ .van-dialog{
	background: none;
	top:50%;
}	
/deep/ .avat {
	border-radius: 2.3em;
	border-width: 2px;
}
/deep/ .van-tab__pane {
	padding: 25px 20px;
}
/deep/ .van-tabs__content {
	padding: 5px 20px 25px 20px;
}
/deep/ .van-button {
	margin: 0 10px;
}
/deep/ .van-tabs__content{
	padding: 0;
}
/deep/ .van-tab__pane{
	padding: 0;
}
.vdr.active:before {
	outline: none;
}
.userManual_popup .van-icon{
	position: fixed;
	color: #000;
}
.handle_wrapper{
	display: flex;
	justify-content: center;
	align-items: center;
	.item_wrap{
		position: relative;
	}
	.wrapper{
		.item{
			background: #fff;
			width: 80px;
			padding-top: 10px;
			border-radius: 5px;
			margin: 0 auto;
			color: #c31a1f;
			position: relative;
			.icon{
				width: 1.5rem;
				height: 1.5rem;
				background: #c31a1f;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 auto;
				margin-bottom: 10px;
				.van-icon{
					font-size: 1rem;
					color: #fff;
				}
			}
			.text{
				border-top: 1px solid #ccc;
				padding: 5px 0;
				font-size: 16px;
    			letter-spacing: 4px;
			}
		}
		.detail{
			margin-bottom: 20px;
		}
		.addActive::after{
			content: "";
		    position: absolute;
		    width: 100%;
			height: 100%;
		    left: 0;
		    top: 0;
		    right: 0;
		    bottom: 0;
		    margin: auto;
		    background: rgba(0,0,0, .5);
		    border-radius: 5px;
		}
		.add,.edit{
			display: inline-block;
			margin: 0 20px;
		}
	}
	.wrapper1{
		.item{
			width: 52px;
			height: 52px;
			padding: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			letter-spacing: 4px;
			font-size: 16px;
			padding-left: 5px;
			box-sizing: border-box;
		}
		.active::after{
			content: "";
		    position: absolute;
		    width: 52px;
			height: 52px;
		    left: 0;
		    top: 0;
		    right: 0;
		    bottom: 0;
		    margin: auto;
		    background: rgba(0,0,0, .5);
		    border-radius: 5px;
		}
		.hang{
			display: flex;
			.item{
				margin: 30px 15px;
			}
			.add_icon{
				border-radius: 50%;
				background: #c31a1f;
			}
			.van-icon{
				font-size: 1rem;
				color: #fff;
			}
		}
	}
}
</style>
