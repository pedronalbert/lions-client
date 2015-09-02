import React from 'react';
import Reflux from 'reflux';
import ResourcesStore from '../../../../stores/ResourcesStore';
import ResourcesActions from '../../../../actions/ResourcesActions'; 
import FontAwesome from 'react-fontawesome';
import Radium from 'radium';

//Components
import ResourcesTable from './components/ResourcesTable';

let ResourcesListView = React.createClass({
  mixins: [Reflux.connect(ResourcesStore, 'resources')],
  
  getInitialState() {
    return {resources: []};
  },

  componentDidMount() {
    ResourcesActions.getList();
  },

  render() {
    return (<div style={styles.base}>
      <h3 className="page-title"> <FontAwesome name="cubes" /> Inventario de Recursos </h3>
      <ResourcesTable resources={this.state.resources} />
    </div>);
  }
});

let styles = {
  base: {
    maxWidth: '500px'
  }
}

export default Radium(ResourcesListView);