<template>
	<view>
		<view class="userinfo">
			<u-avatar :src="avatarsrc" size="180"></u-avatar>
			<p class="user_name">{{userName}}</p>

			<div class="message">
					<p>部门: {{userdata.department}}</p>
					<p>登录时间: {{loginTime}}</p>
			</div>

			<u-button class="button" @click="modalShow = true" type="error">注销</u-button>
			<!-- <u-button @click="cleraLocal">清空缓存</u-button> -->
		</view>

		<!-- 确认注销弹框 -->
		<u-modal v-model="modalShow"
		  title="提示"
			content="确定要注销吗？"
		  @cancel="modalShow = false"
			@confirm="confirmLogout"
		  :show-cancel-button="true"
			:async-close="true"
			:zoom="false"
		 >

		</u-modal>
	</view>
</template>
<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import formatTime from '../../utils/timeFilters'
  import lodash from "lodash"

	export default {
		name: "user",
		
		components: { },

		props: [],

		data() {
			return {
				avatarsrc: "../../static/icon.ico",
				userName: "",
				id: "254187",
				modalShow: false,
				department: "",
				loginTime: "2021-02-01",
				userdata: {}
			}
		},

		computed: {
			
		},

		watch: {
			
		},

		onLoad() {
			this.userdata = lodash.cloneDeep(this.$store.state.user.userInfo);
			this.userdata.extra = JSON.parse(this.userdata.extra)
			this.userName = this.userdata.extra.display_name || this.userdata.username;
			this.loginTime = formatTime(this.userdata.last_login, "YYYY-MM-DD hh:mm:ss")
			console.log("self", this.userdata);
		},
		
		methods: {
			...mapActions({
				"userLogout": 'user/Logout',
				"user": 'user/GetUserInfo'
			}),
			cleraLocal(){
				uni.clearStorageSync();
				
			},
			// 使用组件代替
			logout(){
				let that = this;

				uni.showModal({
					title: "提示",
					content: "确定要注销吗？",
					success: async () => {
						await that.userLogout();
					}
				})
				
			},

		async	confirmLogout(){
				 await this.userLogout();
				 this.modalShow = false;
			}

		},
	}
</script>
<style lang="scss" scoped>
  .userinfo{
		position: fixed;
		top: 100px;
		width: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		& .user_name{
			margin-top: 10px;
			font-size: 22px;
		}

		& .user_id{
            padding: 4px 8px;
			border: 0rpx;
			color: #418ace;
			font-size: 12px;
		}

		& .message{
			margin-top: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 16px;
		}

		& .button{
		    width: 240px;
			margin: 40px auto 25px auto;
			text-align: center;
			height: 42px;
			line-height: 42px;
			font-size: 18px;
			background: linear-gradient(90deg, #F23838, #FF746A);
			border-radius: 3px;
		}
	}
</style>
