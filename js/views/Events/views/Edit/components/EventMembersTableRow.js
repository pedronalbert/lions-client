import React from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

let EventMembersTable = React.createClass({
  render() {
    return (
      <tr>
        <td>{this.props.member.first_name} {this.props.member.last_name} </td>
        <td>CI: {this.props.member.ci}</td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="danger" bsSize="xsmall" onClick={this.props.onRemoveMember}>
              <FontAwesome name="times" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

export default EventMembersTable;