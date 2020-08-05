<template>
	<div class="guide">
		<mt-swipe :auto="50000" class="mint-swipe">
			<mt-swipe-item>
				<img class="img" src="../assets/img/img2.jpg" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img class="img" src="../assets/img/img1.jpg" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img class="img" src="../assets/img/img3.jpg" />
			</mt-swipe-item>
		</mt-swipe>
		<span class="next" @click="changeToLogin">跳 过</span>
	</div>
</template>

<script>
export default {
	name: 'guide',
	data() {
		return {
			timeName:null,
		};
	},
	computed: {},
	mounted() {
		const _this = this;
		this.timeName = setTimeout(() => {
			_this.$router.push({path: '/login'});
		}, 9000);
	},
	methods: {
		changeToLogin() {
			this.$router.push({ path: '/login' });
		},
		getLastTime: function(){
			
		},
	},
	destroyed() {
		if (this.timeName) {
			//如果定时器在运行则关闭
			clearInterval(this.timeName);
		}
	}
};
</script>
<style scoped>
html,
body {
	margin: 0;
	padding: 0;
}
.guide,.mint-swipe-item,.mint-swipe-item img{
	width: 100%;
	height: 100vh;
}
h1,
h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}

.mint-swipe {
	width: 100%;
	/* height: 640px; */
}
.img{
	width: 100%;
	height: 100vh;
	object-fit: cover;
}
.next {
	border-radius: 4px;
	background-color: rgba(0, 0, 0, 0.2);
	color: #ffffff;
	font-size: 16px;
	display: block;
	width: 100px;
	height: 38px;
	line-height: 38px;
	text-align: center;
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 999;
}
.mint-swipe /deep/ .mint-swipe-indicators{
	display: none;
}
</style>
