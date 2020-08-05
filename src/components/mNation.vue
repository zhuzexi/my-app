<template>
	<div class="address_wrap">
		<van-picker 
			title="请选择民族" 
			show-toolbar 
			:columns="mzList" 
			@confirm="onMzConfirm" 
			@cancel="onMzCancel" 
			@change="onMzChange" 
		/>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mzList: []
			}
		},
		mounted() {
			this.getMzList();
		},
		methods: {
			onMzCancel() {
				this.$emit("on-cancel");
			},
			//当地区选择变化时
			onMzChange(picker, values, index) {
//				if (index < 2) {
//					this.getArea(values[index].id, index + 1); 
//				}
			},
			onMzConfirm(value) {
				this.$emit("on-sure", value);
//				if(value.every(item => item.id)){
//					this.$emit("on-sure", value);
//				}
			},
			//获取民族信息
		 	getMzList(tpMzInfoId) {
			//拼接参数
				let params = '?pageSize=100';
				//接口调用
				this.$axios
					.get('/system-server/vmall/tpMz/list' + params, {})
					.then(res => {
						let list = res.data.data.list;
						if (res.status == '200') {
							this.mzList = list.map(item => {
								item.text = item.name;
								return item;
							});
						} else {
							let info = res.message;
							this.$toast(info);
						}
					});
			},
		}
		
	}
</script>

<style>
</style>