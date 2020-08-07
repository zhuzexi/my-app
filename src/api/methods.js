import service from '../utils/http'
/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function getAction(url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {params})
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postAction(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data)
      .then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
      })
  })
}
