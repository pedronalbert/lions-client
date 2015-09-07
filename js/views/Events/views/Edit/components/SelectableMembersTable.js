import React from 'react';
import {Table} from 'react-bootstrap';
import SelectableMembersTableRow from './SelectableMembersTableRow';
import EventsActions from '../../../../../actions/EventsActions';
import _ from 'lodash';

let SelectableMembersTable = React.createClass({
  handleAddMember(memberId) {
    EventsActions
      .addMember
      .triggerPromise(this.props.eventId, memberId)
      .then((member) => {
        window.toastr.success('Miembro agregado exitosamente');
      })
      .catch((error) => {
        window.toastr.error(error);
      })
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
            return <SelectableMembersTableRow key={member.id} member={member} onAddMember={this.handleAddMember.bind(this, member.id)} />
          })}
        </tbody>
      </Table>
    );
  }
});

export default SelectableMembersTable;