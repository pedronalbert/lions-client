import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import UsersActions from 'actions/UsersActions';
import FontAwesome from 'react-fontawesome';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import Joi from 'joi';
import {History} from 'react-router';
import DeepLinkedStateMixin from 'react-deep-link-state';

let MembersEditView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    History,
    DeepLinkedStateMixin
  ],

  validatorTypes: {
    name: Joi.string().required().label('Nickname'),
    email: Joi.string().email().required().label('Correo')
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
    return {formButton: {disabled: false, style: 'primary'}, user: {}};
  },

  componentDidMount() {
    UsersActions
      .find
      .triggerPromise(this.props.params.id)
      .then((user) => {
        this.setState({user : user});
      })
      .catch((error) => {
        window.toast.error(error);
      })
  },

  getValidatorData() {
    return {
      name: this.state.user.name,
      password: this.state.user.password,
      email: this.state.user.email,
      role: this.state.user.role
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
          .update
          .triggerPromise(this.props.params.id, data)
          .then((response) => {
            window.toastr.success('Usuario actualizado exitosamente');
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
      <h3 className="page-title"><FontAwesome name="user-plus" /> Editar Usuario</h3>
      <form onSubmit={this.onSubmit}>
        <Input type="text" valueLink={this.deepLinkState(['user', 'name'])} label="NickName" placeholder="NickName" />
        <Input type="text" valueLink={this.deepLinkState(['user', 'email'])} label="Correo" placeholder="Correo" />
        <Input type="password" valueLink={this.deepLinkState(['user', 'password'])} label="Contraseña" placeholder="Contraseña" />
        <Input type="select" valueLink={this.deepLinkState(['user', 'role'])} >
          <option value={1}>Administrador</option>
          <option value={2}>Usuario</option>
        </Input>
        <ButtonInput 
          type="submit" 
          bsStyle={this.state.formButton.style} 
          disabled={this.state.formButton.disabled} 
          value="Editar Miembro" 
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

MembersEditView = Radium(MembersEditView);

MembersEditView = Validation(ValidationStrategy)(MembersEditView);

export default MembersEditView;