<template>
    <div class="sendExpressDelivery">
        <div class="sed-box">
            <!-- 寄件 -->
            <div class="sendInfo">
                <div class="sendInfo-left">
                    <div class="sl-header">
                        <div class="slh-circle">寄</div>
                    </div>
                    <el-form :model="sendForm" label-width="120px" @validate="validate" :rules="rules">
                        <el-form-item label="姓名:" prop="sendName">
                            <el-input v-model="sendForm.sendName" placeholder="请填写真实姓名" />
                        </el-form-item>
                        <el-form-item label="联系电话:" prop="sendPhone">
                            <el-input v-model="sendForm.sendPhone" placeholder="请填写手机号码" />
                        </el-form-item>
                        <el-form-item label="省市区:" prop="sendLocation">
                            <el-cascader v-model="sendForm.sendLocation" placeholder="请选择省市区" :options="provAndCity" />
                        </el-form-item>
                        <el-form-item label="详细地址:" prop="sendAddress">
                            <el-input v-model="sendForm.sendAddress" placeholder="请填写详细地址（例如xx街xx号）" />
                        </el-form-item>
                        <!-- <el-form-item>
                    <el-button @click="onSubmit" class="updateBtn">确认更新</el-button>
                    <el-button @click="quitDialog = true">退出登录</el-button>
                </el-form-item> -->
                    </el-form>
                </div>
                <div>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAKCAYAAADGmhxQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE4SURBVHgBzVPbbcMwDJT8UAB/JRO0K/S3Xx2hK3iDeIKO4KKfttGiixXoBh3AtnonkAKjBRwCAinxRJ6OkHN3bt4dZOM4nruu+/HeX7Ai7Ldt26e+7/8srnIH2TAMJPLBGOQo1OO6rm8l7jCCtBDCO1xWDESv8zy/WMyhBGWc3xhx2suov2BnxTTTND0jEZA4VVWVPPf7vgc9p9cYd1os+kAv5xnHc8Hd3CcG/iTYFEuN/A84atiDjHrgWVIQxDIIMV+RkCBZfqJIiJcnI59W2aRUSjDMUSWnipk7NqaM12VZXjNBFIh1XSfUtm0skLQum5BwFDMPSnXplZwlwFKCSefmatQ8Yztmxuj1yVFXTdM4IeYhrfOmOtU0jbw20pcW+yjNNM44Pq4gpyVzrDlRkJsLOI3u3u0fhHXKQMU1lnYAAAAASUVORK5CYII="
                        alt="">
                </div>
                <div class="sendInfo-right">
                    <div class="sr-header">
                        <div class="srh-circle">收</div>
                    </div>
                    <el-form :model="receiveForm" label-width="120px" @validate="validate" :rules="rules">
                        <el-form-item label="姓名:" prop="receiveName">
                            <el-input v-model="receiveForm.receiveName" placeholder="请填写真实姓名" />
                        </el-form-item>
                        <el-form-item label="联系电话:" prop="receivePhone">
                            <el-input v-model="receiveForm.receivePhone" placeholder="请填写手机号码" />
                        </el-form-item>
                        <el-form-item label="省市区:" prop="receiveLocation">
                            <el-cascader v-model="receiveForm.receiveLocation" placeholder="请选择省市区"
                                :options="provAndCity" />
                        </el-form-item>
                        <el-form-item label="详细地址:" prop="receiveAddress">
                            <el-input v-model="receiveForm.receiveAddress" placeholder="请填写详细地址（例如xx街xx号）" />
                        </el-form-item>
                        <!-- <el-form-item>
                    <el-button @click="onSubmit" class="updateBtn">确认更新</el-button>
                    <el-button @click="quitDialog = true">退出登录</el-button>
                </el-form-item> -->
                    </el-form>
                </div>
            </div>
            <!-- 选择寄件公司 -->
            <div class="chooseSendCompany">
                <div class="chooseSendCompany-header">
                    <h3>选择寄件公司</h3>
                </div>
                <div>
                    <el-radio-group v-model="companyName">
                        <el-radio style="margin-bottom: 20px;" v-for="item in allCompany" :key="item.id" :label="item.name" size="large" border>{{
                            item.name }}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <!-- 物品信息 -->
            <div class="goodsInfo">
                <div class="goodsInfo-header">
                    <h3>物品信息</h3>
                    <div class="gh-text" v-if="!infoIsHave">请填写寄收件人信息后选择</div>
                </div>
                <div v-if="infoIsHave" style="margin-top: 20px;">
                    <el-form :model="goodsForm" label-position="top">
                        <el-form-item label="商品名称:">
                            <el-input v-model="goodsForm.goodsName" placeholder="请输入物品名称" style="width: 430px;"
                                @focus="goodsFocus" @blur="goodsBlur" />
                            <div class="popularShipment" :class="{ 'hide': hidePopularShip }" style="z-index: 100;">
                                <div class="ps-title">热门寄件</div>
                                <div class="ps-content">
                                    <div v-for="item in goodsArr" :key="item" class="psc-keyword"
                                        @click="addShipment(item)">
                                        {{ item }}
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="物品总重量:">
                            <el-input-number placeholder="手动输入" data-init="kg" v-model="goodsForm.goodsWeight" :min="1"
                                :max="100" />
                            <el-input-number placeholder="手动输入" v-model="goodsForm.goodsCount" data-init="件" :min="1"
                                :max="100" />
                        </el-form-item>
                    </el-form>
                    <div class="goodsInfo-text">
                        注：重量小体积大时按体积重量收费，实际重量与体积以物品包装后收派员测量结果为准，重量与费用的计算标准 <span class="gt-protocol">详见计费规则</span>
                    </div>
                </div>
            </div>
            <!-- 付款方式 -->
            <div class="paymentMethod">
                <div class="paymentMethod-header">
                    <h3>付款方式</h3>
                </div>
                <el-radio-group v-model="moneyApplyRadio">
                    <el-radio label="send" size="large" border>寄付现结</el-radio>
                    <el-radio label="arrive" size="large" border>到付</el-radio>
                </el-radio-group>
            </div>
            <!-- 备注 -->
            <div class="notes">
                <div class="notes-header">
                    <h3>备注</h3>
                </div>
                <el-input v-model="remark" :maxlength="textLen" placeholder="给商家捎句话吧......" show-word-limit type="text" />
                <div class="notes-keyword">
                    <div class="nk-word" v-for="item in remarkArr" :key="item" @click="addRemark(item)">+{{ item }}</div>
                </div>
            </div>
            <!-- 预估总价 -->
            <div class="estimatedTotalPrice">
                <div class="estimatedTotalPrice-left">
                    <h3>预估总价：</h3>
                    <div class="el-title">¥<span style="font-size: 25px">{{ totalPrice }}</span></div>
                </div>
                <div class="estimatedTotalPrice-right">
                    <el-checkbox v-model="agreement" size="large">阅读并同意<span
                            class="agreement">《电子运单契约条款》</span></el-checkbox>
                    <el-button class="er-btn" :class="{ 'disabled': placeOrder }" :disabled="placeOrder"
                        @click="placeOrderFun">下单</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import provAndCity from '../../area/area.json'
