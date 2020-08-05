import service from '../utils/http'

export default {
	/**
     * 首页获取数据
     *
     * @returns {Promise<unknown>}
     */
    getList: () => {
        return new Promise((resolve, reject) => {
            service.get("/company-server/vmall/newsType/queryNewsType", {type: 1})
                .then((response => resolve(response)))
                .catch(error => reject(error))
        });
    }
//	getList() {
//		service.get('/company-server/vmall/newsType/queryNewsType', {type: 1})
//		.then(res => {
//			
//		})
//	}
}
