<template>
	<div class="address">
		<m-header mTitle="地址管理"></m-header>
		<div class="tabs">
			<span @click="tabsClick(100)" :class="{'active': tabsActive}">居住地址</span>
			<span @click="tabsClick(101)" :class="{'active': !tabsActive}">收货地址</span>
		</div>
		<van-address-list 
			v-model="chosenAddressId" 
			:list="list" 
			default-tag-text="默认" 
			@add="onAdd" 
			@edit="onEdit" 
		/>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import mHeader from '@/components/common/m-header';
	import { mine as net } from "@/api";
	export default {
		components: {
			mHeader
		},
		data() {
			return {
				tabsActive: true,
				tabsType: 100,
				chosenAddressId: '1',
				list: []
//				list: [{
//						id: '1',
//						name: '张三',
//						tel: '13000000000',
//						address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
//						isDefault: true,
//					},
//					{
//						id: '2',
//						name: '李四',
//						tel: '1310000000',
//						address: '浙江省杭州市拱墅区莫干山路 50 号',
//					},
//				]
			};
		},
		computed: {
			memberKey() {
				return JSON.parse(this.$store.getters.getMemberKey)
			}
		},
		mounted() {
			this.getAdrList();
		},
		methods: {
			getAdrList() {
				let params = {
					memberInfoId: this.memberKey.memberInfoId,
					addressType: this.tabsType
				};
				net.getAdrList(params)
				.then(res => {
					if(res.status == 200) {
						let list = res.data.list;
						this.list = list.map(item => {
							item.tel = item.phone;
							item.address = item.provinceAndCity + item.detailedAddress;
							if(item.isAddress == 1) {
								item.isDefault = true;
							};
							return item;
						});
						console.log(this.list)
					}
				})
				.catch(err => console.log(err))
			},
			tabsClick(type) {
				this.tabsType = type;
				this.tabsActive = !this.tabsActive;
				this.getAdrList();
			},
			onAdd() {
				this.$router.push({
					path: "/addressadd",
					query: {
						title: "新增地址",
						type: this.tabsType
					}
				});
			},
			onEdit(item, index) {
				this.$router.push({
					path: "/addressadd",
					query: {
						title: "编辑地址",
						id: item.id
					}
				});
			},
		},
	};
</script>

<style lang="less" scoped>
	.address{
		.tabs{
				display: flex;
				padding: 15px;
				span{
					flex: 1;
					color: #bf0909;
					border: 1px solid #bf0909;
					padding: 5px 0;
					font-size: 14px;
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
	}
</style>