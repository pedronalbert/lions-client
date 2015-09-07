/*---Dependencies---*/
import FontAwesome from 'react-fontawesome';
import Radium from 'radium';
import React from 'react/addons';
import Reflux from 'reflux';
import {Input} from 'react-bootstrap';

/*---Components---*/
import MembersActions from '../../../../actions/MembersActions';
import MembersStore from '../../../../stores/MembersStore';
import MembersTable from './components/MembersTable';

let MembersLisView = React.createClass({
  mixins: [
    Reflux.connect(MembersStore, 'members'),
    React.addons.LinkedStateMixin
  ],
  
  getInitialState() {
    return {filter: ''};
  },

  componentWillMount() {
    MembersActions.getList();
  },

  render() {
    const InputAddon = <FontAwesome name="search" />;

    return (
      <div style={styles.base}>
        <h3 className="page-title">
          <FontAwesome name="users" /> Lista de Miembros
        </h3>

        <Input 
          type="text" 
          style={styles.inputSearch}
          valueLink={this.linkState('filterWord')}
          placeholder="Nombre, Apellido o Cedula..." 
          addonBefore={InputAddon} />

        <MembersTable members={this.state.members} filter={this.state.filterWord} />
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

export default Radium(MembersLisView);