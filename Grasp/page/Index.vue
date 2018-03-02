<template>
    <div class="index">
        <ul class="list">
            <li v-for="(v,i) in list" :key="i" @click="View(i)">{{v}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: ['模板1', '模板2', '模板3', '模板4', '模板5']
            }
        },
        mounted() {
            if (document.getElementsByTagName('html')[0].getBoundingClientRect().width >= 1250) {
                document.getElementsByTagName('html')[0].style.cssText += `font-size:75px;`;
                document.getElementsByTagName('body')[0].style.cssText += `max-width:750px;margin:0 auto;box-shadow:0 0 3px #333;overflow:hidden;`;
            }
            document.title = '模板选择页';
        },
        methods: {
            View(item) {
                item++;
                this.$router.push({
                    path: '/template/' + item
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @rem: 75rem;
    .list {
        display: flex;
        li {
            flex-grow: 1;
            height: 60/@rem;
            background: #4A8CF8;
            color: #fff;
            font-size: 26/@rem;
            text-align: center;
            line-height: 60/@rem;
            border-radius: 8/@rem;
            float: left;
            margin: 16/@rem;
        }
    }
</style>
