import React from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'
import EventsActions from '../../../../../actions/EventsActions';
import UsersActions from '../../../../../actions/UsersActions';
import {Navigation} from 'react-router';
import Moment from 'moment';
import MomentLocale from 'moment/locale/es';
import Alertify from 'alertifyjs';

let EventsListTableRow = React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {loggedUser: {}};
  },

  componenWillMount() {
    Moment.locale('es');
  },

  componentDidMount() {
    UsersActions
      .getLoggedUser
      .triggerPromise()
      .then((user) => {
        this.setState({loggedUser: user});
      });
  },

  handleDelete(id) {
    const message = '¿Está seguro de que desea eliminar este evento?';

    Alertify.defaults.glossary.title = 'Precaucion';
    Alertify.defaults.glossary.ok = 'SI';
    Alertify.defaults.glossary.cancel = 'NO';

    Alertify
      .confirm(message)
      .set('onok', (closeEvent) => {

        EventsActions
          .delete
          .triggerPromise(id)
          .then((response) => {
            window.toastr.success('Evento ha sido eliminado');
            this.transitionTo('events');
          });
      })
  },

  handleEdit(id) {
    let route = 'events/' + id + '/edit';

    this.transitionTo(route);
  },

  parseEventDate(date) {
    let parsedDate = Moment(date).format('D MMMM YYYY');

    return parsedDate;
  },

  parseEventHour(date) {
    let parsedHour = Moment(date).format('hh:mm a');

    return parsedHour;
  },

  render() {
    let eventDate = this.parseEventDate(this.props.event.date);
    let eventHour = this.parseEventHour(this.props.event.date);
    let editButton = null;
    let adminCol = null;


    if(this.props.event.active == 1) {
      editButton = <Button bsStyle="primary" bsSize="small" onClick={this.handleEdit.bind(this, this.props.event.id)}>
          <FontAwesome name="pencil" />
        </Button>
    }

    if(this.state.loggedUser.role == 1) {
      adminCol = <td>
        <ButtonToolbar>
          {editButton}
          <Button bsStyle="danger" bsSize="small" onClick={this.handleDelete.bind(this, this.props.event.id)}>
            <FontAwesome name="trash-o" />
          </Button>
        </ButtonToolbar>
      </td>  
    }
    
    return (
      <tr>
        <td>{this.props.event.title}</td>
        <td>{eventDate}</td>
        <td>{eventHour}</td>
        {adminCol}
      </tr>
    );
  }
});

export default EventsListTableRow;