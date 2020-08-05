<template>
	<div>
		<m-header :mTitle="'个人中心'"></m-header>
		<div class="vipheader"></div>
		<div class="avatar">
			<div class="touxiang"><img src="../../assets/dxt/2.png" /></div>
			<div class="name">
				<div class="name_title">何金（<span style="color: red;">传承人</span>）</div>
				<div class="gztt">贡献值：358</div>
			</div>
			
		</div>
		<div class="my_menu">
			<div class="menu_item">
				<div class="menu_title">我的传承</div>
				<ul class="menu_list">
					<li @click="menuClick(item)" v-for="(item, index) in inherit" :key="item.text + index">
						<div class="icon">
							<img :src="item.iconImg" />
						</div>
						<div class="text text_red">{{item.text}}</div>
					</li>
				</ul>
			</div>
			<div class="menu_item">
				<div class="menu_title">推荐功能</div>
				<ul class="menu_list">
					<li @click="recommendClick(item)" v-for="(item, index) in recommend" :key="item.text + index">
						<div class="icon">
							<img :src="item.iconImg" />
						</div>
						<div class="text">{{item.text}}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Cell, CellGroup, Dialog } from 'vant';
import mHeader from '../../components/common/m-header';
import recommend_iconImg from '../../assets/img/myicon/my.png';
import recommend_iconImg1 from '../../assets/img/myicon/sc.png';
import recommend_iconImg2 from '../../assets/img/myicon/yh.png';
import recommend_iconImg3 from '../../assets/img/myicon/sr.png';
import recommend_iconImg4 from '../../assets/img/myicon/set.png';
import recommend_iconImg5 from '../../assets/img/myicon/file.png';
import recommend_iconImg6 from '../../assets/img/myicon/tc.png';

import service_iconImg from '../../assets/img/myicon/fb.png';
import service_iconImg1 from '../../assets/img/myicon/info.png';
import service_iconImg2 from '../../assets/img/myicon/dz.png';
import service_iconImg3 from '../../assets/img/myicon/xx.png';

import inherit_iconImg from '../../assets/img/myicon/xp.png';
import inherit_iconImg1 from '../../assets/img/myicon/bk.png';
import inherit_iconImg2 from '../../assets/img/myicon/cc.png';
import inherit_iconImg3 from '../../assets/img/myicon/cart.png';
export default {
	components: {
		mHeader
	},
	data() {
		return {
			inherit: [//我的传承
				{iconImg: inherit_iconImg,text: "我的修谱", url: '/setspectrum'},
				{iconImg: inherit_iconImg1,text: "我的帮困"},
				{iconImg: inherit_iconImg2,text: "我的传承"},
				{iconImg: inherit_iconImg3,text: "我的家用"}
			],
			//推荐功能
			recommend: [
				{iconImg: recommend_iconImg,text: "个人中心"},
				{iconImg: recommend_iconImg1,text: "我的收藏"},
				{iconImg: recommend_iconImg2,text: "我的优惠"},
//				{iconImg: recommend_iconImg3,text: "生辰八字"},
//				{iconImg: recommend_iconImg4,text: "我的设置"},
				{iconImg: recommend_iconImg5,text: "功能介绍"},
				{iconImg: recommend_iconImg4,text: "地址管理"},
				{iconImg: recommend_iconImg6,text: "退出登录"}
			],
			//我的服务
			service: [
				{iconImg: service_iconImg,text: "我的发布"},
				{iconImg: service_iconImg1,text: "我的评论"},
				{iconImg: service_iconImg2,text: "我的点赞"},
				{iconImg: service_iconImg3,text: "通知中心"}
			]
		};
	},
	mounted() {},
	methods: {
		recommendClick(item) {
			let memberKey = JSON.parse(window.localStorage.getItem('memberKey'));
			if(item.text == '退出登录') {
				Dialog.confirm({
					message: '是否要退出当前账号！！'
				})
				.then(() => {
					let params = new FormData();
					params.append("token", memberKey.memberAccessToken)
					this.$axios.post("/member-server/vmall/memberInfoLoginAndOut/out", params)
					.then(res => {
						localStorage.clear();
						this.$router.push("/login");
					})
				})
				
			}
		},
		menuClick(item) {
			if(item.url) {
				this.$router.push({path: item.url})
			}
		}
	}
	
};
</script>

<style scoped lang="less">
.avatar{
	padding: 20px;
	display: flex;
	align-items: center;
	text-align: left;
	img{
		width: 74px;
		height: 74px;
		border-radius: 50%;
	}
	.name{
		padding-left: 15px;
		.name_title{
			font-size: 20px;
		}
		.gztt{
			padding-top: 5px;
			font-weight: 700;
		}
	}
}
.fl {
	float: left;
}
.fr {
	float: right;
}
.icon-right {
	color: #dcdcdc;
	font-size: 18px;
	font-weight: bold;
	padding-right: 10px;
}
.vipheader {
	padding: 1em 1em 1em 1em;
	height: 165px;
	background: url(../../assets/my/avabg1.png);
	background-size: 100%;
}
.vipheader .touxiang {
	width: 90px;
	height: 90px;
	margin: 0px auto;
	border-radius: 100%;
	border: 2px solid #fff;
}
.vipheader .touxiang img {
	background-color: #fff;
	border-radius: 100%;
	width: 100%;
	height: 100%;
}
.vipheader .name {
	font-size: 1.4em;
	text-align: center;
	color: #fff;
	line-height: 2em;
}
.vipheader .gztt {
	background: #c31a1f;
	border: 1px solid rgba(255, 255, 255, 0.8);
	border-radius: 10px;
	font-size: 1em;
	text-align: center;
	color: #fff;
	padding: 5px;
	margin: 0 auto;
	width: 30%;
}
.vipsan {
	padding: 14px 0;
	background: #fff;
	border-bottom: 1px solid #ccc;
	overflow: auto;
	margin-bottom: 10px;
}

.news .tit {
	border-bottom: 1px solid #dcdcdc;
	color: #444;
	font-size: 16px;
	font-weight: bold;
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: left;
	text-indent: 0.2rem;
}
.news .cont {
	border-bottom: 1px solid #ccc;
	width: 100%;
	/* height: 155px; */
}
.news .cont ul {
	margin: 5px auto;
}
.news .cont ul li,.news .cont ul li .fl{
	box-sizing: border-box;
}
.news .cont ul li .fl:first-child{
	padding: 0 0.5rem;
}
.news .cont ul li {
	border-bottom: 1px solid #dcdcdc;
	font-size: 15px;
	padding: 5px 0;
	height: 36px;
	line-height: 36px;
	text-align: left;
	/*padding-left: 0.5rem;*/
	/*text-indent: 0.5rem;*/
	width: 100%;
	display: flex;
	justify-content: flex-start;
	&:active::before {
		.li-hover;
	}
}
.news .cont ul li .fl:nth-child(2){
	flex: 1;
}
.li-hover {
	background-color: #dcdcdc;
}
div,ul,li,span{
	box-sizing: border-box;
}
.menu_title{
	padding: 10px 0;
	padding-left: 15px;
	border-bottom: 1px solid;
	text-align: left;
	position: relative;
	&::after{
		content: "";
		width: 2px;
		height: 40%;
		background: #bd1a29;
		position: absolute;
		top: 0;
		left: 10px;
		bottom: 0;
		margin: auto 0;
	}
}
.menu_list{
	display: flex;
	flex-wrap: wrap;
	li{
		width: 25%;
		padding: 10px 0;
		img{
			width: 30px;
			height: 30px;
		}
		.text_red{
			color: red;
			font-size: 14px;
		}
	}
}
</style>
