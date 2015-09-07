import React from 'react';
import ResourcesActions from '../../../../../actions/ResourcesActions';
import UsersActions from '../../../../../actions/UsersActions';
import {Table, Well} from 'react-bootstrap';
import ResourcesTableRow from './ResourcesTableRow';
import Radium from 'radium';
import _ from 'lodash';

let ResourcesTable = React.createClass({

  getInitialState() {
    return {loggedUser: {}};
  },

  componentDidMount() {
    ResourcesActions.getList();
    UsersActions
      .getLoggedUser
      .triggerPromise()
      .then((user) => {
        this.setState({loggedUser: user});
      });
  },

  getFilteredResources(filter) {
    let resources;

    if (_.isEmpty(filter)) {
      resources = this.props.resources;
    } else {
      let reg = new RegExp(filter);

      resources = _.filter((this.props.resources), (resource) => {
        if (reg.test(resource.type)) {
          return true
        };
      });
    }

    return resources;
  },

  render() {
    let resources = this.getFilteredResources(this.props.filterWord);

    if (this.props.resources.length > 0) {
      let adminCol = null;

      if(this.state.loggedUser.role == 1) {
        adminCol = <th style={styles.adminCol}>Administrar</th>
      }
      
      return (
        <Table condensed responsive style={styles.table}> 
          <thead>
            <tr>
              <th>Tipo</th>
              <th style={styles.colFit}>Disponibles</th>
              <th style={styles.colFit}>Usando</th>
              <th style={styles.colFit}>Dañados</th>
              {adminCol}
            </tr>
          </thead>

          <tbody>
            {resources.map((resource) => {
              return <ResourcesTableRow key={resource.id} resource={resource} />
            })}
          </tbody>
        </Table>
      );
    } else {
      return <Well>
        No hay recursos en el inventario!
      </Well>
    }
  }
});

let styles = {
  table: {
    maxWidth: '500px'
  },

  colFit: {
    width: '1px'
  },

  adminCol: {
    width: '90px'
  }
}

export default Radium(ResourcesTable);