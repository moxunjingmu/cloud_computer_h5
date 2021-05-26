<template>
  <div class="content">
    <view
      class="bg-img padding-bottom-xl"
      style="
        background-image: url('../../static/产品详情_slices/组 31@2x.png');
        height: 324rpx;
      "
    >
      <view class="bg_body grid text-center col-1">
        <view class="card_left_top text">
          <view class="card_title align_left"> <span>29.9</span>/月 </view>
          <view class="card_subtitle text-sm align_left"> 经济型云电脑 </view>
        </view>

        <view class="card_left_body">
          <view class="grid text-center col-2">
            <view
              class="Configuration align_left"
              v-for="(icon, index) in Configuration_icons"
              :key="index"
            >
              <u-icon
                :name="icon.icon"
                size="26"
                :label="icon.text"
                :margin-left="10"
                label-size="24rpx"
                label-color="#DBE9FF"
              />
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="set_meal bg-white margin-top-sm">
      <view class="set_meal_content flex justify-between align-center">
        <span>购买时长</span>
        <view class="example-body justify-between flex align-center">
          <uni-number-box @change="changeValue" />
          <span>个月</span>
        </view>
      </view>

      <u-line length="95%" margin="0rpx 20rpx" />

      <view class="set_meal_content flex justify-between align-center">
        <span>数据盘</span>
        <view class="example-body justify-between flex align-center">
          <uni-number-box @change="changeValue" />
          <span>GB</span>
        </view>
      </view>
    </view>

    <view class="rules">
      <view class="rulestitle">订购规则</view>
      <view class="rulesbody">
        <p>
          1.
          本活动优惠范围：1）续订云主机（含带宽、磁盘）享9折；2）续订云主机（含带宽、磁盘）且续订周期为1/2/3/5年的订单，可在包年优惠基础上再享8.5折；3）升级云主机（含带宽、磁盘）享8折；
        </p>
        <p>2. 本次活动面向中移云完成实名注册的预付费用户续订/升级；</p>
        <p>
          3.
          续订及升级活动不支持代金券支付，也不支持与其他优惠活动及优惠券叠加使用；
        </p>
        <p>
          4. 若发生退款，详细请参照 官网退货说明
          >，部分云产品不支持自助退款，若产品不支持自助退款，您可在对应的产品工单分类中提交工单申请退款。退款前，请先确定是否满足退货说明的条件，且请确保数据已迁移，发生退款后不再恢复参与资格。
        </p>
        <p>
          *如用户在活动中存在隐瞒、虚构、作弊、欺诈或通过其他非正常手段规避活动规则、获取不当利益的行为，例如：作弊领取、恶意套现、网络攻击、虚假交易等，中移云有权收回相关权益、取消用户的活动参与资格，撤销违规交易，必要时追究违规用户的法律责任；活动名称仅为方便用户理解参考使用，不具有效力，实际活动内容以具体活动规则为准。
        </p>
      </view>
    </view>

    <view class="bottom_fixed flex justify-between">
      <view class="total_price flex align-center">
        <span>金额:</span>
        <div v-if="!loading">
          <span>￥</span>
          29.90
        </div>
      </view>

      <button class="buy_btn" @click="onPlaceOrder">立即购买</button>
    </view>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import lodash from "lodash";

export default {
  name: "orderDetails",
  components: {},
  data() {
    return {
      Configuration_icons: [
        {
          icon: "../../static/产品详情_slices/处理器 拷贝@2x.png",
          text: "4核处理器",
        },
        {
          icon: "../../static/产品详情_slices/硬盘 拷贝@2x.png",
          text: "160G系统盘",
        },
        {
          icon: "../../static/产品详情_slices/内存 拷贝@2x.png",
          text: "8G内存",
        },
        {
          icon: "../../static/产品详情_slices/宽带 拷贝@2x.png",
          text: "100M带宽",
        },
      ],
      loading: false,
    };
  },

  computed: {},

  onPullDownRefresh() {},
  onTabItemTap(e) {},
  async onLoad() {},

  onShow() {
    console.log("onshow", this.$options.name);
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
      this.$router.push("/pages/index/index");
    },
    goback() {
      console.log("window.history", window.history);
      window.history.back();
    },
    changeValue() {},
    onPlaceOrder() {
      this.$router.push("/pages/order/orderConfirm");
    },
    setTitle() {
      // this.$jsbridge((bridge) => {
      //   bridge.callHandler("setTitle", "确认订单", function (data) {
      //     alert(data);
      //   });
      // });
      console.log("onshow", this.$route);
      let name = this.$route.meta.name;
      if (name === "pages-order-orderDetails") document.title = "产品详情";
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  // height: calc(100vh - var(--window-top));
  //   height: calc(100vh);
  overflow: auto;
  width: 100%;
  background-color: #f5f9fc;

  .bg_body {
    padding: 40rpx 280rpx 0 74rpx;
    .card_title {
      font-size: 28rpx;
      color: #fff;

      span {
        font-weight: 700;
        font-size: 70rpx;
      }
    }

    .card_subtitle {
      font-size: 28rpx;
      color: #dbe9ff;
    }
    .card_left_body {
      padding-top: 23rpx;

      .Configuration {
        margin-bottom: 5px;
        font-weight: 500;
      }
    }
  }

  .set_meal {
    .set_meal_content {
      padding: 20rpx;
      font-size: 15px;
      font-weight: 500;

      .example-body {
        width: 160px;

        span {
          font-size: 15px;
          font-weight: 500;
        }
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

  .rules {
    margin: 10px 10px 50px;

    .rulestitle {
      margin: 10px 0;
      font-weight: 550;
      font-size: 15px;
    }

    .rulesbody {
      font-size: 14px;
      line-height: 26px;
    }
  }
}

.align_left {
  text-align: left;
}
.radius_8 {
  border-radius: 8px;
}
</style>
