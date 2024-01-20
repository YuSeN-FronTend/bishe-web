<template>
    <div class="searchExpressDelivery">
        <div class="sed">
            <div class="sed-header">

            </div>
            <div class="sed-content">
                <div class="sedc-tab"><el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
                        <el-tab-pane label="我寄的" name="mySend"></el-tab-pane>
                        <el-tab-pane label="我收的" name="myPutaway"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="sedc-data" v-for="item in waybillArr" :key="item.id">
                    <div class="sedcd-left">
                        <div class="sedcdl-left">
                            <div class="one">运单号 {{ item.trackNumber }}</div>
                            <div class="two">{{ item.sendLocation[item.sendLocation.length - 2] }}</div>
                            <div class="three">{{ item.sendName }}</div>
                        </div>
                        <div class="sedcdl-center">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAKCAYAAADGmhxQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE4SURBVHgBzVPbbcMwDJT8UAB/JRO0K/S3Xx2hK3iDeIKO4KKfttGiixXoBh3AtnonkAKjBRwCAinxRJ6OkHN3bt4dZOM4nruu+/HeX7Ai7Ldt26e+7/8srnIH2TAMJPLBGOQo1OO6rm8l7jCCtBDCO1xWDESv8zy/WMyhBGWc3xhx2suov2BnxTTTND0jEZA4VVWVPPf7vgc9p9cYd1os+kAv5xnHc8Hd3CcG/iTYFEuN/A84atiDjHrgWVIQxDIIMV+RkCBZfqJIiJcnI59W2aRUSjDMUSWnipk7NqaM12VZXjNBFIh1XSfUtm0skLQum5BwFDMPSnXplZwlwFKCSefmatQ8Yztmxuj1yVFXTdM4IeYhrfOmOtU0jbw20pcW+yjNNM44Pq4gpyVzrDlRkJsLOI3u3u0fhHXKQMU1lnYAAAAASUVORK5CYII=">
                            <div class="good">已签收</div>
                        </div>
                        <div class="sedcdl-right">
                            <div class="one">签收时间 {{ item.orderTime }}</div>
                            <div class="two">{{ item.receiveLocation[item.receiveLocation.length - 2] }}</div>
                            <div class="three">{{ item.receiveName }}</div>
                        </div>
                    </div>
                    <div class="sedcd-right">
                        <el-icon>
                            <Icon icon="Delete"></Icon>
                        </el-icon>
                        <el-icon>
                            <Icon icon="Star"></Icon>
                        </el-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { searchWaybill } from '../../../api/expressDelivery'
import { ElMessage } from 'element-plus';
import getCityName from '../../tools/getCityName'
let accountInfo: any = sessionStorage.getItem('accountInfo');
const params = {
    phone: JSON.parse(accountInfo).phone,
    type: 'sendPhone'
}
const waybillArr:any = reactive([]);
async function getWaybillData(params: any) {

    try {
        const { data } = await searchWaybill(params);
        if(data.code === 200) {
            data.data.forEach((item:any) => {
                item.sendLocation = getCityName(item.sendLocation)
                item.receiveLocation = getCityName(item.receiveLocation)
                waybillArr.push(item);
            })
        }
    } catch (error) {
        console.log(error);
        ElMessage({
            message: '系统正在维护！',
            type: 'info'
        })
    }
}
getWaybillData(params);
let activeName: any = ref('mySend');

function tabChange() {

}
</script>
<style lang="scss" scoped>
.searchExpressDelivery {
    margin: 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .sed {
        width: 68%;

        &-header {
            height: 100px;
            background-color: #fff;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        &-content {
            background-color: #fff;
            border-radius: 10px;
            padding: 20px 30px;

            .sedc-data {
                height: 120px;
                border-bottom: 1px solid #ebedee;
                display: flex;
                justify-content: space-between;
                padding-top: 15px;
                .sedcd-left {
                    width: 63%;
                    display: flex;
                    color: #8E8E8E;
                    justify-content: space-between;
                    align-items: center;

                    .sedcdl-left {
                        display: flex;
                        flex-direction: column;

                        .one {
                            font-size: 17px;
                            margin-bottom: 15px;
                        }

                        .two {
                            font-size: 18px;
                            font-weight: 600;
                            color: #333333;
                            margin-bottom: 10px;
                        }

                        .three {
                            font-size: 14px;
                            margin-bottom: 20px;
                        }
                    }

                    .sedcdl-center {
                        .good {
                            font-size: 14px;
                            color: $primary-color;
                        }
                    }

                    .sedcdl-right {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;

                        .one {
                            font-size: 14px;
                            margin-bottom: 17px;
                        }

                        .two {
                            font-size: 18px;
                            font-weight: 600;
                            color: #333333;
                            margin-bottom: 10px;
                        }

                        .three {
                            font-size: 14px;
                            margin-bottom: 18px;
                        }
                    }
                }

                .sedcd-right {
                    display: flex;
                    align-items: center;
                    padding-right: 30px;

                    .el-icon {
                        font-size: 20px;
                        margin-right: 20px;
                        cursor: pointer;
                    }

                    .el-icon:hover {
                        color: $primary-color;
                    }
                }
            }
        }
    }
}

:deep(.el-tabs__nav-scroll) {
    border-bottom: 1px solid #ebedee;
}

:deep(.el-tabs__nav-wrap::after) {
    content: none;
}

:deep(.el-tabs__item) {
    font-size: 20px;
}

:deep(.el-tabs__item:hover) {
    color: $primary-color;
}

:deep(.el-tabs__item.is-active) {
    color: $primary-color;
}

:deep(.el-tabs__active-bar) {
    width: 38% !important;
    left: 0%;
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
}</style>