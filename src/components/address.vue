<template>
	<div class="address_wrap">
		<van-picker 
			show-toolbar 
			title="请选择地区" 
			value-key="name" 
			:columns="areaList" 
			@cancel="onCancel"
			@change="onAreaChange" 
			@confirm="onAreaConfirm" 
		/>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				areaList: [{ values: [] }, { values: [] }, { values: [] }], //自定义数据三级结构
			}
		},
		mounted() {
			this.getArea(100000,0); //渲染页面时请求第一层省级数据
		},
		methods: {
			onCancel() {
				this.$emit("on-cancel");
			},
			//当地区选择变化时
			onAreaChange(picker, values, index) {
				if (index < 2) {
					//传参 参数为上层选择的地区的code
					this.getArea(values[index].id, index + 1); 
				}
			},
			onAreaConfirm(value) {
				if(value.every(item => item.id)){
					this.$emit("on-sure", value);
				}
			},
			//网络请求地区数据(难点在如何拼装三级结构)
			getArea(ParentId, index) {
				//拼接参数
				let params = '?parentId=' + ParentId;
				//接口调用
				this.$axios.get('/system-server/vmall/area/list' + params, {
					}).then(res => {
						if (res.data.status == '200') {
							//当请求成功时
							const { data } = res.data;
							this.areaList[index].values = [
								{ name: '请选择' },
								...data 
							];
							if (index < 2) {
								//当请求的是三级内的内容时
								this.areaList[index + 1].values = [];
							}
							//更新areaList
							this.areaList = [...this.areaList]; 
						} else {
							this.$notify(res.msg);
						}
					});
			}
		}
		
	}
</script>

<style>
</style>