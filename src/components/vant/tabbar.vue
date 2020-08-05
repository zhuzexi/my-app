<template>
	<div v-if="$route.path == '/home' || $route.path == '/culture' || $route.path == '/genealogy' || $route.path == '/clancircle' || $route.path == '/mine'">
		<van-tabbar v-model="active" inactive-color="#666" active-color="#c31a1f" placeholder>
			<van-tabbar-item :replace='false' v-for="(item, index) in tabbars" :key="index" :to="item.path">
				<span>{{ item.title }}</span>
				<img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	name: 'tabbar',
	data() {
		return {
			active: 0,
			tabbars: [
				{
					path: '/home',
					title: '首页',
					normal: require('../../assets/img/tabbar/home.png'),
					active: require('../../assets/img/tabbar/home_active.png')
				},
				{
					path: '/culture',
					title: '家文化',
					normal: require('../../assets/img/tabbar/culture.png'),
					active: require('../../assets/img/tabbar/culture_active.png')
				},
				{
					path: '/genealogy',
					title: '族谱',
					normal: require('../../assets/img/tabbar/2.png'),
					active: require('../../assets/img/tabbar/1.png')
				},
				{
					path: '/clancircle',
					title: '宗亲圈',
					normal: require('../../assets/img/tabbar/person.png'),
					active: require('../../assets/img/tabbar/person_active.png')
				},
				{
					path: '/mine',
					title: '我的',
					normal: require('../../assets/img/tabbar/setup.png'),
					active: require('../../assets/img/tabbar/setup_active.png')
				}
			]
		};
	},
	watch: {
		//监听路由变化
		$route(to) {
			this.tabbarActive(to.path);
		}
	},
	methods: {
		tabbarActive(path) {
			var index = this.tabbars.map(item => item.path).indexOf(path);
			if (index != -1) {
				this.active = index;
			}
		}
	}
};
</script>
<style lang="less" scoped></style>
