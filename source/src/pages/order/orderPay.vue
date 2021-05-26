<template>
  <div class="content">
    <view class="price-tips">
      <text>应付金额</text>
      <view class="price_num"> <span>￥</span>29.90</view>
    </view>

    <view class="documents_body">
      <u-cell-group class="documents_list">
        <u-cell-item class="document_item top_title" title="请选择支付方式" :arrow="false" :title-style="titleStyle"></u-cell-item>
        <u-cell-item
          v-for="(item, index) in documentslist"
          class="document_item"
          :key="index"
          :title="item.file_name"
          :title-style="titleStyle"
          @click="openApp(item)"
        >
          <u-icon
            class="document_icon"
            slot="icon"
            size="50"
            :name="item.icon_url"
          ></u-icon>
        </u-cell-item>
      </u-cell-group>
    </view>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import lodash from "lodash";
import UCellItem from 'uview-ui/components/u-cell-item/u-cell-item.vue';

export default {
  name: "orderPay",
  components: {UCellItem},
  data() {
    return {
      documentslist: [
        {
          id: 1,
          icon_url: "../../static/确认支付_slices/微信 (1)@2x.png",
          user_name: "test002",
          file_name: "支付宝支付",
        },
        {
          id: 2,
          icon_url: "../../static/确认支付_slices/支付宝 (1)@2x.png",
          user_name: "test002",
          file_name: "微信支付",
        },
      ],
    };
  },

  computed: {
    titleStyle() {
      return {
        overflow: "hidden",
        "white-space": "nowrap",
        "text-overflow": "ellipsis",
        "font-size": "15px",
        "line-height": "22px",
        fontWeight: 550
      };
    }
  },

  onPullDownRefresh() {},
  onTabItemTap(e) {},
  async onLoad() {},

  onShow() {
    console.log("onshow", this.$options.name,);
    this.setTitle();
  },
  onHide() {
    console.log("onhide");
  },
  mounted() {},

  methods: {
    onPlaceOrder() {},
    title(item) {
      if (!item.file_name) return;
      return item.file_name.slice(0, item.file_name.lastIndexOf("."));
    },
    setTitle() {
      // this.$jsbridge((bridge) => {
      //   bridge.callHandler("setTitle", "确认订单", function (data) {
      //     alert(data);
      //   });
      // });
      console.log("onshow", this.$route);
      let name = this.$route.meta.name;
      if (name === "pages-order-orderPay") document.title = "确认支付";
    },
    stitchedIconUrl(iconurl) {
      return this.server + iconurl;
    },
    openApp(){
      console.log("onpenapp");
      this.$router.push("/pages/user/userOrder");
    }
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

  .price-tips {
    width: 100%;
    z-index: 666;
    padding: 20rpx 30rpx;
    margin: 24px 0;
    color: #000;
    font-size: 33rpx;
    font-weight: 550;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text{
        margin: 10px 0;
    }

    .price_num{
       font-size: 40px;
       font-weight: 600;
       color: #1890ff;

       span{
           font-size: 24px;
       }

    }
  }

  & > .documents_body{
    background-color: #fff;
    position: relative;
    top: 10px;
    padding: 0px 10px;
  }

  .documents_list {
    & /deep/ .u-border-top::after {
      border-bottom-width: 0px;
      border-top-width: 0px;
    }

    & /deep/ .u-cell-item-box .u-cell:last-child::after {
      border-bottom-width: 0px;
    }

    .document_item {
      padding: 15px 0px;

      & .document_icon {
        margin: 0 14px;
      }

      & /deep/ .u-icon--right {
        font-size: 12px;
      }
    }

    .top_title{
        padding: 8px 0;
    }
  }
}

.pd_right {
  padding-right: 15px;
}
</style>
