import axios from 'axios';

// let base = 'http://120.79.232.154:3000'; //此接口和webpack dev-server相同
let base = '';

export const requestLogin = params => { //用户登录请求
	return axios.post(`${base}/api/login`, params).then(res => {
		return res.data;
	}, err => {
		reject(err);
	}).catch((error) => {
		reject(error)
	});
};
