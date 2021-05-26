<template>
	<view class="nav-tab">
		<view class="nav-tab-content">
			<scroll-view 
				scroll-x="true" 
				class="nav-tab-content__scroll"
				scroll-with-animation
				:scroll-left="scrollLeft">
				<block v-for="(item, index) in data">
					<view
						:key="index"
						class="nav-tab-item"
						:class="{
							'active': index === activeIndex
						}"
						:style="{
							width: tabItemWidth + 'px'
						}" 
						
						:data-index="index" 
						
						@click="tabItemClick(index)">
					    <slot v-bind:tab="item">
							{{handlerShowTabTitle(item)}}
						</slot>
					</view>
					 
				</block>
				
				<view class="nav-tab-underline" 
					:style="{
						transform: `translateX( ${isLeft}px )`,
						width: tabItemWidth + 'px'
					}"
				>
					<view class="underline"></view>
				</view>

			</scroll-view>

		</view>
	</view>
</template>

<script>
	
	const SHOW_TITLE = "name";
	
	export default {
		name: 'navTab',
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
			activeIndex: {
				type: Number,
				default: 0,
			}
		},
		model: {
			prop: 'activeIndex',  // 不一定非要是value
			event: 'activeIndexChange'  // 不一定非要是input
		},
		data() {
			return {
				isLeft: 0, //导航栏下划线位置
				tabItemWidth: 0, //每个导航栏占位
				scrollLeft:0
			};
		},
		computed:{
			dataRange(){
				return {
					activeIndex: this.activeIndex,
					data: this.data,
					systemRect: {
						windowWidth: 0
					}
				}
			}
		},
		
		created() {
			this.systemRect = uni.getSystemInfoSync();
			this.$watch( "dataRange", this.updateLayout, {immediate: true, deep: true})
			
			uni.onWindowResize((res) => {
				this.systemRect = res.size;
				this.updateLayout()
			})
		},
		methods: {
			tabItemClick(index){
				this.$emit('activeIndexChange', index);
				this.$emit('changeTab', index);
			},
			handlerShowTabTitle(item){
				if(typeof(this.showTitle) == "string" ){
					return item[this.showTitle];
				} else if(typeof(this.showTitle) == "function"){
					return this.showTitle(item);
				} else {
					return item[SHOW_TITLE];
				}
			},
			updateLayout(){
					let newIndex = this.activeIndex;
					let data = this.data;
					
					if(newIndex > data.length){
						this.activeIndex = data.length;
						return;
					}
					
					if(data.length <= 5 ){
						this.tabItemWidth = this.systemRect.windowWidth / data.length //宽度除以导航标题个数=一个导航所占宽度	
					} else {
						this.tabItemWidth = this.systemRect.windowWidth / 5 
					}
					
					if(this.data.length > 5){
						var tempIndex = newIndex - 2;
						tempIndex = tempIndex <= 0 ? 0 : tempIndex;
						this.scrollLeft = (newIndex - 2) * this.tabItemWidth; //设置下划线位置
					}
					
					this.isLeft = newIndex * this.tabItemWidth; //设置下划线位置
				}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-tab{
		width: 100%;
		color: #303133;
		white-space: nowrap;
		
		.active {
			color: #007AFF;
		}

		.nav-tab-content {
			width: 100%;
			height: 100%;
			
			.nav-tab-content__scroll{
				white-space: nowrap;
				display: flex;
			}
			
			.nav-tab-item{ 
				height: 100%; 
				display: inline-block;
				text-align: center;
			}
			
			.nav-tab-underline {
				height: 3px;
				width: 100%;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .5s;
				.underline {
					width: 84upx;
					height: 4px;
					background-color: #007AFF;
				}
			}
		}
	}
</style>
