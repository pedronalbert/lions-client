/*---Dependencies---*/
import React from 'react';
import Radium from 'radium';

/*---Components---*/
import {Table} from 'react-bootstrap';
import EventResourcesTableRow from './EventResourcesTableRow';

let EventResourcesTable = React.createClass({
  render() {
    return (
      <Table style={styles.table}bordered condensed>
        <thead>
          <tr>
            <th>Tipo</th>
            <th style={styles.fitCol}>Cantidad</th>
          </tr>
        </thead>

        <tbody>
          {this.props.resources.map((resource) => {
            return <EventResourcesTableRow key={resource.id} resource={resource} />
          })}
        </tbody>
      </Table>
    );
  }
});

let styles = {
  table: {
    width: '400px',
    margin: 'auto'
  },

  fitCol: {
    width: '1px'
  }
}
export default EventResourcesTable;