<template>
	<header class="wrap">
		<span>{{ mTitle }}</span>
	</header>
</template>

<script>
export default {
	components: {},
	props: {
		mTitle: {
			type: String,
			default: ''
		}
	},
	methods: {

	}
};
</script>

<style lang="scss" type="text/scss" scoped>
// @import '../../common/style/mixin1';
.wrap{
	background-color:#ee0a24;
	color: #fff;
	font-weight:bolder;
}
header {
	color:#777;
	position: relative;
	width: 100%;
	height: 1.5rem;
	line-height: 1.5rem;
	text-align: center;
	padding: 0 0.266667rem;
	font-size: 0.453333rem;
	border-bottom: 0.04rem #ededed solid;
	font-family: PingFang SC;
	font-weight: bold;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

header .iconfont {
	position: absolute;
	left: 0.266667rem;
	top: 0;
	font-size: 0.666667rem;
	font-weight: bold;
}
</style>
