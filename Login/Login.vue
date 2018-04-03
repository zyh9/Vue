<template>
    <div class="login" v-cloak>
        <div class="login_enter">
            <input type="text" placeholder="请输入手机号码" class="tel_enter" maxlength='11' v-model="tel" @blur="phone(tel)">
            <p>{{info}}</p>
            <div v-if="smsShow>3" class="img_block">
                <div class="sms">
                    <input type="text" placeholder="请输入图片验证码" class="sms_enter" maxlength="6" v-model="imgCode" @blur="imgCoding(imgCode)">
                    <img :src="imgSrc" alt="" @click="ATSCaptcha">
                </div>
                <p>{{imgInfo}}</p>
            </div>
            <div class="sms">
                <input type="text" placeholder="请输入短信验证码" class="sms_enter" maxlength='4' v-model="smsCode" @blur="smsCoding(smsCode)">
                <div class="sms_click">
                    <span @click="sendSms" v-if="send">发送验证码</span>
                    <span v-else class="second">{{time}}秒后重新获取</span>
                </div>
            </div>
            <p>{{smsInfo}}</p>
            <button @click="login">登录</button>
        </div>
    </div>
</template>
<script>
    const baseTest = 'http://192.168.6.3:9207';
    import {
        filter
    } from '../util/Autil.js';
    export default {
        data() {
            return {
                time: 60,
                timer: null,
                loginApi: {
                    smsCount: `${baseTest}/Handler/ATSBaseService.ashx?action=smssendcount`,
                    ATSCaptcha: `${baseTest}/Handler/ATSCaptcha.ashx`,
                    sendSms: `${baseTest}/Handler/ATSBaseService.ashx?action=sendsms`,
                    userLogin: `${baseTest}/Handler/ATSBaseService.ashx?action=verfy`
                },
                smsShow: null,
                send: true,
                imgSrc: '',
                tel: '',
                info: '',
                imgInfo: '',
                smsInfo: '',
                smsCode: '',
                imgCode: '',
                ticket: '',
                mapInfo: {},
                urlData: {},
                token: null
            }
        },
        mounted() {
            this.smsCount()
            this.Bdmap()
            if (sessionStorage['bdmap']) {
                this.mapInfo = JSON.parse(sessionStorage['bdmap']);
                // console.log(this.mapInfo)
            }
        },
        methods: {
            //短信发送次数判断
            smsCount() {
                this.Util.get({
                    url: this.loginApi.smsCount,
                    params: {
                        ticket: ''
                    },
                    success: res => {
                        // console.log(res)
                        if (res.State == 1) {
                            this.smsShow = res.Body.sendCounts;
                            this.ticket = res.Body.ticket;
                            if (res.Body.sendCounts >= 4) { //图片验证码认证
                                this.ATSCaptcha()
                            }
                        }
                    },
                    error: err => {}
                })
            },
            //图片验证码
            ATSCaptcha() {
                this.Util.get({
                    url: this.loginApi.ATSCaptcha,
                    params: {
                        mobile: '',
                        ticket: this.ticket
                    },
                    success: res => {
                        this.imgSrc = `${this.loginApi.ATSCaptcha}?ticket=${this.ticket}&r=${Math.round(Math.random()*100)}`;
                    },
                    error: err => {}
                })
            },
            //发送验证码
            sendSms() {
                if (this.phone(this.tel)) { //匹配手机号
                    this.Util.post({
                        url: this.loginApi.sendSms,
                        data: {
                            mobile: this.tel,
                            validatetype: 2,
                            bizcode: 3,
                            ticket: this.ticket,
                            photocode: this.imgCode || ''
                        },
                        success: res => {
                            if (res.State == 1) {
                                this.smsInfo = res.Msg;
                                this.send = false;
                                //显示初始时间
                                this.timer = setInterval(_ => {
                                    this.time--;
                                    if (this.time === 0) {
                                        //清理定时器，恢复时间
                                        clearInterval(this.timer);
                                        this.time = 60;
                                        this.send = true;
                                    }
                                }, 1000)
                            } else {
                                this.imgInfo = res.Msg;
                            }
                        },
                        error: err => {}
                    })
                }
            },
            //检测手机号
            phone(tel) {
                let reg = /^[1][3,4,5,6,7,8,9]\d{9}$/;
                if (reg.test(tel)) {
                    this.info = '';
                    return true;
                } else {
                    if (tel != '') {
                        this.info = '请输入正确的手机号';
                    } else {
                        this.info = '请输入手机号';
                    }
                    return false;
                }
            },
            smsCoding(val) { //短信4位
                let reg = /^\d{4}$/;
                if (reg.test(val)) {
                    this.smsInfo = '';
                    return true;
                } else {
                    if (val != '') {
                        this.smsInfo = '请输入完整的短信验证码';
                    } else {
                        this.smsInfo = '请输入短信验证码';
                    }
                    return false;
                }
            },
            imgCoding(val) { //图片6位
                let reg = /^\d{6}$/;
                if (reg.test(val)) {
                    this.imgInfo = '';
                    return true;
                } else {
                    if (val != '') {
                        this.imgInfo = '请输入完整的图片验证码';
                    } else {
                        this.imgInfo = '请输入图片验证码';
                    }
                    return false;
                }
            },
            login() {
                if (this.smsShow >= 4) {
                    this.phone(this.tel)
                    this.imgCoding(this.imgCode)
                    this.smsCoding(this.smsCode)
                    if (this.phone(this.tel) && this.imgCoding(this.imgCode) && this.smsCoding(this.smsCode)) {
                        this.userLogin()
                    }
                } else {
                    this.phone(this.tel)
                    this.smsCoding(this.smsCode)
                    if (this.phone(this.tel) && this.smsCoding(this.smsCode)) {
                        this.userLogin()
                    }
                }
            },
            Bdmap() {
                let _this = this;
                let map = new BMap.Map("allmap");
                let point = new BMap.Point(116.331398, 39.897445);
                map.centerAndZoom(point, 12);
                let geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        let mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        map.panTo(r.point);
                        // console.log(r)
                        let obj = {
                            city: r.address.city, //城市
                            lang: r.longitude, //经度
                            lat: r.latitude //纬度
                        }
                        // console.log(obj)
                        sessionStorage.setItem('bdmap', JSON.stringify(obj))
                    } else {
                        console.log(this.getStatus());
                    }
                }, {
                    enableHighAccuracy: true
                })
            },
            //登录注册
            userLogin() {
                //获取地址栏参数
                this.urlData = filter()
                // console.log(this.urlData)
                this.mapInfo = JSON.parse(sessionStorage['bdmap']);
                // console.log(this.mapInfo)
                this.Util.post({
                    url: this.loginApi.userLogin,
                    data: {
                        mobile: this.tel,
                        photocode: this.imgCode || '',
                        smscode: this.smsCode,
                        locationx: this.mapInfo.lat || '',
                        locationy: this.mapInfo.lang || '',
                        cityname: decodeURI(this.mapInfo.city) || '',
                        openid: this.urlData.openid || '',
                        ticket: this.ticket
                    },
                    success: res => {
                        if (res.State == 0) {
                            // console.log('登录成功')
                            this.token = res.Body.t;
                            let lg = {
                                token: this.token,
                                success: true
                            }
                            this.$emit('log-in', lg)
                        } else {
                            this.imgInfo = res.Msg;
                        }
                    },
                    error: err => {}
                })
            }
        }
    }
