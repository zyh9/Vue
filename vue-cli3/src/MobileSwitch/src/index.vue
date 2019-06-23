<template>
  <div class="z-cell">
    <div class="z-cell-inner">
      <div class="z-cell-body">{{title}}</div>
      <div class="z-cell-footer">
        <span class="z-switch theme-primary" :class="{disabled:disabled}">
          <input
            class="z-switch-input"
            type="checkbox"
            :checked="defaultChecked"
            :disabled="disabled"
            @change="changeSwitch"
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Switchs",
  data() {
    return {};
  },
  props: {
    //开启状态
    defaultChecked: {
      type: Boolean,
      default: false
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    title: String
  },
  mounted() {
    // console.log(this);
  },
  methods: {
    changeSwitch(ev) {
      if (this.disabled) return;
      const checked = event.target.checked;
      this.$emit("z-switch", { state: checked ? "开" : "关", checked });
    }
  },
  components: {}
};
</script>

<style lang="less">
@import url("../less/index.less");
</style>
