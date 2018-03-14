<template>
  <div class="bigBox">
    <cube-loading :size="20" v-show="loading"></cube-loading>
    <div class="login">
      <div class="container" :class="seen==false?'':'show'" v-show="view==true">
        <div class="imgs">
          <img src="../../assets/bg.png" alt="">
        </div>
        <h1>UUNOTE</h1>
        <!-- 登录 -->
        <div class="keyBox">
          <div class="form">
            <div class="secForm um-flex um-ver">
              <div class="ipt">
                <input type="text" placeholder="请输入用户名" minlength="4" maxlength="14" v-model="form.name">
              </div>
            </div>
            <div class="secForm um-flex um-ver">
              <div class="ipt">
                <input type="password" placeholder="请输入密码" v-model="form.pwd" minlength="6">
              </div>
            </div>
          </div>
          <div class="btnBox">
            <button class="btn" @click="submit">登录</button>
          </div>
          <div class="reigstCode">
            <h3 @click="seen=false">注册账号</h3>
          </div>
        </div>
        <div class="tel um-flex um-ver um-center telNone">
          <p>UU跑腿前端开发：周欢、张燕辉</p>
        </div>
        <!-- 注册 -->
        <div class="register" v-show="state==1">
          <div class="closeImg" @click="closedImg">
            <img src="../../assets/img/close.png" alt="">
          </div>
          <div class="forms">
            <div class="topBox um-flex">
              <div class="flow">
                <img src="../../assets/icon.png" alt="">
              </div>
              <div class="infoLogin">真实姓名</div>
            </div>
            <div class="secIpt">
              <input type="text" placeholder="请输入账号" v-model="registerForms.real_name">
            </div>
          </div>
          <div class="forms">
            <div class="topBox um-flex">
              <div class="flow">
                <img src="../../assets/icon.png" alt="">
              </div>
              <div class="infoLogin">用户名</div>
            </div>
            <div class="secIpt">
              <input type="text" minlength="4" maxlength="14" placeholder="请输入用户名" v-model="registerForms.user_name">
            </div>
          </div>
          <div class="forms">
            <div class="topBox um-flex">
              <div class="flow">
                <img src="../../assets/icon.png" alt="">
              </div>
              <div class="infoLogin">QQ</div>
            </div>
            <div class="secIpt">
              <input type="tel" minlength="4" maxlength="13" placeholder="请输入QQ号" v-model="registerForms.qq">
            </div>
          </div>
          <div class="forms">
            <div class="topBox um-flex">
              <div class="flow">
                <img src="../../assets/icon.png" alt="">
              </div>
              <div class="infoLogin">密码</div>
            </div>
            <div class="secIpt">
              <input type="password" minlength="6" placeholder="请输入密码" v-model="registerForms.reg_pwd">
            </div>
          </div>
          <button class="btn registerBtn" :class="registerForms.real_name!=''&&registerForms.user_name!=''&&registerForms.qq.length>=4&&registerForms.qq.length<=13&&registerForms.reg_pwd.length>=6?'active':''" @click="registers">注册</button>
        </div>
        <cube-popup type="my-popup" :mask="false" ref="myPopup">
          {{message}}
        </cube-popup>
      </div>
      <!-- 弹窗 -->
      <div class="popBox" :class="seen==false?'show':'hide'">
        <div class="main">
          <div class="tip um-flex um-ver">
            <div class="font">请输入邀请码</div>
            <div class="close" @click="seen=true">
              <img src="../../assets/close.png" alt="">
            </div>
          </div>
          <div class="box">
            <input type="text" v-model="registerForms.inviteCode" autofocus="autofocus">
          </div>
          <div class="btns um-flex um-ver">
            <button class="bigBtn" @click="sure">提交</button>
          </div>
        </div>
        <div class="emp" @click="seen=true"></div>
      </div>
      <div class="animate" v-show="view==false">
        <div class="ani" v-show="pic"><img src="../../assets/bg.png" alt=""> </div>
      </div>
    </div>
  </div>
</template>

