<template>
    <div class="left-list">
        <div class="ll-header">
            <el-tabs v-model="activeName" @tab-change="handleClick">
                <el-tab-pane label="聊天列表" name="chat"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="ll-list">
            <div class="list-child" v-for="item in companyList" :key="item.id" @click="selectChat(item)"
                :id="'lc' + item.id">
                <div style="display: flex;align-items: center;">
                    <img src="../../../assets/image.jpg" class="lc-img">
                </div>
                <div class="lc-text">
                    <div class="lt-left">
                        <div class="lt-name">{{ item.name }}</div>
                        <div class="lt-info">{{ item.message }}</div>
                    </div>
                    <div class="lt-right">
                        <div class="lr-time">{{ isToday(item.time) }}</div>
                        <div class="lr-count" v-if="item.count">{{ item.count }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="right-chat">
        <div class="rc-header">{{ rightName }}</div>
        <div class="rc-main">
            <div class="rm-box" v-for="item in chatHistory" :key="item.id">
                <div class="rb-left" v-if="JSON.parse(accountInfo).id == item.receiveUserId">
                    <img class="img" src="../../../assets/image.jpg" alt="">
                    <div style="display: flex; flex-direction: column;">
                        <span style="font-size: 12px; color: gray;">{{ item.sendName }}</span>
                        <div class="msg">{{ item.sendMsg }}</div>
                    </div>
                </div>
                <div class="rb-right" v-else>
                    <div style="display: flex; flex-direction: column; align-items: flex-end;">
                        <span style="font-size: 12px; color: gray;">{{ item.sendName }}</span>
                        <div class="msg">{{ item.sendMsg }}</div>
                    </div>
                    <img class="img" src="../../../assets/image.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="rc-footer">
            <div class="smallFun"></div>
            <textarea v-model="message" class="inp" placeholder="请输入内容" :disabled="textareaDisabled"></textarea>
            <div class="sendInfo">
                <el-button class="si-btn" type="primary" @click="send">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onUnmounted, reactive, ref, onUpdated, nextTick, onMounted } from 'vue';
import { sendMsg, getChatList, getChatHistory, changeIsLook } from '../../../api/serviceCenter';
import { ElMessage } from 'element-plus';
import { isToday } from './mathTime';
const accountInfo: any = sessionStorage.getItem('accountInfo');
const activeName: any = ref(sessionStorage.getItem('activeName') || 'chat');
const rightName: any = ref(sessionStorage.getItem('rightName') || '');
const chatHistory: any = ref(JSON.parse(sessionStorage.getItem('chatInfo')) || []);
const message: any = ref('');
const textareaDisabled = ref<boolean>(true);
// 选择商家
const company_name: any = ref(sessionStorage.getItem('leftName'));
const company_id: any = ref(sessionStorage.getItem('receiveUserId'));

// 获取聊天列表
let companyList: any = ref([]);
async function getList() {
    const params = {
        user_id: JSON.parse(accountInfo).id
    }
    try {
        const { data } = await getChatList(params);
        if (data.code === 200) {
            companyList.value = data.data;
        } else {
            ElMessage({
                message: '数据库出错！',
                type: 'error',
            })
        }
    } catch (error) {
        ElMessage({
            message: '数据库出错！',
            type: 'error',
        })
    }

}
getList();
onMounted(() => {
    let main: any = document.querySelector('.rc-main');
    main.scrollTop = main.scrollHeight;
})
onUpdated(() => {
    let chat_id: any = sessionStorage.getItem('chat_id') || null;
    if (chat_id) {
        textareaDisabled.value = false;
        document.getElementById(chat_id)!.style.backgroundColor = '#eef7ff';
        rightName.value = sessionStorage.getItem('leftName');
    }
}
)
// 选择聊天
async function selectChat(item: any) {
    company_name.value = item.name;
    company_id.value = item.id;
    let ll_list: any = document.querySelector('.ll-list');
    for (let item of ll_list.children) {
        item!.style.backgroundColor = '#ffffff';
    }
    let id = 'lc' + item.id;
    let lchild: any = document.getElementById(id);

    lchild!.style.backgroundColor = '#eef7ff';
    sessionStorage.setItem('chat_id', id);
    sessionStorage.setItem('leftName', item.name);
    sessionStorage.setItem('receiveUserId', item.id);
    rightName.value = item.name;
    try {
        const params = {
            company_id: item.id,
            user_id: item.user_id
        }
        const { data } = await getChatHistory(params);
        if (data.code === 200) {
            sessionStorage.setItem('chatInfo', JSON.stringify(data.data));
            chatHistory.value = data.data;
            nextTick(() => {
                let main: any = document.querySelector('.rc-main');
                main.scrollTop = main.scrollHeight;
            })

        }
    } catch (error) {
        ElMessage({
            message: '数据库出错！',
            type: 'error',
        })
    }
    try {
        const params = {
            sendUserId: item.id,
            receiveUserId: JSON.parse(accountInfo).id
        }
        await changeIsLook(params);
        getList();
    } catch (error) {
        ElMessage({
            message: '数据库出错',
            type: 'error'
        })
    }
}
// 发送消息
// 发送消息
async function send() {
    const params = {
        sendName: JSON.parse(accountInfo).name,
        sendUserId: JSON.parse(accountInfo).id,
        sendMsg: message.value,
        receiveName: company_name.value,
        receiveUserId: company_id.value,
        msgTime: Math.floor(new Date().getTime() / 1000)
    }

    const { data } = await sendMsg(params);
    if (data.code === 200) {
        chatHistory.value = data.data;
        message.value = ''
        getList();
        nextTick(() => {
            let main: any = document.querySelector('.rc-main');
            main.scrollTop = main.scrollHeight;
        })
    }
}
onUnmounted(() => {
    sessionStorage.removeItem('leftName');
    sessionStorage.removeItem('chat_id');
    sessionStorage.removeItem('receiveUserId');
    sessionStorage.removeItem('chatInfo');
})
</script>

