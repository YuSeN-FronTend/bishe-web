<template>
    <div id="huanEcharts"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { getGoodsCount } from '../../../api/echartsApi';
import { ElMessage } from 'element-plus';
let huanData:any = reactive([]);
async function getData() {
    const { data } = await getGoodsCount();
    if(data.code === 200) {
        for(let key in data.data) {
            huanData.push({
                name: key,
                value: data.data[key]
            })
        }
        
        
    }else {
        ElMessage({
            message: '数据库错误',
            type: 'warning'
        })
    }
}
getData();


onMounted(() => {
    const huanEcharts = document.getElementById('huanEcharts');
    const { stop } = useIntersectionObserver(huanEcharts, ([{ isIntersecting }]: any) => {

        if (isIntersecting) {
            let myCharts = echarts.init(huanEcharts);

            let data = huanData.splice(0,4);
            let arrName = getArrayValue(data, "name");
            let arrValue = getArrayValue(data, "value");
            let sumValue = eval(arrValue.join("+"));
            let objData = array2obj(data, "name");
            let optionData = getData(data);
            function getArrayValue(array: any, key: any) {
                var key = key || "value";
                const res: any = [];
                if (array) {
                    array.forEach(function (t: any) {
                        res.push(t[key]);
                    });
                }
                return res;
            }

            function array2obj(array: any, key: any) {
                let resObj: any = {};
                for (var i = 0; i < array.length; i++) {
                    resObj[array[i][key]] = array[i];
                }
                return resObj;
            }

            function getData(data: any) {
                var res: any = {
                    series: [],
                    yAxis: [],
                };
                for (let i = 0; i < data.length; i++) {
                    // console.log([70 - i * 15 + '%', 67 - i * 15 + '%']);
                    res.series.push({
                        name: "",
                        type: "pie",
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [73 - i * 15 + "%", 68 - i * 15 + "%"],
                        center: ["30%", "55%"],
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            borderWidth: 5,
                        },
                        data: [
                            {
                                value: data[i].value,
                                name: data[i].name,
                            },
                            {
                                value: sumValue - data[i].value,
                                name: "",
                                itemStyle: {
                                    color: "rgba(0,0,0,0)",
                                    borderWidth: 0,
                                },
                                tooltip: {
                                    show: false,
                                },
                                hoverAnimation: false,
                            },
                        ],
                    });
                    res.series.push({
                        name: "",
                        type: "pie",
                        silent: true,
                        z: 1,
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [73 - i * 15 + "%", 68 - i * 15 + "%"],
                        center: ["30%", "55%"],
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            borderWidth: 5,
                        },
                        data: [
                            {
                                value: 7.5,
                                itemStyle: {
                                    color: "#ecf0f1",
                                    borderWidth: 0,
                                },
                                tooltip: {
                                    show: false,
                                },
                                hoverAnimation: false,
                            },
                            {
                                value: 2.5,
                                name: "",
                                itemStyle: {
                                    color: "rgba(0,0,0,0)",
                                    borderWidth: 0,
                                },
                                tooltip: {
                                    show: false,
                                },
                                hoverAnimation: false,
                            },
                        ],
                    });
                    res.yAxis.push(((data[i].value / sumValue) * 100).toFixed(2) + "%");
                }
                return res;
            }
            const option = {
                legend: {
                    show: true,
                    icon: "circle",
                    top: "center",
                    left: "70%",
                    data: arrName,
                    width: 50,
                    padding: [0, 5],
                    itemGap: 25,
                    formatter: function (name: any) {
                        return (
                            "{title|" + name + "}\n{value|" + objData[name].value + "}  {title|项}"
                        );
                    },

                    textStyle: {
                        rich: {
                            title: {
                                fontSize: 16,
                                lineHeight: 15,
                                color: "rgb(0, 178, 246)",
                            },
                            value: {
                                fontSize: 18,
                                lineHeight: 20,
                                color: "#000",
                            },
                        },
                    },
                },
                tooltip: {
                    show: true,
                    trigger: "item",
                    formatter: "{a}<br>{b}:{c}({d}%)",
                },
                color: [
                    "#f6e58d",
                    "#7bed9f",
                    "#70a1ff",
                    "#81ecec",
                ],
                grid: {
                    top: "16%",
                    bottom: "53%",
                    left: "30%",
                    containLabel: false,
                },
                yAxis: [
                    {
                        type: "category",
                        inverse: true,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            interval: 0,
                            inside: true,
                            textStyle: {
                                color: "#000",
                                fontSize: 16,
                            },
                            show: true,
                        },
                        data: optionData.yAxis,
                    },
                ],
                xAxis: [
                    {
                        show: false,
                    },
                ],
                series: optionData.series,
            };
            myCharts.setOption(option);
            window.addEventListener('resize', () => {
                myCharts.resize();
            })
            stop();
        }
    })

})
</script>
<style lang="scss" scoped>
#huanEcharts {
    height: 100%;
    width: 100%;
}
</style>