import React from 'react';
import {Table} from 'react-bootstrap';
import MembersTableRow from './MembersTableRow';
import _ from 'lodash';


let MembersTable = React.createClass({
  getInitialProps() {
    return {members: [], filter: ''};
  },

  getFilteredMembers(filter) {
    let members;

    if (_.isEmpty(filter)) {
      members = this.props.members;
    } else {
      let reg = new RegExp(filter);

      members = _.filter((this.props.members), (member) => {
        if (reg.test(member.ci) || reg.test(member.first_name) || reg.test(member.last_name)) {
          return true
        };
      });
    }

    return members;
  },

  render() {
    let members = this.getFilteredMembers(this.props.filter);

    return (
      <Table bordered condensed> 
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cedula</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th>Editar</th>
        </tr>

        <tbody>
          {members.map((member) => {
            return <MembersTableRow key={member.id} member={member} />
          })}
        </tbody>
      </Table>
    );
  }
});
  
export default MembersTable;