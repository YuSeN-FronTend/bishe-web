import request from '../utils/request'

export function loginFun(data: any) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}
export function registerFun(data: any) {
    return request({
        url: '/user/register',
        method: 'post',
        data: data
    })
}
// 修改用户信息
export function changeUserInfoFun(data: any) {
    return request({
        url: '/user/changeUserInfo',
        method: 'post',
        data
    })
}



export function getDataFun(data: any) {
    return request({
        url: '/getData',
        method: 'post',
        data: data
    })
}
