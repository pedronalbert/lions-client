import React from 'react';
import {Table} from 'react-bootstrap';
import SelectableMembersTableRow from './SelectableMembersTableRow';
import EventsActions from '../../../../../actions/EventsActions';

let SelectableMembersTable = React.createClass({
  handleAddMember(memberId) {
    EventsActions
      .addMember(this.props.eventId, memberId);
  },

  render() {
    return (
      <Table>
        <tr>
          <th>Nombre</th>
          <th>Cedula</th>
          <th>Agregar</th>
        </tr>

        <tbody>
          {this.props.members.map((member) => {
            return <SelectableMembersTableRow key={member.id} member={member} onAddMember={this.handleAddMember.bind(this, member.id)} />
          })}
        </tbody>
      </Table>
    );
  }
});

export default SelectableMembersTable;