import React from 'react/addons';
import {ButtonToolbar, Button, Input, Row} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import EventsActions from '../../../../../actions/EventsActions';
import Radium from 'radium';

let EventResourcesTableRow = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState() {
    return {amount: 1};
  },

  handleRemoveResource() {
    EventsActions
      .removeResource
      .triggerPromise(this.props.eventId, this.props.resource.resource_id)
      .then((response) => {
        window.toastr.success('Recurso removido exitosamente');
      })
      .catch((error) => {
        window.toastr.error(error, 'ERROR!');
      });
  },

  render() {
    return (
      <tr>
        <td>{this.props.resource.type} </td>
        <td>Usando: {this.props.resource.amount}</td>
        <td>
          <ButtonToolbar>
            <Button bsSize="xsmall" bsStyle="danger" onClick={this.handleRemoveResource} >
              <FontAwesome name="times" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

let styles = {
  inputAdd: {
    width: '50px'
  }
};

export default Radium(EventResourcesTableRow);