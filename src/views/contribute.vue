<template>
	<div class="contribute">
		<m-header mTitle="功德榜"></m-header>
		<div class="rank_index">
			<div class="tabs">
				<span @click="tabsActive = true" :class="{'active': tabsActive}">爱心值</span>
				<span @click="tabsActive = false" :class="{'active': !tabsActive}">贡献值</span>
			</div>
			<div class="rank_num">
				<div class="item">
					<img class="avatar" src="../assets/img/zp_icon/img3.png"/>
					<div>
						<img class="icon" src="../assets/img/gdb_img2.png"/>
						<span>何某</span>
					</div>
				</div>
				<div class="item">
					<img class="avatar" src="../assets/img/zp_icon/img3.png"/>
					<div>
						<img class="icon" src="../assets/img/gdb_img1.png"/>
						<span>何某</span>
					</div>
				</div>
				<div class="item">
					<img class="avatar" src="../assets/img/zp_icon/img3.png"/>
					<div>
						<img class="icon" src="../assets/img/gdb_img3.png"/>
						<span>何某</span>
					</div>
				</div>
			</div>
		</div>
		
		<ul class="rank_list">
			<li>
				<div class="sort">排名</div>
				<div class="rank_avatar">头像</div>
				<div class="name">姓名</div>
				<div class="number">爱心值</div>
			</li>
			<li v-for="(item, index) in list" :key="index">
				<div class="sort">
					<!--<img v-if="index < 3" class="icon" src="../assets/img/gdb_img1.png"/>-->
					<img v-if="index == 0" :src="img1"/>
					<img v-if="index == 1" :src="img2"/>
					<img v-if="index == 2" :src="img3"/>
					<span v-if="index > 2">{{index}}</span>
				</div>
				<div class="rank_avatar">
					<img class="avatar" src="../assets/img/zp_icon/img3.png"/>
				</div>
				<div class="name">{{item.name}}</div>
				<div class="number">{{item.number}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import mHeader from '@/components/common/m-header';
	import img1 from "@/assets/img/gdb_img1.png";
	import img2 from "@/assets/img/gdb_img2.png"
	import img3 from "@/assets/img/gdb_img3.png"
	export default {
		components: {
			mHeader
		},
		data() {
			return {
				img1,
				img2,
				img3,
				tabsActive: true,
				list: Array.from(Array.apply(null, {length: 20}).map((item, index) => {
					return {
						avatar: "",
						name: "何某",
						number: (Math.random() * 4990 + 10).toFixed(0)
					}
				})).sort(function(a, b) {
					return b.number - a.number
				})
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.contribute{
		.rank_list{
			li{
				display: flex;
				border-bottom: 1px solid #ccc;
				div{
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 5px 0;
					font-size: 16px;
				}
				div:not(.sort){
					flex: 1;
				}
				.sort{
					/*padding: 10px 0;*/
					width: 50px;
					border-right: 1px solid #ccc;
					img{
						width: 65%;
						height: auto;
					}
				}
				&:first-child div{
					padding: 10px 0;
					color: #bf0909;
				}
			}
		}
		.rank_index{
			padding: 20px 30px;
			background-image: url(../assets/img/gdb_bg.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			.tabs{
				display: flex;
				span{
					flex: 1;
					color: #bf0909;
					border: 1px solid #bf0909;
					padding: 10px;
					font-size: 16px;
					&.active{
						background: #bf0909;
						color: #fff;
					}
					&:first-child{
						border-bottom-left-radius: 5px;
						border-top-left-radius: 5px;
					}
					&:last-child{
						border-bottom-right-radius: 5px;
						border-top-right-radius: 5px;
					}
				}
			}
			.rank_num{
				padding-top: 100px;
				display: flex;
				justify-content: space-between;
				.item{
					display: inline-block;
					font-size: 20px;
					&:nth-child(2) {
						position: relative;
						top: -60px;
					}
					.avatar{
						width: 80px;
						height: 80px;
					}
					div{
						display: flex;
						align-items: center;
					}
					.icon{
						width: 30px;
						height: auto;
					}
				}
			}
		}
	}
</style>