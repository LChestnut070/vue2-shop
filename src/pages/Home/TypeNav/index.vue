<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveIndex">
        <h2 class="all" @mouseenter="categoryListShow = true">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="categoryListShow">
            <div class="all-sort-list2">
              <div class="item bo" v-for="(item, index) in categorylist" :key="item.categoryId"
                :class="{ curr: currentIndex === index }">
                <!-- 一级分类 -->
                <h3 @mouseenter="changeIndex(index)" :data-categoryName="item.categoryName"
                  :data-categoryId1="item.categoryId" @click="toSearch">
                  <a :data-categoryName="item.categoryName" :data-categoryId1="item.categoryId">{{
                    item.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                  <div class="subitem">
                    <!-- 二级分类 -->
                    <dl class="fore" v-for="item2 in item.categoryChild" :key="item2.categoryId">
                      <dt>
                        <a :data-categoryName="item2.categoryName" :data-categoryId2="item2.categoryId"
                          @click="toSearch">{{
                            item2.categoryName }}</a>
                      </dt>
                      <dd>
                        <!-- 三级分类 -->
                        <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                          <a :data-categoryName="item3.categoryName" :data-categoryId3="item3.categoryId"
                            @click="toSearch">{{ item3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// 引入节流
import { throttle } from 'lodash'
export default {
  name: 'TypeNav',
  data() {
    return {
      // 导航索引
      currentIndex: -1,
      categoryListShow: true
    }
  },
  methods: {
    // 动态添加类名,并使用节流函数
    // changeIndex(index) {
    //   this.currentIndex = index
    //   console.log(index);
    // },
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 动态删除类名及动态展示分类列表
    moveIndex() {
      this.currentIndex = -1
      if (this.$route.path !== '/') {
        this.categoryListShow = !this.categoryListShow
      }
    },
    // 跳转搜索页
    toSearch(e) {
      // dataset中的数据均为小写
      let { categoryname, categoryid1, categoryid2, categoryid3 } = e.target.dataset
      //categoryname存在，表示为a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: 'Search' }//跳转路由name
        let query = { categoryName: categoryname }//路由参数
        // 如果这些id都存在,则赋值
        if (categoryid1) {
          query.category1Id = categoryid1
        } else if (categoryid2) {
          query.category2Id = categoryid2
        } else if (categoryid3) {
          query.category3Id = categoryid3
        }
        //整理参数
        location.query = query
        //路由跳转
        this.$router.push(location)

      }
    }
  },
  created() {
    // 如果在store中的分类列表不为空,那么直接调用缓存内的数据
    if (this.categorylist == '[]' || this.categorylist == null) {
      this.getCategoryList;
    }

    // 判断当前页面是否为主页,如果是则立即渲染分类列表,否则不立即渲染
    if (this.$route.path !== '/') {
      this.categoryListShow = false
    }
  },
  computed: {
    ...mapActions('m_search', ['getCategoryList']),
    ...mapState('m_search', ['categorylist'])
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // overflow: hidden;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27.3px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 500px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

        }

        .curr {
          background-color: rgb(233, 128, 128)
        }
      }
    }

    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
