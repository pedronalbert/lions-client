import React from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'
import EventsActions from '../../../../../actions/EventsActions';
import {Navigation} from 'react-router';
import Moment from 'moment';
import MomentLocale from 'moment/locale/es';

let EventsListTableRow = React.createClass({
  mixins: [Navigation],

  componenWillMount() {
    Moment.locale('es');
  },

  handleDelete(id) {
    let confirm = window.confirm('¿Está seguro de que desea eliminar este evento?');

    if(confirm) {
      EventsActions.delete(id);
    }
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

    return (
      <tr>
        <td>{this.props.event.title}</td>
        <td>{eventDate}</td>
        <td>{eventHour}</td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="small" onClick={this.handleEdit.bind(this, this.props.event.id)}>
              <FontAwesome name="pencil" />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={this.handleDelete.bind(this, this.props.event.id)}>
              <FontAwesome name="trash-o" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

export default EventsListTableRow;