import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constants/status'
import { baseUrl } from './config'

export default {
    baseOptions(params, method = 'GET') {
        let {url, data} = params
        console.log('params', params)
        let contentType = 'application/json'
        contentType = params.contentType || contentType
        const option = {
            url: url.indexOf('http') !== -1 ? url : baseUrl + url,
            data: data,
            method: method,
            header: {
                'content-type': contentType,
            },
            success(res) {
                console.log(res)
                if(res.statusCode === HTTP_STATUS.NOT_FOUND) {
                    console.log('api error: 请求资源不存在')
                } else if(res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
                    console.log('api error: 服务端出现了问题')
                } else if(res.statusCode === HTTP_STATUS.SUCCESS) {
                    return res.data
                }
            },
            error(e) {
                console.log('api error: 请求接口出现问题', e)
            }
        }
        return Taro.request(option)
    },
    get(url, data = ''){
        let option = {url, data}
        return this.baseOptions(option)
    },
    post(url, data, contentType) {
        let params = { url, data, contentType }
        return this.baseOptions(params, 'POST')
    },
    put(url, data = '') {
        let option = { url, data }
        return this.baseOptions(option, 'PUT')
    },
    delete(url, data = '') {
        let option = { url, data }
        return this.baseOptions(option, 'DELETE')
    }
}