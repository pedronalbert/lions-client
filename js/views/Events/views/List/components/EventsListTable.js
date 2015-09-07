/*---Dependencies---*/
import _ from 'lodash';
import EventsListTableRow from './EventsListTableRow';
import Radium from 'radium';
import React from 'react/addons';
import Reflux from 'reflux';
import {Table, Well, Input} from 'react-bootstrap';

/*---Components---*/
import UsersActions from '../../../../../actions/UsersActions';
import UsersStore from '../../../../../stores/UsersStore';

let EventsListTable = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(UsersStore, 'usersStore')
  ],

  getInitialState() {
    return {wordFilter: ''};
  },

  componentWillMount() {
    UsersActions.getLoggedUser();
  },

  render() {
    if(this.props.events.length > 0) {
      let filteredEvents = this.getFilteredEvents(this.state.wordFilter);
      let adminCol = null;

      if(this.state.usersStore.loggedUser.role == 1) {
        adminCol = <th style={styles.adminCol}>Administrar</th>
      }

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
                {adminCol}
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
  }
});

let styles = {
  adminCol: {
    width: '90px'
  }
}

export default Radium(EventsListTable);