import React from 'react/addons';
import Reflux from 'reflux';
import EventsActions from '../../../../actions/EventsActions';
import EventsStore from '../../../../stores/EventsStore';
import EventsListTable from './components/EventsListTable';
import {Input} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Radium from 'radium';

let MembersLisView = React.createClass({
  mixins: [
    Reflux.connect(EventsStore, 'events'),
    React.addons.LinkedStateMixin
  ],
  
  getInitialState() {
    return {events: []};
  },

  componentDidMount() {
    EventsActions.getList();
  },

  render() {
    const InputAddon = <FontAwesome name="search" />;

    return (
      <div style={styles.base}>
        <h3 className="page-title">
          <FontAwesome name="calendar" /> Lista de Eventos
        </h3>

        <EventsListTable events={this.state.events} />
      </div>
    );
  }
});

let styles = {
  base: {
    width: '600px',
    margin: 'auto'
  }
}
export default Radium(MembersLisView);