<script>
// var Hub=new Vue();
export default {
  data() {
    return {
      // token: '',
      loading: false, //加载
      seen: true, //控制自定义弹窗
      view: true, //控制开场动画
      pic: true, //控制动画图片
      state: 0, //控制注册页面
      // quit: sessionStorage['quit'],
      message: '', //cube-ui弹窗
      // 登录
      form: {
        name: '',
        pwd: ''
      },
      // 注册
      registerForms: {
        inviteCode: '',
        com: '',
        real_name: '',
        user_name: '',
        qq: '',
        reg_pwd: '',
        groupid: 5
      }
    }
  },
  beforeCreate() { },
  mounted() {
    // this.animate();
  },
  components: {},
  methods: {
    // cube-ui弹窗
    showPopup(msg) {
      this.message = msg;
      const component = this.$refs['myPopup']
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    },
    // 确认邀请码
    sure() {
      console.log(111)
      // if ((/[^\u4e00-\u9fa5]/.test(this.registerForms.inviteCode))) {
      this.Util.post({
        url: '/note/Userapi/checkKey',
        data: {
          key: this.registerForms.inviteCode
        },
        success: (res) => {
          if (res.code == 1) {
            this.registerForms.com = res.com
            this.state = 1
            this.seen = true
            this.showPopup(res.msg)
          } else {
            this.showPopup(res.msg)
          }
        },
        error: (res) => {
          this.showPopup('错误')
        },
      })
      // }
    },
    // 开场动画
    // animate() {
    //   var that = this
    //   setTimeout(function() {
    //     that.view = true
    //   }, 6600)
    //   setTimeout(function() {
    //     that.pic = true
    //   }, 1500)
    // },
    // 登录
    submit: function() {
      this.loading = true
      if (this.form.name.length < 4) {
        this.showPopup('账户名不正确')
        this.loading = false
      } else if (this.form.pwd.length < 6) {
        this.showPopup('密码不正确')
        this.loading = false
      } else {
        this.Util.post({
          url: '/note/Userapi/loginApi',
          data: {
            name: this.form.name,
            password: this.form.pwd
          },
          success: (res) => {
            if (res.code == 1) {
              this.$router.push({
                path: '/'
              })
              this.token = sessionStorage['token'] = res.userinfo.token
              sessionStorage['photo'] = res.userinfo.userphoto
              sessionStorage['name'] = res.userinfo.username
              sessionStorage['id'] = res.userinfo.id
              sessionStorage['real_name'] = res.userinfo.real_name
              sessionStorage['sex'] = res.userinfo.sex
              sessionStorage['qq'] = res.userinfo.qq
              sessionStorage['email'] = res.userinfo.useremail
              this.loading = false
            } else {
              this.showPopup(res.msg)
              this.loading = false
            }
          },
          error: (res) => {
            this.showPopup(res.msg)
          }
        })
      }
    },
    //验证纯汉字
    // checkText() {
    //   var reg = /^[a-zA-Z\d]+$/;
    //   return reg.test(this.registerForms.real_name);
    // },
    // 注册
    registers: function() {
      for (let m in this.registerForms) {
        if (this.registerForms[m] === '') {
          switch (m) {
            case 'real_name':
              this.showPopup("请输入真实姓名!");
              break;
            case 'user_name':
              this.showPopup('请输入用户名!');
              break;
            case 'qq':
              this.showPopup("请输入您的qq号!");
              break;
            case 'reg_pwd':
              this.showPopup("请输入您的密码!");
          }
          return;
        }
      }
      if (this.registerForms.length < 2) {
        this.showPopup("请输入正确的姓名");
        return;
      } else if (this.registerForms.qq.length < 4 || this.registerForms.qq.length > 14) {
        this.showPopup("请输入正确的qq号");
        return;
      } else if (this.registerForms.reg_pwd.length < 6) {
        this.showPopup("密码格式不正确");
        return;
      } else {
        this.Util.post({
          url: '/note/Userapi/regUser',
          data: {
            username: this.registerForms.user_name,
            real_name: this.registerForms.real_name,
            password: this.registerForms.reg_pwd,
            com: this.registerForms.com,
            groupid: this.registerForms.groupid
          },
          success: (res) => {
            if (res.code == 1) {
              this.showPopup('恭喜你，注册成功~')
              this.registerForms.user_name = this.form.name
              this.registerForms.reg_pwd = this.form.pwd
              setTimeout(function() {
                this.seen = true
              }, 1000)
            } else {
              this.showPopup(res.msg)
            }
          },
          error: (res) => {
            this.showPopup(res.msg)
          }
        })
      }
    },
    // 注册关闭按钮
    closedImg(){
      this.seen=true
      this.state=0
      this.registerForms.inviteCode=''
    }
  }
}
</script>

