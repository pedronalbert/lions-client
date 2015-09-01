import React from 'react';
import Reflux from 'reflux';
import ResourcesActions from '../../actions/ResourcesActions';
import ResourcesStore from '../../stores/ResourcesStore';
import {Table, ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {Navigation} from 'react-router';
import _ from 'lodash';

let ResourcesTable = React.createClass({
  mixins: [Reflux.connect(ResourcesStore, 'resources'), Navigation],

  componentDidMount() {
    ResourcesActions.getList();
  },

  handleEdit(id) {
    let route = 'resources/' + id + '/edit';

    this.transitionTo(route);
  },

  handleDelete(id) {
    let confirm = window.confirm('¿Está seguro de que desea eliminar este recurso?');

    if(confirm) {
      ResourcesActions.delete(id);
    }
  },

  render() {
    if (this.state.resources) {
      var resourcesList =  this.state.resources.map((resource) => {
        return <tr>
            <td>{resource.type}</td>
            <td>{resource.available}</td>
            <td>{resource.using}</td>
            <td>{resource.damaged}</td>
            <td>
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.handleEdit.bind(this, resource.id)}>
                  <FontAwesome name="pencil" />
                </Button>
                <Button bsStyle="danger" onClick={this.handleDelete.bind(this, resource.id)}>
                  <FontAwesome name="trash-o" />
                </Button>
              </ButtonToolbar>
            </td>
          </tr>
      })

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
            {resourcesList} 
          </tbody>
        </Table>
      </div>
    } else {
      return <div> No hay recursos </div>
    }
  }
});

export default ResourcesTable;