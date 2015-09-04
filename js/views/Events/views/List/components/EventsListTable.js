import React from 'react';
import {Table, Well} from 'react-bootstrap';
import EventsListTableRow from './EventsListTableRow';
import Radium from 'radium';

let EventsListTable = React.createClass({
  render() {

    if(this.props.events.length > 0) {
      return  (
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Fecha</th>
              <th style={styles.adminCol}>Administrar</th>
            </tr>
          </thead>

          <tbody>
            {this.props.events.map((event) => {
              return <EventsListTableRow key={event.id} event={event} />
            })}
          </tbody>
        </Table>
      );
    } else {
      return (
        <Well>
          No hay eventos registrados!
        </Well>
      );
    }
  }
});

let styles = {
  adminCol: {
    width: '90px'
  }
}

export default Radium(EventsListTable);