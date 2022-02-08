/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React, { useEffect } from "react";

import FormSubmitButton from "./FormSubmitButton";
import PropTypes from "prop-types";

const FormWrap = (props) => {
  const inputRefs = {};

  /**
   *
   * @param element
   * @param id
   */
  const setInputRef = (element) => {
    if (element) {
      inputRefs[element.id] = element;
    }
  };

  useEffect(() => {
    if (props.visible) {
      for (const ref in inputRefs) {
        inputRefs[ref].value = "";
      }
    }
  }, [props.visible]);

  /**
   *
   * @param e
   */
  const onLoginClick = (e) => {
    if (formProps.onLogin) {
      formProps.onLogin();
    }
  };

  const formProps = props.form;

  const loginBtn =
    formProps && formProps.loginBtn ? (
      <FormSubmitButton
        buttonClass={
          formProps.loginBtn.buttonClass
            ? formProps.loginBtn.buttonClass
            : "RML-btn"
        }
        type="login"
        inactive={props.inactive}
        click={onLoginClick}
        label={formProps.loginBtn.label ? formProps.loginBtn.label : "Sign in"}
      />
    ) : null;

  const registerBtn =
    formProps && formProps.registerBtn ? (
      <FormSubmitButton
        buttonClass={
          formProps.registerBtn.buttonClass
            ? formProps.registerBtn.buttonClass
            : "RML-btn"
        }
        type="register"
        inactive={props.inactive}
        click={formProps.onRegister ? formProps.onRegister : null}
        label={
          formProps.registerBtn.label ? formProps.registerBtn.label : "Sign up"
        }
      />
    ) : null;

  const recoverPasswordBtn =
    formProps && formProps.recoverPasswordBtn ? (
      <FormSubmitButton
        buttonClass={
          formProps.recoverPasswordBtn.buttonClass
            ? formProps.recoverPasswordBtn.buttonClass
            : "RML-btn"
        }
        type="recoverPassword"
        inactive={props.inactive}
        click={formProps.onRecoverPassword ? formProps.onRecoverPassword : null}
        label={
          formProps.recoverPasswordBtn.label
            ? formProps.recoverPasswordBtn.label
            : "Recover password"
        }
      />
    ) : null;

  const recoverPasswordAnchor =
    formProps && formProps.recoverPasswordAnchor ? (
      <span
        className={
          formProps.recoverPasswordAnchor.anchorClass
            ? formProps.recoverPasswordAnchor.anchorClass
            : "RML-recover-password-anchor"
        }
        onClick={props.recoverPasswordAnchorClick}
      >
        {formProps.recoverPasswordAnchor.label}
      </span>
    ) : null;

  const formLoginInputs = formProps.loginInputs
    ? formProps.loginInputs.map((input, index) => {
        if (input.component) {
          return input.component;
        }

        return (
          <div
            className={
              input.containerClass ? input.containerClass : "RML-form-group"
            }
            key={index}
          >
            <label htmlFor={input.id}>{input.label}</label>
            <input
              type={input.type}
              className={
                input.inputClass ? input.inputClass : "RML-form-control"
              }
              id={input.id}
              name={input.name}
              ref={setInputRef}
              key={"formLoginInput-" + index}
              defaultValue=""
              placeholder={input.placeholder}
              {...input}
            />
          </div>
        );
      })
    : null;

  const formRegisterInputs = formProps.registerInputs
    ? formProps.registerInputs.map((input, index) => {
        if (input.component) {
          return input.component;
        }
        return (
          <div
            className={
              input.containerClass ? input.containerClass : "RML-form-group"
            }
            key={index}
          >
            <label htmlFor={input.id}>{input.label}</label>
            <input
              type={input.type}
              className={
                input.inputClass ? input.inputClass : "RML-form-control"
              }
              id={input.id}
              name={input.name}
              ref={setInputRef}
              key={"formRegisterInput-" + index}
              defaultValue={input.defaultValue || ""}
              placeholder={input.placeholder}
            />
          </div>
        );
      })
    : null;

  const formRecoverPasswordInputs = formProps.recoverPasswordInputs
    ? formProps.recoverPasswordInputs.map((input, index) => {
        if (input.component) {
          return input.component;
        }

        return (
          <div
            className={
              input.containerClass ? input.containerClass : "RML-form-group"
            }
            key={index}
          >
            <label htmlFor={input.id}>{input.label}</label>
            <input
              type={input.type}
              className={
                input.inputClass ? input.inputClass : "RML-form-control"
              }
              id={input.id}
              name={input.name}
              ref={setInputRef}
              key={"formRecoverPasswordInput-" + index}
              defaultValue=""
              placeholder={input.placeholder}
            />
          </div>
        );
      })
    : null;

  const recoverPasswordSuccessLabel = props.recoverPasswordSuccessLabel ? (
    <span
      className={
        props.recoverPasswordSuccessLabel.labelClass
          ? props.recoverPasswordSuccessLabel.labelClass
          : "RML-recover-password-success-label"
      }
      id="recoverPasswordSuccessLabel"
    >
      {props.recoverPasswordSuccessLabel.label}
    </span>
  ) : null;

  let formWrap = null;

  switch (props.currentTab) {
    case "register":
      formWrap = (
        <div
          className={
            formProps.registerContainerClass
              ? formProps.registerContainerClass
              : "RML-login-modal-form"
          }
        >
          {formRegisterInputs}
          {formProps.bottomRegisterContainer}
          {props.errorWrap}
          {registerBtn}
          {props.loader}

          <div className="clearfix" />
        </div>
      );
      break;

    case "login":
      formWrap = (
        <div
          className={
            formProps.loginContainerClass
              ? formProps.loginContainerClass
              : "RML-login-modal-form"
          }
        >
          {formLoginInputs}
          {formProps.bottomLoginContainer}
          {props.errorWrap}
          {recoverPasswordAnchor}
          {loginBtn}
          {props.loader}

          <div className="clearfix" />
        </div>
      );
      break;

    case "recoverPassword":
      formWrap = (
        <div
          className={
            formProps.recoverPasswordContainerClass
              ? formProps.recoverPasswordContainerClass
              : "RML-login-modal-form"
          }
        >
          {formRecoverPasswordInputs}
          {formProps.bottomRecoverPasswordContainer}
          {recoverPasswordSuccessLabel}
          {props.errorWrap}
          {recoverPasswordBtn}
          {props.loader}

          <div className="clearfix" />
        </div>
      );
      break;
  }

  return formWrap;
};
FormWrap.propTypes = {
  form: PropTypes.shape({
    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
    onRecoverPassword: PropTypes.func,
    loginContainerClass: PropTypes.string,
    registerContainerClass: PropTypes.string,
    recoverPasswordContainerClass: PropTypes.string,
    bottomLoginContainer: PropTypes.node,
    bottomRegisterContainer: PropTypes.node,
    bottomRecoverPasswordContainer: PropTypes.node,
    recoverPasswordSuccessLabel: PropTypes.shape({
      label: PropTypes.stirng,
      labelClass: PropTypes.stirng,
    }),
  }),
};

export default FormWrap;
