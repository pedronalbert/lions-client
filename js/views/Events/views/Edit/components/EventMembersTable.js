import React from 'react';
import {Table} from 'react-bootstrap';
import EventMembersTableRow from './EventMembersTableRow';
import EventsActions from '../../../../../actions/EventsActions';

let EventMembersTable = React.createClass({
  handleRemoveMember(memberId) {
    EventsActions
      .removeMember(this.props.eventId, memberId);
  },

  render() {
    return (
      <Table>
        <tr>
          <th>Nombre</th>
          <th>Cedula</th>
          <th>Remover</th>
        </tr>

        <tbody>
          {this.props.members.map((member) => {
            return <EventMembersTableRow key={member.id} member={member} onRemoveMember={this.handleRemoveMember.bind(this, member.id)} />
          })}
        </tbody>
      </Table>
    );
  }
});

export default EventMembersTable;