import { ElMessage } from 'element-plus';
import { getCompany, sendExpressDelivery } from '../../../api/expressDelivery'


/**
 * 寄件
 */
let accountInfo:any = sessionStorage.getItem('accountInfo')
const sendForm: any = reactive({
    sendName: '于森',
    sendPhone: '15822288644',
    sendLocation: null,
    sendAddress: '厚园',
})
const receiveForm: any = reactive({
    receiveName: '十一',
    receivePhone: '15633605373',
    receiveLocation: null,
    receiveAddress: '河北工程大学（新校区）',
})
// 寄收件人表单验证
const rules: any = reactive({
    sendName: [
        { required: true, message: '请填写姓名', trigger: 'blur' },
        { min: 2, max: 5, message: '请填写真实的姓名', trigger: 'blur' }
    ],
    sendPhone: [
        { required: true, message: '请填写手机号', trigger: 'blur' },
        { len: 11, message: '手机号应为11位', trigger: 'blur' }
    ],
    sendLocation: [
        { required: true, type: 'array', message: '请填写地址', trigger: 'blur' },
    ],
    sendAddress: [
        { required: true, message: '请填写详细地址', trigger: 'blur' },
    ],
    receiveName: [
        { required: true, message: '请填写姓名', trigger: 'blur' },
        { min: 2, max: 5, message: '请填写真实的姓名', trigger: 'blur' }
    ],
    receivePhone: [
        { required: true, message: '请填写手机号', trigger: 'blur' },
        { len: 11, message: '手机号应为11位', trigger: 'blur' }
    ],
    receiveLocation: [
        { required: true, type: 'array', message: '请填写地址', trigger: 'blur' },
    ],
    receiveAddress: [
        { required: true, message: '请填写详细地址', trigger: 'blur' },
    ]
})
// 表单验证触发函数
let judgeArr: any = reactive([]);
let infoIsHave = ref<boolean>(true);
function validate(key: any, judge: any) {
    if (judge) {
        if (judgeArr.indexOf(key) === -1) {
            judgeArr.push(key);
            if (judgeArr.length === Object.keys(rules).length - 2 && sendForm.sendLocation && receiveForm.receiveLocation) {
                infoIsHave.value = true;
            }
        }
    } else {
        if (judgeArr.indexOf(key) !== -1) {
            judgeArr.splice(judgeArr.indexOf(key), 1)
            infoIsHave.value = false;
        }
    }
}

