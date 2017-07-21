/*
* @Author: showa11
* @Date:   2017-07-19 17:18:59
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-19 17:35:19
*/

'use strict';
var _mm = require('util/mm.js');

var _user = {
	// 检查用户状态
	checkLogin: function(resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	// 登出
	logout: function(resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('./user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	}
}
module.exports = _user;