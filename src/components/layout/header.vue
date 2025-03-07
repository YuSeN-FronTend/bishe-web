<template>
    <div class="header">
        <div class="header-img" @click="router.push('/dashboard')">
            <img src="../../assets/logo_transparent.png" alt="" style="height: 120px; cursor: pointer;">
        </div>
        <div class="header-box">
            <el-dropdown @visible-change="arrowChange">
                <div class="header-box-img">
                    <img class="image" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                    <span style="display: flex;justify-content: center;">{{accountInfo.name ||accountInfo.username}}<el-icon :class="arrow ? 'arrowTransform' : 'arrowTransformReturn'">
                            <Icon icon="ArrowDown"></Icon>
                        </el-icon></span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <div class="dropdown-box">
                            <img class="downImage" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                            <div class="downText">
                                当前{{ accountInfo.job }}:
                                <br>
                                {{ accountInfo.name ||accountInfo.username }}
                            </div>
                        </div>
                        <el-dropdown-item divided @click="personCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useCar } from '../../store/index'
import { useRouter } from "vue-router";
let accountInfo:any = JSON.parse(sessionStorage.getItem('accountInfo')!);
let router = useRouter()
function quit() {
    if (sessionStorage.getItem('routePath')) {
        sessionStorage.removeItem('routePath')
    }
    if (sessionStorage.getItem('tabRoutes')) {
        sessionStorage.removeItem('tabRoutes')
    }
    if(sessionStorage.getItem('accountInfo')) {
        sessionStorage.removeItem('accountInfo');
    }
    useCar().$reset()
    sessionStorage.removeItem('userInfo')
    router.push('/dashboard');
}
function personCenter() {
    router.push('/personCenter')
}
import { ref } from 'vue'

let arrow = ref(false);
function arrowChange(value: boolean) {
    arrow.value = value
}
</script>

<style lang="scss" scoped>
.header {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;

    &-box {
        width: 170px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-img {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .image {
                height: 50px;
                width: 50px;
                border-radius: 50%;
                cursor: pointer;
                margin-right: 10px;
            }
        }

        &-img:focus {
            outline: none;
        }
    }

    &-box:hover {
        background-color: #e4edfa;
    }
    &-img {
        display: flex;
        align-items: center;
        padding-left: 10px;
    }
}

.dropdown-box {
    display: flex;
    justify-content: center;
    align-items: center;

    .downText {
        margin-right: 10px;
        width: 70px;
    }

    .downImage {
        height: 50px;
        width: 50px;
        border-radius: 10%;
        margin: 5px 10px;
    }
}

.arrowTransform {
    transition: 0.2s;
    transform-origin: center;
    transform: rotateZ(180deg);
}

.arrowTransformReturn {
    transition: 0.2s;
    transform-origin: center;
    transform: rotate(0deg);
}
:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
    color: $primary-color !important;
}
</style>