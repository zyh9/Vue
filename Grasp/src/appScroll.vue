<template>
    <div class="scroll">
        <vue-seamless :data="listData" :class-option="optionSingleHeight" class="seamless-warp">
            <ul class="item">
                <li v-for="(v,i) in listData" ref="lis" :key="i">
                    <span><img :src="v.img" alt=""></span>
                    <span>{{v.name}}</span>
                    <span>{{v.time}}</span>
                </li>
            </ul>
        </vue-seamless>
        <div class="mask_scroll"></div>
    </div>
</template>

<script>
    import vueSeamless from 'vue-seamless-scroll';
    export default {
        data() {
            return {
                listData: [],
                fontSize: 0, //根节点字号
                height: null, //每次移动的高度
                lisHeight: null //自定义li的高度
            }
        },
        props: {
            list: {
                type: Array,
                default: _ => []
            }
        },
        created() {
            // 再次遇到这个问题，内容后入，请出延时定时器大佬
            setTimeout(_ => {
                //后续再做自定义间距的处理
                this.lisHeight = this.$refs['lis'][0].clientHeight;
                let html = document.getElementsByTagName('html')[0];
                this.fontSize = parseFloat(html.style.fontSize)
                this.height = parseInt(82 / 75 * this.fontSize);
            }, 0)
        },
        mounted() {
            this.listData = this.list;
        },
        computed: {
            optionSingleHeight() {
                return {
                    singleHeight: this.height,
                    hoverStop: false,
                    limitMoveNum: 5
                }
            }
        },
        components: {
            vueSeamless
        }
    }
</script>

<style lang="less">
    @rem: 75rem;
    .scroll {
        position: relative;
    }
    .mask_scroll {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
    }
    .seamless-warp {
        height: 400/@rem;
        overflow: hidden;
        margin-bottom: 50/@rem;
        .item {
            li {
                color: #807778;
                display: flex;
                border-bottom: 2px dashed #eee;
                img {
                    width: 60/@rem;
                    height: 60/@rem;
                    margin: auto;
                    border-radius: 50%;
                    overflow: hidden;
                }
                span {
                    display: flex;
                    width: 34%;
                    padding: 0 5%;
                    text-align: center;
                    font-size: 26/@rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    height: 80/@rem;
                    line-height: 80/@rem;
                }
            }
        }
    }
</style>