/**
 * 选择寄件公司
 */
let companyName = ref('');
let allCompany: any = reactive([]);
async function getCompanyFun() {
    try {
        const { data } = await getCompany();
        if (data.code === 200) {
            data.data.forEach((item: any) => {
                allCompany.push(item);
            })
        }
    } catch (error) {
        console.log(error);
    }

}
getCompanyFun();

/**
 * 物品信息
 */
const goodsForm = reactive({
    goodsName: '',
    goodsWeight: 0,
    goodsCount: 0
})
//热门寄件内容
const goodsArr = ['大闸蟹', '文件', '衣服', '发票', '茶叶', '手机', '猕猴桃', '松茸', '柿子', '灯具'];
// 控制热门寄件的现实与隐藏
let hidePopularShip = ref<boolean>(true);
// 物品信息聚焦和失去焦点触发的方法

function goodsFocus() {
    hidePopularShip.value = false;
}
function goodsBlur() {
    setTimeout(() => {
        hidePopularShip.value = true;
    }, 200)
}
// 热门寄件添加
function addShipment(goods: any) {
    goodsForm.goodsName = goods;
}

/**
 *  付款方式
 */
// 付款方式部分单选框
const moneyApplyRadio = ref('send');

/**
 * 备注
 */
let remark: any = ref('');
let textLen = 20;
let remarkArr = ['带文件袋', '带包装袋', '带纸箱', '要爬楼', '上门前请先联系'];
function addRemark(keyword: any) {
    if (remark.value) {
        if ((remark.value + ',' + keyword).length > textLen) {
            ElMessage({
                message: '备注信息不能超过20个字符',
                type: 'warning'
            })
        } else {
            remark.value = remark.value + ',' + keyword
        }
    } else {
        remark.value = remark.value + keyword;
    }
}
/**
 * 预估总价
 */
