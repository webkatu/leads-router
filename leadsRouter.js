(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.leads = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./lib/locationOrigin.js');
module.exports = require('./lib/leads').default;
},{"./lib/leads":6,"./lib/locationOrigin.js":7}],2:[function(require,module,exports){
"use strict";exports.__esModule=true;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Request=function Request(){_classCallCheck(this,Request);};exports.default=Request;
},{}],3:[function(require,module,exports){
"use strict";exports.__esModule=true;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Response=function Response(){_classCallCheck(this,Response);};exports.default=Response;
},{}],4:[function(require,module,exports){
'use strict';exports.__esModule=true;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _URL=require('./URL');var _URL2=_interopRequireDefault(_URL);var _pathToRegexp=require('path-to-regexp');var _pathToRegexp2=_interopRequireDefault(_pathToRegexp);var _namespace=require('./namespace');var _namespace2=_interopRequireDefault(_namespace);var _Request=require('./Request');var _Request2=_interopRequireDefault(_Request);var _Response=require('./Response');var _Response2=_interopRequireDefault(_Response);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var privates=(0,_namespace2.default)();var Router=function(){function Router(options){_classCallCheck(this,Router);var self=privates(this);self.handlers=[];self.errorHandlers=[];self.paramHandlers={};self.defaults={};var caseSensitive=false;var mergeParams=false;var strict=false;var addHistory=true;var changePath=true;var transition=true;Object.defineProperties(self.defaults,{caseSensitive:{get:function get(){return caseSensitive;},set:function set(value){caseSensitive=Boolean(value);},enumerable:true},mergeParams:{get:function get(){return mergeParams;},set:function set(value){mergeParams=Boolean(value);},enumerable:true},strict:{get:function get(){return strict;},set:function set(value){strict=Boolean(value);},enumerable:true},addHistory:{get:function get(){return addHistory;},set:function set(value){addHistory=Boolean(value);},enumerable:true},changePath:{get:function get(){return changePath;},set:function set(value){changePath=Boolean(value);},enumerable:true},transition:{get:function get(){return transition;},set:function set(value){transition=Boolean(value);},enumerable:true}});for(var method in privateMethods){self[method]=privateMethods[method].bind(this);}this.defaults=options;}Router.prototype.dispatch=function dispatch(urlString,method,options){var self=privates(this);if(typeof urlString!=='string')return;if(typeof method!=='string')method='all';if((typeof options==='undefined'?'undefined':_typeof(options))!=='object'||options===null)options={};if(typeof options.addHistory!=='boolean')options.addHistory=self.defaults.addHistory;if(typeof options.changePath!=='boolean')options.changePath=self.defaults.changePath;if(typeof options.transition!=='boolean')options.transition=self.defaults.transition;var request=new _Request2.default();var response=new _Response2.default();var url=_URL2.default.parse(urlString);if(url.origin!==location.origin){if(options.transition)location.href=url.href;return;}request.dispatcher=this;request.originalUrl=urlString;request.method=method;request.data=options.data;_extends(request,url);var state={path:urlString};if(options.addHistory&&options.changePath){window.history.pushState(state,null,url.href);}else if(options.addHistory&&options.changePath===false){window.history.pushState(state,null,location.href);}else if(options.addHistory===false&&options.changePath){window.history.replaceState(state,null,url.href);}self.goGetCalledHandler=self.gfGetCalledHandler(url.pathname,method,'',{});self.runNextHandler(request,response);};Router.prototype.use=function use(){if(arguments.length===0)return this;var path='/';var type='middleware';var firstParam=arguments[0];if(firstParam!==undefined&&firstParam!==null&&typeof firstParam!=='function'&&!(firstParam instanceof Router)){path=firstParam;Array.prototype.shift.bind(arguments)();}var self=privates(this);var listeners=[];Array.prototype.forEach.bind(arguments)(function(arg){if(typeof arg!=='function'&&!(arg instanceof Router)){return;}if(typeof arg==='function'&&arg.length===4){self.register({path:path,type:type,listener:arg},'error');return;}listeners.push(arg);});if(listeners.length!==0){self.register({path:path,type:type,listeners:listeners});}return this;};Router.prototype.all=function all(path){privates(this).METHOD(path,'all',arguments);return this;};Router.prototype.get=function get(path){privates(this).METHOD(path,'get',arguments);return this;};Router.prototype.post=function post(path){privates(this).METHOD(path,'post',arguments);return this;};Router.prototype.head=function head(path){privates(this).METHOD(path,'head',arguments);return this;};Router.prototype.put=function put(path){privates(this).METHOD(path,'put',arguments);return this;};Router.prototype.delete=function _delete(path){privates(this).METHOD(path,'delete',arguments);return this;};Router.prototype.options=function options(path){privates(this).METHOD(path,'options',arguments);return this;};Router.prototype.route=function route(path){var _this=this;var ret={};['all','get','post','head','put','delete','options'].forEach(function(method){ret[method]=function(){this[method].bind(this,path).apply(this,arguments);return ret;}.bind(_this);});return ret;};Router.prototype.param=function param(name,callback){if(typeof callback!=='function'){return;}var self=privates(this);var names=null;if(Array.isArray(name)){names=name;}else {names=[name];}names.forEach(function(name){if(typeof name!=='string'){return;}if(name in self.paramHandlers){self.paramHandlers[name].listeners.push(callback);return;}self.paramHandlers[name]={listeners:[callback],type:'parameter'};});};_createClass(Router,[{key:'defaults',get:function get(){return privates(this).defaults;},set:function set(obj){var self=privates(this);if((typeof obj==='undefined'?'undefined':_typeof(obj))!=='object'||obj===null)return;for(var prop in self.defaults){if(!(prop in obj))continue;self.defaults[prop]=obj[prop];}}}]);return Router;}();exports.default=Router;var privateMethods={METHOD:function METHOD(path,method,args){if(path===undefined||path===null){return;}if(args.length===1){this.dispatch(path,method);return;}if(args.length===2&&_typeof(args[1])==='object'&&args[1]!==null&&!(args[1] instanceof Router)){this.dispatch(path,method,args[1]);return;}var self=privates(this);var type='method';var listeners=[];Array.prototype.shift.bind(args)();Array.prototype.forEach.bind(args)(function(arg){if(typeof arg!=='function'&&!(arg instanceof Router)){return;}if(typeof arg==='function'&&arg.length===4){self.register({path:path,type:type,method:method,listener:arg},'error');return;}listeners.push(arg);});if(listeners.length!==0){self.register({path:path,type:type,method:method,listeners:listeners});}},getRemainder:function getRemainder(matched){if(matched.index!==0){return null;}var remainder=matched.input.replace(matched[0],'');if(matched[0].slice(-1)!=='/'&&remainder[0]!=='/'&&remainder!==''){return null;}return _URL2.default.addFirstSlash(remainder);},getParams:function getParams(matched,keys,parentParams){var self=privates(this);var params=self.defaults.mergeParams?_extends({},parentParams):{};matched=matched.concat([]);matched.shift();if(matched.length===0){return params;}keys.forEach(function(value){if((typeof value==='undefined'?'undefined':_typeof(value))!=='object'){return;}params[value.name]=matched.shift();});return params;},getChangedParamKeys:function getChangedParamKeys(paramsObserver,params){var keys=[];for(var prop in params){if(paramsObserver[prop]!==params[prop]){paramsObserver[prop]=params[prop];keys.push(prop);}}return keys;},getParamHandlers:function getParamHandlers(keys,req){var self=privates(this);var paramHandlers=[];keys.forEach(function(key){if(key in self.paramHandlers===false){return;}paramHandlers.push({handler:{type:self.paramHandlers[key].type,listeners:self.paramHandlers[key].listeners},paramValue:req.params[key],req:req});});return paramHandlers;},getMatchedMiddlewareHandlers:function getMatchedMiddlewareHandlers(handler,req,remainder){if(typeof handler.listener==='function'){return [{handler:handler,req:req}];}if(handler.listener instanceof Router){return handler.listener.getMatchedHandlers(remainder,req.method,req.baseUrl,req.params);}},getMatchedHandlers:function getMatchedHandlers(path,method,_baseUrl){var self=privates(this);var matchedHandlers=[];self.handlers.forEach(function(handler){var baseUrl=_baseUrl;var matched=handler.pattern.exec(path);if(matched===null){return;}if(handler.type==='middleware'){var remainder=self.getRemainder(matched);if(remainder===null){return;}baseUrl+=_URL2.default.removeTrailingSlash(matched[0]);matchedHandlers.push({handler:handler,matched:matched,baseUrl:baseUrl,remainder:remainder});}else if(method==='all'||handler.method==='all'||handler.method===method){matchedHandlers.push({handler:handler,matched:matched,baseUrl:baseUrl,remainder:'/'});}});return matchedHandlers;},getCalledHandlers:function getCalledHandlers(path,method,baseUrl,params){var _this2=this;var self=privates(this);var matchedHandlers=self.getMatchedHandlers(path,method,baseUrl);var calledHandlers=[];var paramsObserver={};matchedHandlers.forEach(function(matchedHandler){var handler=matchedHandler.handler;var matched=matchedHandler.matched;var remainder=matchedHandler.remainder;var req={app:_this2,baseUrl:matchedHandler.baseUrl,params:self.getParams(matched,handler.pattern.keys,params)};var changedParamKeys=self.getChangedParamKeys(paramsObserver,req.params);var paramHandlers=self.getParamHandlers(changedParamKeys,req);calledHandlers.push.apply(calledHandlers,paramHandlers);calledHandlers.push({handler:handler,req:req,remainder:remainder});});return calledHandlers;},gfGetCalledHandler:function gfGetCalledHandler(path,method,baseUrl,params){var calledHandlers=privates(this).getCalledHandlers(path,method,baseUrl,params);var i=0;var l=0;var childRouter=null;var obj={value:undefined,done:true};return {next:function next(skip){if(calledHandlers.length<=i){return {done:true,value:undefined};}var calledHandler=calledHandlers[i];if(calledHandler.handler.listeners.length<=l){i++;l=0;return this.next();}if(childRouter){var nextHandler=childRouter.getNextHandler(skip);if(nextHandler){return {done:false,value:nextHandler};}l++;childRouter=null;return this.next();}if(l!==0&&skip){i++;l=0;return this.next();}var listener=calledHandler.handler.listeners[l];if(listener instanceof Router){childRouter=privates(listener);childRouter.goGetCalledHandler=childRouter.gfGetCalledHandler(calledHandler.remainder,method,calledHandler.req.baseUrl,calledHandler.req.params);var _nextHandler=childRouter.getNextHandler();if(_nextHandler){return {done:false,value:_nextHandler};}l++;childRouter=null;return this.next();}l++;return {done:false,value:{type:calledHandler.handler.type,listener:listener,req:calledHandler.req,paramValue:calledHandler.paramValue}};}};},getMatchedErrorHandlers:function getMatchedErrorHandlers(request){var self=privates(this);var matchedHandlers=[];var method=request.method;var path=request.pathname;self.errorHandlers.forEach(function(handler){var matched=handler.pattern.exec(path);if(matched===null){return;}if(handler.type==='middleware'){var remainder=self.getRemainder(matched);if(remainder===null){return;}matchedHandlers.push({handler:handler});}else if(handler.method==='all'||method==='all'||handler.method===method){matchedHandlers.push({handler:handler});}});return matchedHandlers;},gfGetMatchedErrorHandler:function gfGetMatchedErrorHandler(request){var matchedHandlers=privates(this).getMatchedErrorHandlers(request);var i=0;return {next:function next(){if(matchedHandlers.length<=i){return {done:true,value:undefined};}return {done:false,value:matchedHandlers[i++]};}};},getNextHandler:function getNextHandler(){var genObj=privates(this).goGetCalledHandler.next(arguments[0]);if(genObj.done){return null;}return genObj.value;},runNextHandler:function runNextHandler(request,response,error){var self=privates(this);var nextHandler=null;if(error==='route'){nextHandler=self.getNextHandler(true);}else if(error!==undefined){self.goGetMatchedErrorHandlers=self.gfGetMatchedErrorHandler(request);self.runNextErrorHandler(request,response,error);return;}else {nextHandler=self.getNextHandler();}if(nextHandler===null){return;}_extends(request,nextHandler.req);var next=self.runNextHandler.bind(self,request,response);if(nextHandler.type==='parameter'){nextHandler.listener(request,response,next,nextHandler.paramValue);return;}nextHandler.listener(request,response,next);},getNextErrorHandler:function getNextErrorHandler(){var genObj=privates(this).goGetMatchedErrorHandlers.next();if(genObj.done){return null;}return genObj.value;},runNextErrorHandler:function runNextErrorHandler(request,response,error){var self=privates(this);var nextHandler=self.getNextErrorHandler();if(nextHandler===null){return;}var next=self.runNextErrorHandler.bind(self,request,response,error);nextHandler.handler.listener(error,request,response,next);},register:function register(properties,destination){var self=privates(this);var handler=properties;if(handler.type==='middleware'){handler.pattern=(0,_pathToRegexp2.default)(handler.path,null,{sensitive:self.defaults.caseSensitive,strict:self.defaults.strict,end:false});}else {handler.pattern=(0,_pathToRegexp2.default)(handler.path,null,{sensitive:self.defaults.caseSensitive,strict:self.defaults.strict,end:true});}if(destination==='error'){self.errorHandlers.push(handler);return;}self.handlers.push(handler);}};
},{"./Request":2,"./Response":3,"./URL":5,"./namespace":8,"path-to-regexp":10}],5:[function(require,module,exports){
'use strict';exports.__esModule=true;var _querystring=require('querystring');var _querystring2=_interopRequireDefault(_querystring);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var URL={};URL.parse=function(urlString){var a=document.createElement('a');a.href=urlString;a.href=a.href;var urlObj={};urlObj.protocol=a.protocol;urlObj.secure=a.protocol==='https:';urlObj.host=a.port==='80'?a.host.replace(':80',''):a.host;urlObj.port=a.port==='80'?'':a.port;urlObj.hostname=a.hostname;urlObj.hash=a.hash;urlObj.search=a.search;urlObj.query=_querystring2.default.parse(a.search.slice(1));urlObj.pathname=URL.adjustURLSlash(URL.addFirstSlash(a.pathname));urlObj.path=urlObj.pathname+a.search;urlObj.href=a.href;urlObj.origin=a.protocol+'//'+urlObj.host;return urlObj;};URL.addFirstSlash=function(pathString){return pathString.replace(/^(\/*)?/,'/');};URL.addTrailingSlash=function(pathString){return pathString.replace(/(\/*)?$/,'/');};URL.removeTrailingSlash=function(pathname){return pathname.replace(/\/*$/,'');};URL.adjustURLSlash=function(pathname){return pathname.replace(/\/+/g,'/');};exports.default=URL;
},{"querystring":13}],6:[function(require,module,exports){
'use strict';exports.__esModule=true;var _Router=require('./Router');var _Router2=_interopRequireDefault(_Router);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function leads(){}leads.Router=function(options){return new _Router2.default(options);};exports.default=leads;
},{"./Router":4}],7:[function(require,module,exports){
(function() {
	if(!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
})();
},{}],8:[function(require,module,exports){
"use strict";exports.__esModule=true;exports.default=namespace;function namespace(){var map=new WeakMap();return function(object){if(!map.has(object)){map.set(object,{});}return map.get(object);};};
},{}],9:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],10:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string} str
 * @return {!Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @return {!function(Object=, Object=)}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys)
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

},{"isarray":9}],11:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],13:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":11,"./encode":12}]},{},[1])(1)
});