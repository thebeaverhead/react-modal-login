"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require("react");

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require("livereactload/babel-transform");

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FacebookLoginButton = require("./components/FacebookLoginButton");

var _FacebookLoginButton2 = _interopRequireDefault(_FacebookLoginButton);

var _GoogleLoginButton = require("./components/GoogleLoginButton");

var _GoogleLoginButton2 = _interopRequireDefault(_GoogleLoginButton);

var _Tabs = require("./components/Tabs");

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Close = require("./components/Close");

var _Close2 = _interopRequireDefault(_Close);

var _LoginError = require("./components/LoginError");

var _LoginError2 = _interopRequireDefault(_LoginError);

var _RegisterError = require("./components/RegisterError");

var _RegisterError2 = _interopRequireDefault(_RegisterError);

var _Separator = require("./components/Separator");

var _Separator2 = _interopRequireDefault(_Separator);

var _Loader = require("./components/Loader");

var _Loader2 = _interopRequireDefault(_Loader);

var _FormWrap = require("./components/FormWrap");

var _FormWrap2 = _interopRequireDefault(_FormWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  ReactModalLogin: {
    displayName: "ReactModalLogin"
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: "./src/react-modal-login.js",
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
} /**
   * Created by piotr.pozniak@thebeaverhead.com on 10/07/2017.
   */

var ReactModalLogin = _wrapComponent("ReactModalLogin")(function (_React$Component) {
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


      var tabs = this.props.tabs ? _react3.default.createElement(_Tabs2.default, {
        containerClass: this.props.tabs.containerClass ? this.props.tabs.containerClass : "RML-login-modal-mode",
        inactive: this.props.loading ? this.props.loading : false,
        loginClick: this.tabsLoginClick.bind(this),
        registerClick: this.tabsRegisterClick.bind(this),
        registerActive: this.state.register,
        loginLabel: this.props.tabs.loginLabel ? this.props.tabs.loginLabel : "Sign in",
        registerLabel: this.props.tabs.registerLabel ? this.props.tabs.registerLabel : "Sign up"
      }) : null;

      var closeBtn = this.props.closeBtn ? _react3.default.createElement(_Close2.default, {
        containerClass: this.props.closeBtn.containerClass ? this.props.closeBtn.containerClass : "RML-login-modal-close",
        click: function click() {
          return _this6.onCloseModal();
        }
      }) : null;

      var facebookButton = null;

      if (this.props.providers && this.props.providers.facebook) {
        facebookButton = this.props.providers.facebook.btn ? _react3.default.createElement(facebook.btn, {
          btnClass: facebook.btnClass ? facebook.btnClass : "RML-facebook-login-button",
          onStartLoading: this.props.startLoading,
          onSuccess: facebook.onLoginSuccess ? facebook.onLoginSuccess : null,
          onFail: facebook.onLoginFail ? facebook.onLoginFail : null,
          inactive: this.props.loading ? this.props.loading : false,
          label: facebook.label ? facebook.label : "Continue with Facebook",
          scope: facebook.config.scope
        }) : _react3.default.createElement(_FacebookLoginButton2.default, {
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
        googleButton = this.props.providers.google.btn ? _react3.default.createElement(google.btn, {
          btnClass: google.btnClass ? google.btnClass : "RML-google-login-button",
          onStartLoading: this.props.startLoading,
          onSuccess: google.onLoginSuccess ? google.onLoginSuccess : null,
          onFail: google.onLoginFail ? google.onLoginFail : null,
          inactive: this.props.loading ? this.props.loading : false,
          label: google.label ? google.label : "Continue with Google"
        }) : _react3.default.createElement(_GoogleLoginButton2.default, {
          btnClass: google.btnClass ? google.btnClass : "RML-google-login-button",
          onStartLoading: this.props.startLoading,
          onSuccess: google.onLoginSuccess ? google.onLoginSuccess : null,
          onFail: google.onLoginFail ? google.onLoginFail : null,
          inactive: this.props.loading ? this.props.loading : false,
          label: google.label ? google.label : "Continue with Google"
        });
      }

      var loginError = this.props.error ? _react3.default.createElement(_LoginError2.default, {
        containerClass: this.props.loginError.containerClass ? this.props.loginError.containerClass : "RML-login-modal-error--login",
        label: this.props.loginError.label ? this.props.loginError.label : "Unable to login. Please try again later"
      }) : null;

      var registerError = this.props.error ? _react3.default.createElement(_RegisterError2.default, {
        containerClass: this.props.registerError.containerClass ? this.props.registerError.containerClass : "RML-login-modal-error--register",
        label: this.props.registerError.label ? this.props.registerError.label : "Unable to register. Please try again later"
      }) : null;

      var errorWrap = null;

      if (this.props.error) {
        errorWrap = this.state.register ? registerError : loginError;
      }

      var separator = this.props.separator ? _react3.default.createElement(_Separator2.default, {
        containerClass: this.props.separator.containerClass ? this.props.separator.containerClass : "RML-social-methods-separator",
        label: this.props.separator.label ? this.props.separator.label : "Or"
      }) : null;

      var loader = this.props.loading && !this.props.loader.disabled ? _react3.default.createElement(_Loader2.default, {
        containerClass: this.props.loader.containerClass ? this.props.loader.containerClass : "RML-login-modal-indicator",
        onStartLoading: this.props.startLoading,
        size: 24
      }) : null;

      var formWrap = this.props.form && !this.props.form.disabled ? _react3.default.createElement(_FormWrap2.default, {
        register: this.state.register,
        form: this.props.form,
        inactive: this.props.loading,
        loader: loader,
        errorWrap: errorWrap
      }) : null;

      var additionalWrap = (!this.props.form || this.props.form.disabled) && !this.props.additionalWrap.disabled && (this.props.loading || this.props.error) ? _react3.default.createElement(
        "div",
        {
          className: this.props.additionalWrap.containerClass ? this.props.additionalWrap.containerClass : "RML-login-modal-additional-wrap"
        },
        errorWrap,
        loader
      ) : null;

      return _react3.default.createElement(
        "div",
        { className: (this.props.mainWrapClass ? this.props.mainWrapClass : "RML-login-modal-wrap ") + (this.props.visible ? "" : "hidden")
        },
        _react3.default.createElement("div", {
          className: this.props.overlayClass ? this.props.overlayClass : "RML-login-modal-overlay",
          onClick: function onClick() {
            return _this6.onCloseModal();
          }
        }),
        _react3.default.createElement(
          "div",
          {
            className: this.props.visible ? "RML-login-modal-box" : "hidden"
          },
          _react3.default.createElement(
            "div",
            { className: this.props.visible ? "RML-login-modal-box-content" : "hidden" },
            closeBtn,
            tabs,
            _react3.default.createElement(
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
}(_react3.default.Component));

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
