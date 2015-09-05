import React from 'react/addons';
import Reflux from 'reflux';
import EventsStore from '../../../../stores/EventsStore';
import EventsActions from '../../../../actions/EventsActions';
import MembersActions from '../../../../actions/MembersActions';
import MembersStore from '../../../../stores/MembersStore';
import ResourcesStore from '../../../../stores/ResourcesStore';
import ResourcesActions from '../../../../actions/ResourcesActions';
import {Input, ButtonInput, ButtonToolbar, Button, Table, Row, Col, Tabs, Tab} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';
import DeepLinkedStateMixin from 'react-deep-link-state';
import SelectableMembers from './components/SelectableMembers';
import EventMembers from './components/EventMembers';
import SelectableResources from './components/SelectableResources'; 
import EventResources from './components/EventResources';
import DateTime from 'react-datetime';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import Joi from 'joi';
import Radium from 'radium';
import Alertify from 'alertifyjs';
import {Navigation} from 'react-router';

let EventsEditView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(ResourcesStore, 'selectableResources'),
    Reflux.connect(MembersStore, 'selectableMembers'),
    Reflux.listenTo(EventsStore, 'onEventsStoreChange'),
    DeepLinkedStateMixin,
    Navigation
  ],

  validatorTypes: {
    title: Joi.string().required().label('Titulo'),
    description: Joi.string().required().label('Descripcion'),
    date: Joi.required().label('Fecha'),
    sector: Joi.string().required().label('Sector'),
    location: Joi.string().required().label('Lugar')
  },

  propTypes: {
    errors: React.PropTypes.object,
    validate: React.PropTypes.func,
    isValid: React.PropTypes.func,
    handleValidation: React.PropTypes.func,
    getValidationMessages: React.PropTypes.func,
    clearValidations: React.PropTypes.func,
  },

  getValidatorData() {
    return {
      title: this.state.event.title,
      description: this.state.event.description,
      date: this.state.event.date,
      sector: this.state.event.sector,
      location: this.state.event.location
    };
  },

  getInitialState() {
    return {
      selectableMembers: [], 
      selectableResources: [], 
      event: {members: [], resources: []},
      formButton: {disabled: false, style: 'primary'}
    };
  },

  componentDidMount() {
    MembersActions.getList();
    EventsActions.getList();
    ResourcesActions.getList();
  },

  onEventsStoreChange(events) {
    let event = _.find(events, (event) => {
      return event.id == this.props.params.id
    });

    this.setState({event: event});
  },

  handleDateChange(newDate) {
    let date = newDate.format('YYYY-MM-DD HH:mm');
    let event = this.state.event;

    event.date = date;

    this.setState({event: event});
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
          .update
          .triggerPromise(this.props.params.id, data)
          .then((event) => {
            window.toastr.success('Evento ha sido editado exitosamente');
            this.setFormEnabled();
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

  handleFinishEvent() {
    const message = "¿Esta seguro de que desea finalizar el evento? No se podra editar el evento en el futuro y los recursos utilizados seran movidos al inventario";

    Alertify.defaults.glossary.title = 'Precaucion';
    Alertify.defaults.glossary.ok = 'SI';
    Alertify.defaults.glossary.cancel = 'NO';

    Alertify
      .confirm(message)
      .set('onok', (closeEvent) => {
        EventsActions
          .finishEvent
          .triggerPromise(this.state.event.id)
          .then((response) => {
            window.toastr.success('El evento ha sido marcado como finalizado!');
            this.transitionTo('events');
          })
          .catch((error) => {
            window.toastr.error(error, 'ERROR!');
          })
      })
  },

  render() {
    return (
      <div>
        <h3 className="page-title"><FontAwesome name="calendar-plus-o" /> Editar Informacion del Evento</h3>
        
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Informacion Del Evento">
            <div style={styles.eventInfoBox}>
              <form onSubmit={this.onSubmit}>
                <Input type="text" valueLink={this.deepLinkState(['event', 'title'])} label="Titulo" placeholder="Titulo" />
                <Input type="textarea" valueLink={this.deepLinkState(['event', 'description'])} label="Descripcion" placeholder="Descripcion" />
                <Input type="text" value={this.state.event.date} label="Fecha" />
                <div style={styles.datePicker} >
                  <DateTime 
                    defaultValue={this.state.event.date}
                    input={false}
                    onChange={this.handleDateChange}
                  />
                </div>
                <Input type="text" valueLink={this.deepLinkState(['event', 'sector'])} label="Sector" placeholder="Sector" />
                <Input type="select" valueLink={this.deepLinkState(['event', 'location'])} label="Lugar">
                  <option value="Local">Local</option>
                  <option value="Cancha">Cancha</option>
                </Input>
                <ButtonInput 
                  type="submit" 
                  style={styles.fullButton}
                  bsStyle={this.state.formButton.style} 
                  disabled={this.state.formButton.disabled} 
                  value="Editar Evento"  
                />
              </form>
              <div style={styles.finishEventBox}>
                <ButtonToolbar>
                  <Button
                    bsStyle="success"
                    style={styles.fullButton}
                    onClick={this.handleFinishEvent} 
                  >
                    Finalizar Evento
                  </Button>
                </ButtonToolbar>
              </div>
            </div>
          </Tab>

          <Tab eventKey={2} title="Miembros">
            <Row>
              <Col xs={6}>
               <SelectableMembers members={this.state.selectableMembers} eventId={this.props.params.id} />
              </Col>
              <Col xs={6}>
                <EventMembers members={this.state.event.members} eventId={this.props.params.id} />
              </Col>  
            </Row>        
          </Tab>

          <Tab eventKey={3} title="Recursos">
            <Row>
              <Col xs={6}>
                <SelectableResources resources={this.state.selectableResources} eventId={this.props.params.id} />
              </Col>
              <Col xs={6}>
                <EventResources resources={this.state.event.resources} eventId={this.props.params.id} />
              </Col>          
            </Row>
          </Tab>

        </Tabs>

      </div>

    );
  }
});

let styles = {
  eventInfoBox: {
    width: '400px',
    margin: '15px auto'
  },

  datePicker: {
    width: '250px',
    margin: 'auto',
    marginBottom: '10px'
  },

  fullButton: {
    width: '100%'
  },

  finishEventBox: {
    width: '100%',
    margin: 'auto'
  }
}

EventsEditView = Radium(EventsEditView);

EventsEditView = Validation(ValidationStrategy)(EventsEditView);

export default EventsEditView;