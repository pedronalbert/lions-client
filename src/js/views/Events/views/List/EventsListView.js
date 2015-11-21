/*---Dependencies---*/
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import Radium from 'radium';
import React from 'react/addons';
import Reflux from 'reflux';
import {Input, Tabs, Tab} from 'react-bootstrap';

/*---Components---*/
import EventsActions from 'actions/EventsActions';
import EventsListTable from './components/EventsListTable';
import EventsStore from 'stores/EventsStore';


let MembersLisView = React.createClass({
  mixins: [
    Reflux.connect(EventsStore, 'events'),
    React.addons.LinkedStateMixin
  ],

  componentWillMount() {
    EventsActions.getList();
  },

  render() {
    let activeEvents = this.getActiveEvents();
    let finishedEvents = this.getFinishedEvents();

    const InputAddon = <FontAwesome name="search" />;

    return (
      <div style={styles.base}>
        <h3 className="page-title">
          <FontAwesome name="calendar" /> Lista de Eventos
        </h3>

        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Activos">
            <EventsListTable events={activeEvents} />
          </Tab>
          <Tab eventKey={2} title="Finalizados">
            <EventsListTable events={finishedEvents} />
          </Tab>
        </Tabs>
      </div>
    );
  },

  getActiveEvents() {
    let events = _.filter(this.state.events, (event) => {
      return event.active == 1;
    });

    return events;
  },

  getFinishedEvents() {
    let events = _.filter(this.state.events, (event) => {
      return event.active == 0;
    });

    return events;
  }
});

let styles = {
  base: {
    width: '600px',
    margin: 'auto'
  }
}
export default Radium(MembersLisView);