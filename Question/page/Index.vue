<template>
    <div class="index">
        <div class="question" v-if="number==0">
            <div class="top" :style="{backgroundImage:bannerSurveyTpl}"></div>
            <div class="con" :style="{backgroundImage:conTpl}"></div>
            <div class="action">
                <div class="start-bg" :style="{backgroundImage:startTpl}">
                    <div @click="survey" class="start"></div>
                </div>
                <div class="rule" @click="mask=true">
                    <img class="img-l" :src="askImg" alt="">
                    <p>查看结果</p>
                    <img class="img-r" :src="rightImg" alt="">
                </div>
            </div>
        </div>
        <div class="problem" v-if="number==1">
            <div class="top" :style="{backgroundImage:bannerTpl}"></div>
            <div class="con" :style="{backgroundImage:conTpl}"></div>
            <div class="action">
                <div class="start-bg" :style="{backgroundImage:startTpl}">
                    <div @click="start" class="start"></div>
                </div>
                <div class="rule" @click="mask=true">
                    <img class="img-l" :src="askImg" alt="">
                    <p>活动规则</p>
                    <img class="img-r" :src="rightImg" alt="">
                </div>
            </div>
        </div>
        <div class="maskBg" v-if="mask">
            <div class="mask">
                <p>活动规则</p>
                <ul class="list">
                    <li v-for="(v,i) in rule" :key="i">{{v.txt}}</li>
                </ul>
                <img :src="closeImg" alt="" @click="mask=false">
            </div>
        </div>
        <div class="tipmask" v-if="tips">
            <div class="tip">{{tipsTxt}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                number: null, //问卷and答题索引
                skin: null, //问卷and答题模板
                templates: [{
                        conBg: './static/img1/bg.png', //背景图片
                        bannerImg: './static/img1/title.png', //标题图片--答题
                        bannerSurveyImg: './static/img1/surveyTitle.png', //标题图片--问卷
                        conImg: './static/img1/conBg.png', //主题配图
                        startImg: './static/img1/start.png', //开始答题
                        normalBg: './static/img1/normal.png', //未选中背景
                        checkedBg: './static/img1/checked.png' //已选中背景
                    },
                    {
                        conBg: './static/img2/bg.png', //背景图片
                        bannerImg: './static/img2/title.png', //标题图片--答题
                        bannerSurveyImg: './static/img2/surveyTitle.png', //标题图片--问卷
                        conImg: './static/img2/conBg.png', //主题配图
                        startImg: './static/img2/start.png', //开始答题
                        normalBg: './static/img2/normal.png', //未选中背景
                        checkedBg: './static/img2/checked.png' //已选中背景
                    },
                    {
                        conBg: './static/img3/bg.png', //背景图片
                        bannerImg: './static/img3/title.png', //标题图片--答题
                        bannerSurveyImg: './static/img3/surveyTitle.png', //标题图片--问卷
                        conImg: './static/img3/conBg.png', //主题配图
                        startImg: './static/img3/start.png', //开始答题
                        normalBg: './static/img3/normal.png', //未选中背景
                        checkedBg: './static/img3/checked.png' //已选中背景
                    },
                    {
                        conBg: './static/img4/bg.png', //背景图片
                        bannerImg: './static/img4/title.png', //标题图片--答题
                        bannerSurveyImg: './static/img4/surveyTitle.png', //标题图片--问卷
                        conImg: '', //主题配图
                        startImg: './static/img4/start.png', //开始答题
                        normalBg: './static/img4/normal.png', //未选中背景
                        checkedBg: './static/img4/checked.png' //已选中背景
                    },
                    {
                        conBg: './static/img5/bg.png', //背景图片
                        bannerImg: './static/img5/title.png', //标题图片--答题
                        bannerSurveyImg: './static/img5/surveyTitle.png', //标题图片--问卷
                        conImg: './static/img5/conBg.png', //主题配图
                        startImg: './static/img5/start.png', //开始答题
                        normalBg: './static/img5/normal.png', //未选中背景
                        checkedBg: './static/img5/checked.png' //已选中背景
                    }
                ],
                rule: [{
                    txt: '本次活动的最终解释权由UU跑腿所有。'
                }, {
                    txt: '根据答题正确次数获得积分，每次答对+10分，答错-5分。'
                }],
                askImg: './static/other/ask.png',
                rightImg: './static/other/right.png',
                closeImg: './static/other/close.png',
                userImg: './static/other/user.png', //用户头像
                conBg: './static/img5/bg.png', //背景图片
                bannerImg: './static/img5/title.png', //标题图片--答题
                bannerSurveyImg: './static/img5/surveyTitle.png', //标题图片--问卷
                conImg: './static/img5/conBg.png', //主题配图
                startImg: './static/img5/start.png', //开始答题
                normalBg: './static/img5/normal.png', //未选中背景
                checkedBg: './static/img5/checked.png', //已选中背景
                surveyImg: './static/other/lastSurvey.png', //问卷配图
                mask: false,
                urlObj: {}, //地址栏参数
                weiXin: null, //判断是否是微信
                bannerTpl: '', //标题图片
                bannerSurveyTpl: '', //问卷图片
                normalTpl: '', //未选中图片
                checkedTpl: '', //已选中图片
                conTpl: '', //主题配图
                startTpl: '', //开始答题
                lastBgTpl: '', //尾页背景
                lastImgTpl: '', //尾页图片
                lastSurveyTpl: '', //问卷尾页图片
                userTpl: '', //用户头像
                tips: false, //请求数据失败弹窗
                tipsTxt: '' //请求数据失败弹窗提示
            }
        },
        mounted() {
            //PC设备最小宽度处理
            this.device()
            //获取地址栏参数
            this.urlObj = this.getUrl()
            console.log(this.urlObj)
            //是否是微信
            let u = navigator.userAgent;
            if (u.indexOf('MicroMessenger') != -1) {
                this.weiXin = true;
            } else {
                this.weiXin = false;
            }
            // 如果没有数据，给出一套模拟数据
            if (this.getUrl() == 'nodata') {
                this.number = 1;
                document.body.style.backgroundImage = `url(${this.conBg})`;
                this.bannerTpl = `url(${this.bannerImg})`; //答题banner
                this.bannerSurveyTpl = `url(${this.bannerSurveyImg})`; //问卷banner
                this.conTpl = `url(${this.conImg})`;
                this.startTpl = `url(${this.startImg})`;
                this.tipsTxt = '数据请求失败，请稍后重试';
                this.tips = true;
                return;
            }
            this.number = this.urlObj.id;
            this.skin = this.urlObj.skinId;
            //活动标题
            document.title = '首页';
            document.body.style.backgroundImage = `url(${this.templates[this.skin].conBg})`;
            this.bannerTpl = `url(${this.templates[this.skin].bannerImg})`; //答题banner
            this.bannerSurveyTpl = `url(${this.templates[this.skin].bannerSurveyImg})`; //问卷banner
            this.conTpl = `url(${this.templates[this.skin].conImg})`;
            this.startTpl = `url(${this.templates[this.skin].startImg})`;
            //内容页图片
            this.normalTpl = `url(${this.templates[this.skin].normalBg})`;
            this.checkedTpl = `url(${this.templates[this.skin].checkedBg})`;
            //尾页图片
            this.lastBgTpl = `url(${this.templates[this.skin].conBg})`;
            this.lastImgTpl = `${this.templates[this.skin].conImg}`;
            this.userTpl = `${this.userImg}`;
            this.lastSurveyTpl = `url(${this.surveyImg})`;
        },
        methods: {
            start() {
                this.$store.dispatch("start", [this.number, this.weiXin, this.normalTpl, this.checkedTpl, this.lastBgTpl, this.lastImgTpl, this.userTpl, this.lastSurveyTpl])
                this.$router.push({
                    path: 'con'
                })
            },
            survey() {
                this.start()
            },
            getUrl() {
                let urlHref = window.location.href;
                let urlObj = {};
                if (urlHref.indexOf('?') != -1) {
                    let getArr = urlHref.split('?')[1].split('&');
                    getArr.forEach(e => {
                        if (!(e.split('=')[0] in urlObj)) {
                            urlObj[e.split('=')[0]] = e.split('=')[1];
                        }
                    })
                    return urlObj;
                } else return 'nodata';
            },
            device() {
                if (document.getElementsByTagName('html')[0].getBoundingClientRect().width >= 1250) {
                    document.getElementsByTagName('html')[0].style.cssText += `max-width:750px;margin:0 auto;box-shadow:0 0 3px #333;overflow:hidden;`;
                    document.getElementsByTagName('body')[0].style.cssText += `background-size: 100%;background-repeat: no-repeat;`;
                }
            }
        }
    }
