<template>
    <div id="app">
        <div class="content" :style="{backgroundColor:templates[number].bgColor}">
            <div class="con-bg" :style="{backgroundImage:`url(${templates[number].conBg})`}">
                <div class="top">
                    <img class="title" :src="templates[number].bannerImg" />
                </div>
                <div class="lottery" :style="{backgroundImage:`url(${templates[number].lotteryBg})`}">
                    <p class="opportunity" :style="{color:templates[number].titleColor}">您还有<span :style="{color:templates[number].titleNumColor}">{{num}}</span>次抽奖机会</p>
                    <ul class="con">
                        <li class="item" :class="v.a==item%8?'itemMask':''" v-for="(v) in left" :key="v.a" :style="{backgroundImage:v.a==item%8?`url(${templates[number].checkedBg})`:`url(${templates[number].itemBg})`}">
                            <div class="img-top">
                                <img :src="v.img" alt="" />
                            </div>
                            <p :style="{color:templates[number].prizeColor}">{{v.info}}</p>
                        </li>
                        <li class="item click" @click="lottery" :style="{backgroundImage:`url(${templates[number].clickBg})`}"></li>
                        <li class="item" :class="v.a==item%8?'itemMask':''" v-for="(v) in right" :key="v.a" :style="{backgroundImage:v.a==item%8?`url(${templates[number].checkedBg})`:`url(${templates[number].itemBg})`}">
                            <div class="img-top">
                                <img :src="v.img" alt="" />
                            </div>
                            <p :style="{color:templates[number].prizeColor}">{{v.info}}</p>
                        </li>
                        <div class="ul-mask" v-if="ulmask"></div>
                    </ul>
                </div>
                <div class="rule">
                    <div class="line">
                        <img :src="templates[number].ruleImg" alt="" />
                        <p :style="{color:templates[number].ruleColor}">活动规则</p>
                    </div>
                    <!-- <div class="rule-con"></div> -->
                    <ul class="rule-con">
                        <li v-for="(value,index) in rule" :key="index" :style="{color:templates[number].ruleColor}">{{value.txt}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mask-bg" v-if="mask">
            <div class="mask bounceIn">
                <div class="mask-top" :style="{backgroundImage:`url(${templates[number].maskBg})`}">
                    <img :src="maskImg" alt="" />
                </div>
                <div class="mask-bot">
                    <p class="p1">{{text1}}</p>
                    <p class="p2">{{text2}}</p>
                    <div class="ok" @click="ok">确定</div>
                </div>
            </div>
        </div>
        <audio :src="templates[number].bgMusic" autoplay="autoplay" loop="loop" ref="music"></audio>
        <div class="music" @click="music" :style="{animationName:musicOnoff?'move':''}">
            <img :src="musicOnoff?templates[number].play:templates[number].mute" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                item: -1, //旋转的位置
                num: 2, //剩余抽奖次数
                onoff: true, //抽奖开关
                n: null, //随机位置
                timer1: null,
                timer2: null,
                pos: 5, //定义慢速的位置
                add: 200, //慢速时间
                low: 100, //快速时间
                mask: false, //遮罩
                ulmask: false, //抽奖遮罩
                rule: [{
                        txt: '此活动仅限郑州地区跑男参与'
                    },
                    {
                        txt: '2017.12.9-2017.12.12，活动期间每接满5单，可获得一次抽奖机会，接单越多抽奖机会越多。'
                    },
                    {
                        txt: '抽奖获得的U币会在1个工作日内发至“U币商城”，可在 “飞人端-U币商城-我的U币”中查看。'
                    },
                    {
                        txt: '获得的现金奖励在1个工作日内到达“账户余额”，可在 “飞人端-账户余额”中查看。'
                    },
                    {
                        txt: '获得的物料奖励请在中奖后7天内到浦发国际2111前台领取。'
                    },
                    {
                        txt: '如有任何问题请与UU跑腿客服联系，客服热线：400-499-7999'
                    }
                ],
                list: [{
                        img: '/static/img1/rmb5.png',
                        info: '5元代金券',
                        txt1: '恭喜您，获得5元代金券',
                        txt2: '快去使用吧'
                    },
                    {
                        img: '/static/img1/rmb10.png',
                        info: '10元代金券',
                        txt1: '恭喜您，获得10元代金券',
                        txt2: '快去使用吧'
                    },
                    {
                        img: '/static/img1/participate.png',
                        info: '谢谢参与',
                        txt1: '很遗憾，未中奖',
                        txt2: '再接再厉'
                    },
                    {
                        img: '/static/img1/rmb5.png',
                        info: '5元代金券',
                        txt1: '恭喜您，获得5元代金券',
                        txt2: '快去使用吧'
                    },
                    {
                        img: '/static/img1/rmb10.png',
                        info: '10元代金券',
                        txt1: '恭喜您，获得10元代金券',
                        txt2: '快去使用吧'
                    },
                    {
                        img: '/static/img1/participate.png',
                        info: '谢谢参与',
                        txt1: '很遗憾，未中奖',
                        txt2: '再接再厉'
                    },
                    {
                        img: '/static/img1/rmb5.png',
                        info: '5元代金券',
                        txt1: '恭喜您，获得5元代金券',
                        txt2: '快去使用吧'
                    },
                    {
                        img: '/static/img1/rmb10.png',
                        info: '10元代金券',
                        txt1: '恭喜您，获得10元代金券',
                        txt2: '快去使用吧'
                    }
                ],
                left: null, //前四组数据
                right: null, //后四组数据
                text1: '',
                text2: '',
                maskImg: null, //弹窗获奖图片
                templates: [{
                        pid: 1,
                        activityTitle: '活动模板一',
                        conBg: '/static/img1/bg.png', //背景图片
                        lotteryBg: '/static/img1/lotterybg.png', //抽奖背景图片
                        itemBg: '/static/img1/normal.png', //未选中背景图片
                        clickBg: '/static/img1/click.png', //立即抽奖背景图片
                        checkedBg: '/static/img1/checked.png', //已选中背景图片
                        maskBg: '/static/img1/mask.png', //弹窗背景图片
                        bgColor: '#660e88', //皮肤底色
                        bannerImg: '/static/img1/banner.png', //标题img
                        ruleImg: '/static/img1/article.png', //规则img
                        bgMusic: '/static/img1/石久让-天空之城.mp3', //背景音乐
                        play: '/static/img1/play.png', //背景音乐播放img
                        mute: '/static/img1/pause.png', //背景音乐暂停img
                        titleColor: '#fff', //抽奖机会颜色
                        titleNumColor: '#fff', //剩余次数颜色
                        prizeColor: '#666', //奖品字体颜色
                        ruleColor: '#fff', //活动规则颜色
                        over: '/static/img1/over.png', //无抽奖次数弹窗图片
                        notWinning: '/static/img1/notWinning.png', //未中奖弹窗图片
                    },
                    {
                        pid: 1,
                        activityTitle: '活动模板二',
                        conBg: '/static/img2/bg.png', //背景图片
                        lotteryBg: '/static/img2/lotterybg.png', //抽奖背景图片
                        itemBg: '/static/img2/normal.png', //未选中背景图片
                        clickBg: '/static/img2/click.png', //立即抽奖背景图片
                        checkedBg: '/static/img2/checked.png', //已选中背景图片
                        maskBg: '/static/img2/mask.png', //弹窗背景图片
                        bgColor: '#ffe433', //皮肤底色
                        bannerImg: '/static/img2/banner.png', //标题img
                        ruleImg: '/static/img2/article.png', //规则img
                        bgMusic: '/static/img2/理查德.克莱德曼-梦中的婚礼.mp3', //背景音乐
                        play: '/static/img2/play.png', //背景音乐播放img
                        mute: '/static/img2/pause.png', //背景音乐暂停img
                        titleColor: '#4d4d4d', //抽奖机会颜色
                        titleNumColor: '#ff5741', //剩余次数颜色
                        prizeColor: '#666', //奖品字体颜色
                        ruleColor: '#333', //活动规则颜色
                        over: '/static/img2/over.png', //无抽奖次数弹窗图片
                        notWinning: '/static/img2/notWinning.png', //未中奖弹窗图片
                    }
                ],
                number: 0, //选择第几套皮肤
                musicOnoff: true //音乐开关
            }
        },
        mounted() {
            this.$nextTick(_ => {
                //自定义顺序
                let arr = [0, 1, 2, 7, 3, 6, 5, 4];
                //插入顺序
                this.list.forEach((e, i) => {
                    e.a = arr[i];
                })
                //前4组数据
                this.left = this.list.slice(0, 4)
                //后4组数据
                this.right = this.list.slice(4)
                // console.log(this.left,this.right)
                //活动名称
                document.title = this.templates[this.number].activityTitle;
                //PC设备最小宽度处理
                this.device()
            })
        },
        methods: {
            lottery() {
                if (this.onoff) {
                    //防止中途点击
                    this.onoff = false;
                    //剩余0次显示遮罩，并提示次数已用完
                    if (this.num == 0) {
                        this.maskImg = this.templates[this.number].over;
                        this.text1 = '您的抽奖次数用完了';
                        this.text2 = '明天再来吧';
                        this.mask = true;
                        return;
                    }
                    this.ulmask = true;
                    this.num--;
                    this.n = Math.round(Math.random() * 10 + 30);
                    // this.n = 22;
                    // console.log(this.n)
                    // console.log(this.pos * this.add, this.pos * this.add + (this.n - this.pos * 2) * this.low)
                    this.timer1 = setInterval(this.speed, this.add)
                    setTimeout(_ => { //加速
                        clearInterval(this.timer1)
                        this.addSpeed()
                    }, this.pos * this.add)
                    setTimeout(_ => { //减速
                        clearInterval(this.timer2)
                        this.lowSpeed()
                    }, this.pos * this.add + (this.n - this.pos * 2) * this.low)
                }
            },
            speed() {
                if (this.item < this.pos) { //小于设定位置
                    this.item++;
                } else
                if (this.item >= this.pos && this.item < this.n - this.pos) { //大于等于设定位置 与 小于最终位置-设定位置
                    this.item++;
                } else
                if (this.item >= this.n - this.pos && this.item < this.n) { //大于等于最终位置-设定位置 与 小于最终位置
                    this.item++;
                    if (this.item == this.n) { //等于最终位置
                        clearInterval(this.timer1)
                        //判断奖品的内容
                        this.list.forEach(e => {
                            if (e.a == this.n % 8) {
                                //如果是谢谢参与，显示未中奖图片
                                if (e.info == "谢谢参与") {
                                    //获取得奖图片，并在遮罩中显示
                                    this.maskImg = this.templates[this.number].notWinning;
                                } else {
                                    this.maskImg = e.img;
                                }
                                //获取得奖文本，并在遮罩中显示
                                this.text1 = e.txt1;
                                this.text2 = e.txt2;
                            }
                        })
                        setTimeout(_ => {
                            this.mask = true;
                        }, 300)
                    }
                }
            },
            addSpeed() { //加速
                clearInterval(this.timer1)
                this.timer2 = setInterval(this.speed, this.low)
            },
            lowSpeed() { //减速
                clearInterval(this.timer2)
                this.timer1 = setInterval(this.speed, this.add)
            },
            ok() {
                //遮罩隐藏
                this.mask = false;
                //抽奖遮罩隐藏
                this.ulmask = false;
                //可以再次点击
                this.onoff = true;
                //初始化初始值
                this.item = -1;
            },
            music() {
                let musicImg = this.$refs['music'];
                if (this.musicOnoff) {
                    musicImg.style.cssText = `transform: rotate(0deg)`;
                    musicImg.pause();
                } else musicImg.play();
                this.musicOnoff = !this.musicOnoff;
            },
            device() {
                let n = navigator.userAgent.toLowerCase();
                // 只有设备是PC端才执行此操作
                if (n.indexOf('iphone') == -1 && n.indexOf('ipad') == -1 && n.indexOf('android') == -1) {
                    document.getElementsByTagName('html')[0].style.cssText = `max-width:750px;margin:0 auto;font-size:75px;box-shadow:0 0 3px #333;overflow:hidden;`;
                    document.getElementsByClassName('lottery')[0].style.cssText += `height:750px`;
                }
            }
        }
    }
