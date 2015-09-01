import React from 'react';
import Reflux from 'reflux';
import MembersActions from '../../actions/MembersActions';
import MembersStore from '../../stores/MembersStore';
import {Table, ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {Navigation} from 'react-router';
import _ from 'lodash';

let MembersTable = React.createClass({
  mixins: [Reflux.connect(MembersStore, 'members'), Navigation],

  componentDidMount() {
    MembersActions.getList();
  },

  handleEdit(id) {
    let route = 'members/' + id + '/edit';

    this.transitionTo(route);
  },

  handleDelete(id) {
    let confirm = window.confirm('¿Está seguro de que desea eliminar este miembro?');

    if(confirm) {
      MembersActions.delete(id);
    }
  },

  render() {
    if (this.state.members) {
      var membersList =  this.state.members.map((member) => {
        return <tr>
            <td>{member.first_name}</td>
            <td>{member.last_name}</td>
            <td>{member.ci}</td>
            <td>{member.email}</td>
            <td>{member.phone}</td>
            <td>
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.handleEdit.bind(this, member.id)}>
                  <FontAwesome name="pencil" />
                </Button>
                <Button bsStyle="danger" onClick={this.handleDelete.bind(this, member.id)}>
                  <FontAwesome name="trash-o" />
                </Button>
              </ButtonToolbar>
            </td>
          </tr>
      })

      return <div>
        <Table bordered condensed> 
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cedula</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Editar</th>
          </tr>

          <tbody>
            {membersList} 
          </tbody>
        </Table>
      </div>
    } else {
      return <div> Actualmente no hay miembros </div>
    }
  }
});

export default MembersTable;