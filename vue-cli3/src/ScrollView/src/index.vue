<template>
    <div class="scroll-view-con">
        <div class="scroll-view wrap" ref="wrap">
            <div class="scroll_list" ref="list">
                <div class="scroll_item" v-for="(v,i) in scrollList" :key="i" @click="handleSelect(v,i)" ref="item">
                    <span :class="{'active':selectIndex==i}">{{v}}</span>
                </div>
            </div>
            <div class="other-option" :class="{'rotate':isOptions}" @click="handleOptions">
                <i class="icon-bot"></i>
            </div>
        </div>
        <div class="scroll-view-options" v-if="isOptions">
            <div class="options—item" v-for="(v,i) in scrollList" :key="i" @click="handleSelect(v,i,1)" :class="{'active':selectIndex==i}">{{v}}</div>
        </div>
    </div>
</template>

<script>
    import BScroll from '../utils/bscroll'
    export default {
        name: "ScrollView",
        data() {
            return {
                selectIndex: 0,
                scroll: null,
                isOptions: false
            }
        },
        mounted() {
            // console.log(this.scrollList)
            this.$nextTick(() => {
                this.InitTabScroll();
            })
        },
        props: {
            scrollList: {
                type: Array,
                default: []
            }
        },
        methods: {
            InitTabScroll() {
                let width = 0;
                for (let i = 0; i < this.scrollList.length; i++) {
                    width += this.$refs.item[i].getBoundingClientRect().width;
                }
                this.$refs.list.style.width = `${width}px`
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.wrap, {
                        startX: 0,
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        eventPassthrough: 'vertical'
                    });
                } else {
                    this.scroll.refresh()
                }
            },
            handleSelect(v, i, type) {
                // better-scroll 提供三个动画 swipe swipeBounce bounce
                // let scrollX = Math.floor(this.$refs.item[i].getBoundingClientRect().left);
                // console.log(scrollX)
                // this.scroll.scrollTo(-scrollX, 0, 200,'swipe')
                if (type == 1) {
                    this.handleOptions()
                }
                if (this.selectIndex == i) return;
                this.scroll.scrollToElement(this.$refs.item[i], 300, true, true, 'swipe')
                this.selectIndex = i;
                this.$emit('handleSelect', {
                    index: i,
                    option: v
                })
            },
            handleOptions() {
                this.isOptions = !this.isOptions;
            }
        },
        components: {}
    }
</script>

<style lang="less">
    @import url('../less/index.less');
</style>
