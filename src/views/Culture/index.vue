<template>
	<div class="detail_wrapper">
		<img :src="img"/>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				id: this.$route.query.id,
				img: ''
			}
		},
		mounted() {
			if(this.id){
				this.img = require(`../../assets/${this.id}.jpg`)
			}
		}
	}
</script>

<style scoped lang="less">
	.detail_wrapper{
		img{
			width: 100%;
		}
	}
	
</style>