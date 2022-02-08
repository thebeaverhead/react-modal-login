/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */
import React, { useCallback, useEffect, useMemo, useState } from "react";
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

/**
 *
 * @param e
 */
const keyHandler = (onEscape, onEnter) => (e) => {
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
    onEscape();
  }

  if (isEnter) {
    onEnter();
  }
};

const ReactModalLogin = (props) => {

  const [initialized, setInitialized] = useState(false);

  const [state, setState] = useState({
    currentTab: props.initialTab ? props.initialTab : "login",
    newTab: props.newTab,
  });

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    if (initialized && props.visible) {
      document.addEventListener("keydown", keyHandler(onEscape, onEnter));
      return () => document.removeEventListener("keydown", keyHandler);
    }
  }, [props.visible, initialized]);


  useEffect(() => {
    /* reset currentTab after visible is toggled on */
    if (props.visible) {
      /* Initialize Google */
      if (
        props.providers &&
        props.providers.facebook &&
        typeof window.FB === "undefined" &&
        props.visible &&
        !props.loading
      ) {
        props.startLoading();
        initFBConnect();
      }

      /* Initialize Google */
      if (
        props.providers &&
        props.providers.google &&
        typeof window.gapi === "undefined" &&
        props.visible &&
        !props.loading
      ) {
        props.startLoading();
        initGoogleConnect();
      }

      setState({
        ...state,
        currentTab: props.initialTab || "login",
      });
    }
  }, [props.visible, props.initialTab]);

  useEffect(() => {
    if (props.visible) {
      if (props.tabs.afterChange) {
        props.tabs.afterChange(state.currentTab);
      }

      if (state.currentTab === "login") {
        if (props.tabs && props.tabs.onLoginClickAfterTransition) {
          props.tabs.onLoginClickAfterTransition();
        }
      } else if (state.currentTab === "register") {
        if (props.tabs && props.tabs.onRegisterClickAfterTransition) {
          props.tabs.onRegisterClickAfterTransition();
        }
      } else if (state.currentTab === "recoverPassword") {
        if (props.tabs && props.tabs.onRecoverPasswordClickAfterTransition) {
          props.tabs.onRecoverPasswordClickAfterTransition();
        }
      }
    }
  }, [state.currentTab]);


  /**
   * @type {(function(): void)|*}
   */
  const onEnter = useCallback(() => {

    if (
      state.currentTab === "register" &&
      props.form &&
      props.form.onRegister
    ) {
      props.form.onRegister();
    } else if (
      state.currentTab === "login" &&
      props.form &&
      props.form.onLogin
    ) {
      props.form.onLogin();
    }
  }, []);


  /**
   *
   * @type {(function(): void)|*}
   */
  const onEscape = useCallback(() => {
    onCloseModal();
  }, []);

  /**
   *
   * @constructor
   */
  const initFBConnect = () => {
    window.fbAsyncInit = () => {
      window.FB.init({
        ...props.providers.facebook.config,
      });

      window.FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  /**
   *
   * @constructor
   */
  const initGoogleConnect = () => {
    (() => {
      let e = document.createElement("script");
      e.type = "text/javascript";
      e.async = true;
      e.onload = () => {
        window.gapi.load("auth2", () => {
          window.gapi.auth2.init({
            ...props.providers.google.config,
          });
          props.finishLoading();
        });
      };

      e.src = "https://apis.google.com/js/platform.js";
      let t = document.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(e, t);
    })();
  };

  /**
   *
   */
  const tabsLoginClick = () => {
    if (props.tabs && props.tabs.onLoginClickBeforeTransition) {
      props.tabs.onLoginClickBeforeTransition();
    }

    setState({
      ...state,
      currentTab: "login",
    });

  };

  /**
   *
   */
  const tabsRegisterClick = () => {
    if (props.tabs && props.tabs.onRegisterClickBeforeTransition) {
      props.tabs.onRegisterClickBeforeTransition();
    }

    setState({
      ...state,
      currentTab: "register",
    });
  };


  /**
   *
   */
  const recoverPasswordAnchorClick = () => {
    setState({
      ...state,
      currentTab: "recoverPassword",
    });
  };

  /**
   *
   */
  const onCloseModal = () => {
    if (props.onBeforeCloseModal) {
      props.onBeforeCloseModal();
    }

    props.onCloseModal();

    state.currentTab = props.initialTab ? props.initialTab : "login";

    if (props.onAfterCloseModal) {
      props.onAfterCloseModal();
    }
  };

  const { facebook, google } = props.providers;

  const tabs = props.tabs ? (
    <Tabs
      containerClass={
        props.tabs.containerClass
          ? props.tabs.containerClass
          : "RML-login-modal-mode"
      }
      inactive={props.loading ? props.loading : false}
      loginClick={tabsLoginClick}
      registerClick={tabsRegisterClick}
      currentTab={state.currentTab}
      loginLabel={props.tabs.loginLabel ? props.tabs.loginLabel : "Sign in"}
      registerLabel={
        props.tabs.registerLabel ? props.tabs.registerLabel : "Sign up"
      }
    />
  ) : null;

  const closeBtn = props.closeBtn.element ? (
    <div onClick={onCloseModal}>{props.closeBtn.element}</div>
  ) : (
    <CloseBtn
      containerClass={
        props.closeBtn.containerClass
          ? props.closeBtn.containerClass
          : "RML-login-modal-close"
      }
      click={onCloseModal}
    />
  );

  let facebookButton = null;

  if (
    props.providers &&
    props.providers.facebook &&
    state.currentTab !== "recoverPassword"
  ) {
    facebookButton = props.providers.facebook.btn ? (
      <facebook.btn
        btnClass={
          facebook.btnClass ? facebook.btnClass : "RML-facebook-login-button"
        }
        onStartLoading={props.startLoading}
        onSuccess={facebook.onLoginSuccess ? facebook.onLoginSuccess : null}
        onFail={facebook.onLoginFail ? facebook.onLoginFail : null}
        inactive={props.loading ? props.loading : false}
        label={facebook.label ? facebook.label : "Continue with Facebook"}
        scope={facebook.config.scope}
      />
    ) : (
      <FacebookLoginButton
        btnClass={
          facebook.btnClass ? facebook.btnClass : "RML-facebook-login-button"
        }
        onStartLoading={props.startLoading}
        onSuccess={facebook.onLoginSuccess ? facebook.onLoginSuccess : null}
        onFail={facebook.onLoginFail ? facebook.onLoginFail : null}
        inactive={props.loading ? props.loading : false}
        label={facebook.label ? facebook.label : "Continue with Facebook"}
        scope={facebook.config.scope}
      />
    );
  }

  let googleButton = null;

  if (
    props.providers &&
    props.providers.google &&
    state.currentTab !== "recoverPassword"
  ) {
    googleButton = props.providers.google.btn ? (
      <google.btn
        btnClass={google.btnClass ? google.btnClass : "RML-google-login-button"}
        onStartLoading={props.startLoading}
        onSuccess={google.onLoginSuccess ? google.onLoginSuccess : null}
        onFail={google.onLoginFail ? google.onLoginFail : null}
        inactive={props.loading ? props.loading : false}
        label={google.label ? google.label : "Continue with Google"}
      />
    ) : (
      <GoogleLoginButton
        btnClass={google.btnClass ? google.btnClass : "RML-google-login-button"}
        onStartLoading={props.startLoading}
        onSuccess={google.onLoginSuccess ? google.onLoginSuccess : null}
        onFail={google.onLoginFail ? google.onLoginFail : null}
        inactive={props.loading ? props.loading : false}
        label={google.label ? google.label : "Continue with Google"}
      />
    );
  }

  let errorClass = null;
  let errorLabel = "";

  if (props.error) {
    switch (state.currentTab) {
      case "login":
        errorClass = props.loginError.containerClass
          ? props.loginError.containerClass
          : "RML-login-modal-error";
        errorLabel = props.loginError.label
          ? props.loginError.label
          : "Unable to login. Please try again later";
        break;

      case "register":
        errorClass = props.registerError.containerClass
          ? props.registerError.containerClass
          : "RML-login-modal-error";
        errorLabel = props.registerError.label
          ? props.registerError.label
          : "Unable to register. Please try again later";
        break;

      case "recoverPassword":
        errorClass = props.recoverPasswordError.containerClass
          ? props.recoverPasswordError.containerClass
          : "RML-login-modal-error";
        errorLabel = props.recoverPasswordError.label
          ? props.recoverPasswordError.label
          : "Unable to recover password. Please try again later";
        break;
    }
  }

  const errorWrap = props.error ? (
    <SubmitError
      type={state.currentTab}
      containerClass={errorClass}
      label={errorLabel}
    />
  ) : null;

  const separator =
    props.separator && state.currentTab !== "recoverPassword" ? (
      <Separator
        containerClass={
          props.separator.containerClass
            ? props.separator.containerClass
            : "RML-social-methods-separator"
        }
        label={props.separator.label ? props.separator.label : "Or"}
      />
    ) : null;

  const loader =
    props.loading && !props.loader.disabled ? (
      <Loader
        containerClass={
          props.loader.containerClass
            ? props.loader.containerClass
            : "RML-login-modal-indicator"
        }
        onStartLoading={props.startLoading}
        size={24}
      />
    ) : null;

  const formWrap =
    props.form && !props.form.disabled ? (
      <FormWrap
        currentTab={state.currentTab}
        form={props.form}
        inactive={props.loading}
        loader={loader}
        errorWrap={errorWrap}
        visible={props.visible}
        recoverPasswordAnchorClick={recoverPasswordAnchorClick}
        recoverPasswordSuccessLabel={props.form.recoverPasswordSuccessLabel}
      />
    ) : null;

  const additionalWrap =
    (!props.form || props.form.disabled) &&
    !props.additionalWrap.disabled &&
    (props.loading || props.error) ? (
      <div
        className={
          props.additionalWrap.containerClass
            ? props.additionalWrap.containerClass
            : "RML-login-modal-additional-wrap"
        }
      >
        {errorWrap}
        {loader}
      </div>
    ) : null;

  const aboveSocialsLoginContainer =
    props.aboveSocialsLoginContainer && state.currentTab === "login"
      ? props.aboveSocialsLoginContainer
      : null;

  const aboveSocialsRegisterContainer =
    props.aboveSocialsRegisterContainer && state.currentTab === "register"
      ? props.aboveSocialsRegisterContainer
      : null;

  const aboveSocialsRecoverPasswordContainer =
    props.aboveSocialsRecoverPasswordContainer &&
    state.currentTab === "recoverPassword"
      ? props.aboveSocialsRecoverPasswordContainer
      : null;

  return (
    <div
      id={props.mainWrapId ? props.mainWrapId : ""}
      className={classnames(props.mainWrapClass, {
        "RML-login-modal-wrap": !props.mainWrapClass,
        hidden: !props.visible,
      })}
    >
      <div
        className={
          props.overlayClass ? props.overlayClass : "RML-login-modal-overlay"
        }
        onClick={onCloseModal}
      />

      <div
        className={classnames({
          "RML-login-modal-box": props.visible,
          hidden: !props.visible,
        })}
      >
        <div
          className={props.visible ? "RML-login-modal-box-content" : "hidden"}
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
};

ReactModalLogin.defaultProps = {
  closeBtn: {},
  tabs: {},
  providers: {},
  loader: {},
  additionalWrap: {},
  loginError: {},
  registerError: {},
  recoverPasswordError: {},
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
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  }),
  registerError: PropTypes.shape({
    containerClass: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  }),
  recoverPasswordError: PropTypes.shape({
    containerClass: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  }),

  loader: PropTypes.shape({
    disabled: PropTypes.bool,
    containerClass: PropTypes.string,
  }),

  separator: PropTypes.shape({
    containerClass: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  }),

  closeBtn: PropTypes.shape({
    containerClass: PropTypes.string,
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  }),

  tabs: PropTypes.shape({
    containerClass: PropTypes.string,
    afterChange: PropTypes.func,
    loginLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    registerLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    onLoginClickBeforeTransition: PropTypes.func,
    onLoginClickAfterTransition: PropTypes.func,

    onRegisterClickBeforeTransition: PropTypes.func,
    onRegisterClickAfterTransition: PropTypes.func,

    onRecoverPasswordClickBeforeTransition: PropTypes.func,
    onRecoverPasswordClickAfterTransition: PropTypes.func,
  }),
  additionalWrap: PropTypes.shape({
    containerClass: PropTypes.string,
    disabled: PropTypes.bool,
  }),

  providers: PropTypes.shape({
    facebook: PropTypes.shape({
      btnClass: PropTypes.string,
      config: PropTypes.object.isRequired,
      btn: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
      onLoginSuccess: PropTypes.func,
      onLoginFail: PropTypes.func,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),
    google: PropTypes.shape({
      btnClass: PropTypes.string,
      config: PropTypes.object.isRequired,
      btn: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
      onLoginSuccess: PropTypes.func,
      onLoginFail: PropTypes.func,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),
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
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),

    recoverPasswordAnchor: PropTypes.shape({
      anchorClass: PropTypes.string,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),

    loginBtn: PropTypes.shape({
      buttonClass: PropTypes.string,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),
    registerBtn: PropTypes.shape({
      buttonClass: PropTypes.string,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),
    recoverPasswordBtn: PropTypes.shape({
      buttonClass: PropTypes.string,
      inactive: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),
    loginInputs: PropTypes.arrayOf(
      PropTypes.shape({
        containerClass: PropTypes.string,
        type: PropTypes.string,
        inputClass: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        defaultValue: PropTypes.string,
        component: PropTypes.object
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
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        defaultValue: PropTypes.string,
        component: PropTypes.object
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
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        defaultValue: PropTypes.string,
        component: PropTypes.object
      })
    ),
  }),
};

export default ReactModalLogin;
