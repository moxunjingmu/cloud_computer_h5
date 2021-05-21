const state = {
	serverInfo: ''
}

const mutations = {
	setServerInfo(state, serverInfo){
		console.log("[store] setServerInfo", serverInfo)
		state.serverInfo = serverInfo;
	}
}

const actions = {

}

const getters = {
	serverInfo: state => state.serverInfo
}

export default {
    state,
    mutations,
    actions,
    getters,

	namespaced: true,
    strict: false
}