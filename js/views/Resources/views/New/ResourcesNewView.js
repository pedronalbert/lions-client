import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import ResourcesActions from '../../../../actions/ResourcesActions';
import FontAwesome from 'react-fontawesome';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import Joi from 'joi';
import {Navigation} from 'react-router';

let ResourcesNewView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Navigation
  ],

  validatorTypes: {
    type: Joi.string().required().label('Tipo'),
    available: Joi.number().required().label('Disponibles'),
    using: Joi.number().required().label('Usando'),
    damaged: Joi.number().required().label('Dañados')
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
      type: this.state.type,
      available: this.state.available,
      using: this.state.using,
      damaged: this.state.damaged
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

        ResourcesActions
          .create
          .triggerPromise(data)
          .then((response) => {
            window.toastr.success('Recurso ha sido registrado exitosamente');
            this.transitionTo('resources');
          })
          .catch((response) => {
            window.toastr.error(response, 'ERROR!');
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
      <h3><FontAwesome name="cart-plus" /> Registrar Recurso</h3>
      <form onSubmit={this.onSubmit}>
        <Input valueLink={this.linkState('type')} type="text" label="Tipo" placeholder="Tipo"/>
        <Input valueLink={this.linkState('available')} type="text" label="Disponibles" placeholder="Disponibles"/>
        <Input valueLink={this.linkState('using')} type="text" label="Usando" placeholder="Usando"/>
        <Input valueLink={this.linkState('damaged')} type="text" label="Dañados" placeholder="Dañados"/>
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

ResourcesNewView = Radium(ResourcesNewView);

ResourcesNewView = Validation(ValidationStrategy)(ResourcesNewView);

export default ResourcesNewView;