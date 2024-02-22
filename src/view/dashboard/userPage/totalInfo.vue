<template>
    <div class="total-info">
        <div class="four-info">
            <div class="fi-box">
                <h2 class="counter single-counter"><count-to :startVal="0" :endVal="36780" :duration="5000" separator="" :autoplay="false" ref="count1"></count-to></h2>
                <span>年度平台交易总量</span>
            </div>
            <div class="fi-box">
                <h2 class="counter single-counter"><count-to :startVal="0" :endVal="6510" :duration="5000" separator="" :autoplay="false" ref="count2"></count-to></h2>
                <span>年度平台交易总金额</span>
            </div>
            <div class="fi-box">
                <h2 class="counter"><count-to :startVal="0" :endVal="789" :duration="5000" separator="" :autoplay="false" ref="count3"></count-to></h2>
                <span>年度平台消费人次</span>
            </div>
        </div>
        <div class="totalCharts">
            <div class="line">
                <Line />
            </div>
            <div class="huan">
                <Huan/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Line from './line.vue'
import Huan from './Huan.vue';
import {CountTo} from 'vue3-count-to';
import { onMounted, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
let count1:any = ref([]);
let count2:any = ref([]);
let count3:any = ref([]);
onMounted(() => {
    const fourInfo = document.querySelector('.four-info');
    useIntersectionObserver(fourInfo, ([{isIntersecting}]:any) => {
        if(isIntersecting) {
            count1.value.start();
            count2.value.start();
            count3.value.start();
            stop();
        }
    })
})
</script>
<style lang="scss" scoped>
.total-info {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.four-info {
    height: 30%;
    width: 50%;
    display: flex;
    justify-content: center;
    .fi-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        position: relative;
        .counter {
            color: #1a2b3c;
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 7px;
        }
        .single-counter::before{
            width: 1px;
            height: 40px;
            position: absolute;
            content: "";
            background: #c6c7cb;
            right: -10px;
            top: 20px;
            bottom: 0;
        }
    }
}
.totalCharts {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
    .line{
        height: 100%;
        width: 50%;
    }
    .huan {
        height: 100%;
        width: 50%;
    }
}
</style>