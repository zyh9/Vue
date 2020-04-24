<template>
    <div class="z-option">
        <div class="z-option-item" v-for="(v,i) in optionsList" :key="i" @click="handleClick(v,i)">
            <div class="z-item-left">
                <i class="icon" :class="v.iconClass" v-if="v.iconClass"></i>
                <p>{{v.text}}</p>
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
            optionsList: {
                type: Array,
                default: []
            }
        },
        mounted() {},
        methods: {
            handleClick(v, i) {
                console.log(v,i)
            }
        },
        components: {},
        watch: {}
    };
</script>

<style lang="less">
    @import url("../less/index.less");
</style>
