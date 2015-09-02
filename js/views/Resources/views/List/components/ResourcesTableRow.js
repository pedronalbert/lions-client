import React from 'react';
import ResourcesActions from '../../../../../actions/ResourcesActions';
import FontAwesome from 'react-fontawesome';
import {Button, ButtonToolbar} from 'react-bootstrap'; 
import {Navigation} from 'react-router';

let ResourcesTableRow = React.createClass({
  mixins: [Navigation],

  handleEdit(id) {
    let route = 'resources/' + id + '/edit';

    this.transitionTo(route);
  },

  handleDelete(id) {
    let confirm = window.confirm('¿Está seguro de que desea eliminar este recurso?');

    if(confirm) {
      ResourcesActions.delete(id);
    }
  },

  render() {
    return (<tr>
      <td>{this.props.resource.type}</td>
      <td>{this.props.resource.available}</td>
      <td>{this.props.resource.using}</td>
      <td>{this.props.resource.damaged}</td>
      <td>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.handleEdit.bind(this, this.props.resource.id)}>
            <FontAwesome name="pencil" />
          </Button>
          <Button bsStyle="danger" onClick={this.handleDelete.bind(this, this.props.resource.id)}>
            <FontAwesome name="trash-o" />
          </Button>
        </ButtonToolbar>
      </td>
    </tr>);
  }
});

export default ResourcesTableRow;