import React, { useState } from "react";
import ReactModalLogin from "../react-modal-login";

import { facebookConfig, googleConfig } from "./social-config";

const Sample = (props) => {
  const [state, setState] = useState({
    showModal: false,
    loggedIn: null,
    loading: false,
    error: null,
    initialTab: null,
    recoverPasswordSuccess: null,
  });

  const onLogin = async (e, a, c) => {

    console.log(e, a, c);
    console.log("onLogin()");
    console.log("email: " + document.querySelector("#email").value);
    console.log("password: " + document.querySelector("#password").value);

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (!email || !password) {
      setState({
        error: true,
      });
    } else {
      onLoginSuccess("form");
    }
  };

  const onRegister = () => {
    console.log("onRegister()");
    console.log("login: " + document.querySelector("#login").value);
    console.log("email: " + document.querySelector("#email").value);
    console.log("password: " + document.querySelector("#password").value);

    const login = document.querySelector("#login").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (!login || !email || !password) {
      setState({
        error: true,
      });
    } else {
      onLoginSuccess("form");
    }
  };

  const onRecoverPassword = () => {
    console.log("onRecoverPassword()");
    console.log("email: " + document.querySelector("#email").value);

    const email = document.querySelector("#email").value;

    if (!email) {
      setState({
        ...state,
        error: true,
        recoverPasswordSuccess: false,
      });
    } else {
      setState({
        ...state,
        error: null,
        recoverPasswordSuccess: true,
      });
    }
  };

  const openModal = (initialTab) => {
    console.log("openModal()");

    setState({
      ...state,
      initialTab: initialTab,
      showModal: true,
    });
  };

  const onLoginSuccess = (method, response) => {
    console.log("onLoginSuccess()");

    setState({
      ...state,
      showModal: false,
      error: null,
      loggedIn: method,
      loading: false,
    });
  };

  const onLoginFail = (method, response) => {
    console.log("onLoginFail()");
    setState({
      ...state,
      loading: false,
      error: response,
    });
  };

  const startLoading = () => {
    console.log("startLoading()");
    setState({
      ...state,
      loading: true,
    });
  };

  const finishLoading = () => {
    console.log("finishLoading()");
    setState({
      ...state,
      loading: false,
    });
  };

  const afterTabsChange = () => {
    console.log("afterTabsChange()");

    setState({
      ...state,
      error: null,
      recoverPasswordSuccess: false,
    });
  };

  const closeModal = () => {
    console.log('closeModal()');
    setState({
      ...state,
      showModal: false,
      error: null,
      loading: false,
    });
  };

  const loggedIn = state.loggedIn ? (
    <div>
      <p>You are signed in with: {state.loggedIn}</p>
    </div>
  ) : (
    <div>
      <p>You are signed out</p>
    </div>
  );

  const isLoading = state.loading;


  return (
    <div>
      <button className="RML-btn" onClick={() => openModal("login")}>
        Login
      </button>

      <button className="RML-btn" onClick={() => openModal("register")}>
        Register
      </button>

      <ReactModalLogin
        visible={state.showModal}
        onCloseModal={closeModal}
        loading={isLoading}
        initialTab={state.initialTab}
        error={state.error}
        tabs={{
          afterChange: afterTabsChange,
        }}
        startLoading={startLoading}
        finishLoading={finishLoading}
        form={{
          onLogin: onLogin,
          onRegister: onRegister,
          onRecoverPassword: onRecoverPassword,

          recoverPasswordSuccessLabel: state.recoverPasswordSuccess
            ? {
                label: "New password has been sent to your mailbox!",
              }
            : null,
          recoverPasswordAnchor: {
            label: "Forgot your password?",
          },
          loginBtn: {
            label: "Sign in",
          },
          registerBtn: {
            label: "Sign up",
          },
          recoverPasswordBtn: {
            label: "Send new password",
          },
          loginInputs: [
            {
              containerClass: "RML-form-group",
              label: "Email",
              type: "email",
              inputClass: "RML-form-control",
              id: "email",
              name: "email",
              placeholder: "Email",
            },
            {
              containerClass: "RML-form-group",
              label: "Password",
              type: "password",
              inputClass: "RML-form-control",
              id: "password",
              name: "password",
              placeholder: "Password",
            },
          ],
          registerInputs: [
            {
              containerClass: "RML-form-group",
              label: "Nickname",
              type: "text",
              inputClass: "RML-form-control",
              id: "login",
              name: "login",
              placeholder: "Nickname",
            },
            {
              containerClass: "RML-form-group",
              label: "Email",
              type: "email",
              inputClass: "RML-form-control",
              id: "email",
              name: "email",
              placeholder: "Email",
            },
            {
              containerClass: "RML-form-group",
              label: "Password",
              type: "password",
              inputClass: "RML-form-control",
              id: "password",
              name: "password",
              placeholder: "Password",
            },
          ],
          recoverPasswordInputs: [
            {
              containerClass: "RML-form-group",
              label: "Email",
              type: "email",
              inputClass: "RML-form-control",
              id: "email",
              name: "email",
              placeholder: "Email",
            },
          ],
        }}
        separator={{
          label: "or",
        }}
        providers={{
          facebook: {
            config: facebookConfig,
            onLoginSuccess: onLoginSuccess,
            onLoginFail: onLoginFail,
            inactive: isLoading,
            label: "Continue with Facebook",
          },
          google: {
            config: googleConfig,
            onLoginSuccess: onLoginSuccess,
            onLoginFail: onLoginFail,
            inactive: isLoading,
            label: "Continue with Google",
          },
        }}
      />
      {loggedIn}
    </div>
  );
};

export default Sample;
