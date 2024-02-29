<template>
    <div id="barCharts"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { getDashboardBar } from '../../../api/echartsApi';
import { ElMessage } from 'element-plus';
let xArr: any = reactive([]);
let yArr: any = reactive([]);
let maxYArr: any = reactive([]);
async function getData() {
    try {
        const { data } = await getDashboardBar();
        if (data.code === 200) {
            Object.keys(data.data).forEach((item:any) => {
                xArr.push(item);
            })
            Object.values(data.data).forEach((item:any) => {
                maxYArr.push(item);
                yArr.push(item * 0.8);
            })
        }
    } catch (error) {
        console.log(error);
        ElMessage({
            type: 'warning',
            message: '系统正在维护'
        })
    }
}
   getData();

    onMounted(() => {
        let pieCharts: any = document.getElementById('barCharts');
        const { stop } = useIntersectionObserver(pieCharts, ([{ isIntersecting }]: any) => {
            if (isIntersecting) {
                let myChart = echarts.init(pieCharts);
                const CubeLeft = echarts.graphic.extendShape({
                    shape: {
                        x: 0,
                        y: 0,
                    },
                    buildPath: function (ctx, shape) {
                        const xAxisPoint = shape.xAxisPoint;
                        const c0 = [shape.x, shape.y];
                        const c1 = [shape.x - 9, shape.y - 9];
                        const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9];
                        const c3 = [xAxisPoint[0], xAxisPoint[1]];
                        ctx
                            .moveTo(c0[0], c0[1])
                            .lineTo(c1[0], c1[1])
                            .lineTo(c2[0], c2[1])
                            .lineTo(c3[0], c3[1])
                            .closePath();
                    },
                });
                const CubeRight = echarts.graphic.extendShape({
                    shape: {
                        x: 0,
                        y: 0,
                    },
                    buildPath: function (ctx, shape) {
                        const xAxisPoint = shape.xAxisPoint;
                        const c1 = [shape.x, shape.y];
                        const c2 = [xAxisPoint[0], xAxisPoint[1]];
                        const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9];
                        const c4 = [shape.x + 18, shape.y - 9];
                        ctx
                            .moveTo(c1[0], c1[1])
                            .lineTo(c2[0], c2[1])
                            .lineTo(c3[0], c3[1])
                            .lineTo(c4[0], c4[1])
                            .closePath();
                    },
                });
                const CubeTop = echarts.graphic.extendShape({
                    shape: {
                        x: 0,
                        y: 0,
                    },
                    buildPath: function (ctx, shape) {
                        const c1 = [shape.x, shape.y];
                        const c2 = [shape.x + 18, shape.y - 9];
                        const c3 = [shape.x + 9, shape.y - 18];
                        const c4 = [shape.x - 9, shape.y - 9];
                        ctx
                            .moveTo(c1[0], c1[1])
                            .lineTo(c2[0], c2[1])
                            .lineTo(c3[0], c3[1])
                            .lineTo(c4[0], c4[1])
                            .closePath();
                    },
                });
                echarts.graphic.registerShape("CubeLeft", CubeLeft);
                echarts.graphic.registerShape("CubeRight", CubeRight);
                echarts.graphic.registerShape("CubeTop", CubeTop);
                const MAX = maxYArr;
                const VALUE = yArr;
                const option = {
                    backgroundColor: "#fff",
                    title: {
                        text: "",
                        top: 32,
                        left: 18,
                        textStyle: {
                            color: "#00F6FF",
                            fontSize: 24,
                        },
                    },
                    grid: {
                        left: 20,
                        right: 40,
                        bottom: "19%",
                        top: 107,
                        containLabel: true,
                    },
                    xAxis: {
                        type: "category",
                        data: xArr,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "black",
                            },
                        },
                        offset: 20,
                        axisTick: {
                            show: false,
                            length: 9,
                            alignWithLabel: true,
                            lineStyle: {
                                color: "#7DFFFD",
                            },
                        },
                        axisLabel: {
                            fontSize: 15,
                        },
                    },
                    yAxis: {
                        min: 0,
                        type: "value",
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "black",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            fontSize: 16,
                        },
                        boundaryGap: ["20%", "20%"],
                    },
                    series: [
                        {
                            type: "custom",
                            renderItem: function (params: any, api: any) {
                                const location = api.coord([api.value(0), api.value(1)]);
                                return {
                                    type: "group",
                                    children: [
                                        {
                                            type: "CubeLeft",
                                            shape: {
                                                api,
                                                xValue: api.value(0),
                                                yValue: api.value(1),
                                                x: location[0],
                                                y: location[1],
                                                xAxisPoint: api.coord([api.value(0), 0]),
                                            },
                                            style: {
                                                fill: "#dfe4ea",
                                            },
                                        },
                                        {
                                            type: "CubeRight",
                                            shape: {
                                                api,
                                                xValue: api.value(0),
                                                yValue: api.value(1),
                                                x: location[0],
                                                y: location[1],
                                                xAxisPoint: api.coord([api.value(0), 0]),
                                            },
                                            style: {
                                                fill: "#f1f2f6",
                                            },
                                        },
                                        {
                                            type: "CubeTop",
                                            shape: {
                                                api,
                                                xValue: api.value(0),
                                                yValue: api.value(1),
                                                x: location[0],
                                                y: location[1],
                                                xAxisPoint: api.coord([api.value(0), 0]),
                                            },
                                            style: {
                                                fill: "#ecf0f1",
                                            },
                                        },
                                    ],
                                };
                            },
                            data: MAX,
                        },
                        {
                            type: "custom",
                            renderItem: (params, api) => {
                                const location = api.coord([api.value(0), api.value(1)]);
                                return {
                                    type: "group",
                                    children: [
                                        {
                                            type: "CubeLeft",
                                            shape: {
                                                api,
                                                xValue: api.value(0),
                                                yValue: api.value(1),
                                                x: location[0],
                                                y: location[1],
                                                xAxisPoint: api.coord([api.value(0), 0]),
                                            },
                                            style: {
                                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                    {
                                                        offset: 0,
                                                        color: "#f39c12",
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: "#f6b93b",
                                                    },
                                                ]),
                                            },
                                        },
                                        {
                                            type: "CubeRight",
                                            shape: {
                                                api,
                                                xValue: api.value(0),
                                                yValue: api.value(1),
                                                x: location[0],
                                                y: location[1],
                                                xAxisPoint: api.coord([api.value(0), 0]),
                                            },
                                            style: {
                                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                    {
                                                        offset: 0,
                                                        color: "#fa8231",
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: "#f6b93b",
                                                    },
                                                ]),
                                            },
                                        },
                                        {
                                            type: "CubeTop",
                                            shape: {
                                                api,
                                                xValue: api.value(0),
                                                yValue: api.value(1),
                                                x: location[0],
                                                y: location[1],
                                                xAxisPoint: api.coord([api.value(0), 0]),
                                            },
                                            style: {
                                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                    {
                                                        offset: 0,
                                                        color: "#fa8231",
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: "#f6b93b",
                                                    },
                                                ]),
                                            },
                                        },
                                    ],
                                };
                            },
                            data: VALUE,
                        },
                        {
                            type: "bar",
                            label: {
                                normal: {
                                    show: true,
                                    position: "top",
                                    formatter: (e) => {
                                        switch (e.name) {
                                            case "10kV线路":
                                                return VALUE[0];
                                            case "公用配变":
                                                return VALUE[1];
                                            case "35kV主变":
                                                return VALUE[2];
                                            case "水":
                                        }
                                    },
                                    fontSize: 16,
                                    color: "#000",
                                    offset: [4, -25],
                                },
                            },
                            itemStyle: {
                                color: "transparent",
                            },
                            data: MAX,
                        },
                    ],
                };
                myChart.setOption(option);
                window.addEventListener('resize', () => {
                    myChart.resize();
                })
                stop();
            }
        })

    })
</script>
<style lang="scss" scoped>
#barCharts {
    height: 100%;
    width: 70%;
}
</style>