</script>

<style lang="less">
    @rem: 75rem;
    .tipmask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        z-index: 10;
        .tip {
            padding: 20/@rem 30/@rem;
            border-radius: 8/@rem;
            color: #fff;
            font-size: 24/@rem;
            margin: auto;
            background: rgba(0, 0, 0, .8);
        }
    }
    button {
        border: 0;
        outline: none;
        box-sizing: content-box;
    }
    img {
        display: block;
        border: 0;
    }
    body {
        width: 100%;
        height: 100%;
        font-family: Helvetica;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 0 0;
    }
    #app::-webkit-scrollbar {
        display: none;
    }
    .index {
        width: 100%;
        height: 100%;
        position: absolute;
        .question {
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .problem {
            width: 100%;
            height: 100%;
            position: absolute;
            background-size: 100% 100%;
        }
        .top {
            width: 100%;
            height: 322/@rem;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: 0 0;
        }
        .con {
            width: 100%;
            height: 596/@rem;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: 0 0;
        }
        .action {
            position: absolute;
            bottom: 80/@rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .start-bg {
                width: 100%;
                height: 146/@rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position: 0 0;
                margin-bottom: 40/@rem;
                position: relative;
                .start {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 50%;
                    height: 100%;
                }
            }
            .rule {
                display: flex;
                align-items: center;
                height: 42/@rem;
                img {
                    width: 32/@rem;
                    height: 32/@rem;
                }
                p {
                    color: #fff;
                    font-size: 28/@rem;
                }
                .img-l {
                    margin-right: 12/@rem;
                }
                .img-r {
                    margin-left: 6/@rem;
                }
            }
        }
        .maskBg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .7);
            z-index: 5;
            display: flex;
            .mask {
                width: 620/@rem;
                height: 780/@rem;
                margin: 20% auto 0;
                border-radius: 8/@rem;
                position: relative;
                img {
                    width: 60/@rem;
                    height: 60/@rem;
                    position: absolute;
                    left: 50%;
                    bottom: -100/@rem;
                    transform: translateX(-50%);
                }
                p {
                    text-align: center;
                    font-size: 40/@rem;
                    color: #fff;
                    margin: 30/@rem auto;
                }
                .list {
                    padding: 0 50/@rem 0 80/@rem;
                    li {
                        font-size: 24/@rem;
                        line-height: 40/@rem;
                        margin-bottom: 10/@rem;
                        list-style: decimal;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
