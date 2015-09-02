import React from 'react';
import Reflux from 'reflux';
import ResourcesStore from '../../../../stores/ResourcesStore';
import ResourcesActions from '../../../../actions/ResourcesActions'; 

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
    return (<div>
      <ResourcesTable resources={this.state.resources} />
    </div>);
  }
});

export default ResourcesListView;