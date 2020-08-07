<template>
	<div class="detail_wrapper">
		<m-header :mTitle="title"></m-header>
		<div class="detail_cont">
			<!--<div class="title">标题</div>
			<div class="info">
				<span class="type">{{title}}</span>
				<span class="time">2020-07-24</span>
				<span>浏览量：215次</span>
			</div>-->
			<span v-if="!id">暂无详情</span>
			<img :src="img"/>
		</div>
		<div class="handle">
			<div @click="showShare = true" class="handle_item">
				<div class="icon">
					<van-icon name="share" />
				</div>
				<div class="text">分享文章</div>
			</div>
			<div class="handle_item">
				<div class="icon">
					<van-icon name="gold-coin" />
				</div>
				<div class="text">打赏</div>
			</div>
		</div>
		<m-share @on-change="shareChange" :show-share='showShare'></m-share>
	</div>
</template>

<script>
	import mHeader from '../../components/common/m-header';
	import mShare from "@/components/share"
	export default {
		components: {
			mHeader,
			mShare
		},
		data() {
			return {
				showShare: false,
				title: this.$route.query.title,
				id: this.$route.query.id,
				img: ''
			}
		},
		mounted() {
			if(this.id){
				this.img = require(`../../assets/detail/${this.id}.jpg`)
			}
		},
		methods: {
			shareChange(val) {
				this.showShare = val;
			}
		}
	}
</script>

<style scoped lang="less">
	.detail_wrapper{
		padding-bottom: 60px;
		.handle{
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			background: rgba(255, 255, 255, .7);
			color: #000;
			.handle_item{
				flex: 1;
				padding: 10px 0;
				.van-icon{
					font-size: 16px;
				}
			}
		}
		.detail_cont{
			padding: 0 10px;
			padding-top: 30px;
			img{
				width: 100%;
			}
			.title{
				text-align: left;
				font-size: 16px;
				color: #000000;
				font-weight: 700;
			}
			.info{
				text-align: left;
				color: #CCCCCC;
				span{
					padding: 0 10px;
					position: relative;
					&::after{
						content: "";
						position: absolute;
						right: 0px;
						width: 1px;
						height: 80%;
						top: 0;
						bottom: 0;
						margin: auto 0;
						background: #CCCCCC;
					}
				}
				span:first-child{
					padding-left: 0;
				}
				span:last-child{
					padding-right: 0;
				}
			}
		}
	}
	
</style>