import React from 'react';
import {Table} from 'react-bootstrap';
import EventsListTableRow from './EventsListTableRow';

let EventsListTable = React.createClass({
  render() {
    return  (
      <Table bordered condensed>
        <tr>
          <th>Titulo</th>
          <th>Fecha</th>
          <th>Administrar</th>
        </tr>

        <tbody>
          {this.props.events.map((event) => {
            return <EventsListTableRow key={event.id} event={event} />
          })}
        </tbody>
      </Table>
    );
  }
});

export default EventsListTable;