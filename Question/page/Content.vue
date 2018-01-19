<template>
    <div class="con">
        <div v-if="pos==0" class="question">
            <div class="question-t" v-for="(v,i) in questionList" :key="i" v-if="i==questionIndex">
                <div class="questionTxt">
                    <p class="p-text">{{i+1}}.{{v.question}}</p>
                    <span>{{problemIndex+1}}/{{problemList.length}}</span>
                </div>
                <ul class="questionConCheck" v-if="v.attr==1">
                    <li class="questionLi" v-for="(v,k,i) in v.answer" :key="i" @click="clickQuestion(i)" :style="{backgroundImage:i ==qIndex?checked:normal,color:i ==qIndex?'#fff':''}">{{k}}.{{v}}</li>
                </ul>
                <div class="questionConText" v-if="v.attr==2">
                    <p v-if="!val.length">{{txt}}</p>
                    <div class="conTxt" contenteditable="true" @input="updata($event)"></div>
                </div>
            </div>
            <div class="question-b">
                <button class="btn" v-if="questionIndex!=questionList.length-1" :class="val.length||qIndex>-1?'active':''" @click="nextQuestion">下一题</button>
                <button class="btn" v-if="questionIndex==questionList.length-1" :class="val.length||qIndex>-1?'active':''" @click="overQuestion">完成调研</button>
            </div>
        </div>
        <div v-if="pos==1" class="problem">
            <div class="problem-t" v-for="(v,i) in problemList" :key="i" v-if="i==problemIndex">
                <div class="problemTxt">
                    <p class="p-text">{{i+1}}.{{v.question}}</p>
                    <span>{{problemIndex+1}}/{{problemList.length}}</span>
                    <p class="time">{{time}}</p>
                </div>
                <ul class="problemCon">
                    <li class="problemLi" v-for="(v,k,i) in v.answer" :key="i" @click="clickProblem(i)" :style="{backgroundImage:i ==pIndex?checked:normal,color:i ==pIndex?'#fff':''}">{{k}}.{{v}}</li>
                </ul>
            </div>
            <div class="problem-b">
                <p class="tips" :class="tip?'move':''">您还没有选择哦</p>
                <button class="btn" v-if="problemIndex!=problemList.length-1" :class="pIndex>-1?'active':''" @click="nextProblem">下一题</button>
                <button class="btn" v-if="problemIndex==problemList.length-1" :class="pIndex>-1?'active':''" @click="overProblem">完成答题</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                //问卷
                questionList: [{
                        attr: 1,
                        txt: '问卷第1题',
                        question: '先秦时代，教育内容以“六艺”为主，下列不属于“六艺”的是？',
                        answer: {
                            A: '射',
                            B: '御',
                            C: '礼',
                            D: '武'
                        }
                    },
                    {
                        attr: 1,
                        txt: '问卷第2题',
                        question: '经魏晋多名士，有著名的竹林七贤，《与山巨源绝交书》是竹林七贤中的谁写给山涛的？',
                        answer: {
                            A: '阮籍',
                            B: '嵇康',
                            C: '刘伶',
                            D: '向秀'
                        }
                    },
                    {
                        attr: 1,
                        txt: '问卷第3题',
                        question: '科举制在中国影响深远，乡试录取者称为“举人”，会试录取者称为“贡生”，那么殿试录取者称为？',
                        answer: {
                            A: '大元',
                            B: '解元',
                            C: '进士',
                            D: '榜眼'
                        }
                    },
                    {
                        attr: 1,
                        txt: '问卷第4题',
                        question: '“生当做人杰，死亦为鬼雄，至今思项羽，不肯过江东。”为哪位诗人的作品？',
                        answer: {
                            A: '李白',
                            B: '杜甫',
                            C: '李商隐',
                            D: '李清照'
                        }
                    },
                    {
                        attr: 1,
                        txt: '问卷第5题',
                        question: '“豆蔻”是指多少岁？',
                        answer: {
                            A: '十三',
                            B: '十五',
                            C: '十八',
                            D: '二十'
                        }
                    },
                    {
                        attr: 2,
                        txt: '问卷第6题',
                        question: '中国的书院制度自唐代始，有官方和私人设置的两类，下列各书院属于官方创办的是？',
                        answer: {
                            A: '岳麓书院',
                            B: '嵩阳书院',
                            C: '集贤书院',
                            D: '白鹿洞书院'
                        }
                    },
                    {
                        attr: 2,
                        txt: '问卷第7题',
                        question: '友谊的深浅，由下列那一个成语可以看出情义最为深重？',
                        answer: {
                            A: '莫逆之交',
                            B: '金兰之交',
                            C: '刎颈之交',
                            D: '点头之交'
                        }
                    },
                    {
                        attr: 2,
                        txt: '问卷第8题',
                        question: '一提到书法中的草书，人们便会想到“颠张醉素”，请问下列属于颠张的作品的是？',
                        answer: {
                            A: '自叙帖',
                            B: '自言帖',
                            C: '中秋帖',
                            D: '黄州寒食帖'
                        }
                    },
                    {
                        attr: 2,
                        txt: '问卷第9题',
                        question: '鲁迅先生称（ ）为“史家之绝唱，无韵之离骚”？',
                        answer: {
                            A: '史记',
                            B: '汉书',
                            C: '三国志',
                            D: '资治通鉴'
                        }
                    },
                    {
                        attr: 2,
                        txt: '问卷第10题',
                        question: '鲁迅先生称（ 郑谷有诗曰：“何事文星与酒星，一时钟在李先生。高吟大醉三千百，留着人间伴月明。”诗中的李先生指的是？',
                        answer: {
                            A: '李商隐',
                            B: '李贺',
                            C: '李白',
                            D: '李煜'
                        }
                    }
                ],
                //答题
                problemList: [{
                        txt: '答题第1题',
                        question: '先秦时代，教育内容以“六艺”为主，下列不属于“六艺”的是？',
                        answer: {
                            A: '射',
                            B: '御',
                            C: '礼',
                            D: '武'
                        }
                    },
                    {
                        txt: '答题第2题',
                        question: '经魏晋多名士，有著名的竹林七贤，《与山巨源绝交书》是竹林七贤中的谁写给山涛的？',
                        answer: {
                            A: '阮籍',
                            B: '嵇康',
                            C: '刘伶',
                            D: '向秀'
                        }
                    },
                    {
                        txt: '答题第3题',
                        question: '科举制在中国影响深远，乡试录取者称为“举人”，会试录取者称为“贡生”，那么殿试录取者称为？',
                        answer: {
                            A: '大元',
                            B: '解元',
                            C: '进士',
                            D: '榜眼'
                        }
                    },
                    {
                        txt: '答题第4题',
                        question: '“生当做人杰，死亦为鬼雄，至今思项羽，不肯过江东。”为哪位诗人的作品？',
                        answer: {
                            A: '李白',
                            B: '杜甫',
                            C: '李商隐',
                            D: '李清照'
                        }
                    },
                    {
                        txt: '答题第5题',
                        question: '“豆蔻”是指多少岁？',
                        answer: {
                            A: '十三',
                            B: '十五',
                            C: '十八',
                            D: '二十'
                        }
                    },
                    {
                        txt: '答题第6题',
                        question: '中国的书院制度自唐代始，有官方和私人设置的两类，下列各书院属于官方创办的是？',
                        answer: {
                            A: '岳麓书院',
                            B: '嵩阳书院',
                            C: '集贤书院',
                            D: '白鹿洞书院'
                        }
                    },
                    {
                        txt: '答题第7题',
                        question: '友谊的深浅，由下列那一个成语可以看出情义最为深重？',
                        answer: {
                            A: '莫逆之交',
                            B: '金兰之交',
                            C: '刎颈之交',
                            D: '点头之交'
                        }
                    },
                    {
                        txt: '答题第8题',
                        question: '一提到书法中的草书，人们便会想到“颠张醉素”，请问下列属于颠张的作品的是？',
                        answer: {
                            A: '自叙帖',
                            B: '自言帖',
                            C: '中秋帖',
                            D: '黄州寒食帖'
                        }
                    },
                    {
                        txt: '答题第9题',
                        question: '鲁迅先生称（ ）为“史家之绝唱，无韵之离骚”？',
                        answer: {
                            A: '史记',
                            B: '汉书',
                            C: '三国志',
                            D: '资治通鉴'
                        }
                    },
                    {
                        txt: '答题第10题',
                        question: '鲁迅先生称（ 郑谷有诗曰：“何事文星与酒星，一时钟在李先生。高吟大醉三千百，留着人间伴月明。”诗中的李先生指的是？',
                        answer: {
                            A: '李商隐',
                            B: '李贺',
                            C: '李白',
                            D: '李煜'
                        }
                    }
                ],
                //问卷进度索引
                questionIndex: 0,
                //答题进度索引
                problemIndex: 0,
                txt: '请在这里输入您的想法...',
                val: '', //输入框的值
                pIndex: -1, //答题选择索引
                qIndex: -1, //问卷选择索引
                surveyList: [], //问卷集合
                answerList: [], //答题集合
                normal: '', //未选中背景图
                checked: '', //选中背景图
                time: 0, //答题时间10s
                timer: null, //时间定时器
                tip: false //未勾选小提示
            }
        },
        mounted() {
            // 获取pos的值
            // console.log(this.$store.state.mutations)
            let state = this.$store.state.mutations;
            this.normal = state.normal;
            this.checked = state.checked;
            this.timerInfo() //调用时间倒计时
        },
        methods: {
            nextQuestion() {
                //问卷可以是纯文本或者是单选
                if (this.val != '') { //如果是纯文本，判断输入的值
                    this.questionIndex++;
                    this.surveyList.push(this.val)
                } else if (this.qIndex > -1) { //如果是单选，判断选中的index
                    this.questionIndex++;
                    this.surveyList.push(this.qIndex)
                }
                this.val = ''; //清理掉输入的值
                this.qIndex = -1; //恢复index索引
            },
            overQuestion() {
                //问卷完成--最后一题
                if (this.val != '') {
                    this.questionIndex++;
                    this.surveyList.push(this.val)
                    this.$store.dispatch("nextQuestion", this.surveyList) //传入vuex
                    this.$router.replace({
                        path: 'end'
                    })
                } else if (this.qIndex > -1) {
                    this.questionIndex++;
                    this.surveyList.push(this.qIndex)
                    this.$store.dispatch("nextQuestion", this.surveyList) //传入vuex
                    this.$router.replace({
                        path: 'end'
                    })
                }
                this.val = ''; //清理掉输入的值
                this.qIndex = -1; //恢复index索引
            },
            nextProblem() {
                //答题为单选
                if (this.pIndex > -1) { //针对手动操作点击
                    clearInterval(this.timer) //清理定时器
                    this.timerInfo()
                    this.problemIndex++;
                    this.answerList.push(this.pIndex)
                    this.pIndex = -1; //恢复index索引
                } else {
                    this.tip = true;
                    setTimeout(_ => {
                        this.tip = false;
                    }, 1000)
                }
            },
            overProblem() {
                //答题完成--最后一题
                if (this.pIndex > -1) { //针对手动操作点击
                    clearInterval(this.timer) //清理定时器
                    this.problemIndex++;
                    this.answerList.push(this.pIndex)
                    this.$store.dispatch("nextProblem", this.answerList)
                    this.$router.replace({
                        path: 'end'
                    })
                    this.pIndex = -1; //恢复index索引
                } else {
                    this.tip = true;
                    setTimeout(_ => {
                        this.tip = false;
                    }, 1000)
                }
            },
            clickQuestion(i) {
                //点击修改索引值，控制高亮
                this.qIndex = i;
            },
            clickProblem(i) {
                this.pIndex = i;
            },
            updata(ev) {
                //获取纯文本输入的值
                this.val = ev.target.innerHTML;
            },
            timerInfo() {
                this.time = 10; //初始化时间
                this.tip = false; //初始化小提示
                this.timer = setInterval(_ => {
                    this.time--;
                    if (this.time == 0) { //如果时间为零，跳转下一题
                        clearInterval(this.timer)
                        if (this.problemIndex < this.problemList.length - 1) {
                            //针对定时器时间为0的操作
                            if (this.pIndex > -1) { //如果点选之后未点击下一题不计入总成绩
                                this.pIndex = -1; //恢复index索引
                            }
                            this.problemIndex++;
                            this.answerList.push('')
                            this.nextProblem() //执行下一题
                            this.timerInfo()
                        } else {
                            //针对定时器时间为0的操作
                            if (this.pIndex > -1) { //如果点选之后未点击下一题不计入总成绩
                                this.pIndex = -1; //恢复index索引
                            }
                            this.problemIndex++;
                            this.answerList.push('')
                            this.$store.dispatch("nextProblem", this.answerList)
                            this.$router.replace({
                                path: 'end'
                            })
                            clearInterval(this.timer)
                        }
                    }
                }, 1000)
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
    .con {
        width: 100%;
        height: 100%;
        position: absolute;
        .question,
        .problem {
            width: 100%;
            height: 100%;
            .question-t,
            .problem-t {
                padding-top: 80/@rem;
            }
            .questionTxt,
            .problemTxt {
                width: 600/@rem;
                padding: 40/@rem;
                margin: 0 auto 50/@rem;
                height: 150/@rem;
                background: rgba(0, 0, 0, .5);
                border-radius: 8/@rem;
                position: relative;
                .p-text {
                    color: #fff;
                    line-height: 40/@rem;
                    font-size: 30/@rem;
                }
                .time {
                    position: absolute;
                    right: 12/@rem;
                    bottom: 12/@rem;
                    color: #fff;
                    font-size: 30/@rem;
                    border: 2px solid #fff;
                    width: 50/@rem;
                    height: 50/@rem;
                    line-height: 50/@rem;
                    text-align: center;
                    border-radius: 50%;
                }
                span {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    color: #fff;
                    font-size: 30/@rem;
                    transform: translate(-50%, -120%);
                }
            }
            .questionConText {
                width: 600/@rem;
                height: 300/@rem;
                background: #fff;
                border-radius: 8/@rem;
                margin: 0 auto;
                padding: 20/@rem;
                position: relative;
                .conTxt {
                    width: 100%;
                    height: 100%;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    outline: none;
                    font-size: 30/@rem;
                    color: #333;
                    -webkit-user-select: text;
                    -user-select: text;
                }
                p {
                    position: absolute;
                    top: 20/@rem;
                    left: 20/@rem;
                    color: #999;
                    font-size: 30/@rem;
                }
            }
            .problemCon,
            .questionConCheck {
                width: 100%;
                .problemLi,
                .questionLi {
                    width: 100%;
                    height: 96/@rem;
                    line-height: 96/@rem;
                    font-size: 36/@rem;
                    margin-bottom: 50/@rem;
                    color: #666;
                    background-size: 100% 100%;
                    text-indent: 18%;
                }
            }
            .question-b,
            .problem-b {
                position: absolute;
                bottom: 100/@rem;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                button {
                    width: 444/@rem;
                    height: 96/@rem;
                    line-height: 96/@rem;
                    background: transparent;
                    border: 2px solid #fff;
                    color: #fff;
                    border-radius: 50/@rem;
                    font-size: 40/@rem;
                }
                .active {
                    background: #fff;
                    color: #333;
                }
                .tips {
                    position: absolute;
                    background: rgba(0, 0, 0, .5);
                    padding: 12/@rem 16/@rem;
                    color: #fff;
                    font-size: 24/@rem;
                    border-radius: 8/@rem;
                    transform: translateY(-160%);
                    opacity: 0;
                }
            }
        }
    }
    @media(max-height:400px) {
        .btn {
            display: none;
        }
    }
    @media all and(max-width:640px) {
        .con {
            .problemCon,
            .questionConCheck {
                .problemLi,
                .questionLi {
                    margin-bottom: 30/@rem !important;
                }
            }
        }
    }
    @keyframes zyh {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .move {
        animation-name: zyh;
        animation-duration: 1s;
    }
</style>
