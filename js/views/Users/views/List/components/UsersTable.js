import React from 'react';
import {Table, Well} from 'react-bootstrap';
import UsersTableRow from './UsersTableRow';
import _ from 'lodash';
import Radium from 'radium';

let UsersTable = React.createClass({
  getInitialProps() {
    return {users: [], filter: ''};
  },

  getFilteredUsers(filter) {
    let users;

    if (_.isEmpty(filter)) {
      users = this.props.users;
    } else {
      let reg = new RegExp(filter);

      users = _.filter((this.props.users), (user) => {
        if (reg.test(user.email) || reg.test(user.name)) {
          return true
        };
      });
    }

    return users;
  },

  render() {
    let users = this.getFilteredUsers(this.props.filter);

    if (this.props.users.length > 0) {
      return (
        <Table responsive condensed> 
          <tr>
            <th>Nick</th>
            <th>Email</th>
            <th>Rol</th>
            <th style={styles.adminCol}>Editar</th>
          </tr>

          <tbody>
            {users.map((user) => {
              return <UsersTableRow key={user.id} user={user} />
            })}
          </tbody>
        </Table>
      );
    } else {
      return (
        <Well>
          No hay usuarios registrados!
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

export default Radium(UsersTable);