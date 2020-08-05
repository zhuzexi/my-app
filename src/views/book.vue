<template>
	<div class="book_wrapper">
		<van-swipe ref="mySwiper" class="my-swipe" :loop="false" :show-indicators="false">
			<van-swipe-item>
				<div class="last"></div>
			</van-swipe-item>
			<van-swipe-item v-for="(item, index) in listItems" :key="index">
			  <div class="cont_wrap">
				  <div class="cont_border">
					  <ul>
						  <li v-for="(data, idx) in item" :key="data.createTime + idx">
							  <div class="title" v-html="data.index ? '第' + data.index + '代' : ''"></div>
							  <div class="text">{{data.memberName}}</div>
						  </li>
					  </ul>
				  </div>
			  </div>
		 	</van-swipe-item>
		  <van-swipe-item>
		  	<div class="index"></div>
		  </van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	import { Arabia_To_SimplifiedChinese as aToS } from '@/utils/aToS.js'
	export default{
		data() {
			return {
				row: 0,
				list: [],
				listItems: [],
				memberInfo: JSON.parse(localStorage.getItem('memberInfo')),
			}
		},
		mounted() {
			let rem = document.documentElement.style.fontSize;
			let width = document.body.clientWidth;
			let row = width / parseFloat(rem);
			this.row = row;
			
			this.getLine();
		},
		methods: {
			//
			async getLine() {
				//拼接参数
				let params = '?id=' + this.memberInfo.id;
				//接口调用
				this.$axios.get('/member-server/vmall/memberRepairSpectrum/orgQueryMemberTree' + params)
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
				this.$axios.get('/member-server/vmall/memberRepairSpectrum/wfpz' + params)
					.then(res1 => {
						if (res1.status == '200') {
							let index = 0;
							let data = [];
							function handleData(list, index) {
								index++;
								list.forEach(item => {
									let obj = new Object();
									obj.index = aToS(index);
									obj.sort = index;
									Object.keys(item).map(i => {
										if(i != 'children') {
											obj[i] = item[i];
										}
									});
									data.push(obj);
									if(item.children && item.children.length){
										handleData(item.children, index);
									}
								});
							}
							handleData(list, index);
//							data = data.concat(data);
							let length = data.length + 1;
							let pages = Math.ceil(length / this.row);
							this.$refs.mySwiper.swipeTo(2 + pages - 1, {immediate: true});
							data = data.sort(function(a, b) {
								return a.sort - b.sort
							});
							this.listItems = Array.from(Array.apply(null,{length: pages}).map((item, index) => {
								let items = data.slice(index * this.row, (index + 1) * this.row);
								if(items.length != this.row) {
									let itemNull = Array.from(Array.apply(null, {length: this.row - items.length}).map(item => {
										return {createTime: new Date().getTime()}
									}));
									items = items.concat(itemNull);
								}
								return items.reverse();
							})).reverse();
						} else {
							this.$toast(res1.message);
						}
					});
			}
			
		}
	}
</script>
<style>

</style>
<style>
	*{
		box-sizing: border-box;
	}
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 100vh;
    text-align: center;
    background-color: #39a9ed;
  }
  .index,.last{
	  width: 100%;
	  height: 100%;
	  background-repeat: no-repeat;
	  background-size: 100% 100%;
  }
    .index{
		 background-image: url(../assets/index.jpg);
	}
	.last{
		 background-image: url(../assets/last.jpg);
	}
  .cont_wrap{
	  width: 100%;
	  height: 100vh;
	  background: #e5cda5;
	  position: relative;
	  padding: 10px;
	  
  }
  .cont_border{
	  width: 100%;
	  height: 100%;
	  border: 2px solid #000;
	  padding: 5px;
	  display: flex;
	  flex-direction: column;
  }
  .cont_border ul{
	  height: 100%;
	  border: 1px solid #000;
	  display: flex;
  }
  .cont_border ul li{ 
	  height: 100%;
	  color: #000;
	  width: 1rem;
	  border-left: 1px solid #000;
	  box-sizing: border-box;
	  display: flex;
	  flex-direction: column;
  }
  .cont_border ul li:first-child{
	  border-left: none;
  } 
  .cont_border ul li .title{
	  flex: 1;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  border-bottom: 1px solid #000;
	  padding: 0 5px;
  }
  .cont_border ul li .text{
	  flex: 4;
	  padding-top: 5px;
	  word-break: break-word;
  }
</style>

<style scoped>
	h1 {
		text-align: center;
	}
	*{
		box-sizing: border-box;
	}
	.book_wrapper{
		width: 100%;
		height: 100vh;
		background: black;
		/*padding: 10px;*/
	}
	.scene {
		width: 45%;
		height: 90%;
		/*margin: 5% 5% 5% 50%;*/
		perspective: 1000px;
	}
	
	.book {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
	}
	
	.page {
		cursor: pointer;
		position: absolute;
		color: black;
		width: 100%;
		height: 100%;
		transition: 1.5s transform;
		transform-style: preserve-3d;
		transform-origin: left center;
	}
	
	.front,
	.back {
		position: absolute;
		width: 100%;
		height: 100%;
		/*padding: 10% 5% 5%;*/
		box-sizing: border-box;
		backface-visibility: hidden;
		background: -webkit-gradient(linear, 0% 0%, 100% 100%, from(#FFFFFF), to(#CCCCCC));
		background: linear-gradient(to bottom right, #fff, #ccc);
	}
	
	.back {
		transform: rotateY(180deg);
	}
	
	.page.active {
		z-index: 1;
	}
	
	.page.flipped {
		transform: rotateY(-180deg);
	}
	
	.page.flipped:last-of-type {
		z-index: 1;
	}
	.page{
		padding: 0;
		margin: 0;
	}
/*	/*
	p {
		margin: 0 0 0.1em;
		text-indent: 1em;
	}
	
	.qr {
		margin: 50px auto;
		max-width: 50%;
	}
	
	.qr img {
		display: block;
	}*/
</style>