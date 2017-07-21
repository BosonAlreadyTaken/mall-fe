/*
* @Author: showa11
* @Date:   2017-07-19 11:55:30
* @Last Modified by:   showa11
* @Last Modified time: 2017-07-19 17:13:05
*/

'use strict';
var Hogan = require('hogan');

var conf = {
  serverHost: ''
}

var _mm = {
  //网络请求
  request: function(param) {
    var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function(res) {
        if (0 === res.status) {
          typeof param.success === 'function' && param.success(res.data,res.msg);
        } else if(10 === res.status) {
          _this.doLogin();
        } else if(1 === res.status) {
          typeof param.error === 'function' && param.error(res.msg)
        }
      },
      error: function(err) {
        typeof param.error === 'function' && param.error(err.statusText)
      }
    });
  },
  //获取服务器地址
  getServerUrl: function(path) {
    return conf.serverHost + path;
  },
  getUrlParam: function(name) {
    //happymmall.com/product/list?keyword=xxx&page=2
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  //渲染html模板
  renderHtml: function(htmlTemplate,data) {
    var template = Hogan.compile(htmlTemplate);
    var result = template.render(data);
    return result;
  },
  //成功提示
   successTips: function(msg) {
    alert(msg || '操作成功')
   },
   //错误提示
   errorTips: function(msg) {
    alert(msg || '操作error')
   },
   //字段的验证 支持是否为空, 手机,邮箱
   validate: function(value,type) {
    var value = $.trim(value);
    //非空验证
    if ('require' === type) {
      return !!value;
    }
    //手机号验证
    if ('phone' === type) {
      return /^1\d{10}$/.test(value);
    }
    if ('email' === type) {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }

   }, 
  //统一登录处理
  doLogin: function() {
    window.location.href = './view/login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  goHome: function() {
    window.location.href = './view/index.html';
  }
};

module.exports = _mm;