<style lang='less'>
@rem: 75rem;
.bigBox {
  width: 100%;
  height: 100%;
  background: #fff;
  .cube-loading {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: rgba(0, 0, 0, .4);
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
      width: 40/@rem !important;
      height: 40/@rem !important;
      i {
        background-color: #fff;
      }
    }
  }
  .login {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    .show {
      display: block;
    }
    .hide {
      display: none;
    }
    .container {
      width: 100%;
      height: 100%;
      padding-top: 180/@rem;
      .tel {
        position: absolute;
        bottom: 50/@rem;
        left: 50%;
        transform: translateX(-50%);
        height: 100/@rem;
        padding: 0 10/@rem;
        p {
          font-size: 28/@rem;
          color: #666;
          white-space: nowrap;
        }
        .mask-bg-avtive {
          display: block;
        }
      }
      @media (max-height: 500px) {
        .telNone {
          display: none;
        }
      }
      .imgs {
        width: 100%;
        margin: 0 auto;
        text-align: center;
        img {
          width: 120/@rem;
        }
      }
      h1 {
        text-align: center;
        font-size: 44/@rem;
        color: #fdd110;
        margin: 25/@rem auto 30/@rem;
        font-weight: bold;
      }
      .keyBox {
        .form {
          margin: 0/@rem 50/@rem;
          .secForm {
            height: 120/@rem;
            .icon {
              width: 60/@rem;
              img {
                width: 100%;
              }
            }
            .ipt {
              width: 100%;
              height: 100%;
              margin: 0 auto;
              input {
                width: 100%;
                height: 100%;
                text-align: left;
                font-size: 28/@rem;
                border-bottom: 1px solid #CBCBCE;
                padding-left: 1 0/@rem;
                &:focus {
                  border-bottom: 1px solid #fdd110;
                }
              }
              input::-webkit-input-placeholder {
                font-size: 28/@rem;
              }
            }
          }
        }
      }
      .register {
        position: absolute;
        top: 400/@rem;
        left: 46/@rem;
        right: 46/@rem;
        bottom: 0;
        background: #fff;
        z-index: 1000;
        .closeImg{
          position: absolute;
          right: -10/@rem;
          top:-360/@rem;
        }
        .forms {
          .topBox {
            font-size: 28/@rem;
            .info {
              margin: 5/@rem 0 0 10/@rem;
            }
          }
          .secIpt {
            height: 85/@rem;
            border: 1px solid #bbbbc7;
            line-height: 85/@rem;
            margin: 25/@rem 0;
            border-radius: 8/@rem;
            font-size: 28/@rem;
            input {
              height: 100%;
              width: 100%;
              text-align: left;
              padding-left: 10/@rem;
              
            }
            input::-webkit-input-placeholder {
              font-size: 28/@rem;
            }
          }
        }
        .registerBtn {
          margin: 35/@rem auto;
          width: 100%;
          outline: none;
          border: none;
          height: 90/@rem;
          font-size: 28/@rem;
          border-radius: 10/@rem;
          &.active {
            background: #000;
            color: #fdd110;
          }
        }
      }
      .btnBox {
        padding: 65/@rem 50/@rem 0;
        .btn {
          width: 100%;
          border-radius: 8/@rem;
          border: none;
          outline: none;
          height: 80/@rem;
          line-height: 80/@rem;
          text-align: center;
          font-size: 32/@rem;
          background: #000;
          color: #fdd110;
        }
      }
      .reigstCode {
        padding: 0 50/@rem;
        height: 100/@rem;
        line-height: 100/@rem;
        h3 {
          padding: 0!important;
          float: right;
          font-size: 28/@rem;
          padding: 0 50/@rem;
          color: #666;
        }
      }
    }
    .popBox {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .4);
      .main {
        background: #fff;
        padding: 38/@rem 50/@rem 58/@rem;
        position: absolute;
        top: 25%;
        left: 10%;
        right: 10%;
        border-radius: 8/@rem;
        z-index: 100;
        .tip {
          justify-content: space-between;
          .font {
            font-size: 30/@rem;
            font-weight: bold;
            margin: 0 auto;
            padding-top: 55/@rem;
          }
          .close {
            width: 25/@rem;
            margin-top: -45/@rem;
            img {
              width: 100%;
            }
          }
        }
        .code {
          padding: 60/@rem 0 15/@rem;
        }
        .box {
          width: 100%;
          input {
            width: 96%;
            height: 75/@rem;
            border-bottom: 1px solid #bbbbc7;
            margin: 35/@rem 0;
            text-align: left;
            font-size: 28/@rem;
            padding: 0 10/@rem;
            &:focus {
              border-bottom: 1px solid #fdd110;
            }
          }
        }
        .btns {
          margin-top: 45/@rem;
          .bigBtn {
            width: 100%;
            background: #ff8b03;
            color: #fff;
            text-align: center;
            margin: 0 auto;
            border: none;
            outline: none;
            height: 90/@rem;
            line-height: 90/@rem;
            font-size: 30/@rem;
            border-radius: 45/@rem;
          }
        }
      }
    }
    .animate {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 1);
      .ani {
        position: absolute;
        top: 40%;
        left: 0;
        width: 130/@rem;
        animation: myfirst 4s linear .5s 1 normal forwards;
        opacity: 0;
        img {
          width: 100%;
        }
      }
    } // @-webkit-keyframes myfirst {
    //   0% {
    //     position: absolute;
    //     top: 40%;
    //     left: 0%;
    //     opacity: .1;
    //   }
    //   25% {
    //     position: absolute;
    //     top: 20%;
    //     left: 13%;
    //     opacity: .3;
    //   }
    //   50% {
    //     position: absolute;
    //     top: 40%;
    //     left: 28%;
    //     opacity: .5;
    //   }
    //   70% {
    //     position: absolute;
    //     top: 20%;
    //     left: 38%;
    //     opacity: .8;
    //   }  
    //   100% {
    //     border-radius: 0;
    //     position: absolute;
    //     top: 40%;
    //     left: 43%;
    //     opacity: 1;
    //   }
    // }
    .emp {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: transparent;
      z-index: 10;
    }
    .cube-popup-center .cube-popup-content {
      background: #121214;
      color: #fff;
      padding: 50/@rem 70/@rem;
      border-radius: 8/@rem;
      font-size: 30/@rem;
      z-index: 1000;
      top: -60%;
    }
    .cube-popup {
      z-index: 2000;
    }
  }
}
</style>
