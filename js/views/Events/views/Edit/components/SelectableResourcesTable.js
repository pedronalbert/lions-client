import React from 'react';
import {Table} from 'react-bootstrap';
import SelectableResourcesTableRow from './SelectableResourcesTableRow';

let SelectableResourcesTable = React.createClass({
  render() {
    return (
      <Table>
        <tr>
          <th>Type</th>
          <th>Disponibles</th>
          <th>Agregar</th>
        </tr>

        <tbody>
          {this.props.resources.map((resource) => {
            return <SelectableResourcesTableRow key={resource.id} resource={resource} eventId={this.props.eventId} />
          })}
        </tbody>
      </Table>
    );
  }
});

export default SelectableResourcesTable;