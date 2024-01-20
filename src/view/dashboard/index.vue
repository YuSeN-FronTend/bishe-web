<template>
    <div class="dashboard">
        <div class="header" id="header">
            <div class="header-left">
                <div class="header-left-logo">
                    <img src="https://www.guanaitong.com/images/2023/public/logo.svg" class="image">
                </div>
                <ul class="header-left-menu">
                    <li class="header-left-menu-nav">首页</li>
                    <li class="header-left-menu-nav" v-if="job === '用户'">
                        我要寄件<el-icon class="icon">
                            <Icon icon="ArrowDown"></Icon>
                        </el-icon>
                        <div class="nav2">
                            <a class="nav2-atag" @click="router.push('/sendExpressDelivery')">寄快递
                                <el-icon>
                                    <Icon icon="TopRight"></Icon>
                                </el-icon>
                            </a>
                            <a href="#" class="nav2-atag" @click="router.push('/searchExpressDelivery')">查快递
                                <el-icon>
                                    <Icon icon="TopRight"></Icon>
                                </el-icon>
                            </a>
                            <a href="#" class="nav2-atag">产品3
                                <el-icon>
                                    <Icon icon="TopRight"></Icon>
                                </el-icon>
                            </a>
                        </div>
                    </li>
                    <li class="header-left-menu-nav" v-else-if="job === '企业'">我要寄件</li>
                    <!-- <li class="header-left-menu-nav">运费时效查询</li>
                    <li class="header-left-menu-nav">服务网点查询</li>
                    <li class="header-left-menu-nav">收寄范围查询</li> -->
                </ul>
            </div>
            <div class="header-login" @click="login" v-if='!loginStatus'><el-icon>
                    <Icon icon="User"></Icon>
                </el-icon>&nbsp;快速登录/注册</div>
            <div class="header-user" v-else>欢迎您：{{ username }}&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="person" @click="router.push('/personCenter')">个人中心
                    <el-icon>
                        <Icon icon="TopRight"></Icon>
                    </el-icon>
                </span>
            </div>
        </div>
        <div class="header-section">
            <div class="videoContainer">
                <video class="fullscreenVideo" id="bgVid" playsinline autoplay muted loop>
                    <source src="../../assets/1.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        <div class="section">
            <div class="section-title" id="title">
                <div>
                    <h1>自信，源于24000家企业的认可</h1>
                </div>
                <div class="floating-box" id="transitionTitle">
                    <h1 id="inTitle">自信，源于24000家企业的认可</h1>
                </div>
            </div>
        </div>
        <div class="section">3</div>
        <div class="footer">4</div>
    </div>
    <loginDialog :dialog="dialog" @closed-dialog="closeDialog" />
</template>

<script setup lang="ts">

