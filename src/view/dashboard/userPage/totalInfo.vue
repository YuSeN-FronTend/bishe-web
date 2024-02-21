<template>
    <div class="total-info">
        <div class="four-info">
            <div class="fi-box">
                <h2 class="counter single-counter">36780</h2>
                <span>视频播放总量</span>
            </div>
            <div class="fi-box">
                <h2 class="counter single-counter">6510</h2>
                <span>投放视频播放量</span>
            </div>
            <div class="fi-box">
                <h2 class="counter">789</h2>
                <span>投放视频</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
.total-info {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
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
</style>