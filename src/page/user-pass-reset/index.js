/*
* @Author: showa11
* @Date:   2017-06-29 19:54:42
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-21 20:23:23
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
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		this.loadStepUsername();
	},
	bindEvent: function() {
		var _this = this;
		//输入完用户名的点击
		$('#submit-username').click(function() {
			var username = $.trim($('#username').val());
			if (username) {
				_user.getQuestion(username,function(res) {
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				}, function(errMsg) {
					formError.show(errMsg);
				})
			} else { //用户名不存在
				formError.show('请输入用户名')
			}
		});
		//输入密码提示问题的答案
		$('#submit-question').click(function() {
			var answer = $.trim($('#answer').val());
			if (answer) {
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				},function(res) {
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword()
				}, function(errMsg) {
					formError.show(errMsg);
				})
			} else { //用户名不存在
				formError.show('请输入答案')
			}
		});
		//输入新密码
		$('#submit-password ').click(function() {
			var password = $.trim($('#password').val());
			if (password && password.length >= 6) {
				_user.resetPassword({
					username    : _this.data.username,
					passwordNew : _this.data.question,
					forgetToken : _this.data.token,
				},function(res) {
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg) {
					formError.show(errMsg);
				})
			} else { //用户名为空
				formError.show('请输入不少于6位新密码')
			}
		});
	},
	// 加载输入用户名的一步
	loadStepUsername: function() {
		$('.step-username').show();
	},
	// 加载密码提示问题答案的一步 
	loadStepQuestion: function() {
		//清除错误提示
		formError.hide();
		//容器的切换
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
	},
	// 加载输入新密码的一步
	loadStepPassword: function() {
		formError.hide();
		$('.step-question').hide().siblings('.step-password').show()
	},

};
$(function() {
	page.init();
})