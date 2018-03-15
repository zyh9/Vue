<template>
    <div class="index">
        <aside class="loading" v-show="false">
            <img :src="load" alt="">
        </aside>
        <div class="level" :class="mask?'hidden':''">
            <div class="con_bg" :style="{backgroundImage:conBg}">
                <div class="top">
                    <img :src="header" alt="">
                </div>
                <div class="lottery">
                    <img :src="lottery" alt="" class="lottery_bg">
                    <img :src="num>0?getprize1:getprize2" alt="" class="start" @click="start">
                    <img :src="touch" alt="" class="touch">
                    <div class="claw" :class="{clawMove:aniMove,paused:aniHead,running:!aniHead}">
                        <img :src="line" alt="" class="line">
                        <img :src="down" alt="" class="down" :class="aniOnoff?'middle_run':''">
                        <img :src="downHead" alt="" class="down_head">
                        <img :src="prizeImg" alt="" class="prize" v-if="prizeShow">
                    </div>
                    <span class="num">{{num}}</span>
                </div>
                <div class="record">
                    <p class="me">用户中奖记录</p>
                    <div class="menu">
                        <span>用户</span>
                        <span>获奖名称</span>
                        <span>时间</span>
                    </div>
                    <div class="no_record" v-if="userList.length<5">暂无用户中奖记录</div>
                    <app-scroll :list="userList" v-if="userList.length>=5"></app-scroll>
                    <div class="all">
                        <p @click="recordShow=true">查看我的中奖记录</p>
                    </div>
                    <p class="rule" @click="ruleShow=true">活动规则 ></p>
                </div>
            </div>
        </div>
        <transition name="winning">
            <div class="view_all" v-if="recordShow">
                <div class="view_top">
                    <img :src="viewTop" alt="">
                </div>
                <div class="view_record">
                    <div class="view_menu">
                        <span>获奖名称</span>
                        <span>时间</span>
                    </div>
                    <div class="view_no_record" v-if="list.length==0">暂无中奖记录</div>
                    <ul class="view_list" v-else>
                        <li v-for="(v,i) in list" :key="i">
                            <span>{{v.name}}</span>
                            <span>{{v.time}}</span>
                        </li>
                    </ul>
                    <div class="back">
                        <p @click="recordShow=false">返回活动</p>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mask">
            <div class="mask-bg" v-if="mask">
                <div class="mask">
                    <div class="mask-top" :style="{backgroundImage:maskTop}">
                        <img :src="maskImg" alt="" />
                    </div>
                    <div class="mask-bot">
                        <p class="p1">{{text1}}</p>
                        <p class="p2">{{text2}}</p>
                        <div class="ok" @click="okClick">确定</div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="regulation">
            <div class="activity_rule" v-if="ruleShow">
                <p class="rule_title">活动规则</p>
                <ul class="rule_list">
                    <li v-for="(v,i) in ruleList" :key="i">{{i+1}}. {{v.text}}</li>
                </ul>
                <div class="back_activity">
                    <p @click="ruleShow=false">返回活动</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import appScroll from './appScroll.vue';
    export default {
        data() {
            return {
                load: require('../static/img1/loading.svg'),
                bg: require('../static/img1/bg.jpg'), //背景图片
                header: require('../static/img1/header.png'), //标题图片
                lottery: require('../static/img1/wrap.png'), //娃娃机图片
                getprize1: require('../static/img1/getprize.png'), //有抽奖次数图片
                getprize2: require('../static/img1/getprize_gray.png'), //无抽奖次数图片
                touch: require('../static/img1/click.png'), //提示用户抽奖箭头
                viewTop: require('../static/img1/list_bg.jpg'), //中奖页面顶部图片
                line: require('../static/img1/line.png'), //娃娃机顶部图片
                down: require('../static/img1/down.png'), //娃娃机中轴图片
                downHead: require('../static/img1/down_head.png'), //娃娃机铁爪图片
                list: [],
                userList: [{
                        img: require('../static/img1/user.png'),
                        name: '5元优惠券',
                        time: '2018-03-01'
                    },
                    {
                        img: require('../static/img1/user.png'),
                        name: '5元优惠券',
                        time: '2018-03-01'
                    },
                    {
                        img: require('../static/img1/user.png'),
                        name: '5元优惠券',
                        time: '2018-03-01'
                    },
                    {
                        img: require('../static/img1/user.png'),
                        name: '5元优惠券',
                        time: '2018-03-01'
                    },
                    {
                        img: require('../static/img1/user.png'),
                        name: '5元优惠券',
                        time: '2018-03-01'
                    }
                ],
                prize: [{
                        img: require('../static/img1/coupon.png'),
                        info: '5元优惠券'
                    },
                    {
                        img: require('../static/img1/gold.png'),
                        info: '5枚U币'
                    },
                    {
                        img: require('../static/img1/redCard.png'),
                        info: '现金红包'
                    },
                    {
                        img: require('../static/img1/thankYou.png'),
                        info: '谢谢参与'
                    }
                ],
                ruleList: [{
                        text: '每名用户每天只能免费参加一次活动。'
                    },
                    {
                        text: '免费机会用完之后，成功接单可增加一次抽奖机会。'
                    },
                    {
                        text: '用户抽到的部分实物奖品需要到城市代理中心领取。'
                    },
                    {
                        text: '获得的奖品需要在活动期间内领取，活动结束后将无法领取奖品。'
                    },
                    {
                        text: '本次活动由UU跑腿发起，最终解释权归UU跑腿所有。'
                    }
                ],
                maskBg: require('../static/img1/mask.png'),
                overImg: require('../static/img1/over.png'),
                prizeImg: require('../static/img1/prize.png'),
                conBg: '', //娃娃机图片
                maskTop: '', //遮罩顶部图片
                maskImg: '', //遮罩奖品图片
                show: false, //查看抽奖记录
                num: 3, //剩余抽奖次数
                aniOnoff: false, //动画开关
                click: true, //防止中途点击
                mask: false, //遮罩开关
                text1: '', //奖品页面文字1
                text2: '', //奖品页面文字2
                n: -1, //模拟随机奖品
                opportunity: -1, //是否有抽奖机会
                ruleShow: false, //规则显示
                recordShow: false, //中奖记录显示
                aniMove: true, //左右移动动画
                prizeShow: false,
                aniHead: false //动画是否暂停
            }
        },
        mounted() {
            document.title = '抽奖活动';
            this.conBg = `url(${this.bg})`;
            this.maskTop = `url(${this.maskBg})`;
            this.device()
        },
        methods: {
            start() {
                if (this.click) { //防止中途点击
                    this.click = false;
                    if (this.num > 0) {
                        this.opportunity = 1;
                        this.aniOnoff = true;
                        this.aniHead = true;
                        this.num--;
                        // console.log(this.num)
                        setTimeout(_ => {
                            this.aniOnoff = false;
                            this.mask = true;
                            this.n = Math.round(Math.random() * (this.prize.length - 1));
                            this.maskImg = this.prize[this.n].img;
                            this.text1 = `恭喜你获得${this.prize[this.n].info}`;
                            this.text2 = '快去使用吧';
                            this.click = true;
                        }, 1000)
                        setTimeout(_ => {
                            this.prizeShow = true;
                        }, 500)
                    } else {
                        this.opportunity = 0;
                        this.maskImg = this.overImg;
                        this.text1 = '您没有抽奖机会了';
                        this.text2 = '';
                        this.mask = true;
                        this.click = true;
                    }
                }
            },
            okClick() {
                this.mask = false;
                this.aniHead = false;
                this.prizeShow = false;
                if (this.num == 0) { //抽奖次数为0，左右移动动画关闭
                    this.aniMove = false;
                }
                if (this.opportunity) {
                    this.list.push({
                        time: this.getTime(new Date()),
                        name: this.prize[this.n].info
                    })
                }
            },
            device() {
                let html = document.getElementsByTagName('html')[0];
                if (html.getBoundingClientRect().width >= 1250) {
                    html.style.cssText += `font-size:75px;max-width:750px;margin:0 auto;overflow:hidden;`;
                }
            },
            //获取活动时间
            getTime(time) {
                return this.FmtTime(time, 'yyyy/MM/dd')
            },
            //格式化时间  date时间对象  fmt时间格式  如yyyy/MM/dd hh:mm:ss
            FmtTime(date, fmt) {
                var o = {
                    "M+": date.getMonth() + 1, //月份   
                    "d+": date.getDate(), //日   
                    "h+": date.getHours(), //小时   
                    "m+": date.getMinutes(), //分   
                    "s+": date.getSeconds(), //秒   
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
                    "S": date.getMilliseconds() //毫秒   
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        },
        components: {
            appScroll
        }
    }
</script>

<style lang="less">
    @rem: 75rem;
    body {
        font-family: Helvetica;
    }
    img {
        display: block;
        border: 0;
    }
    .index {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
        overflow: hidden;
    }
    .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        img {
            width: 60/@rem;
            height: 60/@rem;
            padding: 20/@rem;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, .5);
            border-radius: 8/@rem;
        }
    }
    .top,
    .view_top {
        width: 100%;
        height: 320/@rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .view_top {
        height: 420/@rem;
    }
    .level {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #4f0971;
        z-index: 1;
    }
    .hidden {
        overflow: hidden;
    }
    .paused {
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
    }
    .running {
        -webkit-animation-play-state: running;
        animation-play-state: running;
    }
    .level::-webkit-scrollbar,
    .activity_rule::-webkit-scrollbar,
    .view_all::-webkit-scrollbar {
        display: none;
    }
    .con_bg {
        background-size: 100% 100%;
        overflow: hidden;
    }
    .lottery {
        width: 100%;
        height: 750/@rem;
        margin-bottom: 50/@rem;
        position: relative;
        .lottery_bg {
            width: 100%;
            height: 100%;
        }
        .start {
            position: absolute;
            bottom: 70/@rem;
            right: 90/@rem;
            width: 280/@rem;
            height: 180/@rem;
        }
        @-webkit-keyframes touchstart {
            0% {
                bottom: 200/@rem;
            }
            50% {
                bottom: 180/@rem;
            }
            to {
                bottom: 200/@rem;
            }
        }
        @keyframes touchstart {
            0% {
                bottom: 200/@rem;
            }
            50% {
                bottom: 180/@rem;
            }
            to {
                bottom: 200/@rem;
            }
        }
        .touch {
            position: absolute;
            bottom: 200/@rem;
            right: 180/@rem;
            width: 100/@rem;
            height: 180/@rem;
            -webkit-animation-name: touchstart;
            animation-name: touchstart;
            -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
        }
        .claw {
            position: absolute;
            top: 140/@rem;
            left: 35%;
            width: 260/@rem;
            overflow: hidden;
            -webkit-transform: translate(0, 0);
            -ms-transform: translate(0, 0);
            transform: translate(0, 0);
        }
        .line {
            width: 260/@rem;
            height: 50/@rem;
            margin: 0 auto;
        }
        .down {
            width: 100/@rem;
            height: 60/@rem;
            margin: 0 auto;
            -webkit-transform: translate(0, -28/@rem);
            -ms-transform: translate(0, -28/@rem);
            transform: translate(0, -28/@rem);
        }
        .down_head {
            width: 200/@rem;
            height: 100/@rem;
            margin: 0 auto;
            -webkit-transform: translate(0, -28/@rem);
            -ms-transform: translate(0, -28/@rem);
            transform: translate(0, -28/@rem);
        }
        .prize {
            position: absolute;
            bottom: 10/@rem;
            left: 50%;
            -webkit-transform: translate(-50%, 0);
            -ms-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
            width: 60/@rem;
            height: 60/@rem;
        }
        .num {
            position: absolute;
            bottom: 120/@rem;
            left: 270/@rem;
            font-size: 40/@rem;
            color: #fff;
        }
    }
    .record,
    .view_record {
        margin: 30/@rem;
        padding: 40/@rem 60/@rem;
        overflow: hidden;
        border-radius: 16/@rem;
        background: #fff;
        .me {
            color: #FC1436;
            font-size: 36/@rem;
            font-weight: 700;
            line-height: 80/@rem;
            height: 80/@rem;
            text-align: center;
            margin-bottom: 30/@rem;
        }
        .no_record,
        .view_no_record {
            color: #807778;
            font-size: 26/@rem;
            text-align: center;
            height: 80/@rem;
            line-height: 80/@rem;
            margin-bottom: 50/@rem;
        }
        .menu {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            margin-bottom: 30/@rem;
            span {
                display: block;
                width: 34%;
                text-align: center;
                color: #F60025;
                font-size: 26/@rem;
                white-space: nowrap;
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                position: relative;
                line-height: 40/@rem;
                height: 40/@rem;
                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 2px;
                    height: 100%;
                    display: block;
                    background: #eee;
                    -webkit-transform: scaleX(.5);
                    -ms-transform: scaleX(.5);
                    transform: scaleX(.5);
                    -webkit-transform-origin: 0 0;
                    -ms-transform-origin: 0 0;
                    transform-origin: 0 0;
                }
                &:nth-last-of-type(1)::before {
                    width: 0;
                }
            }
        }
        .view_menu {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            margin-bottom: 30/@rem;
            span {
                display: block;
                width: 50%;
                text-align: center;
                color: #F60025;
                font-size: 26/@rem;
                white-space: nowrap;
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                position: relative;
                line-height: 40/@rem;
                height: 40/@rem;
                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 2px;
                    height: 100%;
                    display: block;
                    background: #eee;
                    -webkit-transform: scaleX(.5);
                    -ms-transform: scaleX(.5);
                    transform: scaleX(.5);
                    -webkit-transform-origin: 0 0;
                    -ms-transform-origin: 0 0;
                    transform-origin: 0 0;
                }
                &:nth-last-of-type(1)::before {
                    width: 0;
                }
            }
        }
        .record_list {
            margin-bottom: 50/@rem;
            li {
                color: #807778;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                margin-bottom: 6/@rem;
                border-bottom: 1px dashed #eee;
                img {
                    width: 60/@rem;
                    height: 60/@rem;
                    margin: auto;
                    border-radius: 50%;
                    overflow: hidden;
                }
                span {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    width: 34%;
                    padding: 0 5%;
                    text-align: center;
                    font-size: 26/@rem;
                    white-space: nowrap;
                    overflow: hidden;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    height: 80/@rem;
                    line-height: 80/@rem;
                }
                &:nth-last-of-type(1) {
                    border-bottom: none;
                }
            }
        }
        .view_list {
            margin-bottom: 50/@rem;
            li {
                color: #807778;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                margin-bottom: 6/@rem;
                border-bottom: 1px dashed #eee;
                span {
                    display: block;
                    width: 50%;
                    padding: 0 5%;
                    text-align: center;
                    font-size: 26/@rem;
                    white-space: nowrap;
                    overflow: hidden;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    height: 80/@rem;
                    line-height: 80/@rem;
                }
                &:nth-last-of-type(1) {
                    border-bottom: none;
                }
            }
        }
        .all,
        .back {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            margin-bottom: 50/@rem;
            p {
                color: #fff;
                font-size: 32/@rem;
                background: #F60025;
                width: 360/@rem;
                height: 80/@rem;
                text-align: center;
                line-height: 80/@rem;
                border-radius: 40/@rem;
                -webkit-box-shadow: 2/@rem 4/@rem 10/@rem #999;
                box-shadow: 2/@rem 4/@rem 10/@rem #999;
            }
        }
        .rule {
            text-align: center;
            font-size: 26/@rem;
            color: #807778;
            line-height: 40/@rem;
            height: 40/@rem;
            margin: 0 auto;
            width: 200/@rem;
        }
    }
    .view_all {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        z-index: 2;
        background: #fff;
        -webkit-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        transform: translate(0, 0);
    }
    .middle_run {
        -webkit-animation: MidMove 1s ease;
        animation: MidMove 1s ease;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }
    @-webkit-keyframes MidMove {
        0% {
            height: 0.8rem;
        }
        50% {
            height: 3rem;
        }
        to {
            height: 0.8rem;
        }
    }
    @keyframes MidMove {
        0% {
            height: 0.8rem;
        }
        50% {
            height: 3rem;
        }
        to {
            height: 0.8rem;
        }
    }
    .mask-bg {
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
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
        z-index: 5;
        .mask {
            background: #fff;
            border-radius: 16/@rem;
            overflow: hidden;
            width: 560/@rem;
            height: 620/@rem;
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
                    width: 60%;
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
                    line-height: 36/@rem;
                    height: 36/@rem;
                    padding: 0 36/@rem;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                }
                .ok {
                    font-size: 30/@rem;
                    color: #FC1436;
                    width: 220/@rem;
                    height: 60/@rem;
                    margin: 0 auto;
                    text-align: center;
                    line-height: 60/@rem;
                    border: 1px solid #FC1436;
                    border-radius: 30/@rem;
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
    .mask-enter-active {
        -webkit-animation-name: bounceIn;
        animation-name: bounceIn;
        -webkit-animation-duration: .8s;
        animation-duration: .8s;
    }
    @-webkit-keyframes bounceOut {
        20% {
            -webkit-transform: scale3d(0.9, 0.9, 0.9);
            transform: scale3d(0.9, 0.9, 0.9);
        }
        50%,
        55% {
            opacity: 1;
            -webkit-transform: scale3d(1.1, 1.1, 1.1);
            transform: scale3d(1.1, 1.1, 1.1);
        }
        to {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }
    }
    @keyframes bounceOut {
        20% {
            -webkit-transform: scale3d(0.9, 0.9, 0.9);
            transform: scale3d(0.9, 0.9, 0.9);
        }
        50%,
        55% {
            opacity: 1;
            -webkit-transform: scale3d(1.1, 1.1, 1.1);
            transform: scale3d(1.1, 1.1, 1.1);
        }
        to {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }
    }
    .mask-leave-active {
        -webkit-animation-duration: .8s;
        animation-duration: .8s;
        -webkit-animation-name: bounceOut;
        animation-name: bounceOut;
    }
    .activity_rule {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 5;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        transform: translate(0, 0);
        background: #fff;
        .rule_title {
            color: #FC1436;
            font-size: 36/@rem;
            font-weight: 700;
            line-height: 80/@rem;
            height: 80/@rem;
            text-align: center;
            margin: 30/@rem 0;
        }
        .rule_list {
            padding: 0 60/@rem;
            margin-bottom: 50/@rem;
            li {
                color: #666;
                font-size: 28/@rem;
                line-height: 36/@rem;
                margin-bottom: 10/@rem;
            }
        }
        .back_activity {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            margin-bottom: 50/@rem;
            p {
                color: #fff;
                font-size: 32/@rem;
                background: #F60025;
                width: 360/@rem;
                height: 80/@rem;
                text-align: center;
                line-height: 80/@rem;
                border-radius: 40/@rem;
                -webkit-box-shadow: 2/@rem 4/@rem 10/@rem #999;
                box-shadow: 2/@rem 4/@rem 10/@rem #999;
            }
        }
    }
    @-webkit-keyframes clawM {
        0% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
        25% {
            -webkit-transform: translate(-70%, 0);
            transform: translate(-70%, 0);
        }
        50% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
        75% {
            -webkit-transform: translate(70%, 0);
            transform: translate(70%, 0);
        }
        to {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
    }
    @keyframes clawM {
        0% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
        25% {
            -webkit-transform: translate(-70%, 0);
            transform: translate(-70%, 0);
        }
        50% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
        75% {
            -webkit-transform: translate(70%, 0);
            transform: translate(70%, 0);
        }
        to {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
    }
    .clawMove {
        -webkit-animation-name: clawM;
        animation-name: clawM;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-duration: 3s;
        animation-duration: 3s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }
    .winning-enter,
    .winning-leave-to {
        -webkit-transform: translate(100%, 0);
        -ms-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }
    .winning-enter-active,
    .winning-leave-active {
        -webkit-transition: -webkit-transform .4s ease;
        transition: -webkit-transform .4s ease;
        -o-transition: transform .4s ease;
        transition: transform .4s ease;
        transition: transform .4s ease, -webkit-transform .4s ease;
    }
    .regulation-enter,
    .regulation-leave-to {
        -webkit-transform: translate(0, 100%);
        -ms-transform: translate(0, 100%);
        transform: translate(0, 100%);
    }
    .regulation-enter-active,
    .regulation-leave-active {
        -webkit-transition: -webkit-transform .4s ease;
        transition: -webkit-transform .4s ease;
        -o-transition: transform .4s ease;
        transition: transform .4s ease;
        transition: transform .4s ease, -webkit-transform .4s ease;
    }
</style>
