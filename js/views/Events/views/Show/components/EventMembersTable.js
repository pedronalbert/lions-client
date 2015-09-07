/*---Dependencies---*/
import React from 'react';
import Radium from 'radium';

/*---Components---*/
import {Table} from 'react-bootstrap';
import EventMembersTableRow from './EventMembersTableRow';

let EventMembersTable = React.createClass({
  render() {
    return (
      <Table style={styles.table} bordered condensed>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cedula</th>
            <th>Telefono</th>
          </tr>
        </thead>

        <tbody>
          {this.props.members.map((member) => {
            return <EventMembersTableRow key={member.id} member={member} />
          })}
        </tbody>
      </Table>
    );
  }
});

let styles = {
  table: {
    maxWidth: '800px',
    margin: 'auto'
  }
}

export default EventMembersTable;