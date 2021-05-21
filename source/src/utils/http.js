// service.js文件

import Vue from 'vue'
import axios from 'axios'
import store from '../store'

const service = axios.create({
	// withCredentials: true,
	// crossDomain: true,
	baseURL: "",
	timeout: 1000 * 60
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
	config => {
		let token = store.getters['user/token']

		if (token) {
		    // 给请求头添加user-token
		    config.headers["Authorization"] = 'JWT ' + token;
		}
		
		config.headers['Content-Type'] = 'application/json;charset=UTF-8'
		return config;
	},
	error => {
		console.log("[service request error] ", error); // for debug
		return Promise.reject(error);
	}
);

function response_status_401(response) {
	console.warn("[service response error]: response_status_401")
	uni.reLaunch({
		url: "/pages/login/login"
	})
}

function response_status_404(response) {
	uni.showModal({
		title: '提示',
		content: '访问了一个不存在的页面，请联系管理员...'
	});
}

//配置成功后的拦截器
service.interceptors.response.use(
	res => res,
	error => {
		if (error.response) {
			switch (error.response.status) {
				case 404:
					response_status_404(error.response);
					break;
				case 401:
					response_status_401(error.response);
					break
					// case 504: response_status_504(); break
					// case 500: response_status_500(); break
			}
		}
		return Promise.reject(error)
	}
)

axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {

		// console.log("config:", config)

		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: false,
			success: resolve,
			fail: reject
		})
	})
}
export default service
