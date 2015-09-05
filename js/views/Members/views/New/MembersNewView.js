import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import MembersActions from '../../../../actions/MembersActions';
import FontAwesome from 'react-fontawesome';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import Joi from 'joi';
import {Navigation} from 'react-router';

let MembersNewView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Navigation
  ],

  validatorTypes: {
    first_name: Joi.string().required().label('Nombre'),
    last_name: Joi.string().required().label('Apelido'),
    ci: Joi.required().label('Cedula'),
    email: Joi.string().email().required().label('Correo'),
    phone: Joi.required().label('Telefono')
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
    return {formButton: {disabled: false, style: 'primary'}};
  },

  getValidatorData() {
    return {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      ci: this.state.ci,
      email: this.state.email,
      phone: this.state.phone
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

        MembersActions
          .create
          .triggerPromise(data)
          .then((response) => {
            window.toastr.success('Miembro ha sido registrado exitosamente');
            this.transitionTo('members');
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
      <h3 className="page-title"><FontAwesome name="user-plus" /> Registrar Miembro</h3>
      <form onSubmit={this.onSubmit}>
        <Input type="text" valueLink={this.linkState('first_name')} label="Nombre" placeholder="Nombre" />
        <Input type="text" valueLink={this.linkState('last_name')} label="Apellido" placeholder="Apellido" />
        <Input type="text" valueLink={this.linkState('ci')} label="Cedula" placeholder="Cedula" />
        <Input type="text" valueLink={this.linkState('email')} label="Correo" placeholder="Correo" />
        <Input type="text" valueLink={this.linkState('phone')} label="Telefono" placeholder="Telefono" />
        <ButtonInput 
          type="submit" 
          bsStyle={this.state.formButton.style} 
          disabled={this.state.formButton.disabled} 
          value="Agregar Recurso" 
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