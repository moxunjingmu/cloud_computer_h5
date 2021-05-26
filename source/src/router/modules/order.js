// router/modules/home.js
const order = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/order/order',
      aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
      name: 'order',
        meta: {
	        title: '订购云电脑',
	    },
    },
    {
	    path: '/pages/order/orderConfirm',
        name: 'confirm',
        meta: {
	        title: '确认订单',
	    },
	},
    {
	    path: '/pages/order/orderDetails',
        name: 'orderDetails',
        meta: {
	        title: '确认订单',
	    },
	},
    {
	    path: '/pages/order/orderPay',
        name: 'orderPay',
        meta: {
	        title: '确认订单',
	    },
	},
    {
	    path: '/pages/order/orderConfirm',
        name: 'confirm',
        meta: {
	        title: '确认订单',
	    },
	},
]
export default order