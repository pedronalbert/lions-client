/*---Dependencies---*/
import React from 'react';
import Reflux from 'reflux';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

/*--Components--*/
import EventsStore from '../../../../stores/EventsStore';
import EventsActions from '../../../../actions/EventsActions';
import EventInfoTable from './components/EventInfoTable';
import EventMembersTable from './components/EventMembersTable';
import EventResourcesTable from './components/EventResourcesTable';

let EventsShowView = React.createClass({
  mixins: [
    Reflux.listenTo(EventsStore, 'onEventsStoreChange')
  ],

  getInitialState() {
    return {event: {members: [], resources: []}};
  },

  componentWillMount() {
    EventsActions.getList();
  },

  render() {
    return (
      <div>
        <h3 className="page-title"><FontAwesome name="calendar-plus-o" /> Informacion del Evento</h3>

        <EventInfoTable event={this.state.event} />
        <hr />
        <h3 style={styles.title}> <FontAwesome name="users" />Miembros</h3>
        <EventMembersTable members={this.state.event.members} />
        <hr />
        <h3 style={styles.title}> <FontAwesome name="cubes" />Recursos</h3>
        <EventResourcesTable resources={this.state.event.resources} />
      </div>
    );
  },

  onEventsStoreChange(events) {
    let event = _.find(events, (event) => {
      return event.id == this.props.params.id
    });

    this.setState({event: event});
  }
});

let styles = {
  title: {
    textAlign: 'center'
  }
}

export default EventsShowView;