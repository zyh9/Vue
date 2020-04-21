<template>
  <div class="z-modal">
    <!-- <transition enter-active-class="fade-enter" leave-active-class="fade-leave"> -->
    <transition enter-active-class="fade-enter">
      <div class="z-mask" @click.self="cancelModal" v-if="modalBlock">
        <div class="z-modal-con">
          <div class="z-modal-header">{{title}}</div>
          <div class="z-modal-body">{{message}}</div>
          <div class="z-modal-footer">
            <div class="z-button z-close" @click="cancelModal">取消</div>
            <div class="z-button z-ok" @click="okModal">确认</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Modal",
    data() {
      return {
        modalBlock: false
      };
    },
    props: {
      title: String,
      message: String
    },
    mounted() {},
    methods: {
      showModal() {
        this.modalBlock = true;
      },
      hideModal() {
        this.modalBlock = false;
      },
      cancelModal() {
        this.$emit("z-modal-cancel", {
          title: "取消",
          Boolean: false
        });
      },
      okModal() {
        this.$emit("z-modal-ok", {
          title: "确认",
          Boolean: true
        });
      }
    },
    components: {},
    watch: {}
  };
</script>

<style lang="less">
  @import url("../less/index.less");
</style>
