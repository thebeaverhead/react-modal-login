/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";

import FormLoginButton from "./FormLoginButton";
import FormRegisterButton from "./FormRegisterButton";


export default class FormWrap extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {

    if (!this.props.visible && nextProps.visible ) {
      for (const ref in this.refs) {
        this.refs[ref].value = "";
      }
    }
  }

  /**
   *
   * @constructor
   */
  render() {

    const formProps = this.props.form;

    const loginBtn = formProps && formProps.loginBtn
      ? <FormLoginButton
          buttonClass={formProps.loginBtn.buttonClass ? formProps.loginBtn.buttonClass : "RML-btn"}
          inactive={this.props.inactive}
          click={formProps.onLogin ? formProps.onLogin : null}
          label={formProps.loginBtn.label ? formProps.loginBtn.label : "Sign in"}
        />
      : null;

    const registerBtn = formProps.registerBtn
      ? <FormRegisterButton
          buttonClass={formProps.registerBtn.buttonClass ? formProps.registerBtn.buttonClass : "RML-btn"}
          inactive={this.props.inactive}
          click={formProps.onRegister ? formProps.onRegister : null}
          label={formProps.registerBtn.label ? formProps.registerBtn.label : "Sign up"}
        />
      : null;

    const formLoginInputs = formProps.loginInputs
      ? formProps.loginInputs.map((input, index) => {
        return (
          <div className={input.containerClass ? input.containerClass : "RML-form-group"} key={index}>
            <label htmlFor={input.id}>{input.label}</label>
            <input
              type={input.type}
              className={input.inputClass ? input.inputClass : "RML-form-control"}
              id={input.id}
              key={input.id}
              name={input.name}
              ref={"formLoginInput-" + index}
              defaultValue=""
              placeholder={input.placeholder}
            />
          </div>
        )
      })
      : null;

    const formRegisterInputs = formProps.registerInputs
      ? formProps.registerInputs.map((input, index) => {
        return (
          <div className={input.containerClass ? input.containerClass : "RML-form-group"} key={index}>
            <label htmlFor={input.id}>{input.label}</label>
            <input
              type={input.type}
              className={input.inputClass ? input.inputClass : "RML-form-control"}
              id={input.id}
              name={input.name}
              ref={"formRegisterInput-" + index}
              defaultValue=""
              placeholder={input.placeholder}
            />
          </div>
        )
      })
      : null;

    let formWrap = null;

    switch (this.props.currentTab) {
      case "register":
        formWrap = (
          <div className={formProps.registerContainerClass ? formProps.registerContainerClass : "RML-login-modal-form"}>

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
          <div className={formProps.loginContainerClass ? formProps.loginContainerClass : "RML-login-modal-form"}>

            {formLoginInputs}
            {formProps.bottomLoginContainer}
            {this.props.errorWrap}
            {loginBtn}
            {this.props.loader}

            <div className="clearfix" />
          </div>
        );
      break;
    }

    return formWrap;
  }
};