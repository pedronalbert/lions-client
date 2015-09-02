import React from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

let EventMembersTableRow = React.createClass({
  render() {
    return (
      <tr>
        <td>{this.props.member.first_name} {this.props.member.last_name} </td>
        <td>{this.props.member.ci}</td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="danger" onClick={this.props.onRemoveMember}>
              <FontAwesome name="times" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

export default EventMembersTableRow;