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
                    <div class="hour_item" :class="{hour_active:hourIndex==-1||yyTime==''}" v-if="currentTab==0" @click="hourClick(-1,1)">立即配送</div>
                    <div class="hour_item" :class="{hour_unactive:!item.isShow,hour_active:hourIndex==index}" v-for="(item,index) in hourList" :key="index" @click="hourClick(index,0)">{{item.hour}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {
        FmtTime,
        pickerData
    } from '../utils/index'
    export default {
        name: "PickerTime",
        data() {
            return {
                //日期列表
                timeList: [],
                //预约时间段
                hourList: [],
                //是否显示
                timeShow: false,
                //选择时间
                chooseHour: "",
                //选择日期
                chooseTime: "",
                //日期选中项
                currentTab: 0,
                //时间选中项
                hourIndex: -1,
                //预约时间
                yyTime: '',
                //当前时间
                nowDate: FmtTime(new Date(), 'yyyy/MM/dd'),
            }
        },
        props: {
            yyDay: {
                type: Number,
                default: 7
            },
            startHour: {
                type: Number,
                default: 8
            },
            endHour: {
                type: Number,
                default: 22
            },
            startTime: {
                type: String,
                default: '2000-01-01'
            }
        },
        mounted() {
            this.handleTime()
        },
        methods: {
            handleTime(selectIndex = 0) {
                //时间原型处理
                let timeList = pickerData(7, this.startTime)
                let hourList = [];
                //当前时间
                let hour = new Date().getHours();
                //判断时间节点
                for (let i = this.startHour; i <= this.endHour; i++) {
                    let index = i;
                    hourList.push({ //过时不可选
                        n: i,
                        isShow: timeList[selectIndex].time == this.nowDate ? (i <= hour ? false : true) : timeList[selectIndex].time < this.nowDate ? false : true,
                        hour: `${index >= 10 ? index : '0' + index}:00-${++index >= 10 ? index > 23 ? 23 : index : '0' + index}:${index > 23 ? '59' : '00'}`
                    })
                }
                this.timeList = timeList;
                this.hourList = hourList;
                // console.log(this.timeList, this.hourList)
            },
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
                if (this.currentTab == 0 && this.yyTime == '') { //当天未选择时间
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
                this.handleTime(index)
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
                    let chooseTime = new Date(this.timeList[this.currentTab].time).getFullYear() + "-" + this.chooseTime + " " + this.chooseHour;
                    this.yyTime = chooseTime;
                    console.log(this.yyTime)
                }
            },
        },
        components: {}
    }
</script>

<style lang="less">
    @import url("../less/index.less");
</style>
