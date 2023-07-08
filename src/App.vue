<template>
  <div id="app">
    <myHeader></myHeader>
    <router-view />
    <!-- 通过路由定义meta参数判断组件的显示 -->
    <myFooter v-show="$route.meta.show"></myFooter>
  </div>
</template>

<script>
import myHeader from './components/Header'
import myFooter from './components/Footer'
export default {
  name: 'App',
  components: {
    myHeader,
    myFooter
  },
  mounted() {
  }
}
</script>

<style>
body {
  padding-right: 0 !important;
}
</style>
