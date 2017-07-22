/*
* @Author: showa11
* @Date:   2017-07-21 15:55:02
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-21 16:50:06
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

		//验证username
		$('#username').blur(function() {
			var username = $.trim($(this).val());
			//如果为空 不做验证
			if (!username) {
				return;
			}
			//异步验证用户名是否存在
			_user.checkUsername(username,function(res) {
				formError.hide();
			},function(errMsg) {
				formError.show(errMsg);
			})

		})
		//注册按钮点击
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
			username        : $.trim($('#username').val()),
			password        : $.trim($('#password').val()),
			passwordConfirm : $.trim($('#password-confirm').val()),
			phone           : $.trim($('#phone').val()),
			email           : $.trim($('#email').val()),
			question        : $.trim($('#question').val()),
			answer          : $.trim($('#answer').val())
		};
		// 表单验证结果
		var validataResult = this.formValidata(formData);
		if (validataResult.status) {
			_user.register(formData,function(res) {
				window.location.href = './result.html?type=register';
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
		//验证用户名是否为空
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = "用户名不能为空";
			return result; 
		}
		//验证密码是否为空
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = "密码不能为空";
			return result;
		}
		if (formData.password.length < 6) {
			result.msg = "密码长度不能少于6位";
			return result;
		}
		if (formData.password == formData.passwordConfirm) {
			result.msg = "两次输入的密码不一致";
			return result;
		}
		if (!_mm.validate(formData.phone, 'phone')) {
			result.msg = "手机号格式不正确";
			return result;
		}
		if (!_mm.validate(formData.email, 'email')) {
			result.msg = "邮箱格式不正确";
			return result;
		}
		if (!_mm.validate(formData.question, 'require')) {
			result.msg = "密码问题不能为空";
			return result;
		}
		if (!_mm.validate(formData.answer, 'require')) {
			result.msg = "密码提示问题答案不能为空";
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
