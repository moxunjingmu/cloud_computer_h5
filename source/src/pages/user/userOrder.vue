<template>
  <view>
    <view class="title">
      <u-tabs-swiper
        ref="uTabs"
        :list="orderlist"
        active-color="#2979ff"
        inactive-color="#606266"
        font-size="30"
        @change="tabsChange"
        :current="current"
        :is-scroll="false"
      ></u-tabs-swiper>
    </view>
    <swiper
      :current="swiperCurrent"
      @transition="transition"
      @animationfinish="animationfinish"
    >
      <swiper-item
        class="swiper-item"
        v-for="(item, index) in tabs"
        :key="index"
      >
        <scroll-view
          scroll-y
          style="height: 800rpx; width: 100%"
          @scrolltolower="onreachBottom"
        >
          ...xdhfgxhg
        </scroll-view>
      </swiper-item>
    </swiper>

    <view class=""> </view>
  </view>
</template>
<script>
import navTab from "../../components/tab-swiper/nav-tab.vue";
import tabSwiper from "../../components/tab-swiper/tab-swiper.vue";
export default {
  name: "userOrder",

  components: { navTab, tabSwiper },

  props: [],

  data() {
    return {
      orderlist: [
        {
          name: "全部",
        },
        {
          name: "已完成",
        },
        {
          name: "待支付",
        },
        {
          name: "退订",
        },
      ],
      tabs:[{},{},{},{}],
      // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
      current: 1, // tabs组件的current值，表示当前活动的tab选项
      swiperCurrent: 1, // swiper组件的current值，表示当前那个swiper-item是活动的
    };
  },

  computed: {},

  watch: {},

  onLoad() {},

  methods: {
    // tabs通知swiper切换
    tabsChange(index) {
      this.swiperCurrent = index;
      console.log("index", index);
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    // scroll-view到底部加载更多
    onreachBottom() {},
  },
};
</script>
<style lang="scss" scoped>

</style>
