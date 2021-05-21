/**
 * https://www.npmjs.com/package/js-localstorage-manager
 */

const customLocalStorage = {
			getItem: (key) => {
				let value = uni.getStorageSync(key);
				// console.log('[cache <- localstorage] key: ' + key, "value:", value);
	
				return value;
			},
			setItem: (key, value) => {
				// console.log('[cache -> localstorage] key: ' + key + ', value: ', value);
	
				return uni.setStorageSync(key, value);
			},
			removeItem: (key) => {
				// console.log('[cache <> localstorage] key: ' + key);
				
				return uni.removeStorageSync(key);
			}
		}

class LocalStorageCache {

	_localStorage = null;

    /**
     *
     * @param {string} cacheName
     * @param {string} userName
     * @constructor
     */
    constructor(cacheName = "ls-cache", userName = "0", c_localStorage=null) {
		// console.log("[new LocalStorageCache]", cacheName, userName);
		if (typeof LocalStorageCache.instance === 'object' 
		&& LocalStorageCache.instance._cacheName == cacheName
		&& LocalStorageCache.instance._userName == userName
		) {
			return LocalStorageCache.instance;
		}
		
				
        this._cacheName = cacheName;
        this._userName = userName;

		this._localStorage = c_localStorage || customLocalStorage;
		
		LocalStorageCache.instance = this;
		return this;
    }

    /**
     * get cache
     * @returns {*|{}}
     */
    get cache() {

        const cache = this.allCache;

        const username = this.userName;

        return cache[username] || {}
    }

    /**
     * get all cache
     * @returns {any | {}}
     */
    get allCache() {

        return JSON.parse(this._localStorage.getItem(this.cacheName) || '{}') || {};
    }

    /**
     * get cache name
     * @returns {string|string|*}
     */
    get cacheName() {
        return this._cacheName;
    }

    /**
     * get username
     * @returns {string}
     */
    get userName() {
        return this._userName;
    }

    /**
     * set username
     * @param {string} value
     */
    set userName(value) {
        this._userName = value;
    }

    /**
     * get cache by cache name
     * @param {string} name
     * @returns {*|null}
     */
    getCache(name) {

        const cache = this.cache;

        const response = cache[name];

        return response || null;
    }

    /**
     * open cache by cache name
     * @param name
     * @returns {CacheManager}
     */
    open(name) {
        return new CacheManager(name, this.cacheName);
    }

    /**
     * put cache
     * @param name
     * @param data
     */
    putCache(name, data) {

        const cache = this.cache;

        cache[name] = data;

        const allCache = this.allCache;

        const username = this.userName;

        allCache[username] = cache;

        this._localStorage.setItem(this.cacheName, JSON.stringify(allCache));
    }
}

class CacheManager extends LocalStorageCache {

    /**
     *
     * @param {string} name
     * @param {string} cacheName
     */
    constructor(name, cacheName) {

        super(cacheName);

        this._name = name;

        const cache = this.cache;

        this._result = cache[this.name] || {};
    }

    /**
     * get cache name
     * @returns {string}
     */
    get name() {
        return this._name;
    }

    /**
     * get result
     * @returns {*|{}}
     */
    get result() {
        const cache = this.cache;

        this._result = cache[this.name] || {};

        return this._result;
    }

    /**
     * put cache with cache name
     * @param {string} name
     * @param {any} data
     */
    put(name, data) {

        if (!name) name = "default";

        const cache = this.result;

        cache[name] = {data, time: new Date()};

        this._result = cache;

        this.update();
    }

    /**
     * get cache by cache name
     * @param name
     * @returns {null|{}}
     */
    get(name) {

        const result = this.result;

        const data = result[name];

        return data ? data : null;
    }

    /**
     * clear all cache
     */
    clear() {

        this._result = {};

        this.update();
    }

    /**
     * update cache
     */
    update() {
        this.putCache(this.name, this._result);
    }

    /**
     * delete cache
     * @param {string} name
     */
    delete(name) {
        if (!name) return;
        delete this._result[name];
        this.update();
    }

    /**
     * get last update time diff
     * @param {string} name
     * @returns {{secondsAgo: number, minutesAgo: number, hoursAgo: number, daysAgo: number, monthsAgo: number, yearsAgo: number}|null}
     */
    timeDiff(name) {

        const result = this.get(name);

        if (!result) return null;

        const lastUpdateTime = result.time ? result.time : null;

        if (lastUpdateTime) {

            const timeInMs = new Date(lastUpdateTime).getTime();

            const endTimeInMS = new Date().getTime();

            let timeDifference = endTimeInMS - timeInMs;

            /**
             * time difference in seconds
             * @type {number}
             */
            const secondsAgo = timeDifference / 1000;

            /**
             * time difference in minutes
             * @type {number}
             */
            const minutesAgo = secondsAgo / 60;

            /**
             * time difference in hours
             * @type {number}
             */
            const hoursAgo = minutesAgo / 60;

            /**
             * time difference in days
             * @type {number}
             */
            const daysAgo = hoursAgo / 24;

            /**
             * time difference in months
             * @type {number}
             */
            const monthsAgo = daysAgo / 30;

            /**
             * time difference in years
             * @type {number}
             */
            const yearsAgo = monthsAgo / 12;

            return {secondsAgo, minutesAgo, hoursAgo, daysAgo, monthsAgo, yearsAgo}

        } else {
            return null;
        }
    }
}

export default LocalStorageCache;

