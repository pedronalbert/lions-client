import React from 'react';
import ResourcesActions from '../../../../../actions/ResourcesActions';
import {Table, Well} from 'react-bootstrap';
import ResourcesTableRow from './ResourcesTableRow';
import Radium from 'radium';

let ResourcesTable = React.createClass({
  componentDidMount() {
    ResourcesActions.getList();
  },

  render() {
    if (this.props.resources.length > 0) {
      return (
        <Table condensed responsive style={styles.table}> 
          <thead>
            <tr>
              <th>Tipo</th>
              <th style={styles.colFit}>Disponibles</th>
              <th style={styles.colFit}>Usando</th>
              <th style={styles.colFit}>Dañados</th>
              <th style={styles.adminCol}>Administrar</th>
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