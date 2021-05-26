<template>
  <div class="content">
    <view class="u-tips u-tip-show u-warning">{{
      "请在48小时内完成支付，超时订单将自动取消"
    }}</view>

    <view class="flex Configuration_top bg-white align-left p-xs mb-sm">
      <view class="card_image align_center">
        <u-image
          :width="204"
          mode="widthFix"
          src="../../static/确认订单_slices/组 25@2x.png"
        />
      </view>

      <view class="card_content radius_8">
        <view class="grid text-center col-1">
          <view class="card_content_top text">
            <view class="card_title align_left">
              {{ "经济型云电脑" }}
            </view>
            <view class="card_subtitle align_left flex justify-between">
              <span v-for="(item, index) in detailsList" :key="index">{{
                item
              }}</span>
            </view>
          </view>

          <view class="card_content_body">
            <view class="grid text-center col-2">
              <view class="price align_left">
                <p>￥</p>
                29.90
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="set_meal margin-top-sm">
      <view class="set_meal_content bg-white flex justify-between align-center">
        <span>购买时长:</span>
        <view class="example-body pd_right flex justify-end align-center">
          <span>1</span>
          <span>个月</span>
        </view>
      </view>

      <view class="set_meal_content bg-white flex justify-between align-center">
        <span>优惠券:</span>
        <view
          class="example-body justify-end flex align-center"
          :class="{ coupons: true }"
        >
          <span> 0</span>
          <span>张可用</span>
          <text class="cuIcon-right"></text>
        </view>
      </view>
    </view>

    <view class="bottom_fixed flex justify-between">
      <view class="total_price flex align-center">
        <span>应付金额:</span>
        <div v-if="!loading"><span>￥</span>29.90</div>
      </view>

      <button class="buy_btn" @click="onPlaceOrder">确定支付</button>
    </view>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import lodash from "lodash";

export default {
  name: "orderConfirm",
  components: {},
  data() {
    return {
      detailsList: ["2核4G", "80G系统盘"],
      loading: false,
    };
  },

  computed: {},
  onPullDownRefresh() {},
  onTabItemTap(e) {},
  async onLoad() {},

  onShow() {
    console.log("onshow", this.$options.name, );
    this.setTitle();
  },
  onHide() {
    console.log("onhide");
  },

  mounted() {},

  methods: {
    onorder() {
      console.log("this.$route", this.$route);
      console.log("window.history", window.history);
      this.$router.push("/pages/order/orderPay");
    },
    goback() {
      console.log("window.history", window.history);
      window.history.back();
    },
    changeValue() {},
    onPlaceOrder() {
      this.$router.push("/pages/order/orderPay");
    },
    setTitle() {
      // this.$jsbridge((bridge) => {
      //   bridge.callHandler("setTitle", "确认订单", function (data) {
      //     alert(data);
      //   });
      // });
      console.log("onshow", this.$route);
      let name = this.$route.meta.name;
      if (name === "pages-order-orderConfirm") document.title = "确认订单";
      if (name === "pages-order-orderPay") document.title = "确认支付";
      if (name === "pages-order-orderDetails") document.title = "产品详情";
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  // height: calc(100vh - var(--window-top));
  height: calc(100vh);
  overflow: auto;
  width: 100%;
  background-color: #f5f9fc;

  view {
    box-sizing: border-box;
  }

  // 顶部弹出类型样式
  .u-tips {
    width: 100%;
    z-index: 666;
    padding: 20rpx 30rpx;
    color: #ffffff;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    // 此处为最核心点，translateY(-100%)意味着将其从Y轴隐藏（隐藏到顶部(h5)或者说导航栏(app)下面）
    transform: translateY(-100%);
    transition: all 0.35s linear;
  }

  .u-tip-show {
    transform: translateY(0);
    opacity: 1;
    z-index: 99;
  }
  .u-warning {
    background: #ffc119;
  }

  .Configuration_top {
    margin: 10px 0;
    padding: 8px;
    font-weight: 600;

    .card_title {
      font-size: 16px;
      color: #000;

      span {
        font-weight: 700;
        font-size: 70rpx;
      }
    }

    .card_subtitle {
      font-size: 14px;
    }

    .card_content {
      padding: 10px 10px 10px 0;

      .card_content_body {
        padding-top: 10px;

        .price {
          margin-bottom: 5px;
          font-weight: 550;
          color: #1890ff;
          font-size: 16px;

          p {
            display: inline-block;
            font-size: 13px;
            font-weight: 400;
          }
        }
      }
    }
  }
}

.set_meal {
  .set_meal_content {
    margin-bottom: 10px;
    padding: 20rpx;
    font-size: 15px;
    font-weight: 550;

    .example-body {
      width: 160px;
      height: 16px;
      line-height: 16px;

      span {
        font-size: 15px;
        font-weight: 550;
      }
    }

    .coupons {
      color: #a0a0a0;
    }

    .cuIcon-right {
      margin-left: 2px;
    }
  }
}

.bottom_fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  height: 96rpx;
  width: 100%;
  box-shadow: 0px 3px 20px rgba(126, 125, 125, 0.4);

  .total_price {
    height: 100%;
    padding-left: 12px;
    vertical-align: middle;

    & > span {
      font-size: 16px;
      font-weight: 600;
    }

    div {
      color: #337dff;
      margin-left: 10px;
      height: 21px;
      line-height: 26px;
      font-size: 16px;
      font-weight: 600;

      span {
        font-weight: 400;
        font-size: 12px;
      }
    }
  }

  .buy_btn {
    height: 100%;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 15px;
    text-decoration: none;
    overflow: visible;
    margin-right: initial;
    background-color: #337dff;
    border-radius: 0;
    color: #dbe9ff;

    &::after {
      border-radius: 0;
      border: 0 solid #000;
    }
  }
}

.align_left {
  text-align: left;
}
.radius_8 {
  border-radius: 8px;
}
.pd_right {
  padding-right: 15px;
}
</style>
