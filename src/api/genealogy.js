import service from '../utils/http'

export default {
	/**
     * 获取吊线信息
     *
     * @returns {Promise<unknown>}
     */
    getLine: (id) => {
        return new Promise((resolve, reject) => {
            service.get("/member-server/vmall/memberRepairSpectrum/orgQueryMemberTree?id=" + id, {})
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