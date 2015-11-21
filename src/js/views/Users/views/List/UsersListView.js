import React from 'react/addons';
import Reflux from 'reflux';
import UsersActions from 'actions/UsersActions';
import UsersStore from 'stores/UsersStore';
import UsersTable from './components/UsersTable';
import {Input} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Radium from 'radium';

let UsersListView = React.createClass({
  mixins: [
    Reflux.connect(UsersStore, 'usersStore'),
    React.addons.LinkedStateMixin
  ],
  
  getInitialState() {
    return {filter: ''};
  },

  componentDidMount() {
    UsersActions.getList();
  },

  render() {
    const InputAddon = <FontAwesome name="search" />;

    return (
      <div style={styles.base}>
        <h3 className="page-title">
          <FontAwesome name="users" /> Lista de Usuarios
        </h3>

        <Input 
          type="text" 
          style={styles.inputSearch}
          valueLink={this.linkState('filterWord')}
          label="Buscar"
          placeholder="Nombre, Apellido o Cedula..." 
          addonBefore={InputAddon} />

        <UsersTable users={this.state.usersStore.users} filter={this.state.filterWord} />
      </div>
    );
  }
});

let styles = {
  inputSearch: {
    width: '400px'
  },

  base: {
    minWidth: '600px',
    maxWidth: '800px',
    margin: 'auto'
  }
}
export default Radium(UsersListView);