<template>
    <div class="map">
        <div id="myMap"></div>
    </div>
</template>
<script type="text/javascript">
</script>
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, onUnmounted } from 'vue';
// @ts-ignore
window._AMapSecurityConfig = {
    securityJsCode: "b8c163b31ec8ba11103a5a9b1d3cb4e6",
};
const props = defineProps(['sendLocation', 'receiveLocation'])
let map: any = null;
onMounted(() => {
    AMapLoader.load({
        key: "cd7289996908fef3c58974833636c0f1", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Driving"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap: any) => {
        map = new AMap.Map('myMap', {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            center: [116.397428, 39.90923],//地图中心点
        })
        AMap.plugin("AMap.Driving", function () {
            var driving = new AMap.Driving({
                policy: 0, //驾车路线规划策略，0是速度优先的策略
            });
            var points = [
                { keyword: props.sendLocation[props.sendLocation.length - 1], city: props.sendLocation[0] },
                { keyword: props.receiveLocation[props.receiveLocation.length - 1], city: props.receiveLocation[0] }
            ];
            driving.search(points, function (status: any, result: any) {
                //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
                //查询成功时，result 即为对应的驾车导航信息
                if (status === "complete") {
                    console.log("绘制驾车路线完成", result)
                } else {
                    console.log("获取驾车数据失败：" + result)
                }
            });
        });
        const driving = new AMap.Driving({
            map: map,
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: 0,
            // panel 指定将结构化的路线详情数据显示的对应的DOM上，传入值需是DOM的ID
        })
        // 根据起终点经纬度或者模糊地址规划驾车导航路线;
        driving.search(
            [
                { keyword: props.sendLocation[props.sendLocation.length - 1], city: props.sendLocation[0] },
                { keyword: props.receiveLocation[props.receiveLocation.length - 1], city: props.receiveLocation[0] }
            ],
            function (status: any, result: any) {
                // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === "complete") {
                    console.log("绘制驾车路线完成", result)
                } else {
                    console.log("获取驾车数据失败：" + result)
                }
            }
        )
    }).catch((e: any) => {
        console.log(e);
    })
})
onUnmounted(() => {
    map?.destroy();
})
</script>
<style lang="scss" scoped>
.map {
    height: 100%;
    width: 100%;

    #myMap {
        height: 100%;
        width: 100%;
        padding: 0;
    }

    #panel {
        position: fixed;
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        top: 10px;
        right: 10px;
        width: 280px;
    }

    #panel .amap-call {
        background-color: #009cf9;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    #panel .amap-lib-driving {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        overflow: hidden;
    }
}
:deep(.amap-copyright) {
    display: none !important;
}
:deep(.amap-logo) {
    display: none !important;
}
</style>