<template>
    <div class="scroll-view-con">
        <div class="scroll-view wrapper" ref="wrapper">
            <div class="scroll_list content">
                <div class="scroll_item" v-for="(v,i) in 10" :key="i" @click="handleSelect(i)">
                    <span :class="{'active':selectIndex==i}">选项{{i}}</span>
                </div>
            </div>
        </div>
        <div class="scroll-view-options"></div>
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
            this.scroll = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                click: true,
            })
        },
        methods: {
            handleSelect(i) {
                if (this.selectIndex == i) return;
                this.selectIndex = i;
            }
        },
        components: {}
    }
</script>

<style lang="less">
    @import url('../less/index.less');
</style>
