<template>
	<div class="user_manual_detail">
		<img :src="img" alt="" />
	</div>
</template>

<script>
	import img from '../../assets/img/user_manual.jpg'
	export default{
		data() {
			return {
				img
			}
		}
	}
</script>

<style scoped="scoped">
	.user_manual_detail{
		position: relative;
		padding-top: 50px;
	}
	.user_manual_detail img{
		width: 100%;
	}
</style>