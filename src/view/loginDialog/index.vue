<template>
    <el-dialog v-model="loginDialog" @closed="closed" width="550" :lock-scroll="false" :show-close="false">
        <template #header>
            <div class="dialog-header">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
                    <el-tab-pane label="账号登录" name="account"></el-tab-pane>
                    <el-tab-pane label="用户注册" name="userRegister"></el-tab-pane>
                    <el-tab-pane label="企业注册" name="companyRegister"></el-tab-pane>
                </el-tabs>
                <el-icon @click="closed">
                    <Icon icon="Close"></Icon>
                </el-icon>
            </div>
        </template>
        <div v-if="activeName === 'account'" class="loginPhone">
            <div class="loginPhone-input">
                <div class="li-title">登录后即可免验证快速下单与查件</div>
                <div style="margin-bottom: 25px;">
                    <el-input v-model="username" type="text" placeholder="请输入账号">
                        <template #prefix>
                            <el-icon>
                                <Icon icon="UserFilled"></Icon>
                            </el-icon>
                        </template></el-input>
                </div>
                <div>
                    <el-input v-model="password" type="password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Icon icon="Checked"></Icon>
                            </el-icon>
                        </template></el-input>
                </div>
                <button class="li-btn" @click="loginOrRegisterFun('登录')">快速登录</button>
                <div class="register-box">
                    <div class="register-btn">
                        <span class="rb-test" @click="activeName = 'companyRegister'">未注册企业登录请点击此处注册</span>
                    </div>
                    <div class="register-btn">
                        <span class="rb-test" @click="activeName = 'userRegister'">未注册用户登录请点击此处注册</span>
                    </div>
                </div>
            </div>
            <div class="agreement"><el-checkbox v-model="agreement" size="large" />&nbsp;我已阅读并同意&nbsp; <span
                    class="protocol">《顺丰速运隐私政策》</span>&nbsp;和&nbsp;<span class="protocol">《顺丰速运服务条款》</span></div>
        </div>
        <div v-else-if="activeName === 'userRegister'" class="loginPhone">
            <div class="loginPhone-input">
                <div class="li-title">注册后即可免验证快速下单与查件</div>
                <div style="margin-bottom: 25px;">
                    <el-input v-model="username" type="text" placeholder="请输入账号">
                        <template #prefix>
                            <el-icon>
                                <Icon icon="UserFilled"></Icon>
                            </el-icon>
                        </template></el-input>
                </div>
                <div>
                    <el-input v-model="password" type="password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Icon icon="Checked"></Icon>
                            </el-icon>
                        </template></el-input>
                </div>
                <div style="margin-top: 25px;">
                    <el-input v-model="againPassword" type="password" placeholder="请再次输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Icon icon="Checked"></Icon>
                            </el-icon>
                        </template></el-input>
                </div>
                <button class="li-btn" @click="loginOrRegisterFun('用户注册')">快速注册</button>
                <div class="register-btn">
                    <span class="rb-test" @click="activeName = 'account'">已有账号点击去登录</span>
                </div>
            </div>
            <div class="agreement"><el-checkbox v-model="agreement" size="large" />&nbsp;我已阅读并同意&nbsp; <span
                    class="protocol">《顺丰速运隐私政策》</span>&nbsp;和&nbsp;<span class="protocol">《顺丰速运服务条款》</span></div>
        </div>
        <div v-else-if="activeName === 'companyRegister'" class="loginPhone">
            <div class="loginPhone-input">
                <div class="li-title">注册后即可让用户免验证快速下单与查件</div>
                <div style="margin: 25px 0px;">
                    <el-input v-model="name" type="text" placeholder="请输入企业名">
                        <template #prefix>
                            <el-icon>
                                <Icon icon="OfficeBuilding"></Icon>
                            </el-icon>
                        </template></el-input>
                </div>
                <div style="margin: 25px 0px;">
                    <el-input v-model="username" type="text" placeholder="请输入账号">
                        <template #prefix>
                            <el-icon>
                                <Icon icon="UserFilled"></Icon>
                            </el-icon>
                        </template></el-input>
                </div>
                <div>
                    <el-input v-model="password" type="password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Icon icon="Checked"></Icon>
                            </el-icon>
                        </template></el-input>
                </div>
                <!-- <div style="margin-top: 25px;">
                    <el-input v-model="againPassword" type="password" placeholder="请再次输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Icon icon="Checked"></Icon>
                            </el-icon>
                        </template></el-input>
                </div> -->
                <button class="li-btn" @click="loginOrRegisterFun('企业注册')">快速注册</button>
                <div class="register-btn">
                    <span class="rb-test" @click="activeName = 'account'">已有账号点击去登录</span>
                </div>
            </div>
            <div class="agreement"><el-checkbox v-model="agreement" size="large" />&nbsp;我已阅读并同意&nbsp; <span
                    class="protocol">《顺丰速运隐私政策》</span>&nbsp;和&nbsp;<span class="protocol">《顺丰速运服务条款》</span></div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { loginFun, registerFun } from '../../api/user';
