/*---Dependencies---*/
import _ from 'lodash';
import Alertify from 'alertifyjs';
import DateTime from 'react-datetime';
import DeepLinkedStateMixin from 'react-deep-link-state';
import Validation from 'react-validation-mixin';
import ValidationStrategy from 'joi-validation-strategy';
import {Input, ButtonInput, ButtonToolbar, Button, Table, Row, Col, Tabs, Tab} from 'react-bootstrap';
import {History} from 'react-router';

/*---Components---*/
import EventMembers from './components/EventMembers';
import EventResources from './components/EventResources';
import EventsActions from '../../../../actions/EventsActions';
import EventsStore from '../../../../stores/EventsStore';
import FontAwesome from 'react-fontawesome';
import Joi from 'joi';
import MembersActions from '../../../../actions/MembersActions';
import MembersStore from '../../../../stores/MembersStore';
import Radium from 'radium';
import React from 'react/addons';
import Reflux from 'reflux';
import ResourcesActions from '../../../../actions/ResourcesActions';
import ResourcesStore from '../../../../stores/ResourcesStore';
import SelectableMembers from './components/SelectableMembers';
import SelectableResources from './components/SelectableResources'; 
import SectorsMixin from '../../components/SectorsMixin';

let EventsEditView = React.createClass({
  mixins: [
    DeepLinkedStateMixin,
    History,
    React.addons.LinkedStateMixin,
    Reflux.connect(MembersStore, 'members'),
    Reflux.connect(ResourcesStore, 'resources'),
    Reflux.listenTo(EventsStore, 'onEventsStoreChange'),
    SectorsMixin
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
      event: {members: [], resources: []},
      formButton: {disabled: false, style: 'primary'}
    };
  },

  componentWillMount() {
    EventsActions.getList();
    MembersActions.getList();
    ResourcesActions.getList();
  },

  render() {
    let sectors = this.getSectors();

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
                <Input type="text" valueLink={this.deepLinkState(['event', 'location'])} label="Lugar" placeholder="Lugar" />
                <Input type="select" valueLink={this.deepLinkState(['event', 'sector'])} label="Sector">
                  {sectors.map((sector) => {
                    return <option value={sector.name}>{sector.name}</option>
                  })}
                </Input>
                <ButtonInput 
                  type="submit" 
                  style={styles.fullButton}
                  bsStyle={this.state.formButton.style} 
                  disabled={this.state.formButton.disabled} 
                  value="Actualizar Informacion"  
                />
              </form>
              <div style={styles.finishEventBox}>
                <ButtonToolbar>
                  <Button
                    bsStyle="danger"
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
               <SelectableMembers members={this.state.members} eventId={this.props.params.id} />
              </Col>
              <Col xs={6}>
                <EventMembers members={this.state.event.members} eventId={this.props.params.id} />
              </Col>  
            </Row>        
          </Tab>

          <Tab eventKey={3} title="Recursos">
            <Row>
              <Col xs={6}>
                <SelectableResources resources={this.state.resources} eventId={this.props.params.id} />
              </Col>
              <Col xs={6}>
                <EventResources resources={this.state.event.resources} eventId={this.props.params.id} />
              </Col>          
            </Row>
          </Tab>

        </Tabs>

      </div>

    );
  },

  onEventsStoreChange(events) {
    let event = _.find(events, (event) => {
      return event.id == this.props.params.id
    });

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
            this.history.pushState(null, 'events');
          })
          .catch((error) => {
            window.toastr.error(error, 'ERROR!');
          })
      })
  },
  
  handleDateChange(newDate) {
    let date = newDate.format('YYYY-MM-DD HH:mm');
    let event = this.state.event;

    event.date = date;

    this.setState({event: event});
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
      title: this.state.event.title,
      description: this.state.event.description,
      date: this.state.event.date,
      sector: this.state.event.sector,
      location: this.state.event.location
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
  }
});

let styles = {
  eventInfoBox: {
    width: '400px',
    margin: '15px auto'
  },

  datePicker: {
    width: '250px',
    margin: '0px auto 10px auto'
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