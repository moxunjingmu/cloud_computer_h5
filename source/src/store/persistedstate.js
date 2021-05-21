import createPersistedState from "vuex-persistedstate";

/**
 * Parameter description of function createPerSistedState.
 *
 * Creates a new instance of the plugin with the given options. 
 * The following options can be provided to configure the plugin for your specific needs:
 *
 * key <String>: The key to store the persisted state under. Defaults to vuex.
 *
 * paths <Array>: An array of any paths to partially persist the state. If no paths are given, the complete state is persisted. If an empty array is given, no state is persisted. Paths must be specified using dot notation. If using modules, include the module name. eg: "auth.user" Defaults to undefined.
 *
 * reducer <Function>: A function that will be called to reduce the state to persist based on the given paths. Defaults to include the values.
 *
 * subscriber <Function>: A function called to setup mutation subscription. Defaults to store => handler => store.subscribe(handler).
 *
 * storage <Object>: Instead of (or in combination with) getState and setState. Defaults to localStorage.
 *
 * getState <Function>: A function that will be called to rehydrate a previously persisted state. Defaults to using storage.
 *
 * setState <Function>: A function that will be called to persist the given state. Defaults to using storage.
 *
 * filter <Function>: A function that will be called to filter any mutations which will trigger setState on storage eventually. Defaults to () => true.
 *
 * overwrite <Boolean>: When rehydrating, whether to overwrite the existing state with the output from getState directly, instead of merging the two objects with deepmerge. Defaults to false.
 *
 * arrayMerger <Function>: A function for merging arrays when rehydrating state. Defaults to function (store, saved) { return saved } (saved state replaces supplied state).
 *
 * rehydrated <Function>: A function that will be called when the rehydration is finished. Useful when you are using Nuxt.js, which the rehydration of the persisted state happens asynchronously. Defaults to store => {}
 *
 * fetchBeforeUse <Boolean>: A boolean indicating if the state should be fetched from storage before the plugin is used. Defaults to false.
 *
 * assertStorage <Function>: An overridable function to ensure storage is available, fired on plugins's initialization. Default one is performing a Write-Delete operation on the given Storage instance. Note, default behaviour could throw an error (like DOMException: QuotaExceededError).
 */



/**
 * The prefix added when the data persistence cache in VUEX is cached to localStorage.
 */
export const LOCAL_STORAGE_KEY_PREFIX = 'STORE'

export function localStoragePersistedState(options = {}) {

	/**
	 * 
	 * @param {Object} key
	 * @return {String} Key with the prefix added.
	 */
	function handlerKey(key) {
		return LOCAL_STORAGE_KEY_PREFIX + '_' + key;
	}
	
	console.log("		...options,", 		options,)
	return createPersistedState({
		storage: {
			getItem: (key) => {
				let value = uni.getStorageSync(handlerKey(key));
				// console.log('[store <- localstorage] key: ' + key, "value:", value);

				return value;
			},
			setItem: (key, value) => {
				// console.log('[store -> localstorage] key: ' + key + ', value: ', value);

				return uni.setStorageSync(handlerKey(key), value);
			},
			removeItem: (key) => {
				// console.log('[store <> localstorage] key: ' + key);
				
				return uni.removeStorageSync(handlerKey(key));
			}
		},
		...options,
	})
}