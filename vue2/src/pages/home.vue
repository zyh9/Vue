<template>
  <div class="web-api">
    <img src="../static/logo.png" alt="" />
    <p class="options">屏幕旋转角度 : {{ angle }} 度</p>
    <p class="options">{{ batteryInfo }}</p>
    <p class="options" @click="vibrateFun">{{ vibrateInfo }}</p>
    <p class="options">当前网络状况 : {{ onLineInfo }}</p>
    <p class="options" @click="fullScreenFun">{{ fullScreenInfo }}</p>
    <p class="options">state:{{ num }}，gettter:{{ addCount }}</p>
    <p class="options" @click="handleAsync">测试异步action</p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { throttle } from "@/utils/descriptor";
export default {
  data() {
    return {
      angle: 0,
      batteryInfo: 0,
      vibrateInfo: "点击震动",
      onLineInfo: "online",
      fullScreenInfo: "打开全屏",
    };
  },
  mounted() {
    this.screenOrientation();
    this.getBatteryInfo();
    window.addEventListener("online", this.updateOnlineStatus, true);
    window.addEventListener("offline", this.updateOnlineStatus, true);
  },
  methods: {
    //检测屏幕旋转角度
    screenOrientation() {
      let orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", () => {
        this.angle = orientation.angle;
      });
    },
    //检测是否充电以及电量
    getBatteryInfo() {
      if (navigator.getBattery) {
        navigator.getBattery().then((battery) => {
          let level = Math.floor(battery.level * 100);
          // 判断是否在充电
          this.batteryInfo = battery.charging ? `在充电 : 剩余 ${level}%` : `没充电 : 剩余 ${level}%`;
          // 电池充电状态改变事件
          battery.addEventListener("chargingchange", () => {
            this.batteryInfo = battery.charging ? `在充电 : 剩余 ${level}%` : `没充电 : 剩余 ${level}%`;
          });
        });
      } else {
        this.batteryInfo = "不支持电池状态接口";
      }
    },
    //触发手机振动
    vibrateFun() {
      if (navigator.vibrate) {
        navigator.vibrate([500, 500, 500]);
      } else {
        this.vibrateInfo = "您的设备不支持震动";
      }
    },
    //检测网络信号
    updateOnlineStatus() {
      this.onLineInfo = navigator.onLine ? "online" : "offline";
    },
    //打开、关闭全屏
    fullScreenFun() {
      var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
      if (fullscreenEnabled) {
        let de = document.documentElement;
        if (this.fullScreenInfo === "打开全屏") {
          if (de.requestFullscreen) {
            de.requestFullscreen();
          } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
          } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
          }
          this.fullScreenInfo = "退出全屏";
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
          this.fullScreenInfo = "打开全屏";
        }
      } else {
        this.fullScreenInfo = "浏览器当前不能全屏";
      }
    },
    @throttle(1000)
    async handleAsync() {
      await this.handleCount(2);
      console.log("异步action");
    },
    ...mapActions({
      handleCount: "handleCount",
    }),
    // ...mapActions(["handleCount"]),
  },
  computed: {
    ...mapState({
      num: (state) => state.count.num,
    }),
    ...mapGetters({
      addCount: "addCount",
    }),
    // ...mapGetters(["addCount"]),
  },
};
</script>

<style lang="scss">
.web-api {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.options {
  width: 400px;
  height: 50px;
  line-height: 50px;
  font-size: 26px;
  border-radius: 6px;
  background: #dfdfdf;
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 30px;
}
img {
  width: 100px;
  height: 100px;
  margin-bottom: 40px;
}
:fullscreen {
  background: #f5f5f5;
}
</style>
