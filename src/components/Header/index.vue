<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <a @click="toLogin">登录</a>
            <a @click="toRegister" class="register">免费注册</a>
          </p>
          <p v-else>
            <span>|</span>
            <span>{{ userName }}</span>
            <a href="" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" href="#">
          <img src="./images/logo.png" alt="" @click="$router.push({ name: 'Home' })">
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  //给组件起一个名字,开发者工具中显示这个组件的时候，显示的就是这个名字
  name: "Header",
  data() {
    return {
      //收集用户输入的关键字
      keyword: "",
    };
  },
  methods: {
    ...mapActions('m_user', ['userLogout', 'getUserInfo']),
    toSearch() {
      // 从搜索栏搜索时因为没有分类词，故需要先把分类词与分类id清空
      this.$route.query.category1Id = undefined;
      this.$route.query.category2Id = undefined
      this.$route.query.category3Id = undefined
      this.$route.query.categoryName = undefined
      let location = {
        name: "Search",
        params: { keyword: this.keyword || undefined }
      }
      location.query = this.$route.query
      if (this.$route.path !== '/home') {
        this.$router.replace(location)
      } else {
        this.$router.push(location)
      }

    },
    toLogin() {
      this.$router.push({ name: 'Login' })
    },
    toRegister() {
      this.$router.push({ name: 'Register' })
    },
    // 退出登录
    async logout() {
      try {
        await this.userLogout()
        this.$router.push({ name: 'Home' })
      } catch (error) {

      }
    }
  },
  computed: {
    ...mapState('m_user', ['userinfo']),
    userName() {
      return this.userinfo.name
    }
  },
};
</script>

<style scoped lang="less">
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
