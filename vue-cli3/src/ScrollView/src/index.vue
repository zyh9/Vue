<template>
    <div class="scroll-view-con">
        <div class="scroll-view wrap" ref="wrap">
            <div class="scroll_list" ref="list">
                <div class="scroll_item" v-for="(v,i) in 10" :key="i" @click="handleSelect(i)" ref="item">
                    <span :class="{'active':selectIndex==i}">选项{{i}}</span>
                </div>
            </div>
        </div>
        <div class="scroll-view-options">
            <div class="options—item" v-for="(v,i) in 10" :key="i" @click="handleSelect(i)" :class="{'active':selectIndex==i}">选项{{i}}</div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "ScrollView",
        data() {
            return {
                selectIndex: 0,
                scroll: null
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.InitTabScroll();
            })
        },
        methods: {
            InitTabScroll() {
                let width = 0
                for (let i = 0; i < 10; i++) {
                    width += this.$refs.item[i].getBoundingClientRect().width;
                }
                this.$refs.list.style.width = `${width}px`
                this.$nextTick(() => {
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
                })
            },
            handleSelect(i) {
                // better-scroll 提供三个动画 swipe swipeBounce bounce
                // let scrollX = Math.floor(this.$refs.item[i].getBoundingClientRect().left);
                // console.log(scrollX)
                // this.scroll.scrollTo(-scrollX, 0, 200,'swipe')
                if (this.selectIndex == i) return;
                this.scroll.scrollToElement(this.$refs.item[i], 300, true, true, 'swipe')
                this.selectIndex = i;
            }
        },
        components: {}
    }
</script>

<style lang="less">
    @import url('../less/index.less');
</style>
