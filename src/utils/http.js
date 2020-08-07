import axios from 'axios'
import {Toast} from 'mint-ui'
import router from '../router/index.js'

const service = axios.create({
  // baseURL: 'http://192.168.1.185:8111', // api 的 base_url
  // baseURL: 'http://14.29.126.150:8111', // api 的 base_url
  baseURL: 'http://api.hejiawh.com',
//baseURL: 'http://api1.hejiawh.com',//图片文件访问 
  timeout: 5000 // request timeout
})
service.interceptors.request.use(res => {
		let memberKey = JSON.parse(window.localStorage.getItem('memberKey'));
   	let type = router.currentRoute.meta.type;
// 	console.log('headers',res.headers.memberAccessToken)
// 	console.log(!res.headers.memberAccessToken)
// 	console.log('type',type)
// 	console.log('memberKey', memberKey)
   	if(!res.headers.memberAccessToken && type == 'login'){
   		res.headers.common['memberAccessToken'] = memberKey.memberAccessToken;
   	}
    return res;
});
service.interceptors.response.use(res => {
  if(res.data.status === 401) {
		window.localStorage.removeItem('memberKey');
		window.localStorage.removeItem('memberInfo');
		router.push('/login');
  }
  return res;
}, error => {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
	  case 401:
	    window.localStorage.removeItem('memberKey');
	    window.localStorage.removeItem('memberInfo');
	    router.push('/login');
		break;
      case 403:
        Toast(`${status}禁止访问！`)
        break;
      case 404:
        Toast(`${status}路径不存在！`)
        break;
      case 405:
        Toast(`${status}请求的方法get/post方式不对！`)
        break;
      case 500:
        Toast(`${status}服务器错误！！`)
        break;
    }
  } else {
    Toast("网络超时！")
  }

  return "error";
})
export default service
