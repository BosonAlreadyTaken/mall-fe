/*
* @Author: showa11
* @Date:   2017-06-29 19:54:42
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-21 15:49:14
*/

'use strict'; 
require('./index.css')
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//错误提示
var formError = {
	show: function(errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide: function() {
		$('.error-item').hide().find('.err-msg').text('');
	}
};

// page 逻辑部分
var page = {
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		$('#submit').click(function() {
			_this.submit();
		});
		//按下回车也可以提交
		$('.user-content').keyup(function(e) {
			//keyCode === 13 表示回车
			if (e.keyCode === 13) {
				_this.submit();
			}
		})
	},
	submit: function() {
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		// 表单验证结果
		var validataResult = this.formValidata(formData);
		if (validataResult.status) {
			_user.login(formData,function(res) {
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function(errMsg) {
				formError.show(errMsg);
			});
		} else {
			//错误提示
			formError.show(validataResult.msg);
		}
	},
	formValidata: function(formData) {
		var result = {
			status: false,
			msg: '' 
		};
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = "用户名不能为空";
			return result; 
		}
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = "密码不能为空";
			return result;
		}
		//通过验证,返回正确提示
		result.status = true;
		result.msg = '验证通过';	
		return result;
	}
};
$(function() {
	page.init();
})