import { getAction, postAction } from "./methods"

export default {
	//获取地址列表
	getAdrList(params) {
		return new Promise((resolve, reject) => {
            getAction("/member-server/vmall/memberInfoAddressManage/list", params)
                .then((response => resolve(response)))
                .catch(error => reject(error))
        });
	},
	
	//添加地址
	addressAdd(data) {
		return new Promise((resolve, reject) => {
            postAction("/member-server/vmall/memberInfoAddressManage/add", data)
                .then((response => resolve(response)))
                .catch(error => reject(error))
        });
	},
	//修改地址
	addressEdit(data) {
		return new Promise((resolve, reject) => {
            postAction("/member-server/vmall/memberInfoAddressManage/up", data)
                .then((response => resolve(response)))
                .catch(error => reject(error))
        });
	},
	//删除地址
	addressRemove(data) {
		return new Promise((resolve, reject) => {
            postAction("/member-server/vmall/memberInfoAddressManage/del", data)
                .then((response => resolve(response)))
                .catch(error => reject(error))
        });
	}
}
