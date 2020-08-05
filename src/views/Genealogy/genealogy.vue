<template>
	<div class="wrapper">
		<slider :imgUrl="headList"></slider>
		<ul class="menu">
			<li @click="handleClick(item)" v-for="(item, index) in menuList" :key="item.text + index">
				<div class="iconImg">
					<img :src="item.imgUrl" alt="" />
				</div>
				<div class="text">{{item.text}}</div>
			</li>
		</ul>
		<div class="news">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>族谱动态</span>
				<span style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;"  @click="toList()">更多>></span>
			</div>
			<div class="cont">
				<ul>
					<li class="zq-item" v-for="(item,index) in zqInfoList" @click="Detail(index)" :key="index">
						<span class="title">
							{{item.title}}
						</span>
						<span class="time">
							{{item.createTime}}
						</span>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="list zcList">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>何家宗祠</span>
				<span style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;">更多>></span>
			</div>
			<div class="cont">
				<ul>
					<li v-for="(item, index) in zcList" :key="item.text + index">
						<div class="img">
							<img :src="item.imgUrl"/>
						</div>
						<div class="text">{{item.text}}</div>
					</li>
					<!--<li>
						<div class="add">
							<van-icon name="add-o" />
						</div>
						<div class="text">添加</div>
					</li>-->
				</ul>
			</div>
		</div>
		
		<div class="list psList">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>谱书博物馆</span>
				<span style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;">更多>></span>
			</div>
			<div class="cont">
				<ul>
					<li v-for="(item, index) in psList" :key="item.text + index">
						<div class="img">
							<img :src="item.imgUrl"/>
						</div>
						<div class="text">{{item.text}}</div>
					</li>
					<!--<li class="center">
						<div class="add">
							<van-icon name="add-o" />
						</div>
						<div class="text">创建</div>
					</li>-->
				</ul>
			</div>
		</div>
		<div class="list">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>四和院修谱师</span>
				<span style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;">更多>></span>
			</div>
			<div class="cont">
				<ul>
					<li v-for="(item, index) in xpList" :key="item.name + index">
						<div class="img">
							<img :src="item.fileList"/>
						</div>
						<div class="text">{{item.name}}</div>
					</li>
					<li @click="addList" class="center">
						<div class="add">
							<van-icon name="add-o" />
						</div>
						<div class="text">添加</div>
					</li>
				</ul>
			</div>
		</div>
		<van-dialog v-model="addShow" title="添加四和院修谱师" :show-confirm-button="false">
			<!--<van-form @submit="onSubmit">-->
			<van-form>
			  	<van-field
			  		required
			    	v-model="addForm.name"
			    	name="姓名"
			    	label="姓名"
			    	placeholder="姓名"
			    	:rules="[{ required: true, message: '请填写姓名' }]"
			  	/>
			  	<van-field required name="uploader" label="上传头像">
					<template #input>
				    	<van-uploader v-model="fileList" :after-read="afterRead" />
					</template>
				</van-field>
				<van-button @click="addSure" round type="info" style="width: 75%; margin: 20px auto;">确定添加</van-button>
			</van-form>			
		</van-dialog>
	</div>
</template>

<script>
import slider from '../../components/common/slider';
import { Notify } from 'vant';
export default {
	components: {
		slider
	},
	data() {
		return {
			addShow: false,
			fileList: [],
			addForm: {
				name: "",
				fileList: ''
			},
			menuList: [
				{
					imgUrl: require('../../assets/img/zp_icon/xp.png'),
					text: "修谱",
					url: "/setspectrum"
				},
				{
					imgUrl: require('../../assets/img/zp_icon/ps.png'),
					text: "谱书",
					url: "/book",
				},
				{
					imgUrl: require('../../assets/img/zp_icon/zc.png'),
					text: "宗祠"
				},
				{
					imgUrl: require('../../assets/img/zp_icon/qxt.png'),
					text: "迁徙图"
				}
			],
			zcList: [
				{
					imgUrl: require('../../assets/img/zc/1.jpg'),
					text: "淳安何氏宗祠"
				},
				{
					imgUrl: require('../../assets/img/zc/2.jpg'),
					text: "番禺何氏祠堂"
				},
				{
					imgUrl: require('../../assets/img/zc/3.jpg'),
					text: "郭洞何氏宗祠"
				}
			],
			psList: [
				{
					imgUrl: require('../../assets/img/zp_icon/psimg.png'),
					text: "开阳支脉"
				},
				{
					imgUrl: require('../../assets/img/zp_icon/psimg.png'),
					text: "毕节支脉"
				}
			],
//			xpList: [
//				{
//					imgUrl: require('../../assets/img/zp_icon/img3.png'),
//					text: "何冰"
//				},
//				{
//					imgUrl: require('../../assets/img/zp_icon/img3.png'),
//					text: "何武"
//				}
//			],
			xpList: [],
			headList: [
				{
					imgUrl: require('../../assets/img/swiper/3/1.jpg'),
					categoryId: 100008
				},
				{
					imgUrl: require('../../assets/img/swiper/3/2.jpg'),
					categoryId: 100016
				},
				{
					imgUrl: require('../../assets/img/swiper/3/3.jpg'),
					categoryId: 100035
				}
			],
			memberKey: JSON.parse(localStorage.getItem('memberKey')),
			zqInfoList: []
		};
	},
	mounted() {
		let list = JSON.parse(window.localStorage.getItem("list"));
		this.xpList = list;
		//解决axios 中 then 内部不能使用Vue的实例化的this 的问题
		let self = this;

		let params = '?newsTypeId=1';
		this.$axios.get('company-server/vmall/news/queryNews' + params, {
				headers: {
					'content-type': 'application/json',
					memberAccessToken: this.memberKey.memberAccessToken
				}
		}).then(function(res) {
				if (res.status == '200') {
					//宗亲动态
					self.zqInfoList = [
						{
							title: '何**加入了何氏大家庭...',
							createTime: '2020-06-07'
						},
						{
							title: '何**加入了何氏大家庭...',
							createTime: '2020-06-07'
						},
						{
							title: '何**加入了何氏大家庭...',
							createTime: '2020-06-07'
						},
					];
				}
			});

		// console.log('--------------------------------------');
	},

	methods: {
		handleClick(item) {
			if(item.url){
				this.$router.push({path: item.url})
			}
		},
		toList(){
			this.$router.push('./setspectrum');
		},
		addList() {
			this.addShow = true;
		},
		afterRead(file) {
			this.addForm.fileList = file.content;
		},
		addSure() {
			if(!this.addForm.fileList || !this.addForm.name){
				Notify({ type: 'danger', message: '请填写内容或者上传图片!' });
				return false;
			}
			let list = JSON.parse(window.localStorage.getItem("list"));
			if(Array.isArray(list)){
				list.push(this.addForm);
			}else{
				list = [];
				list.push(this.addForm);
			}
			this.xpList = list;
			this.addShow = false;
			window.localStorage.setItem("list", JSON.stringify(list));
		}
	}
};
</script>

