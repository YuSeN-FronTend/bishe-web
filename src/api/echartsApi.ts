import request from '../utils/request'

// 首页柱状图
export function getDashboardBar() {
    return request({
        url: '/echartsData/dashboardBar',
        method: 'get'
    })
}
// 首页三个滚动数字
export function getTotalCounts() {
    return request({
        url: '/echartsData/dashboardTotalCounts',
        method: 'get'
    })
}
// 首页左下角折线图
export function getSaleAmount() {
    return request({
        url: '/echartsData/saleAmountCount',
        method: 'get'
    })
}
// 获取右下角图片
export function getGoodsCount() {
    return request({
        url: '/echartsData/goodsNameClassify',
        method: 'get'
    })
}