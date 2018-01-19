<template>
    <div class="end">
        <div v-if="pos==0" class="end1">
            <div class="taste" v-if="false">
                <div class="end-t">
                    <img class="endImg" :src="canvasImg" alt="">
                    <div class="img-html">
                        <div class="html-top">
                            <img class="userImg" :src="avatarImg" alt="">
                            <p class="p1">感谢您的参与</p>
                            <p class="p2">UU答卷</p>
                        </div>
                        <div class="html-con" :style="{backgroundImage:lastSurveyImg}"></div>
                        <h3 class="thank">谢谢您的参与</h3>
                        <div class="html-bot">
                            <p>我们会及时进行数据分析，调整出现的问题，谢谢！</p>
                        </div>
                    </div>
                </div>
                <div class="end-bot">
                    <button>分享</button>
                </div>
            </div>
            <div class="prize">
                <div class="end-t">
                    <img class="endImg" :src="canvasImg" alt="">
                    <div class="img-html">
                        <div class="html-top">
                            <img class="userImg" :src="avatarImg" alt="">
                            <p class="p1">感谢您的参与</p>
                            <p class="p2">UU答卷</p>
                        </div>
                        <div class="html-con" :style="{backgroundImage:lastSurveyImg}"></div>
                        <h3 class="thank">谢谢您的参与</h3>
                        <div class="html-bot">
                            <p>我们会及时进行数据分析，调整出现的问题，谢谢！</p>
                        </div>
                    </div>
                </div>
                <div class="end-bot">
                    <button>分享</button>
                </div>
            </div>
        </div>
        <div v-if="pos==1" class="end2">
            <div class="taste" v-if="fraction*10<60">
                <div class="end-t">
                    <img class="endImg" :src="canvasImg" alt="">
                    <div class="img-html">
                        <div class="html-top">
                            <img class="userImg" :src="avatarImg" alt="">
                            <p class="p1">我的最终得分</p>
                            <p class="p2">UU预测2018</p>
                        </div>
                        <div class="html-con" :style="{backgroundImage:lastAnswerBg}">
                            <img :src="lastAnswerImg" alt="">
                        </div>
                        <h3 class="fraction">谢谢您的参与</h3>
                        <div class="html-bot">
                            <p>再大的困难也阻挡不上帝对你的恩宠！2018年的你鸿运当头！</p>
                        </div>
                    </div>
                </div>
                <div class="end-bot">
                    <button @click="again">再来一次</button>
                    <button v-if="wx==true">长按图片保存</button>
                    <a ref="save" v-if="wx!=true">成绩保存相册</a>
                </div>
            </div>
            <div class="prize" v-if="fraction*10>=60">
                <div class="end-t">
                    <img class="endImg" :src="canvasImg" alt="">
                    <div class="img-html">
                        <div class="html-top">
                            <img class="userImg" :src="avatarImg" alt="">
                            <p class="p1">我的最终得分</p>
                            <p class="p2">UU预测2018</p>
                        </div>
                        <div class="html-con" :style="{backgroundImage:lastAnswerBg}">
                            <img :src="lastAnswerImg" alt="">
                        </div>
                        <h3 class="fraction">{{fraction*10}}分</h3>
                        <div class="html-bot">
                            <p>再大的困难也阻挡不上帝对你的恩宠！2018年的你鸿运当头！</p>
                        </div>
                    </div>
                </div>
                <div class="end-bot">
                    <button @click="again">再来一次</button>
                    <button v-if="wx==true">长按图片保存</button>
                    <a ref="save" v-if="wx!=true">成绩保存相册</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    import html2canvas from 'html2canvas';
    export default {
        data() {
            return {
                problemAnswer: [3, 1, 2, 3, 0, 2, 2, 1, 0, 2], //正确答案
                fraction: 0, //初始分数
                wx: null, //是否是微信
                canvasImg: '', //canvas生成的图片地址
                lastAnswerBg: '', //尾页背景
                lastAnswerImg: '', //尾页图片
                avatarImg: '', //用户头像
                lastSurveyImg: '' //问卷尾页
            }
        },
        mounted() {
            let state = this.$store.state.mutations;
            console.log(state)
            this.wx = state.weixin;
            if (state.pos == 1) { //如果是答题
                state.answer.forEach((e, i) => { //比对正确答案
                    if (e == this.problemAnswer[i]) {
                        this.fraction++;
                    }
                })
                this.lastAnswerBg = state.lastBg; //尾页背景
                this.lastAnswerImg = state.lastImg; //尾页图片
                this.avatarImg = state.avatar; //尾页头像
                let _this = this;
                // 通过插件将编写好的html结构以及样式转化为canvas，再转为图片，显示在结构中
                html2canvas(document.querySelector('.img-html')).then(function(canvas) {
                    document.body.appendChild(canvas);
                    //使生成的元素不可见
                    canvas.style.cssText += `visibility: hidden;`;
                    _this.canvasImg = canvas.toDataURL("image/png");
                    _this.saveFile(_this.$refs['save'], _this.canvasImg, 'UU答题成绩单')
                })
                console.log(this.fraction * 10)
                console.log(state.answer)
            } else if (state.pos == 0) { //如果是问卷
                this.lastSurveyImg = state.lastSurveyBg; //尾页图片
                this.avatarImg = state.avatar; //尾页头像
                let _this = this;
                // 通过插件将编写好的html结构以及样式转化为canvas，再转为图片，显示在结构中
                html2canvas(document.querySelector('.img-html')).then(function(canvas) {
                    document.body.appendChild(canvas);
                    //使生成的元素不可见
                    canvas.style.cssText += `visibility: hidden;`;
                    _this.canvasImg = canvas.toDataURL("image/png");
                })
                console.log(state.survey)
            }
        },
        methods: {
            again() {
                this.$store.dispatch("problemClean")
                let canvas = document.querySelector('canvas');
                if (canvas) {
                    document.body.removeChild(canvas)
                }
                this.$router.replace({
                    path: 'con'
                })
            },
            saveFile(ele, src, name) {
                ele.href = src;
                ele.download = name;
            }
        },
        computed: { ...mapGetters([
                'pos'
            ])
        }
    }
