import React from 'react/addons';
import Reflux from 'reflux';
import EventsStore from '../../../../stores/EventsStore';
import EventsActions from '../../../../actions/EventsActions';
import MembersActions from '../../../../actions/MembersActions';
import MembersStore from '../../../../stores/MembersStore';
import ResourcesStore from '../../../../stores/ResourcesStore';
import ResourcesActions from '../../../../actions/ResourcesActions';
import {Input, ButtonInput, ButtonToolbar, Button, Table} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';
import DeepLinkedStateMixin from 'react-deep-link-state';
import SelectableMembersTable from './components/SelectableMembersTable';
import EventMembersTable from './components/EventMembersTable';
import SelectableResourcesTable from './components/SelectableResourcesTable'; 
import EventResourcesTable from './components/EventResourcesTable';

let EventsEditView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(ResourcesStore, 'selectableResources'),
    Reflux.connect(MembersStore, 'selectableMembers'),
    Reflux.listenTo(EventsStore, 'onEventsStoreChange'),
    DeepLinkedStateMixin
  ],

  getInitialState() {
    return {selectableMembers: [], selectableResources: [], event: {members: [], resources: []}};
  },

  componentDidMount() {
    MembersActions.getList();
    EventsActions.getList();
    ResourcesActions.getList();
  },

  onEventsStoreChange(events) {
    let event = _.find(events, (event) => {
      return event.id == this.props.params.id
    });

    this.setState({event: event});
  },

  render() {
    return (
      <div>
        <div className="eventInfo">
          <Input type="text" valueLink={this.deepLinkState(['event', 'title'])} label="Titulo" />
          <Input type="textarea" valueLink={this.deepLinkState(['event', 'description'])} label="Descripcion" />
          <input type="date" className="form-control" valueLink={this.deepLinkState(['event', 'date'])} />
          <Input type="sector" valueLink={this.deepLinkState(['event', 'sector'])} label="Sector" />
          <label>Lugar</label>
          <select className="form-control"valueLink={this.deepLinkState(['event', 'location'])} >
            <option value='Local'>Local</option>
            <option value='Cancha'>Cancha</option>
          </select>
        </div>

        <SelectableMembersTable members={this.state.selectableMembers} eventId={this.props.params.id} />
        <EventMembersTable members={this.state.event.members} eventId={this.props.params.id} />
        <SelectableResourcesTable resources={this.state.selectableResources} eventId={this.props.params.id} />
        <EventResourcesTable resources={this.state.event.resources} eventId={this.props.params.id} />
      </div>
    );
  }
});

export default EventsEditView;