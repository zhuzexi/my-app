<template>
	<div class="wrapper">
		<slider :imgUrl="headList"></slider>
		<div class="news">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>宗亲动态</span>
				<span style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;" @click="toList('zqInfoList', '宗亲动态')">更多>></span>
			</div>
			<div class="cont">
				<ul>
					<li class="zq-item" v-for="(item, index) in zqInfoList" @click="Detail(item, '宗亲动态')" :key="index">
						<span class="title">{{ item.title.substring(0, 16) + item.title.substring(16, 19).replace(item.title.substring(16, 19), '...') }}</span>
						<span class="time">{{ item.createTime.substr(0, 10) }}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="news">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>修谱动态</span>
				<span style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;">更多>></span>
			</div>
			<div class="cont">
				<img class="xp-book" src="../../assets/img/book.png" width="140" height="107" />

				<div class="xp-info">
					<p class="xp-info-1">何氏家谱</p>
					<p class="xp-info-2">系统创建</p>
					<p class="xp-info-3">已录入族谱数据</p>
					<p class="xp-info-4">
						<span class="red">{{xpListLength}}</span>
						条
					</p>
				</div>
			</div>
		</div>
		<div class="list">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>何家帮困</span>
				<span @click="toList('bkList', '帮困')" style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;">更多>></span>
			</div>
			<div class="cont">
				<ul>
					<li @click="Detail(item, '帮困')" v-for="(item, index) in bkList" :key="item.text + index">
						<div class="iconImg">
							<img :src="item.imgUrl" alt="" />
						</div>
						<div class="text">{{item.text}}</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="news">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>宗亲文化</span>
				<span @click="toList('whInfoList', '宗亲文化')" style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;">更多>></span>
			</div>
			<div class="culture">
				<div class="b" v-for="(item, index) in whInfoList" @click="Detail(item, '宗亲文化')" :key="index">
					<div class="t">
						<p class="t1">{{item.title}}</p>
						<p class="t2">{{item.newContent.substring(0,41) + item.title.substring(41, 44).replace(item.title.substring(40, 44), '...')}}</p>
						<p class="t3">
							<!-- <span>文化故事</span> -->
							<span>[ {{item.clickThroughRate}} ] <i style="color: #FF0000;">浏览量</i></span>
						</p>
					</div>
					<div class="ima">
						<img :src="item.imgUrl" width="80%" height="100" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import slider from '../../components/common/slider';
import { data as net } from "@/api"
//import {personal as net} from '../net'
// import { homeData } from '../../service/getData';
// import tabbar from '@/components/tabbar/tabbar.vue';
// import tabbar from '@/components/vant/tabbar.vue';
export default {
	name: 'home',
	data() {
		return {
			headList: [
				{
					imgUrl: require('../../assets/img/swiper/1/1.jpg'),
					categoryId: 100008
				},
				{
					imgUrl: require('../../assets/img/swiper/1/2.jpg'),
					categoryId: 100016
				},
				{
					imgUrl: require('../../assets/img/swiper/1/3.jpg'),
					categoryId: 100035
				},
				{
					imgUrl: require('../../assets/img/swiper/1/4.jpg'),
					categoryId: 100034
				}
			],
			zqInfoList: [{
				clickThroughRate: 126,
				createTime: "2020-07-22",
				id: 2,
				newContent: "廉江何氏宗亲总会成立 何汝均当选首任会长",
				title: "廉江何氏宗亲总会成立 何汝均当选首任会长",
			},{
				clickThroughRate: 167,
				createTime: "2020-07-20",
				id: 3,
				newContent: "深圳何氏秘书处举办培训活动",
				title: "深圳何氏秘书处举办培训活动",
			},{
				clickThroughRate: 127,
				createTime: "2020-07-20",
				id: 4,
				newContent: "何氏商盟广东交流会在大亚湾召开",
				title: "何氏商盟广东交流会在大亚湾召开",
			},
//			{
//				clickThroughRate: 173,
//				createTime: "2020-07-20",
////				id: 3,
//				newContent: "为人治学的楷模记郴州市委党校退休干部何明春",
//				title: "为人治学的楷模记郴州市委党校退休干部何明春",
//			},{
//				clickThroughRate: 110,
//				createTime: "2020-07-20",
////				id: 3,
//				newContent: "原农业部副部长何基沣",
//				title: "原农业部副部长何基沣",
//			},{
//				clickThroughRate: 104,
//				createTime: "2020-07-20",
////				id: 3,
//				newContent: "原全国政协副主席何长工",
//				title: "原全国政协副主席何长工",
//			}
			],
			xpInfoList: [],
			xpListLength:0,
			whInfoList: [{
				clickThroughRate: 233,
				createTime: "2020-06-22 15:04:11",
				id: 1,
				newContent: "1、出自姬姓。周五王之子封于韩，灭国。其后裔韩武子 (另一种说法是韩武子是晋同族曲沃恒叔后裔...)",
				title: "何氏起源",
				imgUrl: require('../../assets/bk/pic12.jpg')
			},{
				clickThroughRate: 233,
				createTime: "2020-07-24 15:04:11",
				id: 21,
				newContent: "老莱子至孝，奉二亲，极其甘脆，行年七十，言不称老。常着五色斑斓之衣，为婴儿戏于亲侧。又尝取水上堂，诈跌卧地，作婴儿啼，以娱亲意。",
				title: "二十四孝第二：戏彩娱亲",
				imgUrl: require('../../assets/bk/pic11.jpg')
			}],
			formData: new FormData(),
			memberKey: JSON.parse(localStorage.getItem('memberKey')),
			bkList: [
				{
					imgUrl: require('../../assets/bk/1.jpg'),
					text: "鳏寡孤独者，皆能善终",
					id: 32
				},
				{
					imgUrl: require('../../assets/bk/2.jpg'),
					text: "春雷计划他们想上学",
					id: 31
				}
			]
		};
	},
	mounted() {
//		net.getList()
//		.then(res => {
//			console.log('net', res)
//		})
//		.catch(err => console.log(err))
		// homeData().then(res => {
		// 	console.log(res, '<----000');
		// 	this.headList = res.data.headList;
		// });

		// console.log(this.memberKey.memberAccessToken);
		// console.log('--------------------------------------');

		//解决axios 中 then 内部不能使用Vue的实例化的this 的问题
		let self = this;

		// let params = '?newsTypeId=1';
		// this.$axios.get('company-server/vmall/news/queryNews' + params, {

		let params = '?type=1';
		this.$axios
			.get('/company-server/vmall/newsType/queryNewsType' + params, {
				headers: {
					'content-type': 'application/json',
					memberAccessToken: this.memberKey.memberAccessToken
				}
			})
			.then(function(res) {
				
				let zqList = res.data.data[0].news;
				let xpList = res.data.data[1].news;
				let whList = res.data.data[2].news;
				
				console.log(zqList);

				if (res.status == '200') {
					//轮播图
//					self.headList = [
//						{
//							imgUrl: require('../../assets/img/swiper/1/1.jpg'),
//							categoryId: 100008
//						},
//						{
//							imgUrl: require('../../assets/img/swiper/1/2.jpg'),
//							categoryId: 100016
//						},
//						{
//							imgUrl: require('../../assets/img/swiper/1/3.jpg'),
//							categoryId: 100035
//						},
//						{
//							imgUrl: require('../../assets/img/swiper/1/4.jpg'),
//							categoryId: 100034
//						}
//					];

					//宗亲动态
//					self.zqInfoList = zqList;
					
					//修谱动态
					self.xpInfoList = xpList;
					self.xpListLength = xpList.length;
					
					//宗亲文化
//					self.whInfoList = whList;
				}
			});

		// console.log('--------------------------------------');
	},

	methods: {
		toList(type, title){
			this.$router.push({
				path: './toList',
				query: {
					type,
					title
				}
			});
		},
		Detail(item, title) {
			this.$router.push({
				path: "/homedetail",
				query: {
					id: item.id,
					title: title
				}
			})
		},
	},
	components: {
		slider
	}
};
</script>

