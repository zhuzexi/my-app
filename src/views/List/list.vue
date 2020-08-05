<template>
	<div>
		
		<m-header :mTitle="'文章列表'"></m-header>
		
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<!-- :title="item.title" -->
				<van-cell 
					@click="toDetail(item)"
					class="article-item"
					v-for="item in list" 
					:key="item.id" 
				>
				<div class="list">
					<div class="list_title">
						<p>{{item.title.substring(0,13)  + item.title.substring(13).replace(item.title.substring(13), '...') }}</p>
						<p>{{item.createTime.substr(0, 10)}}</p>
					</div>
					<div class="list_img">
						<img :src="item.img" alt="暂无图片" />
					</div>
				</div>
				</van-cell>
			</van-list>
			
		</van-pull-refresh>
		
	</div>
</template>

<script>
import mHeader from '../../components/common/m-header';

export default {
	components: {
		mHeader
	},
	data() {
		return {
			list: [],
			loading: false, //加载状态
			finished: false, //是否加载
			refreshing: false,

			page: 0, //页数
			limit: 10, //条数

			// 频道列表
			zqInfoList: [{
				clickThroughRate: 126,
				createTime: "2020-07-22",
				id: 2,
				newContent: "廉江何氏宗亲总会成立 何汝均当选首任会长",
				title: "廉江何氏宗亲总会成立 何汝均当选首任会长",
			},{
				clickThroughRate: 167,
				createTime: "2020-07-20",
				id: 3,
				newContent: "深圳何氏秘书处举办培训活动",
				title: "深圳何氏秘书处举办培训活动",
			}],
			whInfoList: [{
				clickThroughRate: 233,
				createTime: "2020-06-22 15:04:11",
				id: 1,
				newContent: "1、出自姬姓。周五王之子封于韩，灭国。其后裔韩武子 (另一种说法是韩武子是晋同族曲沃恒叔后裔...)",
				title: "何氏起源",
				img: require('../../assets/bk/2.jpg')
			},{
				clickThroughRate: 233,
				createTime: "2020-07-24 15:04:11",
				id: 21,
				newContent: "老莱子至孝，奉二亲，极其甘脆，行年七十，言不称老。常着五色斑斓之衣，为婴儿戏于亲侧。又尝取水上堂，诈跌卧地，作婴儿啼，以娱亲意。",
				title: "二十四孝第二：戏彩娱亲",
				img: require('../../assets/bk/2.jpg')
			}],
			memberKey: JSON.parse(localStorage.getItem('memberKey')),
			bkList: [
				{
					img: require('../../assets/bk/1.jpg'),
					clickThroughRate: 126,
					createTime: "2020-07-22",
					newContent: "老来福来，皆大欢喜",
					title: "老来福来，皆大欢喜",
				},
				{
					img: require('../../assets/bk/2.jpg'),
					title: "春雷计划他们想上学",
					id: 31,
					clickThroughRate: 126,
					createTime: "2020-07-22",
					newContent: "老来福来，皆大欢喜",
					title: "春雷计划他们想上学",
				}
			],
			memberKey: JSON.parse(localStorage.getItem('memberKey'))
		};
	},
	mounted() {
		this.list = this[this.$route.query.type]
	},
	methods: {
		toDetail(item) {
			this.$router.push({
				path: "/homedetail",
				query: {
					id: item.id,
					title: this.$route.query.title
				}
			})
		},
		// load_more: function() {
		// 	this.page += 1; //页数+1
		// 	this.onLoad();
		// },
	
		onLoad: function() {
			//解决axios 中 then 内部不能使用Vue的实例化的this 的问题
			let that = this;
			that.page += 1; //页数+1
			let params = '?newsTypeId=4' + '&page=' + that.page + '&pageSize=' + that.limit;
			that.$axios
				.get('/company-server/vmall/news/queryNews' + params, {
					headers: {
						'content-type': 'application/json',
						memberAccessToken: that.memberKey.memberAccessToken
					}
				})
				.then(function(res) {
					console.log(res, '<------res');

					if (res.status == '200') {
						let zqList = res.data.data.list;

						//宗亲动态列表
//						that.zqInfoList = zqList;

//						that.list = that.list.concat(zqList); //追加数据

						// 加载状态结束
						that.loading = false;
						// 3. 关闭下拉刷新的 loading 状态
						that.refreshing = false;

						if (res.data.data.list.length == 0) {
							//数据全部加载完成
							that.finished = true;
						} else {
							that.finished = false;
						}
					}
				});
		},
		onRefresh() {
			this.onLoad();
		}
	}
};
</script>

<style scoped>
.list{
	display: flex;
	justify-content: space-around;
}
.list_title{
	width: 65%;
	line-height: 60px;
}
.list_img{
	/*border: 1px solid #000000;*/
	width: 35%;
}
.list_img img{
	width: 100%;
	height: auto;
}
</style>