</script>

<style lang="less">
    @rem: 75rem;
    button {
        border: 0;
        outline: none;
        box-sizing: content-box;
    }
    img {
        display: block;
        border: 0;
    }
    .end {
        width: 100%;
        height: 100%;
        position: absolute;
        .end1,
        .end2 {
            width: 100%;
            height: 100%;
            .taste,
            .prize {
                width: 100%;
                height: 100%;
            }
        }
        .end-t {
            padding-top: 80/@rem;
            position: relative;
            height: 880/@rem;
            .endImg {
                width: 660/@rem;
                height: 880/@rem;
                position: absolute;
                top: 80/@rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10;
                border-radius: 10/@rem;
            }
            .img-html {
                width: 660/@rem;
                height: 880/@rem;
                background: #fff;
                border-radius: 10/@rem;
                position: absolute;
                top: 80/@rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 8;
                .html-top {
                    padding: 20/@rem;
                    text-align: center;
                    position: relative;
                    height: 96/@rem;
                    .userImg {
                        width: 80/@rem;
                        height: 80/@rem;
                        border-radius: 40/@rem;
                        position: absolute;
                        top: 28/@rem;
                        left: 28/@rem;
                    }
                    .p1 {
                        font-size: 36/@rem;
                        color: #666;
                    }
                    .p2 {
                        font-size: 26/@rem;
                        color: #666;
                    }
                }
                .html-con {
                    margin: 0 20/@rem;
                    height: 460/@rem;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    background-position: 0 40%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .fraction {
                    height: 160/@rem;
                    line-height: 160/@rem;
                    font-size: 66/@rem;
                    color: #333;
                    text-align: center;
                }
                .thank {
                    height: 160/@rem;
                    line-height: 160/@rem;
                    font-size: 34/@rem;
                    color: #333;
                    text-align: center;
                }
                .html-bot {
                    p {
                        line-height: 36/@rem;
                        font-size: 28/@rem;
                        color: #333;
                        text-align: center;
                        width: 75%;
                        margin: 0 auto;
                    }
                }
            }
        }
        .end-bot {
            position: absolute;
            bottom: 100/@rem;
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            button,
            a {
                height: 80/@rem;
                line-height: 80/@rem;
                width: 310/@rem;
                text-align: center;
                background: transparent;
                border: 2px solid #fff;
                color: #fff;
                border-radius: 40/@rem;
                font-size: 30/@rem;
            }
        }
    }
    @media all and(max-width:640px) {
        .end {
            .end-t {
                .endImg {
                    width: 560/@rem;
                    height: 780/@rem;
                }
                .img-html {
                    width: 560/@rem;
                    height: 780/@rem;
                    .html-con {
                        height: 380/@rem;
                    }
                    .fraction {
                        height: 140/@rem;
                        line-height: 140/@rem;
                        font-size: 60/@rem;
                    }
                }
            }
        }
    }
</style>
