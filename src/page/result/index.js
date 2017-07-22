/*
* @Author: showa11
* @Date:   2017-07-21 09:13:58
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-21 10:01:17
*/


require('./index.css');
require('page/common/nav-simple/index.js');

var _mm = require('util/mm.js');

$(function() {
	var type = _mm.getUrlParam('type') || 'default',
			$element = $('.' + type + '-success');

	//显示对应的提示元素
	$element.show();
})