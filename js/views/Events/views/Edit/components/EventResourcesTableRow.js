import React from 'react';
import {ButtonToolbar, Button, Input} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import EventsActions from '../../../../../actions/EventsActions';

let EventResourcesTableRow = React.createClass({

  getInitialState() {
    return {amount: 1}
  },

  handleRemoveResource() {
    EventsActions
      .removeResource(this.props.eventId, this.props.resource.resource_id)
  },

  render() {
    return (
      <tr>
        <td>{this.props.resource.type} </td>
        <td>{this.props.resource.amount}</td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="danger" onClick={this.handleRemoveResource} >
              <FontAwesome name="times" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

export default EventResourcesTableRow;