import { ElMessage } from 'element-plus';
import { generateRoutesFromMenu } from '../../router/getRoutes';
import { useRouter } from 'vue-router';
const router = useRouter();
let loginDialog = ref<boolean>(false);
let props = defineProps(['dialog']);
watch(() => props.dialog, (newVal: any) => {
    console.log(newVal);
    loginDialog.value = newVal;
})

// 是否同意协议
const agreement = ref<boolean>(false);

// 注册
let name:any = ref('');
let username: any = ref('');
let password: any = ref('');
let againPassword: any = ref('');
// 清空登录或注册账号密码
function emptyInfo() {
    name.value = '';
    username.value = '';
    password.value = '';
    againPassword.value = '';
}
// 移动tab 
const activeName = ref('account')
const tabChange = () => {
    agreement.value = false;
    emptyInfo();
}
// 快速登录或者快速注册
async function loginOrRegisterFun(type: any) {
    if (agreement.value) {
        if (type === '登录') {
            const params = {
                username: username.value,
                password: password.value
            }
            try {
                const { data } = await loginFun(params);
                if (data.code === 200) {
                    ElMessage({
                        message: data.msg,
                        type: 'success',
                    })
                    sessionStorage.setItem('accountInfo', JSON.stringify(data.data.userInfo));
                    sessionStorage.setItem('userInfo', JSON.stringify({ 'token': data.data.token, 'routeInfo': data.data.routeInfo }))
                    generateRoutesFromMenu(data.data.routeInfo).forEach((item: any) => {
                        router.addRoute(item);
                    })
                    closed();
                } else {
                    ElMessage({
                        message: data.msg,
                        type: 'error',
                    })
                }

            } catch (error) {
                console.log(error);

            }


        } else if (type === '用户注册') {
            userOrCompanyRegister('用户')

        } else if (type === '企业注册') {
            userOrCompanyRegister('企业')
        }
    } else {
        ElMessage({
            message: '请先同意用户协议后再试',
            type: 'warning',
        })
    }
}
// 关闭窗口的回调
const emit = defineEmits(['closed-dialog']);
function closed() {
    emptyInfo()
    emit('closed-dialog', false);
}
// 注册功能
async function userOrCompanyRegister(job: any) {
    if (job === '用户' && password.value === againPassword.value || job === '企业') {
        const params = {
            name: name.value,
            username: username.value,
            password: password.value,
            job
        }
        const { data } = await registerFun(params);
        if (data.code === 200) {
            ElMessage({
                message: data.msg,
                type: 'success',
            })
            activeName.value = 'account';
        } else {
            ElMessage({
                message: data.msg,
                type: 'error',
            })
        }

    } else {
        ElMessage({
            message: '两次密码输入不一致，请检查后再试',
            type: 'warning',
        })
    }
}
</script>
<style lang="scss" scoped>
.loginPhone {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;

    &-input {
        padding: 5px 20px;

        .li-title {
            margin-bottom: 25px;
        }
    }

    .li-btn {
        width: 100%;
        height: 50px;
        margin: 25px 0px;
        border: none;
        background-color: $primary-color;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }

    .register-box {
        display: flex;
        justify-content: space-between;
    }

    .register-btn {
        display: flex;
        justify-content: right;
        font-size: 13px;
        cursor: pointer;
    }

    .rb-test:hover {
        color: $primary-color;
    }

    .agreement {
        display: flex;
        justify-content: center;
        align-items: center;

        .protocol {
            color: $primary-color;
            cursor: pointer;
        }
    }
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    margin-left: 16px;

    .el-icon {
        font-size: 20px;
        color: #333333;
        cursor: pointer;
        transition: transform .3s ease;
    }

    .el-icon:hover {
        color: $primary-color;
        transform: rotate(90deg);
    }
}

:deep(.el-tabs__nav-wrap::after) {
    content: none;
}

:deep(.el-tabs__item) {
    font-size: 24px;
}

:deep(.el-tabs__item:hover) {
    color: $primary-color;
}

:deep(.el-tabs__item.is-active) {
    color: $primary-color;
}

:deep(.el-tabs__active-bar) {
    width: 13% !important;
    left: 7%;
    background-color: $primary-color;
}

:deep(.el-checkbox__inner) {
    border-radius: 50%;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: $primary-color;
    border-color: $primary-color;
}

:deep(.el-checkbox__inner:hover) {
    border-color: $primary-color;
}

:deep(.el-input) {
    height: 45px;
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: none;
}

:deep(.el-input__wrapper) {
    box-shadow: none;
    background-color: #f7f8fa;
}

:deep(.el-icon) {
    height: 2em;
    width: 2em;
    color: $primary-color;
}
</style>