<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--selector-->
        <SearchSelector @attrInfo="attrInfo" @getTradeMarkInfo="getTradeMarkInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 商品排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isActive }" @click="changeOrder('1')">
                  <a>综合
                    <i v-show="isActive" class="iconfont"
                      :class="{ 'icon-down-arrow': !isAsc, 'icon-up-arrow': isAsc }"></i>
                  </a>
                </li>
                <li :class="{ active: !isActive }" @click="changeOrder('2')">
                  <a>价格
                    <i v-show="!isActive" class="iconfont"
                      :class="{ 'icon-down-arrow': !isAsc, 'icon-up-arrow': isAsc }"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品渲染页 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for=" goodslist  in  goodslist " :key="goodslist.id">
                <div class="list-wrap">
                  <!-- 商品图片 -->
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <img :src="goodslist.defaultImg" />
                    </a>
                  </div>
                  <!-- 商品价格 -->
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <!-- 如果价格不为两位小数,那么执行filters过滤器进行修正 -->
                      <i>{{ goodslist.price | toFixed }}</i>
                    </strong>
                  </div>
                  <!-- 商品名称 -->
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goodslist.title">{{ goodslist.title }}}</a>
                  </div>
                  <!-- 商品评价数 -->
                  <div class="commit">
                    <i class="command">已有<span>{{ goodslist.hotScore }}</span>人评价</i>
                  </div>
                  <!-- 对商品的操作 -->
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchinfo.total"
            :continues="5" @getPageNum="getPageNum">
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        // 一级分类id
        "category1Id": "",
        // 二级分类id
        "category2Id": "",
        // 三级分类id
        "category3Id": "",
        // 分类名称
        "categoryName": "",
        // 关键词
        "keyword": "",
        // 排序
        "order": "1:desc",
        // 页数
        "pageNo": 1,
        // 页面数量
        "pageSize": 5,
        // 平台售卖属性(自带的参数)
        "props": [],
        // 品牌
        "trademark": ""
      }

    }
  },
  filters: {
    toFixed(price) {
      return Number(price).toFixed(2)
    }
  },
  created() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  mounted() {
    // 发起获取商品信息请求
    this.getSearchInfo(this.searchParams)
  },
  methods: {
    ...mapActions('m_search', ['getSearchInfo']),
    // 接收子组件传递的参数
    attrInfo(attrslist, attrValueList) {
      let props = `${attrslist.attrId}:${attrValueList}:${attrslist.attrName}`
      this.searchParams.props.push(props)
      this.getSearchInfo(this.searchParams)
    },
    // 改变搜索排序
    changeOrder(flag) {
      let newSearchOrder = this.searchParams.order
      let orderFlag = this.searchParams.order.split(':')[0]
      let order = this.searchParams.order.split(':')[1]
      // 如果点击的按钮不是当前页面按钮
      if (orderFlag !== flag) {
        newSearchOrder = `${flag}:desc`
        this.getSearchInfo(this.searchParams)
      } else {
        newSearchOrder = `${flag}:${order === 'desc' ? 'asc' : 'desc'}`
      }
      this.searchParams.order = newSearchOrder
      this.getSearchInfo(this.searchParams)
    },
    // 获取子组件传递的品牌信息
    getTradeMarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getSearchInfo(this.searchParams)
    },
    // 获取当前页的页数
    getPageNum(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getSearchInfo(this.searchParams)
    }
  },
  computed: {
    ...mapGetters('m_search', ['goodslist']),
    ...mapState('m_search', ['searchinfo']),
    // 点击的状态
    isActive() {
      return this.searchParams.order.indexOf('1') != -1
    },
    // 升序降序状态
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    }
  },
  watch: {
    $route() {
      // 当路由发生变化执行
      // 第一个参数目标对象，修改后将作为返回值。后面的参数包含要应用的属性的源对象。
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getSearchInfo(this.searchParams)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;
                  width: 100%;

                  img {
                    max-width: 100%;
                    width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }


    }
  }
}
</style>
