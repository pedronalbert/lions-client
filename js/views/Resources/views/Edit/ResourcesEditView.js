import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import ResourcesActions from '../../../../actions/ResourcesActions';
import FontAwesome from 'react-fontawesome';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import Joi from 'joi';
import {Navigation} from 'react-router';
import DeepLinkedStateMixin from 'react-deep-link-state';

let ResourcesEditView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Navigation,
    DeepLinkedStateMixin
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
    return {formButton: {disabled: false, style: 'primary'}, resource: {}};
  },

  componentDidMount() {
    ResourcesActions
      .find
      .triggerPromise(this.props.params.id)
      .then((resource) => {
        this.setState({resource : resource});
      })
      .catch((error) => {
        window.toast.error(error);
      })
  },

  getValidatorData() {
    return {
      type: this.state.resource.type,
      available: this.state.resource.available,
      using: this.state.resource.using,
      damaged: this.state.resource.damaged
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
          .update
          .triggerPromise(this.props.params.id, data)
          .then((response) => {
            window.toastr.success('Recurso actualizado exitosamente');
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
      <h3 className="page-title"><FontAwesome name="cart-plus" /> Editar Recurso</h3>
      <form onSubmit={this.onSubmit}>
        <Input valueLink={this.deepLinkState(['resource', 'type'])} type="text" label="Tipo" placeholder="Tipo"/>
        <Input valueLink={this.deepLinkState(['resource', 'available'])} type="text" label="Disponibles" placeholder="Disponibles"/>
        <Input valueLink={this.deepLinkState(['resource', 'using'])} type="text" label="Usando" placeholder="Usando"/>
        <Input valueLink={this.deepLinkState(['resource', 'damaged'])} type="text" label="Dañados" placeholder="Dañados"/>
        <ButtonInput 
          type="submit" 
          bsStyle={this.state.formButton.style} 
          disabled={this.state.formButton.disabled} 
          value="Editar Recurso" 
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

ResourcesEditView = Radium(ResourcesEditView);

ResourcesEditView = Validation(ValidationStrategy)(ResourcesEditView);

export default ResourcesEditView;