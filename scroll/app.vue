<template>
    <div class="scroll">
        <div class="btn-list">
            <button @click="add">增加</button>
            <button @click="remove">删除</button>
        </div>
        <transition-group class="scroll-list" name="list" tag="ul">
            <li v-for="item in list" ref="lis" class="list-item" :key="item.prizeName">
                <img :src="item.userPhoto" alt="">
                <span>恭喜{{item.userName}}获得了{{item.prizeName}}</span>
            </li>
        </transition-group>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [{
                        userPhoto: 'https://avatars2.githubusercontent.com/u/26808622',
                        userName: '张三',
                        prizeName: '111'
                    },
                    {
                        userPhoto: 'https://avatars2.githubusercontent.com/u/26808622',
                        userName: '李四',
                        prizeName: '222'
                    }
                ],
                urlObj: {},
                n: 0
            }
        },
        mounted() {},
        methods: {
            add() {
                this.n++;
                this.list.push({
                    userPhoto: 'https://avatars2.githubusercontent.com/u/26808622',
                    userName: `小${this.n}`,
                    prizeName: this.n
                })
                console.log(this.list)
            },
            remove() {
                this.list.shift()
            },
            computed() {
                // 当请求过来的数据大于2条
                if (this.list.length > 2) {
                    this.remove()
                    setTimeout(_ => {
                        this.add()
                    }, 1200)
                }
            }
        },
        components: {},
        watch: {
            list: {
                handler: function(val, oldVal) {
                    this.list = val;
                    this.computed()
                }
            },
            deep: true
        }
    }
</script>

<style lang="less">
    @rem: 75rem;
    .btn-list {
        margin: 50/@rem 0;
        button {
            width: 80/@rem;
            height: 50/@rem;
            box-sizing: content-box;
            border: 1px solid #333;
            border-radius: 8/@rem;
            background: rgb(82, 185, 245);
            color: #fff;
            font-size: 24/@rem;
            outline: none;
            margin-left: 20/@rem;
        }
    }
    .scroll-list {
        height: 160/@rem; // overflow: hidden;
        .list-item {
            background: rgba(0, 0, 0, .5);
            width: 50%;
            padding: 0 10/@rem;
            height: 60/@rem;
            margin-bottom: 20/@rem;
            border-radius: 30/@rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            transition: all 1s;
            img {
                width: 40/@rem;
                height: 40/@rem;
                border-radius: 20/@rem;
                margin: 0 20/@rem;
            }
            span {
                color: #fff;
                font-size: 24/@rem;
                width: 70%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
    @keyframes moveLeft {
        from {
            opacity: 0;
            transform: translate(200%, 0)
        }
        to {
            opacity: 1;
            transform: translate(0, 0)
        }
    }
    @keyframes moveTop {
        from {
            opacity: 1;
            transform: translate(0, 0)
        }
        to {
            opacity: 0;
            transform: translate(0, -200%)
        }
    } //进入动效
    .list-enter-active {
        animation-name: moveLeft;
        animation-duration: .8s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    } //离开动效
    .list-leave-active {
        animation-name: moveTop;
        animation-duration: .8s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards; //依照官网
        transition: all 1s;
        position: absolute; // display: inline-block;
    }
</style>