</script>
<style lang="less">
    @rem: 75rem;
    input::-webkit-input-placeholder {
        color: #999;
    }
    input {
        text-align: left;
    }
    .login {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        background: rgba(0, 0, 0, .6);
        z-index: 100;
    }
    .login_enter {
        position: absolute;
        width: 500/@rem;
        left: 50%;
        top: 40%;
        background: #fff;
        transform: translate(-50%, -50%);
        border-radius: 10/@rem;
        z-index: 10;
        padding: 50/@rem;
        .img_block {
            height: 130/@rem;
        }
        p {
            color: #ff8b03;
            font-size: 24/@rem;
            height: 50/@rem;
            line-height: 50/@rem;
            text-indent: 20/@rem;
        }
        input {
            height: 80/@rem;
            border: 1px solid #dbdbdb;
            font-size: 28/@rem;
            color: #000;
            outline: none;
            padding: 0 3%;
            box-sizing: border-box;
        }
        input:focus {
            border: 1px solid #ff8b03;
        }
        .tel_enter {
            width: 100%;
        }
        .sms {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .sms_enter {
                width: 55%;
            }
            .sms_click {
                width: 40%;
                height: 80/@rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #ddd;
                box-sizing: border-box;
                span {
                    color: #333;
                }
                .second {
                    color: #999;
                }
            }
            img {
                width: 40%;
                height: 80/@rem;
                display: block;
            }
        }
        button {
            width: 100%;
            height: 80/@rem;
            background: #ff8b03;
            color: #fff;
            font-size: 28/@rem;
            outline: none;
            box-sizing: content-box;
            border: 0;
        }
    }
</style>
