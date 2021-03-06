import React from 'react/addons';
import SelectableResourcesTable from './SelectableResourcesTable'
import Radium from 'radium';
import {Input} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

let SelectableResources = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  render() {
    const InputAddon = <FontAwesome name="search" />;

    return (
      <div>
        <h4><FontAwesome name="cubes" /> Recursos</h4>
        <Input 
          type="text"
          bsSize="small" 
          valueLink={this.linkState('wordFilter')} 
          addonBefore={InputAddon} 
          placeholder="Recurso"
        />

        <div style={styles.membersBox}>
          <SelectableResourcesTable 
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

export default Radium(SelectableResources);