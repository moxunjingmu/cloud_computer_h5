import { apiGetUserWorkspace } from '../../api/bream.js'

let info = JSON.parse(JSON.stringify( uni.getSystemInfoSync() ));
let scale = Math.min(info.windowWidth, info.windowHeight) / Math.min(1080, 1920);  // UI 设计图宽度是1080px * 1920px

const state = {
	systemInfo: info,
	scale: scale
}

console.log("system info", state.systemInfo)

const mutations = {
	UPDATE_SYSTEM_INFO(state){
		state.systemInfo = uni.getSystemInfoSync();
		state.scale = state.systemInfo.windowWidth / 1080;
	}
}

const actions = {
	
}

const getters = {
	systemInfo: state => state.systemInfo,
	scale: state => state.scale
}

export default {
	state,
	mutations,
	actions,
	getters,

	namespaced: true,
	strict: false
}
