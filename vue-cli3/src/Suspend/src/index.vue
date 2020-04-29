<template>
    <div class="suspend-button" @click="$emit('handleClick')" @touchstart="tStart" @touchmove="tMove" @touchend="tEnd" ref="suspend" :style="{left:oL+'px',top:oT+'px'}" :class="{'suspend-button-animate':isEnd}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Suspend',
        data() {
            return {
                htmlWidth: document.documentElement.clientWidth,
                htmlHeight: document.documentElement.clientHeight,
                click: false, //是否点击
                move: false, //是否移动
                isEnd: false, //是否移动结束
                suspendInfo: {
                    width: null,
                    height: null,
                    left: null,
                    top: null,
                },
                oW: null,
                oH: null,
                oL: null,
                oT: null,
            }
        },
        mounted() {
            // console.log(this.$refs.suspend, this)
            //https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
            this.$refs.suspend.addEventListener("touchmove", e => {
                if (e.cancelable) {
                    e.preventDefault()
                }
            }, {
                passive: false
            })
        },
        methods: {
            tStart(e) {
                this.click = true;
                let {
                    width,
                    height,
                    left,
                    top
                } = this.$refs.suspend.getBoundingClientRect();
                this.suspendInfo = {
                    width,
                    height,
                    left,
                    top
                }
                let {
                    clientX,
                    clientY
                } = e.touches[0]; //按下位置
                //记录按下位置的所在按钮位置
                this.oW = clientX - left;
                this.oH = clientY - top;
                console.log(this.oW, this.oH)
                //计算按钮定位距离
                this.oL = clientX - this.oW;
                this.oT = clientY - this.oH;
                console.log(this.oL, this.oT)
                this.move = true;
            },
            tMove(e) {
                if (this.move) {
                    this.click = false;
                    this.isEnd = false;
                    let {
                        clientX,
                        clientY
                    } = e.touches[0]; //拖动位置
                    let oL = clientX - this.oW;
                    let oT = clientY - this.oH;
                    let {
                        width,
                        height
                    } = this.suspendInfo;
                    if (oL < 0) { //防止拖出可视区
                        oL = 0;
                    } else if (oL > this.htmlWidth - width) {
                        oL = this.htmlWidth - width;
                    }
                    if (oT < 0) { //防止拖出可视区
                        oT = 0;
                    } else if (oT > this.htmlHeight - height) {
                        oT = this.htmlHeight - height;
                    }
                    this.oL = oL;
                    this.oT = oT;
                    console.log(this.oL, this.oT)
                }
            },
            tEnd() {
                this.isEnd = true;
                this.move = false;
                let {
                    width,
                    height
                } = this.suspendInfo;
                if (this.oL < (this.htmlWidth - width) / 2) {
                    this.oL = 0;
                } else {
                    this.oL = this.htmlWidth - width
                }
            }
        },
        components: {}
    }
</script>

<style lang="less">
    @import url("../less/index.less");
</style>
