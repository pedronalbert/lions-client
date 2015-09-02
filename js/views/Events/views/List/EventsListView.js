import React from 'react';
import Reflux from 'reflux';
import EventsActions from '../../../../actions/EventsActions';
import EventsStore from '../../../../stores/EventsStore';
import {Table, ButtonToolbar, Button} from 'react-bootstrap';
import {Navigation} from 'react-router';
import FontAwesome from 'react-fontawesome';
import EventsListTable from './components/EventsListTable';

let EventsListView = React.createClass({
  mixins: [Reflux.connect(EventsStore, 'events'), Navigation],

  getInitialState() {
    return {events: []};
  },
  
  componentDidMount() {
    EventsActions.getList();
  },

  render() {
    return (
      <EventsListTable events={this.state.events} />
    );
  }
});

export default EventsListView;