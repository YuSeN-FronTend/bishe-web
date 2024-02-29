import request from '../utils/request'

// 首页柱状图
export function getDashboardBar() {
    return request({
        url: '/echartsData/dashboardBar',
        method: 'get'
    })
}

export function getTotalCounts() {
    return request({
        url: '/echartsData/dashboardTotalCounts',
        method: 'get'
    })
}