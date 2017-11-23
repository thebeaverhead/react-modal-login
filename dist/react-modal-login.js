module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FacebookLoginButton = __webpack_require__(12);

var _FacebookLoginButton2 = _interopRequireDefault(_FacebookLoginButton);

var _GoogleLoginButton = __webpack_require__(14);

var _GoogleLoginButton2 = _interopRequireDefault(_GoogleLoginButton);

var _Tabs = __webpack_require__(16);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Close = __webpack_require__(17);

var _Close2 = _interopRequireDefault(_Close);

var _LoginError = __webpack_require__(19);

var _LoginError2 = _interopRequireDefault(_LoginError);

var _RegisterError = __webpack_require__(20);

var _RegisterError2 = _interopRequireDefault(_RegisterError);

var _Separator = __webpack_require__(21);

var _Separator2 = _interopRequireDefault(_Separator);

var _Loader = __webpack_require__(22);

var _Loader2 = _interopRequireDefault(_Loader);

var _FormWrap = __webpack_require__(23);

var _FormWrap2 = _interopRequireDefault(_FormWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ReactModalLogin = function (_React$Component) {
  _inherits(ReactModalLogin, _React$Component);

  function ReactModalLogin(props) {
    _classCallCheck(this, ReactModalLogin);

    var _this = _possibleConstructorReturn(this, (ReactModalLogin.__proto__ || Object.getPrototypeOf(ReactModalLogin)).call(this, props));

    _this.state = {
      register: false
    };

    _this.keyHandler = _this.keyHandler.bind(_this);
    _this.onCloseModal = _this.onCloseModal.bind(_this);
    return _this;
  }

  /**
   *
   * @param e
   */


  _createClass(ReactModalLogin, [{
    key: "keyHandler",
    value: function keyHandler(e) {

      e = e || window.event;

      var isEscape = false;
      var isEnter = false;

      if ("key" in e) {
        isEscape = e.key === "Escape" || e.key === "Esc";
        isEnter = e.key === "Enter" || e.key === "enter";
      } else {
        isEscape = e.keyCode === 27;
        isEnter = e.keyCode === 13;
      }

      if (isEscape) {
        this.onCloseModal();
      }
      if (isEnter) {

        if (this.state.register && form && form.onRegister) {
          form.onRegister();
        } else if (!this.state.register && form && form.onLogin) {
          form.onLogin();
        }
      }
    }

    /**
     *
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("keydown", this.keyHandler);
    }

    /**
     *
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {

      /* Initialize Facebook */
      if (this.props.providers && this.props.providers.facebook && typeof FB === 'undefined' && this.props.visible && !this.props.loading) {
        this.props.startLoading();
        this.initFBConnect();
      }

      /* Initialize Google */
      if (this.props.providers && this.props.providers.google && typeof window.gapi === 'undefined' && this.props.visible && !this.props.loading) {
        this.props.startLoading();
        this.initGoogleConnect();
      }

      document.removeEventListener("keydown", this.keyHandler);

      if (this.props.visible) {
        document.addEventListener("keydown", this.keyHandler);
      }

      if (prevState.register !== this.state.register) {

        if (this.props.tabs.onChange) {
          this.props.tabs.onChange();
        }
      }
    }

    /**
     *
     * @constructor
     */

  }, {
    key: "initFBConnect",
    value: function initFBConnect() {
      var _this2 = this;

      window.fbAsyncInit = function () {
        FB.init(_extends({}, _this2.props.providers.facebook.config));

        FB.AppEvents.logPageView();
      };
      (function (d, s, id) {
        var js = void 0,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.onload = function () {
          _this2.props.finishLoading();
        };
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }

    /**
     *
     * @constructor
     */

  }, {
    key: "initGoogleConnect",
    value: function initGoogleConnect() {
      var _this3 = this;

      (function () {
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.async = true;
        e.onload = function () {

          window.gapi.load('auth2', function () {

            window.gapi.auth2.init(_extends({}, _this3.props.providers.google.config));
            _this3.props.finishLoading();
          });
        };

        e.src = "https://apis.google.com/js/platform.js";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t);
      })();
    }

    /**
     *
     */

  }, {
    key: "tabsLoginClick",
    value: function tabsLoginClick() {
      var _this4 = this;

      if (this.props.tabs && this.props.tabs.onLoginClickBeforeTransition) {
        this.props.tabs.onLoginClickBeforeTransition();
      }

      this.setState({
        register: false
      }, function () {

        if (_this4.props.tabs && _this4.props.tabs.onLoginClickAfterTransition) {
          _this4.props.tabs.onLoginClickAfterTransition();
        }
      });
    }

    /**
     *
     */

  }, {
    key: "tabsRegisterClick",
    value: function tabsRegisterClick() {
      var _this5 = this;

      if (this.props.tabs && this.props.tabs.onRegisterClickBeforeTransition) {
        this.props.tabs.onRegisterClickBeforeTransition();
      }

      this.setState({
        register: true
      }, function () {

        if (_this5.props.tabs && _this5.props.tabs.onRegisterClickAfterTransition) {
          _this5.props.tabs.onRegisterClickAfterTransition();
        }
      });
    }

    /**
     *
     */

  }, {
    key: "onCloseModal",
    value: function onCloseModal() {
      if (this.props.onBeforeCloseModal) {
        this.props.onBeforeCloseModal();
      }

      this.props.onCloseModal();

      if (this.props.onAfterCloseModal) {
        this.props.onAfterCloseModal();
      }
    }

    /**
     *
     * @constructor
     */

  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _props$providers = this.props.providers,
          facebook = _props$providers.facebook,
          google = _props$providers.google;


      var tabs = this.props.tabs ? _react2.default.createElement(_Tabs2.default, {
        containerClass: this.props.tabs.containerClass ? this.props.tabs.containerClass : "RML-login-modal-mode",
        inactive: this.props.loading ? this.props.loading : false,
        loginClick: this.tabsLoginClick.bind(this),
        registerClick: this.tabsRegisterClick.bind(this),
        registerActive: this.state.register,
        loginLabel: this.props.tabs.loginLabel ? this.props.tabs.loginLabel : "Sign in",
        registerLabel: this.props.tabs.registerLabel ? this.props.tabs.registerLabel : "Sign up"
      }) : null;

      var closeBtn = this.props.closeBtn ? _react2.default.createElement(_Close2.default, {
        containerClass: this.props.closeBtn.containerClass ? this.props.closeBtn.containerClass : "RML-login-modal-close",
        click: function click() {
          return _this6.onCloseModal();
        }
      }) : null;

      var facebookButton = null;

      if (this.props.providers && this.props.providers.facebook) {
        facebookButton = this.props.providers.facebook.btn ? _react2.default.createElement(facebook.btn, {
          btnClass: facebook.btnClass ? facebook.btnClass : "RML-facebook-login-button",
          onStartLoading: this.props.startLoading,
          onSuccess: facebook.onLoginSuccess ? facebook.onLoginSuccess : null,
          onFail: facebook.onLoginFail ? facebook.onLoginFail : null,
          inactive: this.props.loading ? this.props.loading : false,
          label: facebook.label ? facebook.label : "Continue with Facebook",
          scope: facebook.config.scope
        }) : _react2.default.createElement(_FacebookLoginButton2.default, {
          btnClass: facebook.btnClass ? facebook.btnClass : "RML-facebook-login-button",
          onStartLoading: this.props.startLoading,
          onSuccess: facebook.onLoginSuccess ? facebook.onLoginSuccess : null,
          onFail: facebook.onLoginFail ? facebook.onLoginFail : null,
          inactive: this.props.loading ? this.props.loading : false,
          label: facebook.label ? facebook.label : "Continue with Facebook",
          scope: facebook.config.scope
        });
      }

      var googleButton = null;

      if (this.props.providers && this.props.providers.google) {
        googleButton = this.props.providers.google.btn ? _react2.default.createElement(google.btn, {
          btnClass: google.btnClass ? google.btnClass : "RML-google-login-button",
          onStartLoading: this.props.startLoading,
          onSuccess: google.onLoginSuccess ? google.onLoginSuccess : null,
          onFail: google.onLoginFail ? google.onLoginFail : null,
          inactive: this.props.loading ? this.props.loading : false,
          label: google.label ? google.label : "Continue with Google"
        }) : _react2.default.createElement(_GoogleLoginButton2.default, {
          btnClass: google.btnClass ? google.btnClass : "RML-google-login-button",
          onStartLoading: this.props.startLoading,
          onSuccess: google.onLoginSuccess ? google.onLoginSuccess : null,
          onFail: google.onLoginFail ? google.onLoginFail : null,
          inactive: this.props.loading ? this.props.loading : false,
          label: google.label ? google.label : "Continue with Google"
        });
      }

      var loginError = this.props.error ? _react2.default.createElement(_LoginError2.default, {
        containerClass: this.props.loginError.containerClass ? this.props.loginError.containerClass : "RML-login-modal-error--login",
        label: this.props.loginError.label ? this.props.loginError.label : "Unable to login. Please try again later"
      }) : null;

      var registerError = this.props.error ? _react2.default.createElement(_RegisterError2.default, {
        containerClass: this.props.registerError.containerClass ? this.props.registerError.containerClass : "RML-login-modal-error--register",
        label: this.props.registerError.label ? this.props.registerError.label : "Unable to register. Please try again later"
      }) : null;

      var errorWrap = null;

      if (this.props.error) {
        errorWrap = this.state.register ? registerError : loginError;
      }

      var separator = this.props.separator ? _react2.default.createElement(_Separator2.default, {
        containerClass: this.props.separator.containerClass ? this.props.separator.containerClass : "RML-social-methods-separator",
        label: this.props.separator.label ? this.props.separator.label : "Or"
      }) : null;

      var loader = this.props.loading && !this.props.loader.disabled ? _react2.default.createElement(_Loader2.default, {
        containerClass: this.props.loader.containerClass ? this.props.loader.containerClass : "RML-login-modal-indicator",
        onStartLoading: this.props.startLoading,
        size: 24
      }) : null;

      var formWrap = this.props.form && !this.props.form.disabled ? _react2.default.createElement(_FormWrap2.default, {
        register: this.state.register,
        form: this.props.form,
        inactive: this.props.loading,
        loader: loader,
        errorWrap: errorWrap
      }) : null;

      var additionalWrap = (!this.props.form || this.props.form.disabled) && !this.props.additionalWrap.disabled && (this.props.loading || this.props.error) ? _react2.default.createElement(
        "div",
        {
          className: this.props.additionalWrap.containerClass ? this.props.additionalWrap.containerClass : "RML-login-modal-additional-wrap"
        },
        errorWrap,
        loader
      ) : null;

      return _react2.default.createElement(
        "div",
        { className: (this.props.mainWrapClass ? this.props.mainWrapClass : "RML-login-modal-wrap ") + (this.props.visible ? "" : "hidden")
        },
        _react2.default.createElement("div", {
          className: this.props.overlayClass ? this.props.overlayClass : "RML-login-modal-overlay",
          onClick: function onClick() {
            return _this6.onCloseModal();
          }
        }),
        _react2.default.createElement(
          "div",
          {
            className: this.props.visible ? "RML-login-modal-box" : "hidden"
          },
          _react2.default.createElement(
            "div",
            { className: this.props.visible ? "RML-login-modal-box-content" : "hidden" },
            closeBtn,
            tabs,
            _react2.default.createElement(
              "div",
              { className: "RML-social-modal-content-wrap" },
              facebookButton,
              googleButton,
              separator,
              formWrap,
              additionalWrap
            )
          )
        )
      );
    }
  }]);

  return ReactModalLogin;
}(_react2.default.Component);

