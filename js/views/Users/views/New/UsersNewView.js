import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import UsersActions from '../../../../actions/UsersActions';
import FontAwesome from 'react-fontawesome';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import Joi from 'joi';
import {History} from 'react-router';

let MembersNewView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    History
  ],

  validatorTypes: {
    name: Joi.string().required().label('Nickname'),
    email: Joi.string().email().required().label('Correo'),
    password: Joi.string().required().label('Contraseña')
  },

  propTypes: {
    errors: React.PropTypes.object,
    validate: React.PropTypes.func,
    isValid: React.PropTypes.func,
    handleValidation: React.PropTypes.func,
    getValidationMessages: React.PropTypes.func,
    clearValidations: React.PropTypes.func,
  },

  getInitialState() {
    return {formButton: {disabled: false, style: 'primary'}, role: 2};
  },

  getValidatorData() {
    return {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };
  },

  onSubmit(event) {
    event.preventDefault();

    const onValidate = (error) => {
      if (error) {
        let validationError = this.props.getValidationMessages()[0];
        window.toastr.error(validationError, 'ERROR!');
      } else {
        this.setFormDisabled();

        let data = this.getValidatorData();

        UsersActions
          .create
          .triggerPromise(data)
          .then((response) => {
            window.toastr.success('Usuario registrado exitosamente');
            this.history.pushState(null, 'users');
          })
          .catch((error) => {
            window.toastr.error(error, 'ERROR!');
            this.setFormEnabled();
          })
      }
    }

    this.props.validate(onValidate);
  },

  setFormDisabled() {
    this.setState({
      formButton: {
        disbled: true,
        style: null
      }
    })
  },

  setFormEnabled() {
    this.setState({
      formButton: {
        disabled: false,
        style: 'primary'
      }
    })
  },

  render() {
    return <div style={styles.base}>
      <h3 className="page-title"><FontAwesome name="user-plus" /> Registrar Usuario</h3>
      <form onSubmit={this.onSubmit}>
        <Input type="text" valueLink={this.linkState('name')} label="NickName" placeholder="NickName" />
        <Input type="text" valueLink={this.linkState('email')} label="Correo" placeholder="Correo" />
        <Input type="password" valueLink={this.linkState('password')} label="Contraseña" placeholder="Contraseña" />
        <Input type="select" valueLink={this.linkState('role')} >
          <option value={1}>Administrador</option>
          <option value={2}>Usuario</option>
        </Input>
        <ButtonInput 
          type="submit" 
          bsStyle={this.state.formButton.style} 
          disabled={this.state.formButton.disabled} 
          value="Registrar Usuario" 
          style={styles.button} />
      </form>
    </div>
  }
})

let styles = {
  base: {
    width: '400px',
    margin: 'auto'
  },

  button: {
    width: '100%'
  }
};

MembersNewView = Radium(MembersNewView);

MembersNewView = Validation(ValidationStrategy)(MembersNewView);

export default MembersNewView;