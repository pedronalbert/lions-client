import React from 'react/addons';
import EventResourcesTable from './EventResourcesTable'
import Radium from 'radium';
import {Input} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

let EventResources = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  render() {
    const InputAddon = <FontAwesome name="search" />;

    return (
      <div>
        <h4><FontAwesome name="cubes" /> Recursos en el Evento</h4>
        <Input 
          type="text"
          bsSize="small" 
          valueLink={this.linkState('wordFilter')} 
          addonBefore={InputAddon} 
          placeholder="Recurso"
        />

        <div style={styles.membersBox}>
          <EventResourcesTable 
            resources={this.props.resources} 
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

export default Radium(EventResources);