exports.default = ReactModalLogin;


ReactModalLogin.defaultProps = {
  closeBtn: {},
  tabs: {},
  providers: {},
  loader: {},
  additionalWrap: {}
};

ReactModalLogin.propTypes = {
  mainWrapClass: _propTypes2.default.string,

  visible: _propTypes2.default.bool.isRequired,
  onCloseModal: _propTypes2.default.func.isRequired,
  onBeforeCloseModal: _propTypes2.default.func,
  onAfterCloseModal: _propTypes2.default.func,

  overlayClass: _propTypes2.default.string,

  loginError: _propTypes2.default.shape({
    containerClass: _propTypes2.default.string,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
  }),
  registerError: _propTypes2.default.shape({
    containerClass: _propTypes2.default.string,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
  }),
  loader: _propTypes2.default.shape({
    disabled: _propTypes2.default.bool,
    containerClass: _propTypes2.default.string
  }),

  separator: _propTypes2.default.shape({
    containerClass: _propTypes2.default.string,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
  }),

  closeBtn: _propTypes2.default.shape({
    containerClass: _propTypes2.default.string
  }),
  tabs: _propTypes2.default.shape({
    containerClass: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    loginLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    registerLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
  }),
  additionalWrap: _propTypes2.default.shape({
    containerClass: _propTypes2.default.string,
    disabled: _propTypes2.default.bool
  }),

  providers: _propTypes2.default.shape({
    facebook: _propTypes2.default.shape({
      btnClass: _propTypes2.default.string,
      config: _propTypes2.default.object.isRequired,
      btn: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
      onLoginSuccess: _propTypes2.default.func,
      onLoginFail: _propTypes2.default.func,
      inactive: _propTypes2.default.bool,
      label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
    }),
    google: _propTypes2.default.shape({
      btnClass: _propTypes2.default.string,
      config: _propTypes2.default.object.isRequired,
      btn: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
      onLoginSuccess: _propTypes2.default.func,
      onLoginFail: _propTypes2.default.func,
      inactive: _propTypes2.default.bool,
      label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
    })
  }),

  form: _propTypes2.default.shape({
    onLogin: _propTypes2.default.func,
    onRegister: _propTypes2.default.func,
    registerContainerClass: _propTypes2.default.string,
    loginContainerClass: _propTypes2.default.string,
    loginBtn: _propTypes2.default.shape({
      buttonClass: _propTypes2.default.string,
      inactive: _propTypes2.default.bool,
      label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
    }),
    registerBtn: _propTypes2.default.shape({
      buttonClass: _propTypes2.default.string,
      inactive: _propTypes2.default.bool,
      label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
    }),
    loginInputs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      containerClass: _propTypes2.default.string,
      type: _propTypes2.default.string,
      inputClass: _propTypes2.default.string,
      id: _propTypes2.default.string,
      name: _propTypes2.default.string,
      placeholder: _propTypes2.default.string,

      label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
    })),
    registerInputs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      containerClass: _propTypes2.default.string,
      type: _propTypes2.default.string,
      inputClass: _propTypes2.default.string,
      id: _propTypes2.default.string,
      name: _propTypes2.default.string,
      placeholder: _propTypes2.default.string,

      label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
    }))
  })

};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(8)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(11)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var warning = __webpack_require__(5);
var assign = __webpack_require__(9);