// 是否同意协议
let agreement = ref<boolean>(false);
// 预估总价
const totalPrice = computed(() => {
    return 5 * goodsForm.goodsCount * goodsForm.goodsWeight || '--';
})
// 下单按钮
const placeOrder = computed(() => {
    let condition = goodsForm.goodsName && goodsForm.goodsWeight && goodsForm.goodsCount;
    return !(infoIsHave.value && condition && agreement.value);
});
// 下单函数
async function placeOrderFun() {
    const params = {
        ...sendForm,
        ...receiveForm,
        ...goodsForm,
        companyName: companyName.value,
        remark: remark.value,
        totalPrice: totalPrice.value,
        moneyApplyRadio: moneyApplyRadio.value,
        user_id: JSON.parse(accountInfo).id
    }
    try {
        const { data } = await sendExpressDelivery(params);
        if (data.code === 200) {
            ElMessage({
                message: data.msg,
                type: 'success'
            })
            clearAllData();
            pageScrollTop();
        }
    } catch (error) {
        console.log(error);
        ElMessage({
            message: '下单失败，请稍后再试！',
            type: 'error'
        })
    }
}
// 清空所有数值按钮
function clearAllData() {
    sendForm.sendName = sendForm.sendPhone = sendForm.sendAddress = '';
    receiveForm.receiveName = receiveForm.receivePhone = receiveForm.receiveAddress = '';
    sendForm.sendLocation = receiveForm.receiveLocation = null;
    companyName.value = goodsForm.goodsName = remark.value ='';
    goodsForm.goodsCount = goodsForm.goodsWeight = 0;
    moneyApplyRadio.value = 'send';
    agreement.value = false;
}
// 滚到顶部
function pageScrollTop() {
    let top = document.querySelector('.sendExpressDelivery')!.parentElement!.scrollTop;
    const timeTop = setInterval(() => {
        document.querySelector('.sendExpressDelivery')!.parentElement!.scrollTop = top -= 10;
        if(top <= 0) {
            clearInterval(timeTop);
        }
    }, 8)
}
</script>
<style lang="scss" scoped>
.sendExpressDelivery {
    margin: 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .sed-box {
        width: 68%;

        .sendInfo {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 35vh;
            margin: 20px 0;

            &-left {
                height: 100%;
                width: 47%;
                background-color: #fff;
                border-radius: 10px;

                .sl-header {
                    margin: 20px;

                    .slh-circle {
                        height: 32px;
                        width: 32px;
                        background-color: #333333;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;

                    }
                }
            }

            &-right {
                height: 100%;
                width: 47%;
                background-color: #fff;
                border-radius: 10px;

                .sr-header {
                    margin: 20px;

                    .srh-circle {
                        height: 32px;
                        width: 32px;
                        background-color: $primary-color;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;

                    }
                }
            }
        }

        .chooseSendCompany {
            width: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
            box-sizing: border-box;

            &-header {
                margin-bottom: 20px;
            }
        }

        .goodsInfo {
            width: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
            box-sizing: border-box;

            &-header {
                display: flex;
                align-items: center;

                .gh-text {
                    margin-left: 20px;
                    font-size: 14px;
                    color: $primary-color;
                }
            }

            &-text {
                font-size: 14px;
                color: #8e8e8e;

                .gt-protocol {
                    color: #333333;
                    cursor: pointer;
                    text-decoration: underline;
                }
            }

            .popularShipment {
                position: absolute;
                top: 35px;
                width: 430px;
                background-color: #fff;
                z-index: 10;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
                border-radius: 10px;
                padding: 10px 0 20px 10px;
                box-sizing: border-box;

                .ps-title {
                    color: #999;
                    margin-bottom: 10px;
                }

                .ps-content {
                    display: flex;
                    flex-wrap: wrap;

                    .psc-keyword {
                        padding: 0px 13px;
                        background-color: #f5f5f5;
                        border: 1px solid #f5f5f5;
                        margin-right: 10px;
                        border-radius: 5px;
                        margin-bottom: 10px;
                        cursor: pointer;
                    }

                    .psc-keyword:hover {
                        border: 1px solid $primary-color;
                        color: $primary-color;
                    }
                }
            }

            .hide {
                display: none;
            }

            :deep(.el-input) {
                width: 100%;
            }

            :deep(.el-input-number) {
                width: 200px;
                height: 50px;
                margin-right: 30px;
            }

            :deep(el-input-number:hover) {
                border-color: $primary-color;
            }

            :deep(.el-input-number__increase:hover) {
                color: $primary-color;
            }

            :deep(.el-input-number__decrease:hover) {
                color: $primary-color;
            }

            :deep(.el-input-number__decrease.is-disabled) {
                color: #a8abb2;
            }

            :deep(.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
                box-shadow: 0 0 0 1px $primary-color inset;
            }

            :deep(.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
                box-shadow: 0 0 0 1px $primary-color inset;
            }

            :deep(.el-input-number__decrease.is-disabled:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
                box-shadow: 0 0 0 1px #dcdfe6 inset;
            }

            :deep(.el-input-number[data-init]::after) {
                content: attr(data-init);
                height: 100%;
                display: flex;
                align-items: center;
                position: absolute;
                top: 0;
                right: 45px;
            }
        }

        .paymentMethod {
            width: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
            box-sizing: border-box;

            &-header {
                margin-bottom: 20px;
            }
        }

        .notes {
            width: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
            box-sizing: border-box;

            &-header {
                margin-bottom: 20px;
            }

            :deep(.el-input) {
                width: 100%;
            }

            :deep(.el-input__wrapper) {
                padding: 7px 11px;
            }

            &-keyword {
                margin-top: 20px;
                display: flex;
                align-items: center;
            }

            .nk-word {
                background: #f5f5f5;
                border-radius: 5px;
                padding: 5px 10px;
                font-size: 14px;
                margin-right: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
            }

            .nk-word:hover {
                color: $primary-color;
                background: #fafafa;
            }
        }

        .estimatedTotalPrice {
            width: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &-left {
                display: flex;
                align-items: center;

                .el-title {
                    font-size: 20px;
                    color: $primary-color;
                }
            }

            &-right {
                display: flex;
                align-items: center;

                .disabled {
                    background-color: #d6d9db !important;
                }

                .agreement {
                    color: $primary-color;
                }

                .er-btn {
                    border: none;
                    height: 40px;
                    width: 180px;
                    border-radius: 5px;
                    background-color: $primary-color;
                    color: #fff;
                    margin-left: 20px;
                }

                .er-btn:hover {
                    background-color: #fa8131db;
                }
            }
        }
    }
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px $primary-color inset;
}

:deep(.el-cascader .el-input.is-focus .el-input__wrapper) {
    box-shadow: 0 0 0 1px $primary-color inset;
}

:deep(.el-input) {
    width: 80%;
}

:deep(.el-cascader) {
    width: 100%;
}

:deep(.el-form-item__content) {
    margin-left: 0 !important;
}

// 单选框
:deep(.el-radio.el-radio--large) {
    width: 145px;
    height: 51px;
}

:deep(.el-radio.el-radio--large:hover .el-radio__inner) {
    border-color: $primary-color;
}

:deep(.el-radio.is-bordered.is-checked) {
    border-color: $primary-color;
}

:deep(.el-radio__input.is-checked+.el-radio__label) {
    color: $primary-color;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
    background: #fff;
    border-color: $primary-color;
}

:deep(.el-radio__inner::after) {
    height: 7px;
    width: 7px;
    background-color: $primary-color;
}

:deep(.el-radio__inner:hover) {
    border-color: $primary-color;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
    color: #606266;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: $primary-color;
    border-color: $primary-color;
}

:deep(.el-checkbox__inner) {
    border-radius: 50%;
}

:deep(.el-checkbox__inner:hover) {
    border-color: $primary-color;
}</style>