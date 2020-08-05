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
	</div>
</template>

<script>
	import mHeader from '../../components/common/m-header';
	export default {
		components: {
			mHeader
		},
		data() {
			return {
				title: this.$route.query.title,
				id: this.$route.query.id,
				img: ''
			}
		},
		mounted() {
			if(this.id){
				this.img = require(`../../assets/detail/${this.id}.jpg`)
			}
			
		}
	}
</script>

<style scoped lang="less">
	.detail_wrapper{
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