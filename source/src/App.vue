<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	
	export default {
		
		computed: {
			...mapGetters({
				token: "user/token"
			})
		},
		
		onLaunch: function() {
			

			console.log('App Launch')


			// uni.reLaunch({
			// 	url: "/pages/index/index"
			// })


			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "colorui/main.css";
    @import "colorui/icon.css";
	@import "./styles/index.scss"; 


</style>
