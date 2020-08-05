// 使用mock模拟首页数据
const Mock = require('mockjs')

let homeData = {
	status: 0,
	data: {
		headList: [{
				imgUrl: '../../assets/img/swiper/1.png',
				categoryId: 100008
			},
			{
				imgUrl: '../../assets/img/swiper/2.png',
				categoryId: 100016
			},
			{
				imgUrl: '../../assets/img/swiper/3.png',
				categoryId: 100035
			}
		]
	}
}

Mock.mock('/home/data', 'post', homeData)