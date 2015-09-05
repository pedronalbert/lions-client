import React from 'react/addons';
import {ButtonToolbar, Button, Input, Row} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import EventsActions from '../../../../../actions/EventsActions';
import Radium from 'radium';

let SelectableResourcesTableRow = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState() {
    return {amount: 1};
  },

  handleAddResource() {
    EventsActions
      .addResource
      .triggerPromise(this.props.eventId, this.props.resource.id, this.state.amount)
      .then((response) => {
        window.toastr.success('Recurso agregado exitosamente!');
      })
      .catch((error) => {
        window.toastr.error(error, 'ERROR!');
      })
  },

  render() {
    return (
      <tr>
        <td>{this.props.resource.type} </td>
        <td>Disponible: {this.props.resource.available}</td>
        <td>
          <Input 
            style={styles.inputAdd} 
            bsSize="small"
            type="number" 
            valueLink={this.linkState('amount')} 
            min={1} 
            max={this.props.resource.available} />
        </td>
        <td>
          <ButtonToolbar>
            <Button bsSize="xsmall" bsStyle="primary" onClick={this.handleAddResource} >
              <FontAwesome name="plus" />
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
  },
};

export default Radium(SelectableResourcesTableRow);