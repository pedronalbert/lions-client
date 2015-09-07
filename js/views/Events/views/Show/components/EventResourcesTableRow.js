/*---Dependencies---*/
import React from 'react';

let EventResourcesTableRow = React.createClass({
  render() {
    return (
      <tr>
        <td>{this.props.resource.type}</td>
        <td>{this.props.resource.amount}</td>
      </tr>
    );
  }
});

export default EventResourcesTableRow;