<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <!-- 通过路由定义meta参数判断组件的显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
  }
}
</script>

<style></style>
