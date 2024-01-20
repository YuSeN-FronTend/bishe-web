
import request from '../utils/request'

// 获取所有企业
export function getCompany() {
    return request({
        url: '/expressDelivery/company',
        method: 'get'
    })
}
// 寄快递 
export function sendExpressDelivery(data:any) {
    return request({
        url: '/expressDelivery/send',
        method: 'post',
        data
    })
}
// 运单查询 
export function searchWaybill(data:any) {
    return request({
        url: '/expressDelivery/searchWaybill',
        method: 'post',
        data
    })
}
