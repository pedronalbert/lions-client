import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {Navigation} from 'react-router';
import UsersActions from '../../../../../actions/UsersActions';
import Alertify from 'alertifyjs';
import _ from 'lodash';

let UsersTableRow = React.createClass({
  mixins: [Navigation],

  handleEdit(id) {
    let route = 'users/' + id + '/edit';

    this.transitionTo(route);
  },

  handleDelete(id) {
    const message = '¿Está seguro de que desea eliminar este usuario?';

    Alertify.defaults.glossary.title = 'Precaucion';
    Alertify.defaults.glossary.ok = 'SI';
    Alertify.defaults.glossary.cancel = 'NO';

    Alertify
      .confirm(message)
      .set('onok', (closeEvent) => {

        UsersActions
          .delete
          .triggerPromise(id)
          .then((response) => {
            window.toastr.success('Usuario ha sido eliminado');
          });
      })
  },

  getUserRol() {
    if(this.props.user.role == 1) {
      return "Administrador";
    } else {
      return "Usuario";
    }
  },

  render() {
    let userRol = this.getUserRol();

    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
        <td>{userRol}</td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="small" onClick={this.handleEdit.bind(this, this.props.user.id)}>
              <FontAwesome name="pencil" />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={this.handleDelete.bind(this, this.props.user.id)}>
              <FontAwesome name="trash-o" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
});

export default UsersTableRow;