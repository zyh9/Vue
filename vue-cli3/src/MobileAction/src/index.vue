<template>
    <div class="z-action">
        <transition enter-active-class="fade-enter" leave-active-class="fade-leave">
            <div class="z-mask" @click.self="cancelAction" v-if="actionBlock">
                <div class="z-popup-bottom">
                    <div class="z-actionsheet">
                        <div class="z-actionsheet-actions">
                            <div class="z-actionsheet-item" v-for="(v,i) in actions" :key="i" @click="actionItem(v,i)">{{v.text}}</div>
                        </div>
                        <div class="za-actionsheet-cancel">
                            <div class="z-actionsheet-item" @click.self="cancelAction">取消</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Actions",
        data() {
            return {
                actionBlock: false
            };
        },
        props: {
            actions: {
                type: Array,
                default: []
            }
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
