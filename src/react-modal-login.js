/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */
import React from "react";
import PropTypes from "prop-types";

import FacebookLoginButton from "./components/FacebookLoginButton";
import GoogleLoginButton from "./components/GoogleLoginButton";
import Tabs from "./components/Tabs";
import CloseBtn from "./components/Close";
import classnames from "classnames";
import SubmitError from "./components/SubmitError";

import Separator from "./components/Separator";
import Loader from "./components/Loader";

import FormWrap from "./components/FormWrap";

require("./less/style.less");

class ReactModalLogin extends React.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      currentTab: this.props.initialTab ? this.props.initialTab : "login",
      newTab: this.props.newTab
    };

    this.keyHandler = this.keyHandler.bind(this);
  }

  /**
   *
   * @param newTab
   */
  changeTab = newTab => {
    this.state({ currentTab: newTab });
  };

  /**
   *
   * @param e
   */
  keyHandler(e) {
    e = e || window.event;

    let isEscape = false;
    let isEnter = false;

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
      if (
        this.state.currentTab === "register" &&
        this.props.form &&
        this.props.form.onRegister
      ) {
        this.props.form.onRegister();
      } else if (
        this.state.currentTab === "login" &&
        this.props.form &&
        this.props.form.onLogin
      ) {
        this.props.form.onLogin();
      }
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyHandler);
  }

  /**
   *
   */
  componentDidUpdate(prevProps, prevState) {
    /* Initialize Facebook */
    if (
      this.props.providers &&
      this.props.providers.facebook &&
      typeof FB === "undefined" &&
      this.props.visible &&
      !this.props.loading
    ) {
      this.props.startLoading();
      this.initFBConnect();
    }

    /* Initialize Google */
    if (
      this.props.providers &&
      this.props.providers.google &&
      typeof window.gapi === "undefined" &&
      this.props.visible &&
      !this.props.loading
    ) {
      this.props.startLoading();
      this.initGoogleConnect();
    }

    document.removeEventListener("keydown", this.keyHandler);

    if (this.props.visible) {
      document.addEventListener("keydown", this.keyHandler);
    }

    if (prevState.currentTab !== this.state.currentTab) {
      if (this.props.tabs.afterChange) {
        this.props.tabs.afterChange();
      }
    }
  }

  /**
   *
   * @constructor
   */
  initFBConnect() {
    window.fbAsyncInit = () => {
      FB.init({
        ...this.props.providers.facebook.config
      });

      FB.AppEvents.logPageView();
    };
    ((d, s, id) => {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.onload = () => {
        this.props.finishLoading();
      };
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  /**
   *
   * @constructor
   */
  initGoogleConnect() {
    (() => {
      let e = document.createElement("script");
      e.type = "text/javascript";
      e.async = true;
      e.onload = () => {
        window.gapi.load("auth2", () => {
          window.gapi.auth2.init({
            ...this.props.providers.google.config
          });
          this.props.finishLoading();
        });
      };

      e.src = "https://apis.google.com/js/platform.js";
      let t = document.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(e, t);
    })();
  }

  /**
   *
   */
  tabsLoginClick = () => {
    if (this.props.tabs && this.props.tabs.onLoginClickBeforeTransition) {
      this.props.tabs.onLoginClickBeforeTransition();
    }

    this.setState(
      {
        currentTab: "login"
      },
      () => {
        if (this.props.tabs && this.props.tabs.onLoginClickAfterTransition) {
          this.props.tabs.onLoginClickAfterTransition();
        }
      }
    );
  };

  /**
   *
   */
  tabsRegisterClick = () => {
    if (this.props.tabs && this.props.tabs.onRegisterClickBeforeTransition) {
      this.props.tabs.onRegisterClickBeforeTransition();
    }

    this.setState(
      {
        currentTab: "register"
      },
      () => {
        if (this.props.tabs && this.props.tabs.onRegisterClickAfterTransition) {
          this.props.tabs.onRegisterClickAfterTransition();
        }
      }
    );
  };

  recoverPasswordAnchorClick = () => {
    this.setState({
      currentTab: "recoverPassword"
    });
  };

  /**
   *
   */
  onCloseModal = () => {
    if (this.props.onBeforeCloseModal) {
      this.props.onBeforeCloseModal();
    }

    this.props.onCloseModal();

    this.state.currentTab = this.props.initialTab
      ? this.props.initialTab
      : "login";

    if (this.props.onAfterCloseModal) {
      this.props.onAfterCloseModal();
    }
  };

  /**
   *
   * @constructor
   */
  render() {
    const { facebook, google } = this.props.providers;

    const tabs = this.props.tabs ? (
      <Tabs
        containerClass={
          this.props.tabs.containerClass
            ? this.props.tabs.containerClass
            : "RML-login-modal-mode"
        }
        inactive={this.props.loading ? this.props.loading : false}
        loginClick={this.tabsLoginClick}
        registerClick={this.tabsRegisterClick}
        currentTab={this.state.currentTab}
        loginLabel={
          this.props.tabs.loginLabel ? this.props.tabs.loginLabel : "Sign in"
        }
        registerLabel={
          this.props.tabs.registerLabel
            ? this.props.tabs.registerLabel
            : "Sign up"
        }
      />
    ) : null;

    const closeBtn = this.props.closeBtn.element ? (
      <div onClick={this.onCloseModal}>{this.props.closeBtn.element}</div>
    ) : (
      <CloseBtn
        containerClass={
          this.props.closeBtn.containerClass
            ? this.props.closeBtn.containerClass
            : "RML-login-modal-close"
        }
        click={this.onCloseModal}
      />
    );

    let facebookButton = null;

    if (
      this.props.providers &&
      this.props.providers.facebook &&
      this.state.currentTab !== "recoverPassword"
    ) {
      facebookButton = this.props.providers.facebook.btn ? (
        <facebook.btn
          btnClass={
            facebook.btnClass ? facebook.btnClass : "RML-facebook-login-button"
          }
          onStartLoading={this.props.startLoading}
          onSuccess={facebook.onLoginSuccess ? facebook.onLoginSuccess : null}
          onFail={facebook.onLoginFail ? facebook.onLoginFail : null}
          inactive={this.props.loading ? this.props.loading : false}
          label={facebook.label ? facebook.label : "Continue with Facebook"}
          scope={facebook.config.scope}
        />
      ) : (
        <FacebookLoginButton
          btnClass={
            facebook.btnClass ? facebook.btnClass : "RML-facebook-login-button"
          }
          onStartLoading={this.props.startLoading}
          onSuccess={facebook.onLoginSuccess ? facebook.onLoginSuccess : null}
          onFail={facebook.onLoginFail ? facebook.onLoginFail : null}
          inactive={this.props.loading ? this.props.loading : false}
          label={facebook.label ? facebook.label : "Continue with Facebook"}
          scope={facebook.config.scope}
        />
      );
    }

    let googleButton = null;

    if (
      this.props.providers &&
      this.props.providers.google &&
      this.state.currentTab !== "recoverPassword"
    ) {
      googleButton = this.props.providers.google.btn ? (
        <google.btn
          btnClass={
            google.btnClass ? google.btnClass : "RML-google-login-button"
          }
          onStartLoading={this.props.startLoading}
          onSuccess={google.onLoginSuccess ? google.onLoginSuccess : null}
          onFail={google.onLoginFail ? google.onLoginFail : null}
          inactive={this.props.loading ? this.props.loading : false}
          label={google.label ? google.label : "Continue with Google"}
        />
      ) : (
        <GoogleLoginButton
          btnClass={
            google.btnClass ? google.btnClass : "RML-google-login-button"
          }
          onStartLoading={this.props.startLoading}
          onSuccess={google.onLoginSuccess ? google.onLoginSuccess : null}
          onFail={google.onLoginFail ? google.onLoginFail : null}
          inactive={this.props.loading ? this.props.loading : false}
          label={google.label ? google.label : "Continue with Google"}
        />
      );
    }

    let errorClass = null;
    let errorLabel = "";

    if (this.props.error) {
      switch (this.state.currentTab) {
        case "login":
          errorClass = this.props.loginError.containerClass
            ? this.props.loginError.containerClass
            : "RML-login-modal-error";
          errorLabel = this.props.loginError.label
            ? this.props.loginError.label
            : "Unable to login. Please try again later";
          break;

        case "register":
          errorClass = this.props.registerError.containerClass
            ? this.props.registerError.containerClass
            : "RML-login-modal-error";
          errorLabel = this.props.registerError.label
            ? this.props.registerError.label
            : "Unable to register. Please try again later";
          break;

        case "recoverPassword":
          errorClass = this.props.recoverPasswordError.containerClass
            ? this.props.recoverPasswordError.containerClass
            : "RML-login-modal-error";
          errorLabel = this.props.recoverPasswordError.label
            ? this.props.recoverPasswordError.label
            : "Unable to recover password. Please try again later";
          break;
      }
    }

    const errorWrap = this.props.error ? (
      <SubmitError
        type={this.state.currentTab}
        containerClass={errorClass}
        label={errorLabel}
      />
    ) : null;

    const separator =
      this.props.separator && this.state.currentTab !== "recoverPassword" ? (
        <Separator
          containerClass={
            this.props.separator.containerClass
              ? this.props.separator.containerClass
              : "RML-social-methods-separator"
          }
          label={this.props.separator.label ? this.props.separator.label : "Or"}
        />
      ) : null;

    const loader =
      this.props.loading && !this.props.loader.disabled ? (
        <Loader
          containerClass={
            this.props.loader.containerClass
              ? this.props.loader.containerClass
              : "RML-login-modal-indicator"
          }
          onStartLoading={this.props.startLoading}
          size={24}
        />
      ) : null;

    const formWrap =
      this.props.form && !this.props.form.disabled ? (
        <FormWrap
          currentTab={this.state.currentTab}
          form={this.props.form}
          inactive={this.props.loading}
          loader={loader}
          errorWrap={errorWrap}
          visible={this.props.visible}
          recoverPasswordAnchorClick={this.recoverPasswordAnchorClick}
          recoverPasswordSuccessLabel={
            this.props.form.recoverPasswordSuccessLabel
          }
        />
      ) : null;

    const additionalWrap =
      (!this.props.form || this.props.form.disabled) &&
      !this.props.additionalWrap.disabled &&
      (this.props.loading || this.props.error) ? (
        <div
          className={
            this.props.additionalWrap.containerClass
              ? this.props.additionalWrap.containerClass
              : "RML-login-modal-additional-wrap"
          }
        >
          {errorWrap}
          {loader}
        </div>
      ) : null;

    const aboveSocialsLoginContainer =
      this.props.aboveSocialsLoginContainer && this.state.currentTab === "login"
        ? this.props.aboveSocialsLoginContainer
        : null;

    const aboveSocialsRegisterContainer =
      this.props.aboveSocialsRegisterContainer &&
      this.state.currentTab === "register"
        ? this.props.aboveSocialsRegisterContainer
        : null;

    const aboveSocialsRecoverPasswordContainer =
      this.props.aboveSocialsRecoverPasswordContainer &&
      this.state.currentTab === "recoverPassword"
        ? this.props.aboveSocialsRecoverPasswordContainer
        : null;

    return (
      <div
        id={this.props.mainWrapId ? this.props.mainWrapId : ""}
        className={classnames(this.props.mainWrapClass, {
          "RML-login-modal-wrap": !this.props.mainWrapClass,
          hidden: !this.props.visible
        })}
      >
        <div
          className={
            this.props.overlayClass
              ? this.props.overlayClass
              : "RML-login-modal-overlay"
          }
          onClick={this.onCloseModal}
        />

        <div
          className={classnames({
            "RML-login-modal-box": this.props.visible,
            hidden: !this.props.visible
          })}
        >
          <div
            className={
              this.props.visible ? "RML-login-modal-box-content" : "hidden"
            }
          >
            {closeBtn}
            {tabs}
            <div className="RML-social-modal-content-wrap">
              {aboveSocialsLoginContainer}
              {aboveSocialsRegisterContainer}
              {aboveSocialsRecoverPasswordContainer}

              {facebookButton}
              {googleButton}

              {separator}

              {formWrap}
              {additionalWrap}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactModalLogin.defaultProps = {
  closeBtn: {},
  tabs: {},
  providers: {},
  loader: {},
  additionalWrap: {},
  loginError: {},
  registerError: {},
  recoverPasswordError: {}
};

ReactModalLogin.propTypes = {
  mainWrapClass: PropTypes.string,
  mainWrapId: PropTypes.string,

  initialTab: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onBeforeCloseModal: PropTypes.func,
  onAfterCloseModal: PropTypes.func,

  overlayClass: PropTypes.string,

  loginError: PropTypes.shape({
    containerClass: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  }),
  registerError: PropTypes.shape({
    containerClass: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  }),
  recoverPasswordError: PropTypes.shape({
    containerClass: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  }),

  loader: PropTypes.shape({
    disabled: PropTypes.bool,
    containerClass: PropTypes.string
  }),

  separator: PropTypes.shape({
    containerClass: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  }),

  closeBtn: PropTypes.shape({
    containerClass: PropTypes.string,
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  }),

  tabs: PropTypes.shape({
    containerClass: PropTypes.string,
    afterChange: PropTypes.func,
    loginLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    registerLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  }),
  additionalWrap: PropTypes.shape({
    containerClass: PropTypes.string,
    disabled: PropTypes.bool
  }),

  providers: PropTypes.shape({
    facebook: PropTypes.shape({
      btnClass: PropTypes.string,
      config: PropTypes.object.isRequired,
      btn: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
      onLoginSuccess: PropTypes.func,
      onLoginFail: PropTypes.func,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    }),
    google: PropTypes.shape({
      btnClass: PropTypes.string,
      config: PropTypes.object.isRequired,
      btn: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
      onLoginSuccess: PropTypes.func,
      onLoginFail: PropTypes.func,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    })
  }),

  form: PropTypes.shape({
    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
    onRecoverPassword: PropTypes.func,

    bottomLoginContainer: PropTypes.element,
    bottomRegisterContainer: PropTypes.element,
    bottomRecoverPasswordContainer: PropTypes.element,

    aboveSocialsLoginContainer: PropTypes.element,
    aboveSocialsRegisterContainer: PropTypes.element,
    aboveSocialsRecoverPasswordContainer: PropTypes.element,

    registerContainerClass: PropTypes.string,
    loginContainerClass: PropTypes.string,
    recoverPasswordContainerClass: PropTypes.string,

    recoverPasswordSuccessLabel: PropTypes.shape({
      labelClass: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    }),

    recoverPasswordAnchor: PropTypes.shape({
      anchorClass: PropTypes.string,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    }),

    loginBtn: PropTypes.shape({
      buttonClass: PropTypes.string,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    }),
    registerBtn: PropTypes.shape({
      buttonClass: PropTypes.string,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    }),
    recoverPasswordBtn: PropTypes.shape({
      buttonClass: PropTypes.string,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    }),
    loginInputs: PropTypes.arrayOf(
      PropTypes.shape({
        containerClass: PropTypes.string,
        type: PropTypes.string,
        inputClass: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,

        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      })
    ),
    registerInputs: PropTypes.arrayOf(
      PropTypes.shape({
        containerClass: PropTypes.string,
        type: PropTypes.string,
        inputClass: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,

        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      })
    ),
    recoverPasswordInputs: PropTypes.arrayOf(
      PropTypes.shape({
        containerClass: PropTypes.string,
        type: PropTypes.string,
        inputClass: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,

        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      })
    )
  })
};

export default ReactModalLogin;
