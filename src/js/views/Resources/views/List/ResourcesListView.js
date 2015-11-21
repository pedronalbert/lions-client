/*---Dependencies---*/
import FontAwesome from 'react-fontawesome';
import Radium from 'radium';
import React from 'react/addons';
import Reflux from 'reflux';
import {Input} from 'react-bootstrap';

/*---Components---*/
import ResourcesActions from 'actions/ResourcesActions'; 
import ResourcesStore from 'stores/ResourcesStore';
import ResourcesTable from './components/ResourcesTable';

let ResourcesListView = React.createClass({
  mixins: [
    Reflux.connect(ResourcesStore, 'resources'),
    React.addons.LinkedStateMixin
  ],
  
  getInitialState() {
    return {filterWord: ''};
  },

  componentWillMount() {
    ResourcesActions.getList();
  },

  render() {
    const InputAddon = <FontAwesome name="search" />;

    return (<div style={styles.base}>
      <h3 className="page-title"> <FontAwesome name="cubes" /> Inventario de Recursos </h3>

      <Input 
          type="text" 
          style={styles.inputSearch}
          valueLink={this.linkState('filterWord')}
          placeholder="Buscar..." 
          addonBefore={InputAddon} />

      <ResourcesTable resources={this.state.resources} filterWord={this.state.filterWord} />
    </div>);
  }
});

let styles = {
  base: {
    width: '500px',
    margin: 'auto'
  },

  inputSearch: {
    width: '400px'
  }
}

export default Radium(ResourcesListView);