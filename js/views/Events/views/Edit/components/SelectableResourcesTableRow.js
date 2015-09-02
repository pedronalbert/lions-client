import React from 'react/addons';
import {ButtonToolbar, Button, Input} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import EventsActions from '../../../../../actions/EventsActions';

let SelectableResourcesTableRow = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState() {
    return {amount: 1};
  },

  handleAddResource() {
    EventsActions
      .addResource(this.props.eventId, this.props.resource.id, this.state.amount);
  },

  render() {
    return (
      <tr>
        <td>{this.props.resource.type} </td>
        <td>{this.props.resource.available}</td>
        <td>
          <Input type="number" valueLink={this.linkState('amount')} min="1" max={this.props.resource.available} />
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.handleAddResource} >
              <FontAwesome name="plus" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

export default SelectableResourcesTableRow;