import { ref, onBeforeUnmount } from 'vue';
import loginDialog from '../loginDialog/index.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// 监听鼠标 位置
window.addEventListener('scroll', function () {
    let header: any = document.getElementById('header');
    if (window.scrollY > 0) {
        header.classList.add('headerScrollY');
    } else {
        header.classList.remove('headerScrollY');
    }
});
// 文字悬浮滑动放大
let mouseX = ref(0);
let mouseY = ref(0);
window.addEventListener('mousemove', updateMouseCoords)
function updateMouseCoords(event: any) {
    const title: any = document.getElementById('title');
    const transitionTitle: any = document.getElementById('transitionTitle');
    const inTitle: any = document.getElementById('inTitle');
    let divx2 = title.offsetWidth;
    let divy2 = title.offsetHeight;
    mouseX.value = event.pageX - title.offsetLeft + 15;
    mouseY.value = event.pageY - title.offsetTop - 50;
    if (mouseX.value < 0 || mouseX.value > divx2 || mouseY.value < 0 || mouseY.value > divy2) {
        transitionTitle.classList.add('animation-fb');
        inTitle.classList.add('animation-inTitle');
        transitionTitle.style.transform = `translate(-50px, -80px)`;
        inTitle.style.transform = `translate(45px, 30px)`;
        transitionTitle.style.transition = 'transform 0.9s ease 0s';
        inTitle.style.transition = 'transform 0.9s ease 0s';


    } else {
        transitionTitle.classList.remove('animation-fb');
        inTitle.classList.remove('animation-inTitle');
        transitionTitle.style.transform = `translate(${mouseX.value - 50}px, ${mouseY.value - 80}px)`;
        inTitle.style.transform = `translate(${-mouseX.value + 45}px, ${-mouseY.value + 30}px)`;
        transitionTitle.style.transition = 'transform 0s ease 0s';
        inTitle.style.transition = 'transform 0s ease 0s';
    }
}
onBeforeUnmount(() =>{
    // 在组件卸载前，解绑事件处理函数
    window.removeEventListener('mousemove', updateMouseCoords);
})
// 触发登录框
const dialog = ref<boolean>(false);
function login() {
    dialog.value = true;
}
let accountInfo:any = sessionStorage.getItem('accountInfo');
let username: any = ref(JSON.parse(accountInfo)?.name || JSON.parse(accountInfo)?.username);
let job:any = ref(JSON.parse(accountInfo)?.job)
const loginStatus = ref<boolean>(Boolean(username.value));
function closeDialog(params: any) {
    if (sessionStorage.getItem('accountInfo')) {
        accountInfo = sessionStorage.getItem('accountInfo');
        username.value = JSON.parse(accountInfo)?.name || JSON.parse(accountInfo)?.username;
        job.value = JSON.parse(accountInfo).job;
        loginStatus.value = true;
    }
    dialog.value = params;
}
</script>
<style lang="scss" scoped>
.dashboard {
    width: 100%;
    min-height: 100%;

    .header {
        height: 10vh;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        color: #fff;
        background-color: #ffffff00;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 1;

        &-left {
            display: flex;
            align-items: center;
            width: 50%;
            height: 100%;

            &-menu {
                height: 100%;
                width: 70%;
                display: flex;

                // 每一个导航区块的样式及动画
                &-nav {
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 10px;
                    cursor: pointer;
                }

                &-nav::before {
                    content: '';
                    height: 2px;
                    background-color: $primary-color;
                    position: absolute;
                    margin-left: 10px;
                    width: calc(100% - 20px);
                    top: calc(100% - 2px);
                    left: 0;
                    transform: scaleX(0);
                    transition: .3s;
                }

                &-nav:hover::before {
                    transform: scaleX(1);
                }

                &-nav:hover {
                    color: $primary-color !important;
                }

                &-nav:hover .nav2 {
                    display: block;
                }

                .icon {
                    transition: transform .5s ease;
                }

                &-nav:hover .icon {
                    transform: rotate(-180deg);
                }

                // 触碰导航栏后出现的下拉框出现的样式以及动画
                .nav2 {
                    display: none;
                    position: absolute;
                    background-color: #fff;
                    top: 100%;
                    padding: 0;
                    list-style: none;
                    width: 250px;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 20px;

                    &-atag {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        text-decoration: none;
                        height: 40px;
                        padding: 10px;
                        border-radius: 8px;
                        color: #333333;

                        .el-icon {
                            transition: transform .3s ease;
                            font-size: 18px;
                        }
                    }

                    &-atag:hover {
                        background-color: #f3f3f3;
                    }

                    &-atag:hover .el-icon {
                        color: $primary-color;
                        transform: rotate(45deg);
                    }
                }
            }

            &-logo {
                margin: 0 20px;

            }
        }

        &-login {
            display: flex;
            align-items: center;
            margin-right: 50px;
            cursor: pointer;
        }

        &-login:hover {
            color: $primary-color;
        }

        &-user {
            display: flex;
            align-items: center;
            margin-right: 50px;
            cursor: pointer;

            .person {
                display: flex;
                align-items: center;
                .el-icon {
                transition: transform .3s ease;
            }

            }
            .person:hover {
                color: $primary-color;
            }
            
            .person:hover .el-icon {
                transform: rotate(45deg);
            }
        }
    }

    .headerScrollY {
        color: #333333;
        background-color: #fff;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.06);
    }

    .header-section {
        height: 100%;
        color: #fff;

        .videoContainer {
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -100;

            .fullscreenVideo {
                width: 100%;
                height: 100%;
                object-fit: fill
            }
        }
    }

    .section {
        height: 100vh;
        display: flex;
        justify-content: center;

        &-title {
            height: 0;
            position: relative;
            padding-top: 50px;

            .floating-box {
                height: 80px;
                width: 80px;
                position: absolute;
                background-color: $primary-color;
                overflow: hidden;
                border-radius: 50%;

                #inTitle {
                    width: 448px;
                    position: relative;
                    color: #fff;
                    text-shadow: 5px 5px #33333345;
                }
            }
        }
    }

    .footer {
        height: 60vh;
        display: flex;
        justify-content: center;
        background-color: #333333;
        color: #fff;
    }
}

.animation-fb {
    animation-name: mark;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-duration: 8s;
}

@keyframes mark {
    0% {
        transform: translate(-50px, -80px);
    }

    12% {
        transform: translate(-58px, -88px);
    }

    24% {
        transform: translate(-66px, -80px);
    }

    36% {
        transform: translate(-50px, -72px);
    }

    48% {
        transform: translate(-50px, -80px);
    }

    60% {
        transform: translate(-42px, -72px);
    }

    72% {
        transform: translate(-34px, -88px);
    }

    84% {
        transform: translate(-42px, -88px);
    }

    100% {
        transform: translate(-35px, -88px);
    }
}

.animation-inTitle {
    animation-name: zoom_list_big;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-duration: 8s;
}

@keyframes zoom_list_big {
    0% {
        transform: translate(45px, 30px);
    }

    12% {
        transform: translate(53px, 38px);
    }

    24% {
        transform: translate(61px, 30px);
    }

    36% {
        transform: translate(45px, 22px);
    }

    48% {
        transform: translate(45px, 30px);
    }

    60% {
        transform: translate(37px, 22px);
    }

    72% {
        transform: translate(29px, 38px);
    }

    84% {
        transform: translate(37px, 38px);
    }

    100% {
        transform: translate(30px, 38px);
    }
}</style>