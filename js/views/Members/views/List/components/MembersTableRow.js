import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {Navigation} from 'react-router';
import MembersActions from '../../../../../actions/MembersActions';
import UsersActions from '../../../../../actions/UsersActions';
import Alertify from 'alertifyjs';

let MembersTableRow = React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {loggedUser: {}};
  },

  handleEdit(id) {
    let route = 'members/' + id + '/edit';

    this.transitionTo(route);
  },

  componentDidMount() {
    UsersActions
      .getLoggedUser
      .triggerPromise()
      .then((user) => {
        this.setState({loggedUser: user});
      });
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

  render() {
    let adminCol = null;

    if(this.state.loggedUser.role == 1) {
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
  }
});

export default MembersTableRow;