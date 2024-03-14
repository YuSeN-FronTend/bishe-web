import request from '../utils/request'

// 发送消息
export async function sendMsg(data:any) {
    return request({
        url: '/serviceCenter/sendMsg',
        method: 'post',
        data
    })
}

// 获得聊天列表
export async function getChatList(params:any) {
    return request({
        url: '/serviceCenter/getChatList',
        method: 'get',
        params
    })
}
// 获取聊天记录
export async function getChatHistory(data:any) {
    return request({
        url: '/serviceCenter/getChatHistory',
        method: 'post',
        data
    })
}
// 已读后修改消息状态
export async function changeIsLook(data:any) {
    return request({
        url: '/serviceCenter/changeIsLook',
        method: 'post',
        data
    })
}