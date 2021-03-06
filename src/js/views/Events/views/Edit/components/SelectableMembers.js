import React from 'react/addons';
import SelectableMembersTable from './SelectableMembersTable'
import Radium from 'radium';
import {Input} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

let SelectableMembers = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  render() {
    const InputAddon = <FontAwesome name="search" />;

    return (
      <div>
        <h4><FontAwesome name="users" /> Miembros</h4>
        <Input 
          type="text"
          bsSize="small" 
          valueLink={this.linkState('wordFilter')} 
          addonBefore={InputAddon} 
          placeholder="Nombre o Cedula"
        />

        <div style={styles.membersBox}>
          <SelectableMembersTable 
            members={this.props.members} 
            eventId={this.props.eventId} 
            wordFilter={this.state.wordFilter} />
        </div>
      </div>
    );
  }
});

let styles = {
  membersBox: {
    height: '500px',
    overflowY: 'scroll'
  }
}

export default Radium(SelectableMembers);