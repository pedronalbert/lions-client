import React from 'react';
import ResourcesActions from '../../../../../actions/ResourcesActions';
import UsersActions from '../../../../../actions/UsersActions';
import {Table, Well} from 'react-bootstrap';
import ResourcesTableRow from './ResourcesTableRow';
import Radium from 'radium';

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

  render() {
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
            {this.props.resources.map((resource) => {
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