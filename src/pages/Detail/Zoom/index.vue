<template>
  <div class="spec-preview">
    <img :src="images.imgUrl" />
    <div class="event" @mousemove="changeMove"></div>
    <div class="big">
      <img :src="images.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: ['imageList'],
  computed: {
    images() {
      return this.imageList[this.currentIndex] || {}
    }
  },
  mounted() {
    // 引入$bus全局组件后,先在$bus.$on注册事件,然后在非父子组件内使用$bus.$emit触发事件
    this.$bus.$on('send', (index) => {
      this.currentIndex = index
    })
  },
  methods: {
    changeMove(e) {
      let mask = this.$refs.mask
      let big = this.$refs.big

      let leftwidth = e.offsetX - mask.offsetWidth / 2;
      let topwidth = e.offsetY - mask.offsetHeight / 2;

      //约束left|top数值
      if (leftwidth <= 0) leftwidth = 0;
      if (leftwidth >= mask.offsetWidth) leftwidth = mask.offsetWidth;
      if (topwidth <= 0) topwidth = 0;
      if (topwidth >= mask.offsetHeight) topwidth = mask.offsetHeight;
      //动态修改遮罩层的l、t
      mask.style.left = leftwidth + "px";
      mask.style.top = topwidth + "px";
      //修改大图的left|top
      big.style.left = -2 * leftwidth + "px";
      big.style.top = -2 * topwidth + "px";
    }
  },

}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>
