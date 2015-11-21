/*---Dependencies---*/
import React from 'react';

let EventMembersTableRow = React.createClass({
  render() {
    return (
      <tr>
        <td>{this.props.member.first_name}</td>
        <td>{this.props.member.last_name}</td>
        <td>{this.props.member.ci}</td>
        <td>{this.props.member.phone}</td>
      </tr>
    )
  }
});

export default EventMembersTableRow;