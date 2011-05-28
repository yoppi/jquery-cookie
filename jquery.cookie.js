/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Modifed: Hirokazu Yoshida (http://www.timedia.co.jp/)
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 * Usage:
 *   * set cookie
 *
 *      $.setCookie(name, value, options);
 *
 *     name: The name of the cookie.
 *     value: The value of the cookie.
 *     options:
 *       - expires: An integer specifying the expiration date from now on in minuts.
 *       - path: The value of the path attribute of the cookie.
 *       - domain: The value of the domain attribute of the cookie.
 *       - secure: If true, the secure attribute of the cookie will be set and the cookie tranmission will require a secure protocol.
 *
 *   * get cookie
 *
 *      $.getCookie(name);
 *
 *     name: The name of the cookie.
 */
;(function($) {
  $.extend({
    setCookie : function(name, value, options) {
      if (typeof value === "undefined") { return; }
      options =  options || {};
      if (value == null) { value = ''; options.expires = 0; }
      var expires = '';
      if (options.expires != null && (typeof options.expires == 'number' || options.expires instanceof Date)) {
        var expireDate; 
        if (typeof options.expires == 'number') {
          expireDate = new Date();
          expireDate.setTime(expireDate.getTime() + (options.expires * 60 * 1000)); 
        } else {
          expireDate = options.expires;
        }
        expires = '; expires=' + expireDate.toGMTString();
      }
      var path = options.path ? '; path=' + (options.path) : '';
      var domain = options.domain ? '; domain=' + (options.domain) : '';
      var secure = options.secure ? '; secure' : '';
      document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    },

    getCookie: function(name) {
      var value = null; 
      if (!document.cookie && document.cookie == '') { return value; }
      
      var cookies = document.cookie.split(';');
      $.each(cookies, function(i, _){
        var cookie = $.trim(_);
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          value = decodeURIComponent(cookie.substring(name.length+1));
          return true;
        }
      });
      return value;
    }
  });
})(jQuery);
