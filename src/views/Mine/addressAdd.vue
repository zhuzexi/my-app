<template>
	<div class="address_add">
		<m-header :mTitle="mTitle"></m-header>
		<van-field
	  		required
	    	v-model="adr.name"
	    	label="姓名"
	    	placeholder="姓名"
	  	/>
	  	<van-field
	  		required
	    	v-model="adr.phone"
	    	label="电话"
	    	placeholder="电话"
	  	/>
	  	<van-field required readonly @click="handleAddress" v-model="adr.provinceAndCity" label="地址" placeholder="地址" />
		<van-field required v-model="adr.detailedAddress" label="详细地址" placeholder="详细地址" />
		<van-cell style="text-align: left;" title="设置为默认地址">
			<template #right-icon>
			    <van-switch v-model="checked" size="24" />
			</template>
		</van-cell>
		<van-button @click="saveAdr" class="save" type="danger">保存</van-button>
		<van-button @click="removeAdr" v-if="mTitle == '编辑地址'" type="default">删除</van-button>
	  	<van-popup v-model="cityVisable" position="bottom">
			<m-address @on-sure="onSure" @on-cancel="cityVisable = false"></m-address>
		</van-popup>
	</div>
</template>

<script>
	import mHeader from '../../components/common/m-header';
	import mAddress from '../../components/address';
	import { Notify, Dialog } from 'vant';
	import { mine as net } from "@/api";
	export default {
		components: {
			mHeader,
			mAddress
		},
		data() {
			return {
				cityVisable: false,
				mTitle: this.$route.query.title,
				checked: false,
				provinceAndCity: "",
				adr: {
					memberInfoId: "",//会员ID （必填）
					areaId: "",//地址表ID
					provinceAndCity: "",
					detailedAddress: "",//详细地址
					phone: "",//电话
					name: "",//姓名
					addressType: this.$route.query.type,//地址类型 100:居住地址 101:收货地址
					isAddress: "0",//（必填） 是否默认地址,0否 1是(当前居住地址 或者使用地址)
				},
				adrId: this.$route.query.id
			}
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
					id: this.adrId
				}
				net.getAdrList(params)
				.then(res => {
					if(res.status == 200) {
						let data = res.data.list[0]
						Object.keys(this.adr).forEach(item => {
							this.adr[item] = data[item];
						})
					}
					this.checked = this.adr.isAddress == "1" ? true : false;
				})
				.catch(err => console.log(err))
			},
			saveAdr() {
				this.adr.memberInfoId = this.memberKey.memberInfoId;
				this.adr.isAddress = this.checked ? "1" : "0";
				if(!this.adr.name || !this.adr.phone || !this.adr.areaId || !this.adr.detailedAddress) {
					Notify({ type: 'danger', message: '请填写完整数据！' });
					return false;
				}
				let data = new FormData();
				Object.keys(this.adr).forEach(item => {
					data.append(item, this.adr[item])
				})
				if(this.mTitle == '编辑地址') {
					data.append("id", this.adrId)
					this.editAdr(data);
				} else if(this.mTitle == '添加地址') {
					this.addAdr(data);
				}
			},
			//修改地址
			editAdr(data) {
				net.addressEdit(data)
				.then(res => {
					if(res.status == 200) {
						Dialog.confirm({
							message: '添加成功！'
						})
						.then(() => {
							this.$router.push('/address');
						})
						.catch(() => {
							this.$toast(res.message);
						});
					}
					console.log(res)
				})
				.catch(err => console.log(err))
			},
			//添加地址
			addAdr(data) {
				net.addressAdd(data)
				.then(res => {
					if(res.status == 200) {
						Dialog.confirm({
							message: '添加成功！'
						})
						.then(() => {
							this.$router.push('/address');
						})
						.catch(() => {
							this.$toast(res.message);
						});
					}
					console.log(res)
				})
				.catch(err => console.log(err))
			},
			removeAdr() {
				let data = new FormData();
				data.append("ids", this.adrId)
				net.addressRemove(data)
				.then(res => {
					if(res.status == 200) {
						Dialog.confirm({
							message: '删除成功！'
						})
						.then(() => {
							this.$router.push('/address');
						})
						.catch(() => {
							this.$toast(res.message);
						});
					}
				})
				.catch(err => console.log(err))
			},
			
			//地址确定
			onSure(value) {
				this.cityVisable = false;
				this.adr.areaId = value.map(item => item.id).join(",");
				this.adr.provinceAndCity = value.map(item => item.name).join("");
//				this.addressList[this.addressIndex].areaId = value.map(item => item.id).join("");
//				this.addressList[this.addressIndex].provinceAndCity = value.map(item => item.name).join("");
			},
			handleAddress(index) {
				this.cityVisable = true;
			},
		}
	}
</script>

<style lang="less" scoped>
	.address_add{
		button{
			width: 90%;
			margin-bottom: 10px;
			border-radius: 999px;
		}
		.save{
			margin-top: 20px;
		}
	}
</style>