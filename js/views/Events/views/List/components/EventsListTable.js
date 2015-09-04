import React from 'react/addons';
import {Table, Well, Input} from 'react-bootstrap';
import EventsListTableRow from './EventsListTableRow';
import Radium from 'radium';
import _ from 'lodash';

let EventsListTable = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {wordFilter: ''};
  },

  getFilteredEvents(wordFilter) {
    let events;

    if (_.isEmpty(wordFilter)) {
      events = this.props.events;
    } else {
      let reg = new RegExp(wordFilter);

      events = _.filter((this.props.events), (event) => {
        if (reg.test(event.title)) {
          return true
        };
      });
    }

    return events;
  },

  render() {
    if(this.props.events.length > 0) {
      let filteredEvents = this.getFilteredEvents(this.state.wordFilter);

      return  (
        <div>
          <Input 
          type="text" 
          valueLink={this.linkState('wordFilter')}
          label="Buscar" 
          placeholder="Titulo" />

          <Table condensed responsive>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Dia</th>
                <th>Hora</th>
                <th style={styles.adminCol}>Administrar</th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.map((event) => {
                return <EventsListTableRow key={event.id} event={event} />
              })}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return (
        <Well>
          No hay eventos registrados!
        </Well>
      );
    }
  }
});

let styles = {
  adminCol: {
    width: '90px'
  }
}

export default Radium(EventsListTable);