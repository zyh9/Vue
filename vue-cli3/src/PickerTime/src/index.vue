<template>
    <transition enter-active-class="fade-enter" leave-active-class="fade-leave">
        <!--日期弹出框-->
        <div class="modal" @click.self="modelCancel" v-if="timeShow">
            <!-- 弹出框主体 -->
            <div class='modal_container'>
                <!-- 头部显示 -->
                <div class='modal_header'>
                    <p class="cancel" @click="handleCancel">取消</p>
                    <div class="header_center">
                        <p>预定时间</p>
                        <p class='header_tip'>{{yyDay}}天内的预订</p>
                    </div>
                    <p class="ok" @click="handleOk">确认</p>
                </div>
                <!-- 日期 -->
                <div class="time">
                    <div class="time_scroll" scroll-x="true">
                        <div class="scroll_item" :class="{time_active:currentTab==index}" v-for="(item,index) in timeList" :key="index" @click="timeClick(index)">
                            <p>{{item.name}}</p>
                            <p>{{item.date}}</p>
                        </div>
                    </div>
                </div>
                <!-- 时间段 -->
                <div class='hour'>
                    <div class="hour_item" :class="{hour_active:yyTime=='立即配送'||reserveTime=='立即配送'}" v-if="currentTab==0" @click="hourClick(-1,1)">立即配送</div>
                    <div class="hour_item" :class="{hour_unactive:!item.isShow,hour_active:hourIndex==index}" v-for="(item,index) in hourList" :key="index" @click="hourClick(index,0)">{{item.hour}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "PickerTime",
        data() {
            return {
                //日期
                timeList: [],
                //可预约天数
                yyDay: 30,
                //预约时间段
                hourList: [{
                        hour: "08:00",
                        n: 8,
                        isShow: true
                    },
                    {
                        hour: "09:00",
                        n: 9,
                        isShow: true
                    },
                    {
                        hour: "10:00",
                        n: 10,
                        isShow: true
                    },
                    {
                        hour: "11:00",
                        n: 11,
                        isShow: true
                    },
                    {
                        hour: "12:00",
                        n: 12,
                        isShow: true
                    },
                    {
                        hour: "13:00",
                        n: 13,
                        isShow: true
                    },
                    {
                        hour: "14:00",
                        n: 14,
                        isShow: true
                    },
                    {
                        hour: "15:00",
                        n: 15,
                        isShow: true
                    },
                    {
                        hour: "16:00",
                        n: 16,
                        isShow: true
                    },
                    {
                        hour: "17:00",
                        n: 17,
                        isShow: true
                    },
                    {
                        hour: "18:00",
                        n: 18,
                        isShow: true
                    },
                    {
                        hour: "19:00",
                        n: 19,
                        isShow: true
                    },
                    {
                        hour: "20:00",
                        n: 20,
                        isShow: true
                    },
                    {
                        hour: "21:00",
                        n: 21,
                        isShow: true
                    },
                    {
                        hour: "22:00",
                        n: 22,
                        isShow: true
                    }
                ],
                //是否显示
                timeShow: false,
                currentTab: 0,
                //选择时间
                chooseHour: "",
                //选择日期
                chooseTime: "",
                hourIndex: -1,
                //预约时间
                yyTime: '',
            }
        },
        props: {
            reserveTime: {
                type: String,
                default: '立即配送'
            }
        },
        mounted() {
            Date.prototype.Format = function(format) {
                var o = {
                    "M+": this.getMonth() + 1, //month
                    "d+": this.getDate(), //day
                    "h+": this.getHours(), //hour
                    "m+": this.getMinutes(), //minute
                    "s+": this.getSeconds(), //second
                    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                    "S": this.getMilliseconds() //millisecond
                }
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            }
            Date.prototype.DateAdd = function(interval, number) {
                number = parseInt(number);
                var date = new Date(this.getTime());
                switch (interval) {
                    case "y":
                        date.setFullYear(this.getFullYear() + number);
                        break;
                    case "m":
                        date.setMonth(this.getMonth() + number);
                        break;
                    case "d":
                        date.setDate(this.getDate() + number);
                        break;
                    case "w":
                        date.setDate(this.getDate() + 7 * number);
                        break;
                    case "h":
                        date.setHours(this.getHours() + number);
                        break;
                    case "n":
                        date.setMinutes(this.getMinutes() + number);
                        break;
                    case "s":
                        date.setSeconds(this.getSeconds() + number);
                        break;
                    case "l":
                        date.setMilliseconds(this.getMilliseconds() + number);
                        break;
                }
                return date;
            }
            var dateList = [];
            var now = new Date();
            for (var i = 0; i < this.yyDay; i++) {
                var d = {};
                var day = new Date().DateAdd('d', i).getDay();
                if (day == 1) {
                    var w = "周一"
                }
                if (day == 2) {
                    var w = "周二"
                }
                if (day == 3) {
                    var w = "周三"
                }
                if (day == 4) {
                    var w = "周四"
                }
                if (day == 5) {
                    var w = "周五"
                }
                if (day == 6) {
                    var w = "周六"
                }
                if (day == 0) {
                    var w = "周日"
                }
                d.name = w;
                d.date = new Date().DateAdd('d', i).Format("MM-dd");
                dateList.push(d)
            }
            this.timeList = dateList;
            //初始化判断 当前时间
            var hour = new Date().getHours();
            for (var i = 0; i < this.hourList.length; i++) {
                var list = this.hourList;
                //过时不可选
                if (this.hourList[i].n <= hour) {
                    list[i].isShow = false;
                    this.hourList = list;
                }
            }
        },
        methods: {
            //弹出按钮
            showTimeModel() {
                this.timeShow = true;
                this.chooseTime = this.timeList[0].date;
            },
            //点击外部取消
            modelCancel() {
                this.timeShow = false;
                this.chooseTime = this.timeList[0].date;
            },
            handleOk() {
                if (this.currentTab == 0 && this.reserveTime == '立即配送') { //当天未选择时间
                    this.$emit("handleOk", {
                        title: '确认',
                        value: '立即配送'
                    })
                    return;
                }
                if (this.yyTime == '') { //未选择时间
                    console.log('还没有选择时间')
                    return;
                }
                this.$emit("handleOk", {
                    title: '确认',
                    value: this.yyTime
                })
            },
            handleCancel() {
                this.$emit("handleCancel", {
                    title: '取消',
                    value: ''
                })
            },
            //日期选择
            timeClick(index) {
                //非今天-不判断超过当前时间点(所有时间点都可选择)
                if (index != 0) {
                    var list = this.hourList;
                    for (var i = 0; i < list.length; i++) {
                        list[i].isShow = true;
                    }
                    this.hourList = list;
                } else {
                    //今天-过时不可预约
                    var hour = new Date().getHours();
                    for (var i = 0; i < this.hourList.length; i++) {
                        var list = this.hourList;
                        if (this.hourList[i].n <= hour) {
                            list[i].isShow = false;
                            this.hourList = list;
                        }
                    }
                }
                this.currentTab = index;
                this.chooseTime = this.timeList[index].date;
                this.yyTime = '';
                this.chooseHour = "";
                this.hourIndex = -1;
                console.log(this.chooseTime)
            },
            // 时间选择 type 1=> 立即配送  0=> 选择时间
            hourClick(index, type) {
                this.chooseTime = this.timeList[this.currentTab].date; //避免时间选择完之后再次选择时间，时间为第一项的问题
                if (type == 1) {
                    this.yyTime = '立即配送';
                    this.hourIndex = -1;
                } else {
                    // 时间不可选择
                    if (!this.hourList[index].isShow) {
                        console.log('请选择其它时间')
                        return false;
                    }
                    this.hourIndex = index;
                    this.chooseHour = this.hourList[index].hour;
                    let chooseTime = new Date().getFullYear() + "-" + this.chooseTime + " " + this.chooseHour + ':00';
                    this.yyTime = chooseTime;
                }
                this.$emit("changeTime", {
                    title: '选择时间',
                    value: this.yyTime
                })
            },
        },
        components: {}
    }
</script>

<style lang="less">
    @import url("../less/index.less");
</style>
