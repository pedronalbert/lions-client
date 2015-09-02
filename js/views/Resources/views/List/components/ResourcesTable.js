import React from 'react';
import ResourcesActions from '../../../../../actions/ResourcesActions';
import {Table} from 'react-bootstrap';
import ResourcesTableRow from './ResourcesTableRow';

let ResourcesTable = React.createClass({
  componentDidMount() {
    ResourcesActions.getList();
  },

  render() {
    if (this.props.resources) {
      return <div>
        <Table bordered condensed> 
          <tr>
            <th>Tipo</th>
            <th>Disponibles</th>
            <th>Usando</th>
            <th>Dañados</th>
            <th>Administrar</th>
          </tr>

          <tbody>
            {this.props.resources.map((resource) => {
              return <ResourcesTableRow key={resource.id} resource={resource} />
            })}
          </tbody>
        </Table>
      </div>
    } else {
      return <div> No hay recursos </div>
    }
  }
});

export default ResourcesTable;