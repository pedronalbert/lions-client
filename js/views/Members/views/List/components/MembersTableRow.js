/*---Dependencies---¨*/
import Alertify from 'alertifyjs';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import Reflux from 'reflux';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {History} from 'react-router';

/*---Components---*/
import MembersActions from '../../../../../actions/MembersActions';
import UsersActions from '../../../../../actions/UsersActions';
import UsersStore from '../../../../../stores/UsersStore';

let MembersTableRow = React.createClass({
  mixins: [
    History,
    Reflux.connect(UsersStore, 'usersStore')
  ],

  componentDidMount() {
    UsersActions.getLoggedUser();
  },
  
  render() {
    let adminCol = null;

    if(this.state.usersStore.loggedUser.role == 1) {
      adminCol = <td>
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="small" onClick={this.handleEdit.bind(this, this.props.member.id)}>
            <FontAwesome name="pencil" />
          </Button>
          <Button bsStyle="danger" bsSize="small" onClick={this.handleDelete.bind(this, this.props.member.id)}>
            <FontAwesome name="trash-o" />
          </Button>
        </ButtonToolbar>
      </td>
    }

    return (
      <tr>
        <td>{this.props.member.first_name}</td>
        <td>{this.props.member.last_name}</td>
        <td>{this.props.member.ci}</td>
        <td>{this.props.member.email}</td>
        <td>{this.props.member.phone}</td>
        {adminCol}
      </tr>
    );
  },

  handleDelete(id) {
    const message = '¿Está seguro de que desea eliminar este miembro?';

    Alertify.defaults.glossary.title = 'Precaucion';
    Alertify.defaults.glossary.ok = 'SI';
    Alertify.defaults.glossary.cancel = 'NO';

    Alertify
      .confirm(message)
      .set('onok', (closeEvent) => {

        MembersActions
          .delete
          .triggerPromise(id)
          .then((response) => {
            window.toastr.success('Miembro ha sido eliminado');
          });
      })
  },

  handleEdit(id) {
    let route = 'members/' + id + '/edit';

    this.history.pushState(null, route);
  }
});

export default MembersTableRow;