import React from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

let SelectableMembersTableRow = React.createClass({
  render() {
    return (
      <tr>
        <td>{this.props.member.first_name} {this.props.member.last_name} </td>
        <td>CI: {this.props.member.ci}</td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="xsmall" onClick={this.props.onAddMember}>
              <FontAwesome name="plus" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

export default SelectableMembersTableRow;