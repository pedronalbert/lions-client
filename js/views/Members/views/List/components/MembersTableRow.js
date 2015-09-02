import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {Navigation} from 'react-router';
import MembersActions from '../../../../../actions/MembersActions';

let MembersTableRow = React.createClass({
  mixins: [Navigation],

  handleEdit(id) {
    let route = 'members/' + id + '/edit';

    this.transitionTo(route);
  },

  handleDelete(id) {
    let confirm = window.confirm('¿Está seguro de que desea eliminar este miembro?');

    if(confirm) {
      MembersActions.delete(id);
    }
  },

  render() {
    return (
      <tr>
        <td>{this.props.member.first_name}</td>
        <td>{this.props.member.last_name}</td>
        <td>{this.props.member.ci}</td>
        <td>{this.props.member.email}</td>
        <td>{this.props.member.phone}</td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.handleEdit.bind(this, this.props.member.id)}>
              <FontAwesome name="pencil" />
            </Button>
            <Button bsStyle="danger" onClick={this.handleDelete.bind(this, this.props.member.id)}>
              <FontAwesome name="trash-o" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

export default MembersTableRow;