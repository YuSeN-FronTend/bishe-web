<template>
    <div class="section">
        <div class="new-title">
            <transitionTitle :transtion-title="'2023年最受欢迎的快递公司汇总'" :transition-id="'one'"/>
        </div>
        <div class="echarts-box">
            <pie />
        </div>
    </div>
    <div class="section">
        <div class="new-title">
            <transitionTitle :transtion-title="'平台年度信息汇总'" :transtion-id="'two'"/>
        </div>
        <div class="echarts-box">
            <totalInfo />
        </div>
    </div>
</template>

<script setup lang="ts">
import transitionTitle from '../../tools/transitionTitle.vue';
import pie from './pie.vue'
import totalInfo from './totalInfo.vue'
</script>
<style lang="scss" scoped>
.section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .new-title {
        width: 100%;
        height: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .echarts-box {
        width: 100%;
        height: 85%;
        padding-top: 60px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>