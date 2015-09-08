/*---Dependencies---*/
import DateTime from 'react-datetime';
import FontAwesome from 'react-fontawesome';
import Joi from 'joi';
import Radium from 'radium';
import React from 'react/addons';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import {Input, ButtonInput, Row, Col} from 'react-bootstrap';
import {Navigation} from 'react-router';

/*---Components---*/
import EventsActions from '../../../../actions/EventsActions';

let MembersNewView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Navigation
  ],

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
      sector:'Sector1'
    };
  },

  render() {
    return <div style={styles.base}>
      <h3 className="page-title"><FontAwesome name="calendar-plus-o" /> Registrar Evento</h3>
      <form onSubmit={this.onSubmit}>
        <Input type="text" valueLink={this.linkState('title')} label="Titulo" placeholder="Titulo" />
        <Input type="textarea" valueLink={this.linkState('description')} label="Descripcion" placeholder="Descripcion" />
        <Input type="text" value={this.state.date} label="Fecha" />
        <div style={styles.datePicker}>
          <DateTime 
            input={false}
            timeFormat="YYYY-MM-DD hh:mm a" 
            onChange={this.handleDateChange} />
        </div>
        <Input type="text" valueLink={this.linkState('location')} label="Lugar" placeholder="Lugar" />
        <Input type="select" valueLink={this.linkState('sector')} label="Sector">
          <option value="Sector1">Sector1</option>
          <option value="Sector2">Sector2</option>
        </Input>
        <ButtonInput 
          type="submit" 
          bsStyle={this.state.formButton.style} 
          disabled={this.state.formButton.disabled} 
          value="Agregar Evento" 
          style={styles.button} />
      </form>
    </div>
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

        EventsActions
          .create
          .triggerPromise(data)
          .then((event) => {
            window.toastr.success('Evento registrado exitosamente');
            this.transitionTo('events/' + event.id + '/edit');
          })
          .catch((error) => {
            window.toastr.error(error, 'ERROR!');
            this.setFormEnabled();
          })
      }
    }

    this.props.validate(onValidate);
  },

  handleDateChange(newDate) {
    let date = newDate.format('YYYY-MM-DD HH:mm');

    this.setState({date: date});
  },
  
  validatorTypes: {
    title: Joi.string().required().label('Titulo'),
    description: Joi.string().required().label('Descripcion'),
    date: Joi.required().label('Fecha'),
    sector: Joi.string().required().label('Sector'),
    location: Joi.string().required().label('Lugar')
  },

  getValidatorData() {
    return {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      sector: this.state.sector,
      location: this.state.location
    };
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

})

let styles = {
  base: {
    width: '400px',
    margin: 'auto'
  },

  button: {
    width: '100%'
  },

  datePicker: {
    width: '250px',
    margin: '0px auto 10px auto'
  }
};

MembersNewView = Radium(MembersNewView);

MembersNewView = Validation(ValidationStrategy)(MembersNewView);

export default MembersNewView;