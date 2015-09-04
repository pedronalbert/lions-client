import React from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'
import EventsActions from '../../../../../actions/EventsActions';
import {Navigation} from 'react-router';

let EventsListTableRow = React.createClass({
  mixins: [Navigation],

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

  render() {
    return (
      <tr>
        <td>{this.props.event.title}</td>
        <td>{this.props.event.date}</td>
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