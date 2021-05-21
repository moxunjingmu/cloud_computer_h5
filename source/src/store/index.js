import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { localStoragePersistedState } from './persistedstate.js'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const modulesFiles = require.context('./modules', false, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)

	modules[moduleName] = value.default

	return modules
}, {})

const plugins = [
	createPersistedState({
		key: "_VUEX_localStorage",
		path: ['user.token'],
		storage: {
			getItem: (key) => {
				let value = uni.getStorageSync(key);
				// console.log('[store <- localstorage] key: ' + key, "value:", value);
	
				return value;
			},
			setItem: (key, value) => {
				// console.log('[store -> localstorage] key: ' + key + ', value: ', value);
	
				return uni.setStorageSync(key, value);
			},
			removeItem: (key) => {
				// console.log('[store <> localstorage] key: ' + key);
				
				return uni.removeStorageSync(key);
			}
		},
		/**
		 * 有选择的缓存VUEX到本地存储
		 * 
		 * @param {Object} state
		 * @param {Object} paths
		 */
		reducer(state, paths){
			return {
				platform: state.platform,
				user: state.user,
				workspace: state.workspace
			}
		}
	})
]

const store = new Vuex.Store({

	plugins,
	modules,
	getters,
})

export default store
