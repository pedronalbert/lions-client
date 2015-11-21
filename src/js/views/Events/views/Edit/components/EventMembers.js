import React from 'react/addons';
import EventMembersTable from './EventMembersTable'
import Radium from 'radium';
import {Input} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

let EventMembers = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  render() {
    const InputAddon = <FontAwesome name="search" />;

    return (
      <div>
        <h4><FontAwesome name="users" /> Miembros en el Evento</h4>
        <Input 
          type="text"
          bsSize="small" 
          valueLink={this.linkState('wordFilter')} 
          addonBefore={InputAddon} 
          placeholder="Nombre o Cedula"
        />

        <div style={styles.membersBox}>
          <EventMembersTable 
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

export default Radium(EventMembers);