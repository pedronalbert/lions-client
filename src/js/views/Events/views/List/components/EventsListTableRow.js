/*---Dependencies---*/
import Alertify from 'alertifyjs';
import FontAwesome from 'react-fontawesome'
import Moment from 'moment';
import MomentLocale from 'moment/locale/es';
import React from 'react';
import Reflux from 'reflux';
import {ButtonToolbar, Button} from 'react-bootstrap';
import {History} from 'react-router';

/*---Components---*/
import EventsActions from 'actions/EventsActions';
import UsersActions from 'actions/UsersActions';
import UsersStore from 'stores/UsersStore';

let EventsListTableRow = React.createClass({
  mixins: [
    History,
    Reflux.connect(UsersStore, 'usersStore')
  ],

  componenWillMount() {
    Moment.locale('es');
    UsersActions.getLoggedUser();
  },

  render() {
    let eventDate = this.parseEventDate(this.props.event.date);
    let eventHour = this.parseEventHour(this.props.event.date);
    let editButton = null;
    let adminCol = null;
    let showUrl = '#/events/' + this.props.event.id;


    if(this.props.event.active == 1) {
      editButton = <Button bsStyle="primary" bsSize="small" onClick={this.handleEdit.bind(this, this.props.event.id)}>
          <FontAwesome name="pencil" />
        </Button>
    }

    if(this.state.usersStore.loggedUser.role == 1) {
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
        <td><a href={showUrl}>{this.props.event.title}</a></td>
        <td>{eventDate}</td>
        <td>{eventHour}</td>
        {adminCol}
      </tr>
    );
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
            this.history.pushState(null, 'events');
          });
      })
  },

  handleEdit(id) {
    let route = 'events/' + id + '/edit';

    this.history.pushState(null, route);
  },

  parseEventDate(date) {
    let parsedDate = Moment(date).format('D MMMM YYYY');

    return parsedDate;
  },

  parseEventHour(date) {
    let parsedHour = Moment(date).format('hh:mm a');

    return parsedHour;
  }
});

export default EventsListTableRow;