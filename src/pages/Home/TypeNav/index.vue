<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveIndex">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <div class="all-sort-list2">
            <div class="item bo" v-for="(item, index) in categorylist" :key="item.categoryId"
              :class="{ curr: currentIndex === index }">
              <!-- 一级分类 -->
              <h3 @mouseenter="changeIndex(index)">
                <a href="">{{ item.categoryName }}</a>
              </h3>
              <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                <div class="subitem">
                  <!-- 二级分类 -->
                  <dl class="fore" v-for="item2 in item.categoryChild" :key="item2.categoryId">
                    <dt>
                      <a href="">{{ item2.categoryName }}</a>
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                        <a href="">{{ item3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
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
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1
    }
  },
  methods: {
    // 动态添加类名
    changeIndex(index) {
      this.currentIndex = index
    },
    // 动态删除类名
    moveIndex() {
      this.currentIndex = -1
    }
  },
  mounted() {
    this.getCategoryList;
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
      top: 47px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

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
  }
}
</style>
