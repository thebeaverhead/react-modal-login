/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";

import FormSubmitButton from "./FormSubmitButton";
import PropTypes from "prop-types";

class FormWrap extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};
  }

  /**
   *
   * @param element
   * @param id
   */
  setInputRef = element => {
    if (element) {
      this.inputRefs[element.id] = element;
    }
  };


  /**
   *
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible && !prevProps.visible) {
      for (const ref in this.inputRefs) {
        this.inputRefs[ref].value = "";
      }
    }
  }

  /**
   *
   * @constructor
   */
  render() {
    const formProps = this.props.form;

    const loginBtn =
      formProps && formProps.loginBtn ? (
        <FormSubmitButton
          buttonClass={
            formProps.loginBtn.buttonClass
              ? formProps.loginBtn.buttonClass
              : "RML-btn"
          }
          type="login"
          inactive={this.props.inactive}
          click={formProps.onLogin ? formProps.onLogin : null}
          label={
            formProps.loginBtn.label ? formProps.loginBtn.label : "Sign in"
          }
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
          inactive={this.props.inactive}
          click={formProps.onRegister ? formProps.onRegister : null}
          label={
            formProps.registerBtn.label
              ? formProps.registerBtn.label
              : "Sign up"
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
          inactive={this.props.inactive}
          click={
            formProps.onRecoverPassword ? formProps.onRecoverPassword : null
          }
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
          onClick={this.props.recoverPasswordAnchorClick}
        >
          {formProps.recoverPasswordAnchor.label}
        </span>
      ) : null;

    const formLoginInputs = formProps.loginInputs
      ? formProps.loginInputs.map((input, index) => {
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
                ref={this.setInputRef}
                key={"formLoginInput-" + index}
                defaultValue=""
                placeholder={input.placeholder}
              />
            </div>
          );
        })
      : null;

    const formRegisterInputs = formProps.registerInputs
      ? formProps.registerInputs.map((input, index) => {
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
                ref={this.setInputRef.bind(this)}
                key={"formRegisterInput-" + index}
                defaultValue=""
                placeholder={input.placeholder}
              />
            </div>
          );
        })
      : null;

    const formRecoverPasswordInputs = formProps.recoverPasswordInputs
      ? formProps.recoverPasswordInputs.map((input, index) => {
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
                ref={this.setInputRef.bind(this)}
                key={"formRecoverPasswordInput-" + index}
                defaultValue=""
                placeholder={input.placeholder}
              />
            </div>
          );
        })
      : null;

    const recoverPasswordSuccessLabel = this.props
      .recoverPasswordSuccessLabel ? (
      <span
        className={
          this.props.recoverPasswordSuccessLabel.labelClass
            ? this.props.recoverPasswordSuccessLabel.labelClass
            : "RML-recover-password-success-label"
        }
        id="recoverPasswordSuccessLabel"
      >
        {this.props.recoverPasswordSuccessLabel.label}
      </span>
    ) : null;

    let formWrap = null;

    switch (this.props.currentTab) {
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
            {this.props.errorWrap}
            {registerBtn}
            {this.props.loader}

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
            {this.props.errorWrap}
            {recoverPasswordAnchor}
            {loginBtn}
            {this.props.loader}

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
            {this.props.errorWrap}
            {recoverPasswordBtn}
            {this.props.loader}

            <div className="clearfix" />
          </div>
        );
        break;
    }

    return formWrap;
  }
}
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


  })
};

export default FormWrap;
