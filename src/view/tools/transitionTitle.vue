<template>
    <div class="section-title" :id="`title${props.transtionId}`">
        <div>
            <h1>{{ props.transtionTitle }}</h1>
        </div>
        <div class="floating-box" :id="`transitionTitle${props.transtionId}`">
            <h1 :id="`inTitle${props.transtionId}`" class="inTitle">{{ props.transtionTitle }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref} from 'vue';
const props = defineProps(['transtionTitle', 'transtionId']);
// 监听鼠标 位置
window.addEventListener('scroll', function () {
    let header: any = document.getElementById('header');
    if (window.scrollY > 0) {
        header.classList.add('headerScrollY');
    } else {
        header.classList.remove('headerScrollY');
    }
});
// 文字悬浮滑动放大
let mouseX = ref(0);
let mouseY = ref(0);
window.addEventListener('mousemove', updateMouseCoords)
function updateMouseCoords(event: any) {
    const title: any = document.getElementById(`title${props.transtionId}`);
    const transitionTitle: any = document.getElementById(`transitionTitle${props.transtionId}`);
    const inTitle: any = document.getElementById(`inTitle${props.transtionId}`);
    let divx2 = title.offsetWidth;
    let divy2 = title.offsetHeight;
    mouseX.value = event.pageX - title.offsetLeft + 15;
    mouseY.value = event.pageY - title.offsetTop - 50;
    if (mouseX.value < 0 || mouseX.value > divx2 || mouseY.value < 0 || mouseY.value > divy2) {
        transitionTitle.classList.add('animation-fb');
        inTitle.classList.add('animation-inTitle');
        transitionTitle.style.transform = `translate(-50px, -80px)`;
        inTitle.style.transform = `translate(45px, 30px)`;
        transitionTitle.style.transition = 'transform 0.9s ease 0s';
        inTitle.style.transition = 'transform 0.9s ease 0s';


    } else {
        transitionTitle.classList.remove('animation-fb');
        inTitle.classList.remove('animation-inTitle');
        transitionTitle.style.transform = `translate(${mouseX.value - 50}px, ${mouseY.value - 80}px)`;
        inTitle.style.transform = `translate(${-mouseX.value + 45}px, ${-mouseY.value + 30}px)`;
        transitionTitle.style.transition = 'transform 0s ease 0s';
        inTitle.style.transition = 'transform 0s ease 0s';
    }
}
onBeforeUnmount(() =>{
    // 在组件卸载前，解绑事件处理函数
    window.removeEventListener('mousemove', updateMouseCoords);
})
</script>
<style lang="scss" scoped>
.section-title {
    height: 0;
    position: relative;
    padding-top: 50px;

    .floating-box {
        height: 80px;
        width: 80px;
        position: absolute;
        background-color: $primary-color;
        overflow: hidden;
        border-radius: 50%;

        .inTitle {
            width: 800px;
            position: relative;
            color: #fff;
            text-shadow: 5px 5px #33333345;
        }
    }
}

.animation-fb {
    animation-name: mark;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-duration: 8s;
}

@keyframes mark {
    0% {
        transform: translate(-50px, -80px);
    }

    12% {
        transform: translate(-58px, -88px);
    }

    24% {
        transform: translate(-66px, -80px);
    }

    36% {
        transform: translate(-50px, -72px);
    }

    48% {
        transform: translate(-50px, -80px);
    }

    60% {
        transform: translate(-42px, -72px);
    }

    72% {
        transform: translate(-34px, -88px);
    }

    84% {
        transform: translate(-42px, -88px);
    }

    100% {
        transform: translate(-35px, -88px);
    }
}

.animation-inTitle {
    animation-name: zoom_list_big;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-duration: 8s;
}

@keyframes zoom_list_big {
    0% {
        transform: translate(45px, 30px);
    }

    12% {
        transform: translate(53px, 38px);
    }

    24% {
        transform: translate(61px, 30px);
    }

    36% {
        transform: translate(45px, 22px);
    }

    48% {
        transform: translate(45px, 30px);
    }

    60% {
        transform: translate(37px, 22px);
    }

    72% {
        transform: translate(29px, 38px);
    }

    84% {
        transform: translate(37px, 38px);
    }

    100% {
        transform: translate(30px, 38px);
    }
}
</style>