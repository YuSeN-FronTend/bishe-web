<template>
    <div id="lineEcharts"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { getSaleAmount } from '../../../api/echartsApi';
import { ElMessage } from 'element-plus';
let formCount:any = reactive({
    shunfeng: [0,0,0,0,0,0],
    jingdong: [0,0,0,0,0,0],
    zhongguoyouzheng: [0,0,0,0,0,0],
})
async function getData() {
    const { data } = await getSaleAmount();
    if(data.code === 200) {
        data.data.forEach((item:any) => {
        if(item.companyName === '顺丰') {
            formCount.shunfeng[parseInt(item.orderDate.split('-')[1])-1] += item.totalPrice;
        } else if(item.companyName === '京东') {
            formCount.jingdong[parseInt(item.orderDate.split('-')[1])-1] += item.totalPrice;
        } else if(item.companyName === '中国邮政') {
            formCount.zhongguoyouzheng[parseInt(item.orderDate.split('-')[1])-1] += item.totalPrice;
        }
    })
    } else {
        ElMessage({
            message: '数据库错误',
            type: 'warning'
        })
    }
}
getData();

onMounted(() => { 
    const lineEcharts = document.getElementById('lineEcharts');
    const { stop } = useIntersectionObserver(lineEcharts, ([{ isIntersecting }]: any) => {
        if (isIntersecting) {
            let myCharts = echarts.init(lineEcharts);
            const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
            const option = {
                backgroundColor: "#fff",
                title: {
                    text: "全国6月销售统计",
                    textStyle: {
                        fontSize: 12,
                        fontWeight: 400,
                    },
                    left: "center",
                    top: "5%",
                },
                legend: {
                    icon: "circle",
                    top: "5%",
                    right: "5%",
                    itemWidth: 6,
                    itemGap: 20,
                    textStyle: {
                        color: "#556677",
                    },
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        label: {
                            show: true,
                            backgroundColor: "#fff",
                            color: "#556677",
                            borderColor: "rgba(0,0,0,0)",
                            shadowColor: "rgba(0,0,0,0)",
                            shadowOffsetY: 0,
                        },
                        lineStyle: {
                            width: 0,
                        },
                    },
                    backgroundColor: "#fff",
                    textStyle: {
                        color: "#5c6c7c",
                    },
                    padding: [10, 10],
                    extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
                },
                grid: {
                    top: "15%",
                },
                xAxis: [
                    {
                        type: "category",
                        data: ["1月", "2月", "3月", "4月", "5月", "6月"],
                        axisLine: {
                            lineStyle: {
                                color: "#DCE2E8",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: "#556677",
                            },
                            // 默认x轴字体大小
                            fontSize: 12,
                            // margin:文字到x轴的距离
                            margin: 15,
                        },
                        axisPointer: {
                            label: {
                                // padding: [11, 5, 7],
                                padding: [0, 0, 10, 0],
                                /*
                          除了padding[0]建议必须是0之外，其他三项可随意设置
                          
                          和CSSpadding相同，[上，右，下，左]
                          
                          如果需要下边线超出文字，设左右padding即可，注：左右padding最好相同
                          
                          padding[2]的10:
                          
                          10 = 文字距下边线的距离 + 下边线的宽度
                                      
                          如：UI图中文字距下边线距离为7 下边线宽度为2
                          
                          则padding: [0, 0, 9, 0]
                                      
                                      */
                                // 这里的margin和axisLabel的margin要一致!
                                margin: 15,
                                // 移入时的字体大小
                                fontSize: 12,
                                backgroundColor: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#fff", // 0% 处的颜色
                                        },
                                        {
                                            // offset: 0.9,
                                            offset: 0.86,
                                            /*
                            0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
                                                    
                                                    */
                                            color: "#fff", // 0% 处的颜色
                                        },
                                        {
                                            offset: 0.86,
                                            color: "#33c0cd", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#33c0cd", // 100% 处的颜色
                                        },
                                    ],
                                    global: false, // 缺省为 false
                                },
                            },
                        },
                        boundaryGap: false,
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#DCE2E8",
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#556677",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    // {
                    //     type: "value",
                    //     position: "right",
                    //     axisTick: {
                    //         show: false,
                    //     },
                    //     axisLabel: {
                    //         textStyle: {
                    //             color: "#556677",
                    //         },
                    //         formatter: "{value}",
                    //     },
                    //     axisLine: {
                    //         show: true,
                    //         lineStyle: {
                    //             color: "#DCE2E8",
                    //         },
                    //     },
                    //     splitLine: {
                    //         show: false,
                    //     },
                    // },
                ],
                series: [
                    {
                        name: "顺丰",
                        type: "line",
                        data: formCount.shunfeng,
                        symbolSize: 1,
                        symbol: "circle",
                        smooth: true,
                        yAxisIndex: 0,
                        showSymbol: false,
                        lineStyle: {
                            width: 5,
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: "#9effff",
                                },
                                {
                                    offset: 1,
                                    color: "#9E87FF",
                                },
                            ]),
                            shadowColor: "rgba(158,135,255, 0.3)",
                            shadowBlur: 10,
                            shadowOffsetY: 20,
                        },
                        itemStyle: {
                            normal: {
                                color: colorList[0],
                                borderColor: colorList[0],
                            },
                        },
                    },
                    {
                        name: "京东",
                        type: "line",
                        data: formCount.jingdong,
                        symbolSize: 1,
                        symbol: "circle",
                        smooth: true,
                        yAxisIndex: 0,
                        showSymbol: false,
                        lineStyle: {
                            width: 5,
                            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: "#73DD39",
                                },
                                {
                                    offset: 1,
                                    color: "#73DDFF",
                                },
                            ]),
                            shadowColor: "rgba(115,221,255, 0.3)",
                            shadowBlur: 10,
                            shadowOffsetY: 20,
                        },
                        itemStyle: {
                            normal: {
                                color: colorList[1],
                                borderColor: colorList[1],
                            },
                        },
                    },
                    {
                        name: "中国邮政",
                        type: "line",
                        data: formCount.zhongguoyouzheng,
                        symbolSize: 1,
                        // yAxisIndex: 1,
                        symbol: "circle",
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 5,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: "#fe9a",
                                },
                                {
                                    offset: 1,
                                    color: "#fe9a8b",
                                },
                            ]),
                            shadowColor: "rgba(254,154,139, 0.3)",
                            shadowBlur: 10,
                            shadowOffsetY: 20,
                        },
                        itemStyle: {
                            normal: {
                                color: colorList[2],
                                borderColor: colorList[2],
                            },
                        },
                    },
                ],
            };
            myCharts.setOption(option);
            window.addEventListener('resize', () => {
                myCharts.resize();
            })
            stop()
        }
    })

})
</script>
<style lang="scss" scoped>
#lineEcharts {
    height: 100%;
    width: 100%;
}
</style>