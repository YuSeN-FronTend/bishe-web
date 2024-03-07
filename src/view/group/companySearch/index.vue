<template>
    <div class="searchExpressDelivery">
        <div class="sed">
            <div class="sed-header">
                <el-input v-model="searchInput" placeholder="请按运单号进行查询" />
                <button class="sh-btn" @click="searchOrder">查询</button>
            </div>
            <div class="sed-content" v-loading="loading" v-if="isShow">
                <div class="sedc-data" v-for="item in waybillArr" :key="item.id">
                    <div class="sedcd-left">
                        <div class="sedcdl-left">
                            <div class="one">运单号 {{ item.trackNumber }} <button class="one-btn"
                                    @click="handleCopy(item.trackNumber)">复制</button></div>
                            <div class="two">{{ item.sendLocation[item.sendLocation.length - 2] }}</div>
                            <div class="three">{{ item.sendName }}</div>
                        </div>
                        <div class="sedcdl-center">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAKCAYAAADGmhxQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE4SURBVHgBzVPbbcMwDJT8UAB/JRO0K/S3Xx2hK3iDeIKO4KKfttGiixXoBh3AtnonkAKjBRwCAinxRJ6OkHN3bt4dZOM4nruu+/HeX7Ai7Ldt26e+7/8srnIH2TAMJPLBGOQo1OO6rm8l7jCCtBDCO1xWDESv8zy/WMyhBGWc3xhx2suov2BnxTTTND0jEZA4VVWVPPf7vgc9p9cYd1os+kAv5xnHc8Hd3CcG/iTYFEuN/A84atiDjHrgWVIQxDIIMV+RkCBZfqJIiJcnI59W2aRUSjDMUSWnipk7NqaM12VZXjNBFIh1XSfUtm0skLQum5BwFDMPSnXplZwlwFKCSefmatQ8Yztmxuj1yVFXTdM4IeYhrfOmOtU0jbw20pcW+yjNNM44Pq4gpyVzrDlRkJsLOI3u3u0fhHXKQMU1lnYAAAAASUVORK5CYII=">
                            <div class="good">{{ item.companyName }}</div>
                        </div>
                        <div class="sedcdl-right">
                            <div class="one">签收时间 {{ item.orderTime }}</div>
                            <div class="two">{{ item.receiveLocation[item.receiveLocation.length - 2] }}</div>
                            <div class="three">{{ item.receiveName }}</div>
                        </div>
                    </div>
                    <div class="sedcd-right">
                        <el-icon @click="clickDelDialog(item.id)">
                            <Icon icon="Delete"></Icon>
                        </el-icon>
                        <el-popover placement="top" :title="'评价' + item.companyName" :width="150" trigger="click"
                            @before-enter="showPopover(item.rate)" :hide-after="0">
                            <template #reference>
                                <el-icon>
                                    <Icon icon="Star"></Icon>
                                </el-icon>
                            </template>
                            <div style="display: flex;justify-content: center;">
                                <el-rate v-model="rate" :colors="colors" allow-half @change="rateChange(item.id)" />
                            </div>
                        </el-popover>
                    </div>
                </div>
                <div style="margin-top: 30px;margin-bottom: 20px;" v-if="total">
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :teleported="false"
                        :page-sizes="[5, 10, 20, 50]" :small="false" layout="total, sizes, prev, pager, next, jumper"
                        :background="true" :total="total" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />
                </div>
                <el-empty description="暂无运单信息" v-if="!total" />
            </div>
            <div v-else class="sed-search">
                <div class="seds-map">
                    <Map :sendLocation="orderInfoObj.sendLocation" :receiveLocation="orderInfoObj.receiveLocation"></Map>
                </div>
                <div class="seds-tab"><el-tabs v-model="activeOrder" class="demo-tabs">
                        <el-tab-pane label="运单信息" name="orderInfo"></el-tab-pane>
                        <el-tab-pane label="电子存根" name="electronicStub"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="orderInfo" v-if="activeOrder === 'orderInfo'">
                    <div class="orderInfo-top">
                        <div class="ot-title">
                            <div>{{ orderInfoObj.sendLocation[0] }}</div>
                            <div><img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAKCAYAAADGmhxQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE4SURBVHgBzVPbbcMwDJT8UAB/JRO0K/S3Xx2hK3iDeIKO4KKfttGiixXoBh3AtnonkAKjBRwCAinxRJ6OkHN3bt4dZOM4nruu+/HeX7Ai7Ldt26e+7/8srnIH2TAMJPLBGOQo1OO6rm8l7jCCtBDCO1xWDESv8zy/WMyhBGWc3xhx2suov2BnxTTTND0jEZA4VVWVPPf7vgc9p9cYd1os+kAv5xnHc8Hd3CcG/iTYFEuN/A84atiDjHrgWVIQxDIIMV+RkCBZfqJIiJcnI59W2aRUSjDMUSWnipk7NqaM12VZXjNBFIh1XSfUtm0skLQum5BwFDMPSnXplZwlwFKCSefmatQ8Yztmxuj1yVFXTdM4IeYhrfOmOtU0jbw20pcW+yjNNM44Pq4gpyVzrDlRkJsLOI3u3u0fhHXKQMU1lnYAAAAASUVORK5CYII=">
                            </div>
                            <div>{{ orderInfoObj.receiveLocation[0] }}</div>
                        </div>
                    </div>
                    <div class="orderInfo-bottom">
                        <div class="ob-left">
                            <div class="ol-top">
                                <div class="ot-left">
                                    寄
                                </div>
                                <div class="ot-right">
                                    <div style="font-weight: 500;">{{ orderInfoObj.sendName }}</div>
                                    <div style="font-size: 14px;">{{ orderInfoObj.sendPhone }}</div>
                                </div>
                            </div>
                            <div class="ol-bottom">
                                <div class="ol-left">
                                    收
                                </div>
                                <div class="ol-right">
                                    <div style="font-weight: 500;">{{ orderInfoObj.receiveName }}</div>
                                    <div style="font-size: 14px;">{{ orderInfoObj.receivePhone }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="ob-dash"></div>
                        <div class="ob-right">
                            <div class="or-top">{{ orderInfoObj.sendLocation[0] + orderInfoObj.sendLocation[1] +
                                (orderInfoObj.sendLocation[2] || '') + orderInfoObj.sendAddress }}</div>
                            <div class="or-bottom">{{ orderInfoObj.receiveLocation[0] + orderInfoObj.receiveLocation[1] +
                                (orderInfoObj.receiveLocation[2] || '') + orderInfoObj.receiveAddress }}</div>
                        </div>
                    </div>
                </div>
                <div class="electronicStub" v-else-if="activeOrder === 'electronicStub'">
                    <div id="orderInfo" ref="chartRef">
                        <div class="es-top">
                            <div class="etop-left">
                                <div class="el-top">
                                    <div class="et-left">
                                        寄
                                    </div>
                                    <div class="et-right">
                                        <div style="font-weight: 500;">{{ orderInfoObj.sendName }}</div>
                                        <div style="font-size: 14px;">{{ orderInfoObj.sendPhone }}</div>
                                    </div>
                                </div>
                                <div class="el-bottom">
                                    <div class="eb-left">
                                        收
                                    </div>
                                    <div class="eb-right">
                                        <div style="font-weight: 500;">{{ orderInfoObj.receiveName }}</div>
                                        <div style="font-size: 14px;">{{ orderInfoObj.receivePhone }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="etop-dash"></div>
                            <div class="etop-center">
                                <div class="ec-top">{{ orderInfoObj.sendLocation[0] + orderInfoObj.sendLocation[1] +
                                    (orderInfoObj.sendLocation[2] || '') + orderInfoObj.sendAddress }}</div>
                                <div class="ec-bottom">{{ orderInfoObj.receiveLocation[0] + orderInfoObj.receiveLocation[1]
                                    +
                                    (orderInfoObj.receiveLocation[2] || '') + orderInfoObj.receiveAddress }}</div>
                            </div>
                            <div class="etop-right">
                                <img :src="imageSrc" @load="handleImageLoad">
                            </div>
                        </div>
                        <div class="es-center">
                            <div class="ec-left">
                                <div><span class="topText">托寄物： </span>{{ orderInfoObj.goodsName }}</div>
                                <div><span class="topText">数量： </span>{{ orderInfoObj.goodsCount }}</div>
                                <div><span class="topText">实际重量： </span>{{ orderInfoObj.goodsWeight }}kg</div>
                                <div><span class="topText">计费重量： </span>{{ orderInfoObj.goodsWeight }}kg</div>
                                <div><span class="topText">保价金额： </span>{{ orderInfoObj.totalPrice * 20 }}</div>
                                <div><span class="topText">税费： </span>CNY {{ orderInfoObj.totalPrice * 0.02 }}</div>
                                <div><span class="topText">备注： </span>{{ orderInfoObj.remark }}</div>
                            </div>
                            <div class="ec-right">
                                <div><span class="topText">产品类型： </span>{{ orderInfoObj.companyName }}</div>
                                <div><span class="topText">付款方式： </span>{{ orderInfoObj.moneyApplyRadio === 'send' ? '寄付现结'
                                    :
                                    '到付' }}</div>
                                <div><span class="topText">件数： </span>{{ orderInfoObj.goodsCount }}.0</div>
                                <div><span class="topText">运费： </span>CNY {{ orderInfoObj.totalPrice }}</div>
                                <div><span class="topText">保价费用： </span>{{ Math.trunc(orderInfoObj.totalPrice * 0.05) }}
                                </div>
                                <div><span class="topText">费用合计： </span>CNY {{ orderInfoObj.totalPrice +
                                    Math.trunc(orderInfoObj.totalPrice * 0.05) }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="es-bottom">
                        <button @click="handelChangeTime">
                            <el-icon>
                                <Icon icon="Download"></Icon>
                            </el-icon>
                            下载</button>
                        <button v-print="print">
                            <el-icon>
                                <Icon icon="Printer"></Icon>
                            </el-icon>
                            打印</button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="clickDialog" width="25%" align-center>
            <template #title>
                <div style="font-size: 20px; font-weight: 600;">
                    温馨提示
                </div>
            </template>
            <div style="text-align: center; font-weight: 600;">
                是否删除订单？
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <button @click="clickDialog = false">取消</button>
                    <button @click="confirmDelete">确定</button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { companySearchWaybill, setRate, deleteWaybill, trackOrder } from '../../../api/expressDelivery'
import { ElMessage } from 'element-plus';
import getCityName from '../../tools/getCityName';
import handleCopy from '../../tools/handleCopy';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Map from '../searchExpressDelivery/map/index.vue';
const waybillArr: any = reactive([]);
let loading = ref<Boolean>(false);
let accountInfo: any = sessionStorage.getItem('accountInfo');
// 分页
let currentPage = ref(1);
let pageSize = ref(5);
const total = ref(0);
// 首页传参
function handleSizeChange(page: any) {
    loading.value = true;
    pageSize.value = page;
    getWaybillData()
}
function handleCurrentChange(current: any) {
    loading.value = true;
    currentPage.value = current;
    getWaybillData()
}
// 获取订单数据
async function getWaybillData() {
    const params = {
        companyName: JSON.parse(accountInfo).name,
        currentPage: currentPage.value,
        pageSize: pageSize.value
    }
    // if(waybillArr.length) {
    //     waybillArr.length = 0;
    // }
    try {
        const { data } = await companySearchWaybill(params);
        if (data.code === 200) {
            total.value = data.data.total;
            waybillArr.length = data.data.list.length;
            data.data.list.forEach((item: any, index: any) => {
                item.sendLocation = getCityName(item.sendLocation)
                item.receiveLocation = getCityName(item.receiveLocation);
                waybillArr.splice(index, 1, item);
            })
        }
        console.log(waybillArr);
        
        loading.value = false;
    } catch (error) {
        console.log(error);
        ElMessage({
            message: '系统正在维护！',
            type: 'info'
        })
    }
}
getWaybillData();
// 弹出框声明
let clickDialog = ref<Boolean>(false);
// 删除订单
let waybillId: any = ref(0);
// 触发弹框
function clickDelDialog(id: any) {
    waybillId.value = id;
    clickDialog.value = true;
}
// 确定删除
async function confirmDelete() {
    console.log(waybillId.value);
    const params = {
        id: waybillId.value
    }
    try {
        const { data } = await deleteWaybill(params);
        if (data.code === 200) {
            ElMessage({
                message: data.msg,
                type: 'success'
            })
            getWaybillData();
        } else {
            ElMessage({
                message: data.msg,
                type: 'warning'
            })
        }
    } catch (error) {
        console.log(error);
        ElMessage({
            message: '系统出错！',
            type: 'error'
        })
    }

    clickDialog.value = false
}
// 弹窗评分
const rate: any = ref(0)
const colors = ref(['#7f8c8d', '#f1c40f', '#fa8231']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }\
async function rateChange(id: any) {
    const params = {
        id,
        rate: rate.value
    }
    try {
        const { data } = await setRate(params);
        if (data.code === 200) {
            ElMessage({
                message: data.msg,
                type: 'success'
            })
            loading.value = true;
            getWaybillData();
        } else {
            ElMessage({
                message: '评价失败！',
                type: 'warning'
            })
        }

    } catch (error) {
        console.log(error);
        ElMessage({
            message: '系统出现错误',
            type: 'error'
        })
    }
}
// 弹窗
let closePopover = ref<Boolean>(false);
function showPopover(itemRate: any) {
    closePopover.value = true;
    rate.value = parseFloat(itemRate);
}


// 搜索框
let searchInput: any = ref('');
let timer: any = null;
let isShow = ref<boolean>(true);
let activeOrder: any = ref('orderInfo');
let orderInfoObj: any = ref({});
// 查询订单
async function searchOrder() {
    const params = {
        trackNumber: searchInput.value
    }
    if (searchInput.value) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(async () => {
            try {
                const { data } = await trackOrder(params);
                if (data.code === 200) {
                    if (data.data.length) {
                        ElMessage({
                            message: data.msg,
                            type: 'success'
                        })
                        data.data[0].sendLocation = getCityName(data.data[0].sendLocation);
                        data.data[0].receiveLocation = getCityName(data.data[0].receiveLocation);
                        orderInfoObj.value = data.data[0];
                        isShow.value = false;

                    } else {
                        ElMessage({
                            message: '输入订单号有误！',
                            type: 'warning'
                        })
                    }
                } else {
                    ElMessage({
                        message: data.msg,
                        type: "warning"
                    })
                }

            } catch (error) {
                console.log(error);
                ElMessage({
                    message: '系统出错！',
                    type: "error"
                })

            }
            timer = null;
        }, 500)
    } else {
        ElMessage({
            message: '请输入订单号',
            type: 'warning'
        })
    }

}

// 条形码的替换
let imageSrc = ref('/src/assets/tiaoxingma.png');
function handleImageLoad() {
    imageSrc.value = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${orderInfoObj.value.trackNumber}&includetext=true&textsize=11&height=11`
}

// 打印
const print = {
    id: 'orderInfo',
    popTitle: '订单追踪'
}

// 生成pdf文件
const chartRef = ref();
const handelChangeTime = () => {
  
  // 将元素转换为canvas对象
  html2canvas(chartRef.value, {
    x: -30,
    y: -10,
    useCORS: true
  }).then((canvas) => {
    // 将canvas对象转换为图像
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF()
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    // 将图像添加到PDF文件中
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
       // 保存PDF文件
    pdf.save(`电子存根_${orderInfoObj.value.trackNumber}.pdf`);
  })
}
</script>
<style lang="scss" scoped>
.searchExpressDelivery {
    margin: 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 50px;
    .sed {
        width: 68%;

        &-header {
            background-color: #fff;
            border-radius: 10px;
            margin-bottom: 20px;
            display: flex;
            padding: 20px;

            .sh-btn {
                margin-left: 10px;
                width: 180px;
                border: none;
                border-radius: 5px;
                background-color: $primary-color;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
            }

            .sh-btn:hover {
                background-color: #fa8131db;
            }

            :deep(.el-input) {
                height: 45px;
            }
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
                            display: flex;
                            align-items: center;

                            &-btn {
                                border: 1px solid #dcdee0;
                                background-color: #fff;
                                border-radius: 5px;
                                margin-left: 15px;
                                font-size: 12px;
                                cursor: pointer;
                                padding: 1px 7px;
                            }

                            &-btn:hover {
                                color: $primary-color;
                            }
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
                        text-align: center;
                        width: 85px;

                        .good {
                            font-size: 14px;
                            color: $primary-color;
                        }
                    }

                    .sedcdl-right {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        margin-left: 25px;
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

        &-search {
            background-color: #fff;
            border-radius: 10px;
            padding: 20px 30px;
            .seds-map {
                margin-bottom: 25px;
                height: 600px;
                width: 100%;
            }
            .orderInfo {
                .orderInfo-top {
                    border-bottom: 1px solid #ebedee;

                    .ot-title {
                        display: flex;
                        margin-top: 30px;
                        margin-bottom: 45px;
                    }

                    .ot-title div {
                        width: 90px;
                        font-weight: 500;
                        font-size: 18px;
                    }
                }

                .orderInfo-bottom {
                    display: flex;
                    position: relative;

                    .ob-left {
                        margin-right: 150px;

                        .ol-top {
                            display: flex;
                            align-items: center;
                            margin-top: 20px;
                            margin-bottom: 25px;

                            .ot-left {
                                height: 28px;
                                width: 28px;
                                background-color: #000000;
                                color: #fff;
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-right: 20px;
                            }
                        }

                        .ol-bottom {
                            display: flex;
                            align-items: center;

                            .ol-left {
                                height: 28px;
                                width: 28px;
                                background-color: $primary-color;
                                color: #fff;
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-right: 20px;
                            }
                        }
                    }

                    .ob-dash {
                        height: 38px;
                        border-left: 1px dashed #000000;
                        position: absolute;
                        top: 56px;
                        left: 13px;
                    }

                    .ob-right {
                        .or-top {
                            margin-top: 30px;
                            margin-bottom: 50px;
                            font-size: 14px;
                        }

                        .or-bottom {
                            font-size: 14px;
                        }
                    }
                }
            }

            .electronicStub {
                .es-top {
                    display: flex;
                    position: relative;
                    justify-content: space-between;
                    border-bottom: 1px solid #ebedee;
                    padding-bottom: 40px;

                    .etop-left {
                        margin-right: 150px;

                        .el-top {
                            display: flex;
                            align-items: center;
                            margin-top: 20px;
                            margin-bottom: 25px;

                            .et-left {
                                height: 28px;
                                width: 28px;
                                background-color: #000000;
                                color: #fff;
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-right: 20px;
                            }
                        }

                        .el-bottom {
                            display: flex;
                            align-items: center;

                            .eb-left {
                                height: 28px;
                                width: 28px;
                                background-color: $primary-color;
                                color: #fff;
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-right: 20px;
                            }
                        }
                    }

                    .etop-dash {
                        height: 38px;
                        border-left: 1px dashed #000000;
                        position: absolute;
                        top: 56px;
                        left: 18px;
                    }

                    .etop-center {
                        .ec-top {
                            margin-top: 30px;
                            margin-bottom: 50px;
                            font-size: 14px;
                        }

                        .ec-bottom {
                            font-size: 14px;
                        }
                    }

                    .etop-right {
                        width: 246px;
                        margin: 35px 30px 0 300px;
                    }
                }

                .es-center {
                    display: flex;
                    margin-top: 20px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #ebedee;
                    font-size: 14px;

                    .ec-left {
                        margin-right: 50px;
                    }

                    .topText {
                        color: #8E8E8E;
                        display: inline-block;
                        margin-bottom: 3px;
                    }
                }

                .es-bottom {
                    margin-top: 20px;
                    display: flex;

                    button {
                        border: 1px solid #dcdee0;
                        background-color: #fff;
                        margin-right: 30px;
                        padding: 8px 28px;
                        border-radius: 5px;
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .el-icon {
                            font-size: 16px;
                            margin-right: 8px;
                        }
                    }

                    button:hover {
                        color: $primary-color;
                    }
                }
            }
        }
    }

    .dialog-footer {
        display: flex;
        justify-content: center;

        button {
            border: none;
            padding: 8px 40px;
            border-radius: 5px;
            cursor: pointer;
        }

        button:nth-child(1) {
            margin-right: 5px;
            background-color: #fff;
            border: 1px solid #efefef;
        }

        button:nth-child(2) {
            margin-left: 5px;
            color: #fff;
            background-color: $primary-color;
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
    width: 39% !important;
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

:deep(.el-input__wrapper.is-focus) {
    box-shadow: none;
}

:deep(.el-input__wrapper) {
    box-shadow: none;
    background-color: #f7f8fa;
}

// 分页

:deep(.el-pager li.is-active) {
    color: $primary-color;
}

:deep(.el-pager li:hover) {
    color: $primary-color;
}

:deep(.el-pagination button:hover) {
    color: $primary-color;
}

:deep(.el-select:hover:not(.el-select--disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px $primary-color inset;
}

:deep(.el-select .el-input.is-focus .el-input__wrapper) {
    box-shadow: 0 0 0 1px $primary-color inset !important;
}

:deep(.el-select .el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px $primary-color inset !important;
}

:deep(.el-select-dropdown__item.selected) {
    color: $primary-color;
}

:deep(.el-pagination.is-background .el-pager li.is-active) {
    background-color: $primary-color;
}
// 打印部分样式
.es-top {
    display: flex;
    position: relative;
    justify-content: space-between;
    border-bottom: 1px solid #ebedee;
    padding-bottom: 40px;

    .etop-left {
        .el-top {
            display: flex;
            align-items: center;
            margin-top: 20px;
            margin-bottom: 25px;

            .et-left {
                margin-left: 5px;
                height: 28px;
                width: 28px;
                color: #fff;
                box-shadow: 0 0 5px 2px #ebedee;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 20px;
            }
        }

        .el-bottom {
            display: flex;
            align-items: center;

            .eb-left {
                margin-left: 5px;
                height: 28px;
                width: 28px;
                box-shadow: 0 0 5px 2px #ebedee;
                background-color: $primary-color;
                color: #fff;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 20px;
            }
        }
    }

    .etop-dash {
        height: 38px;
        border-left: 1px dashed #000000;
        position: absolute;
        top: 56px;
        left: 18px;
    }

    .etop-center {
        .ec-top {
            margin-top: 30px;
            margin-bottom: 50px;
            font-size: 14px;
        }

        .ec-bottom {
            font-size: 14px;
        }
    }

    .etop-right {
        width: 246px;
        margin: 35px 30px 0 10px;
    }
}

.es-center {
    display: flex;
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebedee;
    font-size: 14px;

    .ec-left {
        margin-right: 50px;
    }

    .topText {
        color: #8E8E8E;
        display: inline-block;
        margin-bottom: 3px;
    }
}</style>