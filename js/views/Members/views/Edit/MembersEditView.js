import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import MembersActions from '../../../../actions/MembersActions';
import FontAwesome from 'react-fontawesome';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import Joi from 'joi';
import {Navigation} from 'react-router';
import DeepLinkedStateMixin from 'react-deep-link-state';

let MembersEditView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Navigation,
    DeepLinkedStateMixin
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
    return {formButton: {disabled: false, style: 'primary'}, member: {}};
  },

  componentDidMount() {
    MembersActions
      .find
      .triggerPromise(this.props.params.id)
      .then((member) => {
        this.setState({member : member});
      })
      .catch((error) => {
        window.toast.error(error);
      })
  },

  getValidatorData() {
    return {
      first_name: this.state.member.first_name,
      last_name: this.state.member.last_name,
      ci: this.state.member.ci,
      email: this.state.member.email,
      phone: this.state.member.phone
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
          .update
          .triggerPromise(this.props.params.id, data)
          .then((response) => {
            window.toastr.success('Miembro actualizado exitosamente');
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
      <h3 className="page-title"><FontAwesome name="user-plus" /> Editar Miembro</h3>
      <form onSubmit={this.onSubmit}>
        <Input type="text" valueLink={this.deepLinkState(['member', 'first_name'])} label="Nombre" placeholder="Nombre" />
        <Input type="text" valueLink={this.deepLinkState(['member', 'last_name'])} label="Apellido" placeholder="Apellido" />
        <Input type="text" valueLink={this.deepLinkState(['member', 'ci'])} label="Cedula" placeholder="Cedula" />
        <Input type="text" valueLink={this.deepLinkState(['member', 'email'])} label="Correo" placeholder="Correo" />
        <Input type="text" valueLink={this.deepLinkState(['member', 'phone'])} label="Telefono" placeholder="Telefono" />
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