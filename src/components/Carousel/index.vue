<template>
  <!--swiper轮播-->
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in swiperlist" :key="item.id">
        <img :src="item.imgUrl" />
      </div>

    </div>
    <!-- <div class="swiper-scrollbar"></div> -->
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Carousel',
  data() {
    return {

    }
  },
  props: ['swiperlist'],
  watch: {
    // 因为swiperlist是props得到值,固初始值不变
    swiperlist: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          })
        })
      }
    }
  }
}
</script>

<style lang='less' scoped></style>
