<template>
  <div class="content">
    <div class="top">
      <u-image
        width="100%"
        mode="widthFix"
        src="../../static/订购云电脑_slices/banner@2x.png"
      ></u-image>
    </div>

    <view
      class="card_body margin-sm bg-white radius_8"
      v-for="(item, index) in order_lists"
      :key="index"
    >
      <view class="flex p-xs margin-bottom-sm mb-sm" @click="onorder">
        <view class="card_left flex-twice padding-sm radius_8">
          <view class="grid text-center col-1">
            <view class="card_left_top text">
              <view class="card_title align_left">
                {{ item.title }}
              </view>
              <view class="card_subtitle text-sm align_left">
                {{ item.subtitle }}
              </view>
            </view>

            <view class="card_left_body">
              <view class="grid text-center col-2">
                <view
                  class="Configuration align_left"
                  v-for="(icon, index) in item.Configuration_icons"
                  :key="index"
                >
                  <u-icon
                    :name="icon.icon"
                    size="26"
                    :label="icon.text"
                    :margin-left="10"
                    label-size="24rpx"
                    label-color="#666"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="card_right flex-sub flex align-center">
          <u-image
            :width="186"
            mode="widthFix"
            src="../../static/订购云电脑_slices/组 13@2x.png"
          />
        </view>
      </view>
    </view>
    <!-- <button @click="goback()">
               history.back
        </button> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import lodash from "lodash";

export default {
  name: "order",
  components: {},
  data() {
    return {
      order_lists: [
        {
          title: "经济型云电脑",
          subtitle: "适合轻度办公, 文档编辑、收发邮件等",
          Configuration_icons: [
            {
              icon: "../../static/订购云电脑_slices/处理器@2x.png",
              text: "2核处理器",
            },
            {
              icon: "../../static/订购云电脑_slices/硬盘@2x.png",
              text: "80G系统盘",
            },
            {
              icon: "../../static/订购云电脑_slices/内存@2x.png",
              text: "4G内存",
            },
            {
              icon: "../../static/订购云电脑_slices/宽带@2x.png",
              text: "50M带宽",
            },
          ],
        },
        {
          title: "商务型云电脑",
          subtitle: "适合商务办公、图标绘制等",
          Configuration_icons: [
            {
              icon: "../../static/订购云电脑_slices/处理器@2x.png",
              text: "4核处理器",
            },
            {
              icon: "../../static/订购云电脑_slices/硬盘@2x.png",
              text: "160G系统盘",
            },
            {
              icon: "../../static/订购云电脑_slices/内存@2x.png",
              text: "8G内存",
            },
            {
              icon: "../../static/订购云电脑_slices/宽带@2x.png",
              text: "100M带宽",
            },
          ],
        },
      ],
    };
  },

  computed: {},
  onPullDownRefresh() {},
  onTabItemTap(e) {},
  async onLoad() {},

  onShow() {

    this.setTitle();
    console.log("window.history", window.history);

  },
  onHide() {
    console.log("onhide");
  },

  mounted() {
    console.log(document.getElementsByTagName("title")[0]);
  },

  methods: {
    onorder() {
      console.log("this.$route", this.$route);
      this.$router.push("/pages/order/orderDetails");
    },
    goback() {
      console.log("window.performance", window.performance);
      window.history.back();
    },
    aaa() {
      if (startHash !== window.location.hash) {
        window.history.back();
        responseCallback({ home: false });
      } else {
        responseCallback({ home: true });
      }
    },
    setTitle() {
    //   this.$jsbridge((bridge) => {
    //     bridge.callHandler("setTitle", "订购云电脑", function (data) {
    //       alert(data);
    //     });
    //   });
    console.log("onshow",this.$route);
	let name = this.$route.meta.name;
	if(name === "pages-order-order")
		document.title = "订购云电脑";
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  // height: calc(100vh - var(--window-top));
  height: calc(100vh);
  width: 100%;
  background-color: #f5f9fc;

  .card_left {
    margin: 10px 4px;

    .card_title {
      font-weight: 700;
      font-size: 31rpx;
      color: #000;
    }

    .card_subtitle {
      color: #a0a0a0;
    }
    .card_left_body {
      padding-top: 23rpx;

      .Configuration {
        margin-bottom: 5px;
        font-weight: 600;
      }
    }
  }

  .card_right {
    vertical-align: middle;
    text-align: center;
  }
}

.align_left {
  text-align: left;
}
.radius_8 {
  border-radius: 8px;
}
</style>
