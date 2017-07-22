/*
* @Author: showa11
* @Date:   2017-07-21 20:52:00
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-21 21:46:33
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');



var page = {
	init: function() {
		this.onLoad();
	},
	onLoad: function() {
		navSide.init({
			name: 'user-center'
		}); 
		//加载用户信息
		this.loadUserInfo();
	},
	loadUserInfo: function() {
		var userHtml = '';
		_user.getUserInfo(function(res) {
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);  
		}, function(errMsg) {
			_mm.errorTips(errorMsg);
		})
	}
};
$(function() {
	page.init();
})