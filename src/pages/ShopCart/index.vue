<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 购物车列表 -->
        <ul class="cart-list" v-for=" cartInfo in shopList" :key="cartInfo.id">
          <!-- 选中状态 -->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked"
              @change="updateChecked(cartInfo, $event)">
          </li>
          <!-- 商品信息 -->
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <!-- 单价 -->
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <!-- 数量 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeShopNum('minus', -1, cartInfo)">-</a>
            <input autocomplete="off" type="number" :value="cartInfo.skuNum" class="itxt"
              @change="changeShopNum('change', $event.target.value * 1, cartInfo)">
            <a href="javascript:void(0)" class="plus" @click="changeShopNum('add', 1, cartInfo)">+</a>
          </li>
          <!-- 单个商品总价格 -->
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.skuPrice }}</span>
          </li>
          <!-- 操作 -->
          <li class="cart-list-con7">
            <button class="sindelet" @click="deleteCart(cartInfo)">删除</button>
            <button>移到收藏</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isChecked && shopList.length > 0" @click="updateAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ cartAllPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="toTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'ShopCart',
  data() {
    return {
      // 节流参数
      loading: false
    }
  },
  created() {
    this.getCartList()
  },
  mounted() {

  },
  methods: {
    ...mapActions('m_shopcart', ['getCartList', 'deleteCartById', 'updateCheckedById', 'Store_deleteAllCheckedCart', 'Store_updateAllChecked']),
    ...mapActions('m_detail', ['updateCart']),
    // 修改购物车商品数量
    async changeShopNum(state, value, cartInfo) {

      // 如果正在加载则结束
      if (this.loading) {
        return
      } else {
        this.loading = true
        switch (state) {
          case "add":
            value = 1
            break;
          case "minus":
            value = cartInfo.skuNum > 1 ? -1 : 0
            break
          case "change":
            //非正常的情况判断---【汉字、出现负数、未输入值】
            if (isNaN(value) || value < 1 || !value) {
              //用户输入进来的数值不合法，已有的数量不变
              value = 0;
            } else {
              //如果用户输入进来数值--正常（算出差值）
              value = parseInt(value) - cartInfo.skuNum;
            }
        }

        try {
          // 更新购物车列表
          await this.updateCart({
            skuId: cartInfo.skuId,
            skuNum: value
          })
          // 获取购物车列表,成功获取后执行
          this.getCartList().then(res => {
            this.loading = false
          })
        } catch (error) {
          alert("修改数量失败")
        }
      }

    },

    // 删除单个商品
    async deleteCart(shop) {
      if (this.loading) {
        return
      } else {
        this.loading = true
        try {
          await this.deleteCartById(shop.skuId)
          this.getCartList().then(res => {
            this.loading = false
          });
        } catch (error) {
          alert("删除产品失败");
        }
      }

    },

    // 更新单个选中状态
    updateChecked(cartInfo, event) {
      if (this.loading) {
        return
      } else {
        this.loading = true
        event.target.disabled = true
        this.updateCheckedById({
          skuId: cartInfo.skuId,
          // 传1或0,非布尔值
          isChecked: event.target.checked ? "1" : "0"
        }).then(() => {
          // 需要等待请求发送完毕后在发送请求,否则容易出现列表渲染错误
          this.getCartList().then(() => {
            this.loading = false
            event.target.disabled = false
          })
        })
      }
    },

    // 删除全部已选中商品
    async deleteAllCheckedCart() {
      try {
        await this.Store_deleteAllCheckedCart()
        this.getCartList()
      } catch (error) {
        alert("删除失败" + error)
      }
    },
    // 更新全选状态
    async updateAllChecked(event) {
      const AllPromise = []
      if (this.loading) {
        return
      } else {
        try {
          this.loading = true
          event.target.disabled = true
          await this.Store_updateAllChecked(
            // 传1或0,非布尔值
            event.target.checked ? "1" : "0"
          )
          this.getCartList()
          this.loading = false
          event.target.disabled = false
        } catch (error) {
          alert('更新状态失败' + error)
        }

      }


    },
    // 跳转结算页面
    toTrade() {
      this.$router.push({ name: 'Trade' })
    }
  },
  computed: {
    ...mapState('m_shopcart', ['cartlist']),
    ...mapGetters('m_shopcart', ['cartInfoList']),
    // 处理购物车列表
    shopList() {
      return this.cartInfoList.cartInfoList || []
    },
    // 全选状态
    isChecked() {
      return this.shopList.every(item => item.isChecked === 1) && this.shopList.length > 0
    },
    // 计算已勾选的商品总价
    cartAllPrice() {
      return this.shopList.filter(item => {
        return item.isChecked === 1
      }).map(item => {
        return item.skuNum * item.skuPrice
      }).reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
    }
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
          text-align: center;
        }

        .cart-list-con2 {
          width: 40%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: calc(100% - 110px);
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 0%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 15%;
          text-align: center;
        }

        .cart-list-con5 {
          width: 10%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 15%;
          text-align: center;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;
          display: flex;
          justify-content: space-around;

          button {
            padding: 5px;
            // border-color: #bbbbbb;
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