var ReactPropTypesSecret = __webpack_require__(4);
var checkPropTypes = __webpack_require__(10);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(3);
  var warning = __webpack_require__(5);
  var ReactPropTypesSecret = __webpack_require__(4);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var ReactPropTypesSecret = __webpack_require__(4);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _FacebookIcon = __webpack_require__(13);

var _FacebookIcon2 = _interopRequireDefault(_FacebookIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FacebookLoginButton = function (_React$Component) {
  _inherits(FacebookLoginButton, _React$Component);

  function FacebookLoginButton(props) {
    _classCallCheck(this, FacebookLoginButton);

    return _possibleConstructorReturn(this, (FacebookLoginButton.__proto__ || Object.getPrototypeOf(FacebookLoginButton)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(FacebookLoginButton, [{
    key: "FBLoginDialog",
    value: function FBLoginDialog() {
      var _this2 = this;

      this.props.onStartLoading();

      FB.login(function (response) {

        if (response.status == "connected" && _this2.props.onSuccess) {
          _this2.props.onSuccess('facebook', response);
        } else if (response.status != "connected" && _this2.props.onFail) {

          _this2.props.onFail('facebook', response);
        }
      }, { scope: this.props.scope });
    }

    /**
     *
     * @constructor
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        "button",
        {
          className: this.props.btnClass,
          disabled: this.props.inactive,
          onClick: function onClick() {
            return _this3.FBLoginDialog();
          }
        },
        _react2.default.createElement(_FacebookIcon2.default, null),
        _react2.default.createElement(
          "span",
          null,
          this.props.label
        )
      );
    }
  }]);

  return FacebookLoginButton;
}(_react2.default.Component);

exports.default = FacebookLoginButton;
;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FacebookIcon = function (_React$Component) {
  _inherits(FacebookIcon, _React$Component);

  function FacebookIcon(props) {
    _classCallCheck(this, FacebookIcon);

    return _possibleConstructorReturn(this, (FacebookIcon.__proto__ || Object.getPrototypeOf(FacebookIcon)).call(this, props));
  }

  _createClass(FacebookIcon, [{
    key: "render",
    value: function render() {

      return _react2.default.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "2500",
          height: "2500",
          viewBox: "0 0 266.893 266.895"
        },
        _react2.default.createElement("path", {
          d: "M252.164 266.895c8.134 0 14.729-6.596 14.729-14.73V14.73c0-8.137-6.596-14.73-14.729-14.73H14.73C6.593 0 0 6.594 0 14.73v237.434c0 8.135 6.593 14.73 14.73 14.73h237.434z",
          fill: "#fff"
        }),
        _react2.default.createElement("path", {
          d: "M184.152 266.895V163.539h34.692l5.194-40.28h-39.887V97.542c0-11.662 3.238-19.609 19.962-19.609l21.329-.01V41.897c-3.689-.49-16.351-1.587-31.08-1.587-30.753 0-51.807 18.771-51.807 53.244v29.705h-34.781v40.28h34.781v103.355h41.597z",
          fill: "#3b5998"
        })
      );
    }
  }]);

  return FacebookIcon;
}(_react2.default.Component);

exports.default = FacebookIcon;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _GoogleIcon = __webpack_require__(15);

var _GoogleIcon2 = _interopRequireDefault(_GoogleIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GoogleLoginButton = function (_React$Component) {
  _inherits(GoogleLoginButton, _React$Component);

  function GoogleLoginButton(props) {
    _classCallCheck(this, GoogleLoginButton);

    return _possibleConstructorReturn(this, (GoogleLoginButton.__proto__ || Object.getPrototypeOf(GoogleLoginButton)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(GoogleLoginButton, [{
    key: "GoogleLoginDialog",
    value: function GoogleLoginDialog() {
      var _this2 = this;

      this.props.onStartLoading();

      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {

        if (this.props.onSuccess) {

          this.props.onSuccess('google', window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse());
        }
      } else {

        window.gapi.auth2.getAuthInstance().signIn().then(function () {

          if (_this2.props.onSuccess) {

            _this2.props.onSuccess('google', window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse());
          }
        }, function (error) {
          _this2.props.onFail('google', error);
        });
      }
    }

    /**
     *
     * @returns {XML}
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        "button",
        {
          className: this.props.btnClass,
          disabled: this.props.inactive,
          onClick: function onClick() {
            return _this3.GoogleLoginDialog();
          }
        },
        _react2.default.createElement(_GoogleIcon2.default, null),
        _react2.default.createElement(
          "span",
          null,
          this.props.label
        )
      );
    }
  }]);

  return GoogleLoginButton;
}(_react2.default.Component);

exports.default = GoogleLoginButton;
;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoogleIcon = function (_React$Component) {
  _inherits(GoogleIcon, _React$Component);

  function GoogleIcon(props) {
    _classCallCheck(this, GoogleIcon);

    return _possibleConstructorReturn(this, (GoogleIcon.__proto__ || Object.getPrototypeOf(GoogleIcon)).call(this, props));
  }

  _createClass(GoogleIcon, [{
    key: "render",
    value: function render() {

      return _react2.default.createElement(
        "svg",
        {
          width: "25",
          height: "25",
          viewBox: "0 0 25 25"
        },
        _react2.default.createElement(
          "g",
          { fill: "none", fillRule: "evenodd" },
          _react2.default.createElement("path", {
            d: "M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z",
            fill: "#4285F4"
          }),
          _react2.default.createElement("path", {
            d: "M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z",
            fill: "#34A853"
          }),
          _react2.default.createElement("path", {
            d: "M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z",
            fill: "#FBBC05"
          }),
          _react2.default.createElement("path", {
            d: "M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z",
            fill: "#EA4335"
          })
        )
      );
    }
  }]);

  return GoogleIcon;
}(_react2.default.Component);

exports.default = GoogleIcon;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(Tabs, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: this.props.containerClass },
        _react2.default.createElement(
          "div",
          {
            className: (this.props.inactive ? "disabled " : "") + (this.props.registerActive ? "" : "active"),
            onClick: function onClick() {
              if (!_this2.props.inactive) {
                _this2.props.loginClick();
              }
            }
          },
          this.props.loginLabel
        ),
        _react2.default.createElement(
          "div",
          {
            className: (this.props.inactive ? "disabled " : "") + (this.props.registerActive ? "active" : ""),
            onClick: function onClick() {
              if (!_this2.props.inactive) {
                _this2.props.registerClick();
              }
            }
          },
          this.props.registerLabel
        )
      );
    }
  }]);

  return Tabs;
}(_react2.default.Component);

exports.default = Tabs;
;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _CloseIcon = __webpack_require__(18);

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CloseBtn = function (_React$Component) {
  _inherits(CloseBtn, _React$Component);

  function CloseBtn(props) {
    _classCallCheck(this, CloseBtn);

    return _possibleConstructorReturn(this, (CloseBtn.__proto__ || Object.getPrototypeOf(CloseBtn)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(CloseBtn, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        {
          className: this.props.containerClass,
          onClick: function onClick() {
            return _this2.props.click();
          }
        },
        _react2.default.createElement(_CloseIcon2.default, null)
      );
    }
  }]);

  return CloseBtn;
}(_react2.default.Component);

exports.default = CloseBtn;
;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CloseIcon = function (_React$Component) {
  _inherits(CloseIcon, _React$Component);

  function CloseIcon() {
    _classCallCheck(this, CloseIcon);

    return _possibleConstructorReturn(this, (CloseIcon.__proto__ || Object.getPrototypeOf(CloseIcon)).apply(this, arguments));
  }

  _createClass(CloseIcon, [{
    key: "render",


    /**
     *
     * @constructor
     */
    value: function render() {

      return _react2.default.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          version: "1.1",
          id: "Capa_1",
          x: "0px",
          y: "0px",
          width: "512px",
          height: "512px",
          viewBox: "0 0 357 357"
        },
        _react2.default.createElement(
          "g",
          null,
          _react2.default.createElement(
            "g",
            { id: "close" },
            _react2.default.createElement("polygon", {
              points: "357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5",
              fill: "#ffffff"
            })
          )
        )
      );
    }
  }]);

  return CloseIcon;
}(_react2.default.Component);

exports.default = CloseIcon;
;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LoginError = function (_React$Component) {
  _inherits(LoginError, _React$Component);

  function LoginError(props) {
    _classCallCheck(this, LoginError);

    return _possibleConstructorReturn(this, (LoginError.__proto__ || Object.getPrototypeOf(LoginError)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(LoginError, [{
    key: "render",
    value: function render() {

      return _react2.default.createElement(
        "span",
        { className: this.props.containerClass, id: "loginError" },
        this.props.label
      );
    }
  }]);

  return LoginError;
}(_react2.default.Component);

exports.default = LoginError;
;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RegisterError = function (_React$Component) {
  _inherits(RegisterError, _React$Component);

  function RegisterError(props) {
    _classCallCheck(this, RegisterError);

    return _possibleConstructorReturn(this, (RegisterError.__proto__ || Object.getPrototypeOf(RegisterError)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(RegisterError, [{
    key: "render",
    value: function render() {

      return _react2.default.createElement(
        "span",
        { className: this.props.containerClass, id: "registerError" },
        this.props.label
      );
    }
  }]);

  return RegisterError;
}(_react2.default.Component);

exports.default = RegisterError;
;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Separator = function (_React$Component) {
  _inherits(Separator, _React$Component);

  function Separator(props) {
    _classCallCheck(this, Separator);

    return _possibleConstructorReturn(this, (Separator.__proto__ || Object.getPrototypeOf(Separator)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(Separator, [{
    key: "render",
    value: function render() {

      return _react2.default.createElement(
        "p",
        { className: this.props.containerClass },
        this.props.label
      );
    }
  }]);

  return Separator;
}(_react2.default.Component);

exports.default = Separator;
;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Loader = function (_React$Component) {
  _inherits(Loader, _React$Component);

  function Loader(props) {
    _classCallCheck(this, Loader);

    return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(Loader, [{
    key: "render",
    value: function render() {

      return _react2.default.createElement(
        "span",
        { className: this.props.containerClass },
        _react2.default.createElement(
          "svg",
          {
            className: "RML-login-modal-spinner",
            width: this.props.size + "px",
            height: this.props.size + "px",
            viewBox: "0 0 66 66",
            xmlns: "http://www.w3.org/2000/svg"
          },
          _react2.default.createElement("circle", {
            className: "path",
            fill: "none",
            strokeWidth: "6",
            strokeLinecap: "round",
            cx: "33",
            cy: "33",
            r: "30"
          })
        )
      );
    }
  }]);

  return Loader;
}(_react2.default.Component);

exports.default = Loader;
;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _FormLoginButton = __webpack_require__(24);

var _FormLoginButton2 = _interopRequireDefault(_FormLoginButton);

var _FormRegisterButton = __webpack_require__(25);

var _FormRegisterButton2 = _interopRequireDefault(_FormRegisterButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FormWrap = function (_React$Component) {
  _inherits(FormWrap, _React$Component);

  function FormWrap(props) {
    _classCallCheck(this, FormWrap);

    return _possibleConstructorReturn(this, (FormWrap.__proto__ || Object.getPrototypeOf(FormWrap)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(FormWrap, [{
    key: "render",
    value: function render() {

      var formProps = this.props.form;

      var loginBtn = formProps && formProps.loginBtn ? _react2.default.createElement(_FormLoginButton2.default, {
        buttonClass: formProps.loginBtn.buttonClass ? formProps.loginBtn.buttonClass : "RML-btn",
        inactive: this.props.inactive,
        click: formProps.onLogin ? formProps.onLogin : null,
        label: formProps.loginBtn.label ? formProps.loginBtn.label : "Sign in"
      }) : null;

      var registerBtn = formProps.registerBtn ? _react2.default.createElement(_FormRegisterButton2.default, {
        buttonClass: formProps.registerBtn.buttonClass ? formProps.registerBtn.buttonClass : "RML-btn",
        inactive: this.props.inactive,
        click: formProps.onRegister ? formProps.onRegister : null,
        label: formProps.registerBtn.label ? formProps.registerBtn.label : "Sign up"
      }) : null;

      var formLoginInputs = formProps.loginInputs ? formProps.loginInputs.map(function (input, index) {
        return _react2.default.createElement(
          "div",
          { className: input.containerClass, key: index },
          _react2.default.createElement(
            "label",
            { htmlFor: input.id },
            input.label
          ),
          _react2.default.createElement("input", {
            type: input.type,
            className: input.inputClass,
            id: input.id,
            name: input.name,
            placeholder: input.placeholder
          })
        );
      }) : null;

      var formRegisterInputs = formProps.registerInputs ? formProps.registerInputs.map(function (input, index) {
        return _react2.default.createElement(
          "div",
          { className: input.containerClass, key: index },
          _react2.default.createElement(
            "label",
            { htmlFor: input.id },
            input.label
          ),
          _react2.default.createElement("input", {
            type: input.type,
            className: input.inputClass,
            id: input.id,
            name: input.name,
            placeholder: input.placeholder
          })
        );
      }) : null;

      var formWrap = this.props.register ? _react2.default.createElement(
        "div",
        { className: formProps.registerContainerClass ? formProps.registerContainerClass : "RML-login-modal-form" },
        formRegisterInputs,
        this.props.errorWrap,
        registerBtn,
        this.props.loader,
        _react2.default.createElement("div", { className: "clearfix" })
      ) : _react2.default.createElement(
        "div",
        { className: formProps.loginContainerClass ? formProps.loginContainerClass : "RML-login-modal-form" },
        formLoginInputs,
        this.props.errorWrap,
        loginBtn,
        this.props.loader,
        _react2.default.createElement("div", { className: "clearfix" })
      );

      return formWrap;
    }
  }]);

  return FormWrap;
}(_react2.default.Component);

exports.default = FormWrap;
;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FormLoginButton = function (_React$Component) {
  _inherits(FormLoginButton, _React$Component);

  function FormLoginButton(props) {
    _classCallCheck(this, FormLoginButton);

    return _possibleConstructorReturn(this, (FormLoginButton.__proto__ || Object.getPrototypeOf(FormLoginButton)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(FormLoginButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "button",
        {
          className: this.props.buttonClass,
          disabled: this.props.inactive,
          onClick: function onClick() {
            return _this2.props.click();
          }
        },
        this.props.label
      );
    }
  }]);

  return FormLoginButton;
}(_react2.default.Component);

exports.default = FormLoginButton;
;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by meller.olaf@gmail.com on 11/22/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FormRegisterButton = function (_React$Component) {
  _inherits(FormRegisterButton, _React$Component);

  function FormRegisterButton(props) {
    _classCallCheck(this, FormRegisterButton);

    return _possibleConstructorReturn(this, (FormRegisterButton.__proto__ || Object.getPrototypeOf(FormRegisterButton)).call(this, props));
  }

  /**
   *
   * @constructor
   */


  _createClass(FormRegisterButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "button",
        {
          className: this.props.buttonClass,
          disabled: this.props.inactive,
          onClick: function onClick() {
            return _this2.props.click();
          }
        },
        this.props.label
      );
    }
  }]);

  return FormRegisterButton;
}(_react2.default.Component);

exports.default = FormRegisterButton;
;

/***/ })
/******/ ]);