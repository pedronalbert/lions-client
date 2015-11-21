import React from 'react';
import Reflux from 'reflux';
import LogsActions from 'actions/LogsActions';
import LogsStore from 'stores/LogsStore';
import LogsTable from './components/LogsTable';
import FontAwesome from 'react-fontawesome';

let LogsListView = React.createClass({
  mixins: [Reflux.connect(LogsStore, 'logsStore')],
  getInitialState() {
    return {logsStore: []};
  },

  componentDidMount() {
    LogsActions.getList();
  },
  
  render() {
    return (
      <div>
        <h3 className="page-title"><FontAwesome name="heartbeat" /> Auditoria del Sistema</h3>
        <LogsTable logs={this.state.logsStore} />
      </div>
    );
  }
});

export default LogsListView;