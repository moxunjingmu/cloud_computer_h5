import Vue from 'vue'
import App from './App'
import store from './store'
import setupWebViewJavascriptBridge from './utils/WebViewJavascriptBridge'

Vue.config.productionTip = false

/**
 * used uView
 */
import uView from "uview-ui";
Vue.use(uView);

App.mpType = 'app'

Vue.prototype.$store = store;
Vue.prototype.$jsbridge = setupWebViewJavascriptBridge;


const app = new Vue({
    ...App
})

app.$mount();