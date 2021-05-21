import Vue from 'vue'
/**
 * https://hhyang.cn/src/router/start/quickstart.html, 2.x
 */
import { RouterMount, createRouter } from 'uni-simple-router';

// 初始化
const router = createRouter({
	APP: {
		//设置等待页面背景色
		loddingPageStyle: () => {

			return {
				"backgroundColor": "#ffffff"
			}
		},
		launchedHook:()=>{
			plus.navigator.closeSplashscreen();
			console.log('加载完成啦')
		},
		loddingPageHook:(view)=>{
			view.show();
			view.drawBitmap('/static/logo.png', {}, {
				top: 'auto',
				left: 'auto',
				width: '300px',
				height: '300px'
			})
		}
	},
	//通过启动页生命钩子绘制加载gif
	
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});

Vue.use(router);

export default router;
