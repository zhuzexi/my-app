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
		<!--<div class="ad">
			<div class="ad_title">公告</div>
			<div class="ad_cont">
				<span class="ad_text">2020.05.20版本更新介绍</span>
				<span class="ad_time">05/20 10:15</span>
				<span class="ad_icon">
					<van-icon name="arrow" />
				</span>
			</div>
		</div>-->
		<div class="new_wrap">
			<div class="title">何家新闻</div>
			<ul class="new_cont">
				<!--<li>
					<div class="text">
						<div class="new_title">中国有5600多个姓氏，只有这5个姓氏从未衰落，看看是你的姓吗？</div>
						<div class="info">
							<span class="time">刚刚</span>
							<span class="num">浏览</span>
						</div>
					</div>
					<div class="img"></div>
				</li>-->
				<li v-for="(item, index) in newList" :key="item.num + index">
					<div class="text">
						<div class="new_title">{{item.title}}</div>
						<div class="info">
							<span class="time">{{item.time}}</span>
							<span class="num">{{item.num}}浏览</span>
						</div>
					</div>
					<div v-if="item.imgUrl" class="img">
						<img :src="item.imgUrl" alt="" />
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import slider from '../../components/common/slider';
// import mui from 'static/js/mui';
export default {
	components: {
		slider,
	},
	data() {
		return {
			newList: [
				{
					imgUrl: require('../../assets/img/swiper/home1.jpg'),
					title: "中国有5600多个姓氏，只有这5个姓氏从未衰落，看看是你的姓吗？",
					time: "刚刚",
					num: "15"
				},
				{
					imgUrl: require('../../assets/img/swiper/home2.jpg'),
					title: "大型历史文化专题片《《中华姓氏文化与家风传承》》开机拍摄",
					time: "3小时前",
					num: "132"
				},
				{
					imgUrl: require('../../assets/img/swiper/home3.jpg'),
					title: "台湾青年文化范姜峰：我姓“范姜”，不姓“范”，两岸共同弘扬姓氏文化",
					time: "4小时前",
					num: "172"
				},
				{
					imgUrl: require('../../assets/img/swiper/home4.jpg'),
					title: "“家文化”如何为幸福加码，这个镇将推出这些活动",
					time: "昨天",
					num: "239"
				}
			],
			menuList: [
				{
					imgUrl: require('../../assets/img/circle_icon/sc.png'),
					text: "家用"
				},
				{
					imgUrl: require('../../assets/img/circle_icon/bk.png'),
					text: "帮困"
				},
				{
					imgUrl: require('../../assets/img/circle_icon/mrt.png'),
					text: "名人"
				},
				{
					imgUrl: require('../../assets/img/circle_icon/gdb.png'),
					text: "功德"
				},
				{
					imgUrl: require('../../assets/img/circle_icon/jp.png'),
					text: "祭拜"
				},
				{
					imgUrl: require('../../assets/img/circle_icon/xt.png'),
					text: "学堂"
				}
			],
			headList: [
						{
					imgUrl: require('../../assets/img/swiper/4/1.jpg'),
					categoryId: 100008
				},
				{
					imgUrl: require('../../assets/img/swiper/4/2.jpg'),
					categoryId: 100016
				},
				{
					imgUrl: require('../../assets/img/swiper/4/3.jpg'),
					categoryId: 100035
				},
				{
					imgUrl: require('../../assets/img/swiper/4/4.jpg'),
					categoryId: 100034
				}
			]
		};
	},
	mounted() {},
	methods: {
		handleClick(item) {
			if(item.text == "家用"){
				window.location.href = "http://test.guixing519.com";
			} else if(item.text == "帮困") {
				window.location.href = "http://help.guixing519.com/"
			} else if(item.text == "名人") {
				this.$router.push({
					path: "/imgindex",
					query: {
						id: 'pic2'
					}
				})
			} else if(item.text == "功德"){
				this.$router.push({
					path: "/contribute"
				})
			} else if(item.text == "祭拜") {
				this.$router.push({
					path: "/imgindex",
					query: {
						id: 'pic3'
					}
				})
			}else if(item.text == "学堂") {
				this.$router.push({
					path: "/imgindex",
					query: {
						id: 'pic4'
					}
				})
			}
//			window.location.href = "http://www.guixing519.com"
		}
	}
};
</script>

<style scoped="scoped" lang="less">
	.menu{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		font-size: 14px;
		padding: 10px 0;
	}
	.menu li{
		width: 30%;
		padding: 10px 0;
	}
	.menu li img{
		width: 40px;
		height: 40px;
	}
	.ad{
		display: flex;
		padding: 10px 0;
		border-top: 1px solid #979797;
		border-bottom: 1px solid #979797;
		.ad_title{
			width: 40px;
			border-right: 2px solid #af7880;
			font-weight: 700;
		}
		.ad_cont{
			flex: 1;
			display: flex;
			padding-left: 5px;
			.ad_text{
				font-weight: 700;
				flex: 1;
				text-align: left;
			}
			.ad_time{
				color: #ccc;
			}
			.van-icon{
				width: 20px;
				color: #ccc;
			}
		}
	}
	.new_wrap{
		.title{
			padding: 10px 0;
			padding-left: 15px;
			border-bottom: 1px solid;
			text-align: left;
			position: relative;
			font-weight: 700;
			font-size: 14px;
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
		.new_cont li{
			display: flex;
			padding: 15px 10px;
			text-align: left;
			.text{
				flex: 2;
				.new_title{
					font-size: 14px;
					padding-bottom: 10px;
					line-height: 24px;
					color: #000000;
				}
				.info{
					display: flex;
					justify-content: space-between;
					color: #CCCCCC;
				}
			}
			.img{
				flex: 1;
				padding-left: 10px;
				img{
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}
	}
	
</style>