<style scoped>
.wrapper {
	width: 100%;
}
.news .tit, .list .tit {
	border-bottom: 1px solid #ccc;
	color: #444;
	font-size: 16px;
	font-weight: bold;
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: left;
	text-indent: 0.2rem;
}
.news .cont, .list .cont {
	border-bottom: 1px solid #ccc;
	width: 100%;
	min-height: 155px;
}
.news .tit span:nth-child(2), .list .tit span:nth-child(2){
	color: rgb(195, 26, 31);
}
.cont-bk {
	height: 190px !important;
	display: flex;
	justify-content: space-around;
}

.news .cont .xp-book {
	display: block;
	position: relative;
	top: 20px;
	left: 20px;
	float: left;
}

.news .cont .xp-info {
	position: relative;
	top: 14px;
	right: 25px;
	width: 150px;
	float: right;
}

.news .cont .xp-info p {
	line-height: 34px;
}
.red {
	color: #c31a1f;
}
.img-jj {
	display: inline-block;
	margin-top: 25px;
}
.img-jj img {
	border-radius: 10px;
}
.img-jj p {
	font-weight: bold;
	line-height: 30px;
}
.xp-info-1 {
	color: #c31a1f;
	font-size: 16px;
	font-weight: bold;
}
.xp-info-2 {
	color: #ccc;
}
.xp-info-3 {
	color: #333;
	font-size: 14px;
	font-weight: bold;
}
.xp-info-4 {
	display: block;
	font-size: 14px;
	font-weight: bold;
	line-height: 30px;
	position: relative;
	margin: 0 auto;
	text-align: center;
}
.culture {
	border-bottom: 1px solid #ccc;
	width: 100%;
	padding-bottom: 15px;
	overflow: hidden;
}
.culture .t {
	width: 55%;
	float: left;
	padding-left: 10px;
}
.culture .t p {
	text-align: left;
}
.t1,
.t3 {
	height: 36px;
	line-height: 36px;
}
.t1 {
	font-size: 14px;
	font-weight: bold;
}
.culture .ima {
	width: 40%;
	margin-top: 1%;
	padding-left: 1%;
	padding-right: 1%;
	float: right;
}
.culture .b {
	border-bottom: 1px solid #ccc;
	padding: 10px 0;
	overflow: hidden;
}

.news .cont ul {
	margin: 5px auto;
}
.news .cont ul li {
	font-size: 14px;
	font-weight: bold;
	height: 30px;
	line-height: 30px;
	text-align: left;
	text-indent: 0.5rem;
	width: 100%;
}
.news .cont ul li span.title {
	display: inline-block;
	float: left;
	width: 70%;
}
.news .cont ul li span.time {
	color: #999;
	display: inline-block;
	font-weight: normal;
	float: right;
	width: 30%;
}
.list ul{
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	font-size: 14px;
	padding: 10px 0;
}
.list .cont ul li{
	width: 45%;
}
.list ul li img{
	width: 100%;
	height: auto;
	border-radius: 10px;
	margin-bottom: 10px;
}
.list ul li .text{
	font-weight: 700;
}
</style>
