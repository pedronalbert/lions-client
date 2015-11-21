import React from 'react';
import {Table} from 'react-bootstrap';
import EventMembersTableRow from './EventMembersTableRow';
import EventsActions from 'actions/EventsActions';
import _ from 'lodash';

let EventMembersTable = React.createClass({
  handleRemoveMember(memberId) {
    EventsActions
      .removeMember
      .triggerPromise(this.props.eventId, memberId)
      .then((response) => {
        window.toastr.success('Miembro removido exitosamente');
      })
      .catch((error) => {
        window.toastr.error(error, 'ERROR!');
      });
  },

  getFilteredMembers(wordFilter) {
    let members;

    if (_.isEmpty(wordFilter)) {
      members = this.props.members;
    } else {
      let reg = new RegExp(wordFilter);

      members = _.filter((this.props.members), (member) => {
        if (reg.test(member.ci) || reg.test(member.first_name) || reg.test(member.last_name)) {
          return true
        };
      });
    }

    return members;
  },

  render() {
    let members = this.getFilteredMembers(this.props.wordFilter);

    return (
      <Table>
        <tbody>
          {members.map((member) => {
            return <EventMembersTableRow key={member.id} member={member} onRemoveMember={this.handleRemoveMember.bind(this, member.id)} />
          })}
        </tbody>
      </Table>
    );
  }
});

export default EventMembersTable;