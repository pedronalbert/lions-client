import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import ResourcesActions from 'actions/ResourcesActions';
import FontAwesome from 'react-fontawesome';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import Joi from 'joi';
import {History} from 'react-router';

let ResourcesNewView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    History
  ],

  validatorTypes: {
    type: Joi.string().required().label('Tipo'),
    available: Joi.number().min(0).required().label('Disponibles'),
    using: Joi.number().min(0).required().label('Usando'),
    damaged: Joi.number().min(0).required().label('Dañados')
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
    return {
      formButton: {disabled: false, style: 'primary'},
      available: 0,
      using: 0,
      damaged: 0
    };
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
            window.toastr.success('Recurso registrado exitosamente');
            this.history.pushState(null, 'resources');
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
      <h3 className="page-title"><FontAwesome name="cart-plus" /> Registrar Recurso</h3>
      <form onSubmit={this.onSubmit}>
        <Input valueLink={this.linkState('type')} type="text" label="Tipo" placeholder="Tipo"/>
        <Input valueLink={this.linkState('available')} type="number" min={0} label="Disponibles" placeholder="Disponibles"/>
        <Input valueLink={this.linkState('using')} type="number" min={0} label="Usando" placeholder="Usando"/>
        <Input valueLink={this.linkState('damaged')} type="number" min={0} label="Dañados" placeholder="Dañados"/>
        <ButtonInput 
          type="submit" 
          bsStyle={this.state.formButton.style} 
          disabled={this.state.formButton.disabled} 
          value="Registrar Recurso" 
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