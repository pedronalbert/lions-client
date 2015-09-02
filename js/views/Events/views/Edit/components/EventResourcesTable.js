import React from 'react';
import {Table} from 'react-bootstrap';
import ResourcesActions from '../../../../../actions/ResourcesActions';
import EventResourcesTableRow from './EventResourcesTableRow';

let SelectableResourcesTable = React.createClass({
  render() {
    return (
      <Table>
        <tr>
          <th>Type</th>
          <th>Usando</th>
          <th>Remover</th>
        </tr>

        <tbody>
          {this.props.resources.map((resource) => {
            return <EventResourcesTableRow key={resource.id} resource={resource} eventId={this.props.eventId} />
          })}
        </tbody>
      </Table>
    );
  }
});

export default SelectableResourcesTable;