</script>

<style lang="less">
    @rem: 75rem;
    #app::-webkit-scrollbar {
        display: none;
    }
    #app {
        width: 100%;
        height: 100%;
        font-family: Helvetica;
        background: #fff;
    }
    input {
        text-align: left;
    }
    .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        .con-bg {
            background-repeat: no-repeat;
            background-size: 100%;
        }
        .top {
            position: relative;
            width: 100%;
            height: 310/@rem;
            img {
                width: 100%;
                height: 100%;
                position: absolute;
            }
        }
        .lottery {
            width: 100%;
            margin: 0 auto;
            height: 100vw;
            position: relative;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            .opportunity {
                position: absolute;
                left: 50%;
                font-size: 26/@rem;
                height: 70/@rem; // line-height: 70/@rem;
                top: 32/@rem;
                transform: translateX(-50%);
                span {
                    margin: 0 8/@rem;
                    font-size: 36/@rem;
                }
            }
            .con {
                position: absolute;
                left: 90/@rem;
                top: 175/@rem;
                right: 90/@rem;
                bottom: 132/@rem;
                .item {
                    width: 32%;
                    height: 32%;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    float: left;
                    margin-right: 2%;
                    margin-bottom: 2%;
                    text-align: center;
                    position: relative;
                    &:nth-of-type(3n) {
                        margin-right: 0%;
                    }
                    .img-top {
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 46/@rem;
                        right: 0;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        img {
                            width: 55%;
                            margin: auto;
                        }
                    }
                    p {
                        font-size: 24/@rem;
                        position: absolute;
                        width: 100%;
                        text-align: center;
                        bottom: 10/@rem;
                        height: 36/@rem;
                        line-height: 36/@rem;
                    }
                }
                .ul-mask {
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: -6/@rem;
                    background: rgba(0, 0, 0, .3);
                    overflow: hidden;
                    z-index: 2;
                }
                .click {
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 100% 100%;
                }
                .itemMask {
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    z-index: 5;
                }
            }
        }
        .rule {
            width: 90%;
            overflow: hidden;
            margin: 60/@rem auto;
            .line {
                text-align: center;
                padding: 30/@rem;
                position: relative;
                img {
                    // width: 200/@rem;
                    height: 60/@rem;
                }
                p {
                    font-size: 28/@rem;
                    font-weight: 700;
                    position: absolute;
                    left: 50%;
                    top: 42/@rem;
                    transform: translateX(-50%);
                    height: 60/@rem; // line-height: 60/@rem;
                }
            }
            .rule-con {
                padding: 0 30/@rem 30/@rem;
                li {
                    font-size: 24/@rem;
                    line-height: 40/@rem;
                    margin-bottom: 10/@rem;
                    list-style: decimal;
                }
            }
        }
    }
    .content::-webkit-scrollbar {
        display: none;
    }
    .mask-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .6);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        z-index: 8;
        .mask {
            background: #fff;
            border-radius: 16/@rem;
            overflow: hidden;
            .mask-top {
                width: 560/@rem;
                height: 320/@rem;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                img {
                    margin: auto;
                    width: 70%;
                }
            }
            .mask-bot {
                padding-top: 40/@rem;
                height: 260/@rem;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                text-align: center;
                .p1 {
                    color: #333;
                    font-size: 30/@rem;
                    font-weight: 700;
                    margin-bottom: 8/@rem;
                    line-height: 42/@rem;
                    height: 42/@rem;
                }
                .p2 {
                    color: #333;
                    font-size: 26/@rem;
                    margin-bottom: 50/@rem;
                    line-height: 36@rem;
                    height: 36/@rem;
                }
                .ok {
                    font-size: 30/@rem;
                    color: #FD6C59;
                    width: 220/@rem;
                    height: 60/@rem;
                    margin: 0 auto;
                    text-align: center;
                    line-height: 60/@rem;
                    border: 1px solid #FD6C59;
                    border-radius: 30/@rem;
                }
            }
        }
    }
    .music {
        position: absolute;
        top: 30/@rem;
        right: 30/@rem;
        z-index: 5;
        width: 70/@rem;
        height: 70/@rem;
        background: rgba(0, 0, 0, .3);
        border-radius: 35/@rem;
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-animation-duration: 5s;
        animation-duration: 5s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        img {
            width: 100%;
            height: 100%;
        }
    }
    @-webkit-keyframes move {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes move {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @media all and (min-width: 768px) {
        #app {
            .top {
                height: 435/@rem;
            }
            .lottery {
                .opportunity {
                    height: 100/@rem; // line-height: 100/@rem;
                    font-size: 30/@rem;
                    top: 52/@rem;
                    span {
                        font-size: 40/@rem;
                    }
                }
                .con {
                    left: 126/@rem;
                    top: 246/@rem;
                    right: 126/@rem;
                    bottom: 186/@rem;
                    .item {
                        p {
                            font-size: 30/@rem;
                            bottom: 20/@rem;
                        }
                    }
                }
            }
            .rule {
                margin: 80/@rem auto;
                .line {
                    margin-bottom: 30/@rem;
                    img {
                        // width: 240/@rem;
                        height: 70/@rem;
                    }
                    p {
                        height: 80/@rem; // line-height: 80/@rem;
                        font-size: 36/@rem;
                        top: 40/@rem;
                    }
                }
                .rule-con {
                    li {
                        font-size: 30/@rem;
                        margin-bottom: 16/@rem;
                        line-height: 50/@rem;
                    }
                }
            }
        }
    }
    @media all and (min-width: 1024px) {
        #app {
            .top {
                height: 578/@rem;
            }
            .lottery {
                .opportunity {
                    height: 140/@rem; // line-height: 140/@rem;
                    font-size: 38/@rem;
                    top: 80/@rem;
                    span {
                        font-size: 48/@rem;
                    }
                }
                .con {
                    left: 170/@rem;
                    top: 330/@rem;
                    right: 170/@rem;
                    bottom: 250/@rem;
                    .item {
                        p {
                            font-size: 36/@rem;
                            bottom: 30/@rem;
                        }
                    }
                }
            }
            .rule {
                margin: 120/@rem auto;
                .line {
                    margin-bottom: 50/@rem;
                    img {
                        // width: 300/@rem;
                        height: 90/@rem;
                    }
                    p {
                        height: 100/@rem; // line-height: 100/@rem;
                        font-size: 44/@rem;
                        top: 46/@rem;
                    }
                }
                .rule-con {
                    padding: 0 50/@rem 50/@rem;
                    li {
                        font-size: 36/@rem;
                        margin-bottom: 20/@rem;
                        line-height: 56/@rem;
                    }
                }
            }
        }
    } // min-width: 1242px
    @media all and (min-width: 1125px) {
        #app {
            .top {
                height: 310/@rem;
            }
            .lottery {
                .opportunity {
                    height: 70/@rem; // line-height: 70/@rem;
                    font-size: 26/@rem;
                    top: 32/@rem;
                    span {
                        font-size: 36/@rem;
                    }
                }
                .con {
                    left: 90/@rem;
                    top: 175/@rem;
                    right: 90/@rem;
                    bottom: 132/@rem;
                    .item {
                        p {
                            font-size: 24/@rem;
                            bottom: 10/@rem;
                        }
                    }
                }
            }
            .rule {
                margin: 60/@rem auto;
                .line {
                    margin-bottom: 0;
                    img {
                        // width: 200/@rem;
                        height: 60/@rem;
                    }
                    p {
                        height: 60/@rem; // line-height: 60/@rem;
                        font-size: 28/@rem;
                        top: 42/@rem;
                    }
                }
                .rule-con {
                    padding: 0 30/@rem 30/@rem;
                    li {
                        font-size: 22/@rem;
                        margin-bottom: 10/@rem;
                        line-height: 40/@rem;
                    }
                }
            }
        }
    }
    @-webkit-keyframes bounceIn {
        from,
        20%,
        40%,
        60%,
        80%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
        }
        20% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1);
            transform: scale3d(1.1, 1.1, 1.1);
        }
        40% {
            -webkit-transform: scale3d(.9, .9, .9);
            transform: scale3d(.9, .9, .9);
        }
        60% {
            opacity: 1;
            -webkit-transform: scale3d(1.03, 1.03, 1.03);
            transform: scale3d(1.03, 1.03, 1.03);
        }
        80% {
            -webkit-transform: scale3d(.97, .97, .97);
            transform: scale3d(.97, .97, .97);
        }
        to {
            opacity: 1;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    @keyframes bounceIn {
        from,
        20%,
        40%,
        60%,
        80%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
        }
        20% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1);
            transform: scale3d(1.1, 1.1, 1.1);
        }
        40% {
            -webkit-transform: scale3d(.9, .9, .9);
            transform: scale3d(.9, .9, .9);
        }
        60% {
            opacity: 1;
            -webkit-transform: scale3d(1.03, 1.03, 1.03);
            transform: scale3d(1.03, 1.03, 1.03);
        }
        80% {
            -webkit-transform: scale3d(.97, .97, .97);
            transform: scale3d(.97, .97, .97);
        }
        to {
            opacity: 1;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    .bounceIn {
        -webkit-animation-name: bounceIn;
        animation-name: bounceIn;
        -webkit-animation-duration: .8s;
        animation-duration: .8s;
    }
</style>
