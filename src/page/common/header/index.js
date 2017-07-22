/*
* @Author: showa11
* @Date:   2017-07-19 18:02:31
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-19 18:53:29
*/

'use strict';
require('./index.css');

var _mm = require('util/mm.js');

//通用
var header = {
	init: function() {
		this.bindEvent();
	},
	onLoad: function() {
		var keyword = _mm.getUrlParam('keyword');
		//如果keyword存在,则回填输入框 比如在list页面 要把keyword回填
		if (keyword) {
			$('#search-input').val(keyword);
		} 
	},
	bindEvent: function() {
		var _this = this;
		//点击搜索按钮 提交keyword
		$('#search-btn').click(function() {
			_this.searchSubmit();
		});
		$('#search-input').keyup(function(e) {
			console.log(111);
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		})
	},
	//搜索的提交
	searchSubmit: function() {
		var keyword = $.trim($('#search-input').val());

		if (keyword) {
			window.location.href = './list.html?keyword=' + keyword; 
		} else {
			_mm.goHome();
		}
	}
};
header.init();
