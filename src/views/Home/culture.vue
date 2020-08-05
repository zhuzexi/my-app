<template>
	<div class="wrap">
		<slider :imgUrl="headList"></slider>
		<div class="timer">
			<div class="year">
				<span class="year_type">{{year[0]}}</span>
				<span class="year_time">{{year[1]}}</span>
			</div>
			<div class="day">{{day}}</div>
			<div class="dates">{{dates}}</div>
		</div>
		<div class="news">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>文化图解</span>
				<span style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;">更多>></span>
			</div>
			<div class="cont cont-bk">
				<span class="img-jj">
					<img class="" src="../../assets/cur/1.jpg" />
					<p>石林何氏紫砂壶</p>
				</span>
				<span class="img-jj">
					<img class="" src="../../assets/cur/2.jpg" />
					<p>何氏仙姑花钱</p>
				</span>
				<span class="img-jj">
					<img class="" src="../../assets/cur/3.jpg" />
					<p>石林何氏紫砂壶</p>
				</span>
			</div>
		</div>

		<div class="news">
			<div class="tit">
				<span style="color:#c31a1f; font-weight: bold; margin-right: 0.15rem; position: relative; top:-0.02rem;">|</span>
				<span>何氏话题</span>
				<span style="float: right; font-weight: normal; font-size: 14px; margin-right: 0.3rem;">更多>></span>
			</div>
			<div class="culture">
				<div class="b">
					<div class="t">
						<p class="t1">安庆何氏宗亲会在怀宁万豪大酒店隆重举行</p>
						<p class="t2">安庆何氏历史文化研究会暨安庆何氏宗亲总会成立大会于2018年元月6日在怀宁县万豪大酒店隆重举行！</p>
						<p class="t3">2020-06-10</p>
					</div>
				</div>
				<div class="b">
					<div class="t">
						<p class="t1">东俊公三修序</p>
						<p class="t2">吾先世出潜山叔度，始南阳尚书晏公葬于庐江，后因以为郡焉。历唐宋徙豫章，转徙楚新化，是为吾祖太一公，而桂阳燕泉则其同系也。公再传又分支蔓衍于新之五溪</p>
						<p class="t3">2020-06-10</p>
					</div>
				</div>
				<div class="b">
					<div class="t">
						<p class="t1">何氏图腾</p>
						<p class="t2">何姓是人方河伯氏族的族称，古代黄河流域分为西河、河套、东河和中河，以“河”为姓。“何”由“人”和“可”组成，“人”代表人方（东夷的一支），“可”像黄河流经的区域。河伯夷，风姓别支，有“何作日壬尊”传世，黄帝时名冯佐。</p>
						<p class="t3">2020-06-10</p>
					</div>
				</div>

				<div class="b">
					<div class="t">
						<p class="t1">江西丰城河湾十甲村何氏宗祠概况</p>
						<p class="t2">江西省宜春市丰城河湾十甲村何氏宗祠，总投资600余万元，占地50亩，建筑面积900平方米，宗祠广场8000平方米，广场前有池塘35亩。宗祠的设计与建设，由湖北某古祠设计与建筑公司承担。宗祠分上、下二层，有前、中、后三大厅（上中下三进），十一级大理石台阶入大门，正面长廊立柱是花岗岩，墙表装饰是浮雕大理石。让人感到：外形宏伟，内饰尊贵！</p>
						<p class="t3">2020-06-10</p>
					</div>
				</div>
			</div>
		</div>

		<!-- <div style="width: 100%; height:55px;"></div> -->
		
		<!-- <tabbar></tabbar> -->
	</div>
</template>

<script>
//	https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=2020%E5%B9%B407%E6%9C%88&resource_id=6018&format=json
//avoid 忌
//suit 宜
import slider from '../../components/common/slider';
// import tabbar from '@/components/tabbar/tabbar.vue';
import tabbar from '@/components/vant/tabbar.vue';
import { getNewDay, getDay, getWeek } from '@/utils/utils.js'
import {GetCNDate} from '@/utils/getCNDate.js'
export default {
	name: 'culture',
	data() {
		return {
			dates: getNewDay() + " " + getWeek(),
			day: getDay(),
			year: GetCNDate().split(' '),
			headList: [
				{
					imgUrl: require('../../assets/img/swiper/2/1.jpg'),
					categoryId: 100008
				},
				{
					imgUrl: require('../../assets/img/swiper/2/2.jpg'),
					categoryId: 100016
				},
				{
					imgUrl: require('../../assets/img/swiper/2/3.jpg'),
					categoryId: 100035
				},
				{
					imgUrl: require('../../assets/img/swiper/2/4.jpg'),
					categoryId: 100034
				}
			],
			memberKey: JSON.parse(localStorage.getItem('memberKey'))
		};
	},
	mounted() {
		//解决axios 中 then 内部不能使用Vue的实例化的this 的问题
	},
	methods: {},
	components: {
		slider,
		tabbar
	}
};
</script>

<style scoped>
.wrapper {
	width: 100%;
}
.wrap .timer{
	background: #eaeaea;
	position: relative;
	top: -5px;
	padding: 15px 0;
}
.wrap .timer .year_type{
	background: #c41821;
	padding: 2px;
	color: #fff;
	border-radius: 4px;
	margin-right: 5px;
}
.wrap .timer .year_time{
	color: #474747;
	font-weight: bold;
	letter-spacing: 2px;
}
.wrap .timer .day{
	color: #343434;
	font-size: 1.5rem;
}
.news .tit {
	border-bottom: 1px solid #ccc;
	color: #444;
	font-size: 16px;
	font-weight: bold;
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: left;
	text-indent: 0.2rem;
}
.news .cont {
	border-bottom: 1px solid #ccc;
	width: 100%;
	height: 155px;
}
.news .tit span:nth-child(2), .list .tit span:nth-child(2){
	color: rgb(195, 26, 31);
}
.cont-bk {
	padding: 10px 0;
	display: flex;
	justify-content: space-around;
}
.img-jj {
	display: inline-block;
	width: 30%;
}
.img-jj img {
	width: 65%;
	border-radius: 10px;
}
.img-jj p {
	font-weight: bold;
	line-height: 30px;
}

.culture {
	border-bottom: 1px solid #ccc;
	width: 100%;
	/* padding-top: 15px; */
	padding-bottom: 15px;
	overflow: hidden;
}
.culture .t {
	width: 96%;
	float: left;
	padding-left: 2%;
	padding-right: 2%;
}
.culture .t p {
	text-align: left;
}
.t1,
.t3 {
	height: 36px;
	line-height: 36px;
}
.t1 {
	font-size: 14px;
	font-weight: bold;
}
.t2 {
	color: #666;
}
.t3 {
	color: #ccc;
	text-align: right !important;
}

.culture .b {
	border-bottom: 1px solid #ccc;
	padding: 10px 0;
	overflow: hidden;
}
</style>
