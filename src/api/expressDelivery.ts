
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
// 运单评分
export function setRate(data: any) {
    return request({
        url:"/expressDelivery/setRate",
        method: 'post',
        data
    })
}
// 删除运单
export function deleteWaybill(params: any) {
    return request({
        url: "/expressDelivery/deleteWaybill",
        method: 'delete',
        params
    })
}
// 根据订单号查询订单
export function trackOrder(params: any) {
    return request({
        url: "/expressDelivery/trackOrder",
        method: 'get',
        params
    })
}