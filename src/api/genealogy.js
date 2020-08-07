//import service from '../utils/http'
import { getAction, postAction } from "./methods"

export default {
	/**
     * 获取吊线信息
     *
     * @returns {Promise<unknown>}
     */
    getLine(id){
        return new Promise((resolve, reject) => {
            getAction("/member-server/vmall/memberRepairSpectrum/orgQueryMemberTree", {id})
                .then((response => resolve(response)))
                .catch(error => reject(error))
        });
    },
    /**
     * 获取吊线图数据的角色信息
     *
     * @returns {Promise<unknown>}
     */
    getLineInfo(id){
    	return new Promise((resolve, reject) => {
            getAction("/member-server/vmall/memberRepairSpectrum/wfpz", {id})
                .then((response => resolve(response)))
                .catch(error => reject(error))
        });
    },
    /**
     * 获取配偶的吊线图数据
     *
     * @returns {Promise<unknown>}
     */
    getSpouseLine(id) {
    	return new Promise((resolve, reject) => {
            getAction("/member-server/vmall/memberWifeRepairSpectrum/orgQueryMemberTree", {id})
                .then((response => resolve(response)))
                .catch(error => reject(error))
        });
    }
}