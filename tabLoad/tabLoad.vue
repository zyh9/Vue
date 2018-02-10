<template>
    <div class="transition">
        <div class="z-top moveT" :style="{animationName:'moveTbStr',backgroundColor:aniColor}"></div>
        <div class="z-cen move" :style="{animationName:'moveStr'}"></div>
        <div class="z-bot moveB" :style="{animationName:'moveTbStr',backgroundColor:aniColor}"></div>
        <img class="ready move" :style="{animationName:'readyStr'}" :src="endReady==1?ready2:ready1" alt="">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                aniColor: '', //state里获取到的主题颜色
                ready1: require('../static/other/ready1.png'), //出题中
                ready2: require('../static/other/ready2.png'), //答题结束
                endReady: null //最后一题提示图片切换
            }
        },
        mounted() {
            let state = this.$store.state.mutations;
            this.endReady = state.endNum; //切换为最后一题的数据
            // console.log(this.endReady)
            this.aniColor = state.bgC; //主题颜色
        }
    }
</script>

<style lang="less">
    @rem: 75rem;
    .transition {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        top: 0;
        left: 0;
        .z-top {
            position: absolute;
            top: -80%;
            left: -80%;
            right: -80%;
            bottom: 80%;
            background: #231451;
            z-index: 2;
        }
        .z-cen {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 100%;
            height: 10%;
            background: #ff8b03;
            z-index: 5;
        }
        .z-bot {
            position: absolute;
            top: 80%;
            left: -80%;
            right: -80%;
            bottom: -80%;
            background: #231451;
            z-index: 2;
        }
        .ready {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
            margin: auto;
            width: 250/@rem;
            height: 80/@rem;
            display: block;
            border: 0;
        }
    }
    @keyframes moveStr {
        from {
            transform: rotate(-45deg) scale(2, 0);
        }
        50% {
            transform: rotate(-45deg) scale(2, 2.5);
        }
        to {
            transform: rotate(-45deg) scale(2, 0);
        }
    }
    @keyframes moveTbStr {
        from {
            transform: rotate(-45deg) scale(2, 0);
        }
        50% {
            transform: rotate(-45deg) scale(2, 1);
        }
        to {
            transform: rotate(-45deg) scale(2, 0);
        }
    }
    @keyframes readyStr {
        from {
            transform: rotate(-45deg) translate(-30%, 50%);
            opacity: 0;
        }
        50% {
            transform: rotate(-45deg) translate(0, 50%);
            opacity: 1;
        }
        to {
            transform: rotate(-45deg) translate(30%, 50%);
            opacity: 0;
        }
    }
    .moveT {
        animation-fill-mode: forwards;
        transform-origin: top;
        animation-duration: 0.8s;
        animation-timing-function: ease-in-out;
    }
    .moveB {
        animation-fill-mode: forwards;
        transform-origin: bottom;
        animation-duration: 0.8s;
        animation-timing-function: ease-in-out;
    }
    .move {
        animation-fill-mode: forwards;
        transform-origin: center center;
        animation-duration: 0.8s;
        animation-timing-function: ease-in-out;
    }
</style>