<style scoped>
.wrapper {
	width: 100%;
}
.news .tit, .list .tit{
	border-bottom: 1px solid #ccc; 
	/*color: #444;*/ 
	/*color: red;*/
	font-size: 16px; 
	font-weight: bold; 
	width: 100%; 
	height: 40px; 
	line-height: 40px; 
	text-align: left; 
	text-indent: 0.2rem;
}
.news .tit span:nth-child(2), .list .tit span:nth-child(2){
	color: rgb(195, 26, 31);
}

.news .cont, .list .cont{
	border-bottom: 1px solid #ccc;
	width: 100%;
	min-height: 100px;
}

.cont-bk{
	height: 190px!important;
	display: flex;
	justify-content: space-around;
}

.news .cont .xp-book{
	display: block; 
	position: relative; 
	top:20px;
	left: 20px;
	float: left;
}

.news .cont .xp-info{
	position: relative; 
	top:14px; 
	right: 25px; 
	width: 150px; 
	float: right;
}

.news .cont .xp-info p{
	line-height: 34px;
}
.red{
	color:#c31a1f;
}
.img-jj{
	display: inline-block;
	margin-top: 25px;
}
.img-jj img{
	border-radius: 10px;
}
.img-jj p{
	font-weight: bold;
	line-height: 30px;
}
.xp-info-1{
	color:#c31a1f;
	font-size: 16px;
	font-weight: bold;
}
.xp-info-2{
	color:#ccc;
}
.xp-info-3{
	color:#333;
	font-size: 14px;
	font-weight: bold;
}
.xp-info-4{
	display: block;
	font-size: 14px;
	font-weight: bold;
	line-height: 30px;
	position: relative;
	margin: 0 auto;
	text-align: center;
}
/* .xp-info-4{
	background-color:#c31a1f;
	border-radius: 10px;
	color:#fff;
	display: block;
	font-size: 14px;
	line-height: 30px;
	position: relative;
	margin: 0 auto;
	text-align: center;
	width: 60px;
} */
.culture{
	border-bottom: 1px solid #ccc;
	width: 100%;
	/* padding-top: 15px; */
	padding-bottom: 15px;
	overflow: hidden;
}
.culture .t{
	width: 55%;
	float: left;
	padding-left: 10px;
}
.culture .t p{
	text-align: left;
}
.t1,.t3{
	height: 36px;
	line-height:36px ;
}
.t1{
	font-size: 14px;
	font-weight: bold;
}
.culture .ima{
	width: 40%;
	padding-left: 1%;
	padding-right: 1%;
	float: right;
}
.culture .b{
	border-bottom: 1px solid #ccc;
	padding: 10px 0;
	overflow: hidden;
}

.news .cont ul{
	margin: 5px auto;
}
.news .cont ul li{
	font-size: 14px;
	font-weight: bold;
	height: 30px;
	line-height: 30px;
	text-align: left;
	text-indent: 0.5rem;
	width: 100%;
}
.news .cont ul li span.title{
	display: inline-block;
	float: left;
	width: 70%;
}
.news .cont ul li span.time{
	color: #999;
	display: inline-block;
	font-weight: normal;
	float: right;
	width: 30%;
}
.menu{
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	font-size: 14px;
	padding: 10px 0;
	border-bottom: 1px solid #000000;
}
.menu li{
	width: 25%;
	padding: 10px 0;
}
.menu li img{
	width: 50px;
	height: 50px;
}
.list .cont ul{
	display: flex;
	flex-wrap: wrap;
}
.list .cont ul li{
	width: 20%;
	padding: 10px 0;
}
.list .cont ul li img{
	width: 40px;
	height: 40px;
}
.list .cont ul li .add .van-icon{
	font-size: 40px;
	color: #883d45;
}
.list .cont ul li .text{
	padding-top: 5px;
}
.psList .cont ul li{
	width: 25%;
}
.psList .cont ul li img{
	width: 80%;
	height: auto;
}
.zcList .cont ul{
	justify-content: space-around;
}
.zcList .cont ul li{
	width: auto;
}
.zcList .cont ul li img{
	width: 80px;
	height: 100px;
}
.center{
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
