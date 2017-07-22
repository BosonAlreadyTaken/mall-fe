/*
* @Author: showa11
* @Date:   2017-07-22 09:32:00
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-22 09:51:27
*/


'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');



var page = {
	init: function() {
		this.onLoad();
		this.bindEvent() ;
	},
	onLoad: function() {
		navSide.init({
			name: 'user-pass-update'
		}); 
	},
	bindEvent: function() {
		//点击提交按钮后的动作
		$(document).on('click','btn-submit', function() {
			var userInfo = {
				phone    : $.trim($('#phone').val()),
				email    : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer   : $.trim($('#answer').val()),
			},
			validateResult = _this.ValidateForm(userInfo);
			if (validateResult.status) {
				//更改用户信息
				_user.updateUserInfo(userInfo,function(res) {

				}, function(errMsg) {
					_mm.errorTips(errMsg);
				});
			} else {
				_mm.errorTips(validateResult.msg);
			}
		})
	}
};
$(function() {
	page.init();
})