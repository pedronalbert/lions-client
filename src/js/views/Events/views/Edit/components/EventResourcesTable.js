import React from 'react';
import {Table} from 'react-bootstrap';
import EventResourcesTableRow from './EventResourcesTableRow';
import _ from 'lodash';

let EventResourcesTable = React.createClass({

  getFilteredResources(wordFilter) {
    let resources;

    if (_.isEmpty(wordFilter)) {
      resources = this.props.resources;
    } else {
      let reg = new RegExp(wordFilter);

      resources = _.filter((this.props.resources), (resource) => {
        if (reg.test(resource.type)) {
          return true
        };
      });
    }

    return resources;
  },

  render() {
    let resources = this.getFilteredResources(this.props.wordFilter)
    return (
      <Table>
        <tbody>
          {resources.map((resource) => {
            return <EventResourcesTableRow key={resource.id} resource={resource} eventId={this.props.eventId} />
          })}
        </tbody>
      </Table>
    );
  }
});

export default EventResourcesTable;