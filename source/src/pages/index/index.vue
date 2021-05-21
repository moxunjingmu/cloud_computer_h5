<template>
	<view ref="indexref">
		<view @click="onclick">
			{{index}}
		</view>
		<view @click="onAndroid" class="onAndroid">
			{{android}}
		</view>
		<div @click="onclickgoback">
			{{goback}}
		</div>
        
	</view>
</template>
<script>

	export default {
		name: "indexPage",
		
		components: { },

		props: [],

		data() {
			return {
				setupWebViewJavascriptBridge: null,
				test: null,
				index: 'index',
				android: '调用Android/ios',
				goback: '返回上一页'
			}
		},

		computed: {
			
		},

		watch: {
			
		},
		
		onLoad(){
			console.log("onLoad " + this.name)
			
		},
		onShow(){
			console.log("onShow " + this.name)
		    console.log("window.history",window.history);
			console.log("window.performance",window.performance);
			console.log("window.location.hash", window.location.hash);
		},
		beforeCreate(){
			console.log("window", window);
			console.log("window", window.WebViewJavascriptBridge);
		},
		mounted(){

		},

		onReady(){
			// console.log("onReady " + this.name)
		},
		onHide(){
			// console.log("onHide " + this.name)
		},
		onUnload(){
			// console.log("onUnload " + this.name)
		},
		onResize(){
			// console.log("onResize " + this.name)
		},
		onPullDownRefresh(){
			console.log("onPullDownRefresh " + this.name)
		},
		onReachBottom(){
			console.log("onReachBottom " + this.name)
		},
		
		methods: {
			onclick(){
				console.log("this.$route", this.$route);
				console.log("this.$route", this.$route);
				console.log("window", window.location.hash);
				console.log("window.app", window.app);

				this.$router.push('/pages/order/order')
				// window.location.replace("/pages/order/order")
			},
			
			onAndroid(){
				let that = this;
				this.$jsbridge((bridge) => {
					console.log("bridge");
					that.android = "调用开始"
                    bridge.callHandler('jsGetDataFromSwift',{ js: "js"}, function(data){
                       alert(data);
					   that.android = data;
				    })
				})
			},
			onclickgoback(){
				window.history.back();
			}

		},
	}
</script>
<style lang="scss" scoped>

.onAndroid{
	background-color: #ccc;
	height: 40px;
	width: 140px;
	border-radius: 5px;
	text-align: center;
	line-height: 40px;
	margin: 0 auto;
}

</style>
