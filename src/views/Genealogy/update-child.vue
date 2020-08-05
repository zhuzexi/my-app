<template>
	<m-header :mTitle="'修改子女信息'"></m-header>
</template>

<script>
import mHeader from '../../components/common/m-header';
import { Indicator, Toast } from 'mint-ui';
import { Area, Popup, Dialog } from 'vant';
export default {
	components: {
		mHeader
	},
	data() {
		return{
			id:'',
			memberInfo: JSON.parse(localStorage.getItem('memberInfo')),
			memberKey: JSON.parse(localStorage.getItem('memberKey')),
		}
	},
	mounted() {
		this.selectChildInfo();
	},
	methods: {
		
		//查询子女信息
		async selectChildInfo() {
			
			//拼接参数
			let params = '?id=23';
			
			//接口调用
			this.$axios.get('/member-server/vmall/memberRepairSpectrum/selectByRepairSpectrum' + params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: this.memberKey.memberAccessToken
					}
				}).then(res => {
					console.log(res,'<-----res');
				});
		},
		
	}
};
</script>

<style scoped="scoped"></style>