<style lang="scss" scoped>
.left-list {
    flex: 1;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;

    .ll-header {
        padding-top: 5px;
    }

    .ll-list {
        height: 45.8em;
        overflow-y: auto;

        .list-child {
            height: 70px;
            padding-left: 15px;
            display: flex;
            align-items: center;
            position: relative;
            border-bottom: 1px solid #e8eaeb;
            cursor: pointer;

            .lc-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }

            .lc-text {
                display: flex;
                margin-left: 25px;
                width: 100%;

                .lt-left {
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    .lt-name {
                        font-size: 14px;
                        font-weight: 600;
                    }

                    .lt-info {
                        margin-top: 5px;
                        width: 150px;
                        font-size: 11px;
                        color: #797979;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .lt-right {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    padding-right: 10px;

                    .lr-time {
                        font-size: 11px;
                        color: #797979;
                        margin-top: 3px;
                    }

                    .lr-count {
                        display: flex;
                        justify-content: center;
                        color: #fff;
                        margin-top: 6px;
                        padding: 2px 6px;
                        border-radius: 10px;
                        font-size: 9px;
                        background-color: $primary-color;
                        transform: scale(0.9);
                    }
                }
            }
        }

        .list-child:hover {
            background-color: #eef7ff;
        }

        // .list-child::before {
        //     content: '';
        //     width: 4px;
        //     height: 100%;
        //     position: absolute;
        //     top: 0;
        //     left: 2px;
        //     background-color: $primary-color;
        // }
    }

    .ll-list::-webkit-scrollbar {
        width: 5px;
    }

    .ll-list::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    .ll-list::-webkit-scrollbar-thumb {
        background: rgb(156, 156, 156);
        border-radius: 20px;
    }

    .ll-list::-webkit-scrollbar-thumb:hover {
        background: rgb(100, 100, 100);
        border-radius: 20px;
    }

    .ll-list::-webkit-scrollbar-thumb:active {
        background: rgb(68, 68, 68);
        border-radius: 20px;
    }
}

.right-chat {
    flex: 3;
    background-color: #f1f2f6;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #e8eaeb;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

    .rc-header {
        height: 3.2em;
        line-height: 3.2em;
        padding-left: 20px;
        background-color: #fff;
        border-top-right-radius: 20px;
    }

    .rc-main {
        display: flex;
        flex-direction: column;
        overflow: auto;
        height: 31em;
        padding-bottom: 10px;

        .rm-box {
            .rb-left {
                display: flex;
                margin-top: 10px;
                width: 40%;
                float: left;

                .img {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    margin: 0px 10px;
                }

                .msg {
                    background-color: #ffffff;
                    padding: 8px;
                    font-size: 13px;
                    border-radius: 5px;
                    border: 1px solid #eaeaea;
                    margin-top: 5px;
                    max-width: 100%;
                }
            }

            .rb-right {
                display: flex;
                margin-top: 10px;
                float: right;
                width: 40%;
                justify-content: flex-end;

                .img {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    margin: 0px 10px;
                }

                .msg {
                    background-color: #ffffff;
                    padding: 8px;
                    font-size: 13px;
                    border-radius: 5px;
                    border: 1px solid #eaeaea;
                    margin-top: 5px;
                    max-width: 100%;
                }
            }
        }
    }

    .rc-main::-webkit-scrollbar {
        width: 5px;
    }

    .rc-main::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    .rc-main::-webkit-scrollbar-thumb {
        background: rgb(156, 156, 156);
        border-radius: 20px;
    }

    .rc-main::-webkit-scrollbar-thumb:hover {
        background: rgb(100, 100, 100);
        border-radius: 20px;
    }

    .rc-main::-webkit-scrollbar-thumb:active {
        background: rgb(68, 68, 68);
        border-radius: 20px;
    }

    .rc-footer {
        flex: 14;
        height: 22%;
        background-color: #fff;
        border-bottom-right-radius: 20px;
        display: flex;
        flex-direction: column;

        .smallFun {
            flex: 2;
        }

        .inp {
            flex: 12;
            resize: none;
            width: 100%;
            box-sizing: border-box;
            border: none;
            border-bottom-right-radius: 20px;
        }

        .inp {
            outline: none
        }

        .sendInfo {
            flex: 3;
            display: flex;
            justify-content: flex-end;
            padding-right: 30px;

            .si-btn {
                background-color: $primary-color;
                border: 1px solid $primary-color;
            }
        }
    }
}

:deep(.el-tabs__item) {
    font-size: 16px;
}

:deep(.el-tabs__item:hover) {
    color: $primary-color;
}

:deep(.el-tabs__item.is-active) {
    color: $primary-color;
}

:deep(.el-tabs__active-bar) {
    background-color: $primary-color;
}

:deep(.el-tabs__header) {
    margin: 0 !important;
}

:deep(.el-tabs--top .el-tabs__item.is-top:nth-child(2)) {
    padding-left: 20px;
    padding-top: 24px;
    padding-bottom: 24px;
}

:deep(.el-tabs__active-bar) {
    width: 80% !important;
}

textarea:disabled {
    background-color: #fff;
}

textarea {
    padding-left: 10px;
}
</style>