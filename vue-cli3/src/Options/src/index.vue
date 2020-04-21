<template>
    <div class="z-option">
        <div class="z-option-item" v-for="(v,i) in 6" :key="i">
            <div class="z-item-left">
                <img src="" alt="">
                <p>选项{{i}}</p>
            </div>
            <i class="z-icon"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Options",
        data() {
            return {};
        },
        props: {
        },
        mounted() {},
        methods: {
            showAction() {
                this.actionBlock = true;
            },
            hideAction() {
                this.actionBlock = false;
            },
            cancelAction() {
                this.$emit("z-action-cancel", {
                    title: "取消",
                    Boolean: false
                });
            },
            actionItem(v, i) {
                this.$emit("z-action-ok", {
                    text: v.text,
                    index: i
                });
            }
        },
        components: {},
        watch: {}
    };
</script>

<style lang="less">
    @import url("../less/index.less");
</style>
