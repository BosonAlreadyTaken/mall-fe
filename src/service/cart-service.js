/*
* @Author: showa11
* @Date:   2017-07-19 17:39:40
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-19 17:42:34
*/

'use strict';

var _mm = require('util/mm.js');

var _cart = {
	
	// 获取购物车数量
	getCartCount: function(resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('./user/get_cart_product_count.do'),
			success: resolve,
			error: reject
		})
	}
}
module.exports = _cart;