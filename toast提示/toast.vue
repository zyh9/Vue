<template>
    <div class="tip_mask">
        <div class="tip zoomIn">{{tips}}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            tips: {
                type: String,
                default: _ => ''
            }
        },
        mounted () {
            // console.log(this.tips)
        }
    }
</script>

<style lang="less">
    @rem: 75rem;
    .tip_mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        z-index: 10;
        .tip {
            padding: 20/@rem 30/@rem;
            border-radius: 8/@rem;
            color: #fff;
            font-size: 24/@rem;
            margin: auto;
            background: rgba(0, 0, 0, .8);
        }
    }
    @-webkit-keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }
        50% {
            opacity: 1;
        }
    }
    @keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }
        50% {
            opacity: 1;
        }
    }
    .zoomIn {
        -webkit-animation-name: zoomIn;
        animation-name: zoomIn;
        -webkit-animation-duration: .8s;
        animation-duration: .8s;
    }
</style>
