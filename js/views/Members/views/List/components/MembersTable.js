import React from 'react';
import {Table, Well} from 'react-bootstrap';
import MembersTableRow from './MembersTableRow';
import UsersActions from '../../../../../actions/UsersActions';
import _ from 'lodash';
import Radium from 'radium';

let MembersTable = React.createClass({
  getInitialProps() {
    return {members: [], filter: ''};
  },

  getInitialState() {
    return {loggedUser: {}};
  },

  componentDidMount() {
    UsersActions
      .getLoggedUser
      .triggerPromise()
      .then((user) => {
        this.setState({loggedUser: user});
      });
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
    let adminCol = null;

    if(this.state.loggedUser.role == 1) {
      adminCol = <th style={styles.adminCol}>Editar</th>
    }

    if (this.props.members.length > 0) {
      return (
        <Table responsive condensed> 
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cedula</th>
            <th>Correo</th>
            <th>Telefono</th>
            {adminCol}
          </tr>

          <tbody>
            {members.map((member) => {
              return <MembersTableRow key={member.id} member={member} />
            })}
          </tbody>
        </Table>
      );
    } else {
      return (
        <Well>
          No hay miembros registrados!
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

export default Radium(MembersTable);