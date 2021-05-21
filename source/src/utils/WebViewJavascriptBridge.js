let startHash = null;
/**
 * 原生端js桥
 */
 function setupWebViewJavascriptBridge(callback) {
    // 回调是否存在了
    let callbackExisted = false;
    if ((window).WebViewJavascriptBridge) {
      return callback((window).WebViewJavascriptBridge);
    }
    if ((window).WVJBCallbacks) {
      (window).WVJBCallbacks.forEach(cb => {
        if (JSON.stringify(cb) == JSON.stringify(callback)) {
          callbackExisted = true;
        }
      });
      if (!callbackExisted) {
        return (window).WVJBCallbacks.push(callback);
      }
      return;
    }
    (window).WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }


window.onload = function () {
    if(!startHash) startHash = window.location.hash;
    function registerAppEvent() {
        setupWebViewJavascriptBridge(function (bridge) {

            bridge.registerHandler('pageBack', function (data, responseCallback) {
                if(startHash !== window.location.hash){
                    window.history.back();
                    responseCallback(0)
                }
                else{
                    responseCallback(1)
                }
            })

            bridge.init(function (message, responseCallback) {
                responseCallback(data);
            });
        })
    }

    // 兼容写法 
    let isInitBridgeEvent = false // 作为是否已注册过事件的标记
    if (window.WebViewJavascriptBridge) {
        registerAppEvent()
        isInitBridgeEvent = true
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function () {
                registerAppEvent()
                isInitBridgeEvent = true
            },
            false
        )
        // 如果还没注册则再注册一次
        setTimeout(() => {
            if (!isInitBridgeEvent) {
                registerAppEvent()
                isInitBridgeEvent = true
            }
        }, 100)
    }
}

export default setupWebViewJavascriptBridge;