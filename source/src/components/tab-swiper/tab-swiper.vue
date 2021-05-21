<template>
	<view class="tab-swiper">
		
		<nav-tab class="tab-swiper-nav" v-show="data.length > 1" :data="data" :showTitle="showTitle" v-model="myTabIndex"></nav-tab>
		
		<view class="tab-bar-line"></view>
		<swiper 
			class="tab-swiper-view" 
			:current="myTabIndex"
			:duration="300" 
			@change="onswiperchange"
		>
			<swiper-item class="swiper-rank" @touchmove.stop="" v-for="(item, index) in data" :key="index">
				<slot v-bind:rank="item">
					<view class="">
						This is the {{index}} swiper.
						Please write the template.
						{{item}}
					</view>
				</slot>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	const SHOW_TITLE = "name";
	
	import navTab from "./nav-tab.vue"
	export default {
		name: "",

		components: { navTab },

		props: {
			data: {
				type: Array,
				default: function () {
					return [];
				}
			},
			showTitle: {
				type: Function | String,
				default: SHOW_TITLE
			},
			tabIndex:{
				type: Number,
				default: 0
			}
		},
		
		model: {
			prop: 'tabIndex',
			event: 'tabIndexChange'
		},

		data(){
			return{
				myTabIndex: this.tabIndex
			}
		},

		watch:{
			tabIndex(newValue){
				this.myTabIndex = newValue;
			}
		},
		
		created() {
			// console.log("_data_data_data:", this.data)
		},

		computed: {},

		mounted() {

		},

		methods: {
			onswiperchange(e){
				var index = e.detail.current;
				this.$emit('tabIndexChange', index);
				this.$emit('change', e);
			}
		},
	}
</script>

<style scoped lang="scss">
.tab-swiper{
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background-color: #ffffff;

	height: 100%;

	.tab-swiper-nav{
		flex-basis: 25px;
	}
	.tab-bar-line{
		
	}
	.tab-swiper-view{
		flex: 1;
	}


}
</style>
