/*---Dependencies---*/
import Alertify from 'alertifyjs';
import FontAwesome from 'react-fontawesome';
import Radium from 'radium';
import React from 'react';
import Reflux from 'reflux';
import {Button, ButtonToolbar} from 'react-bootstrap'; 
import {History} from 'react-router';

/*---Components---*/
import ResourcesActions from 'actions/ResourcesActions';
import UsersActions from 'actions/UsersActions';
import UsersStore from 'stores/UsersStore';

let ResourcesTableRow = React.createClass({
  mixins: [
    History,
    Reflux.connect(UsersStore, 'usersStore')
  ],

  handleEdit(id) {
    let route = 'resources/' + id + '/edit';

    this.history.pushState(null, route);
  },

  componentWillMount() {
    UsersActions.getLoggedUser();
  },

  render() {
    let adminCol = null;

    if(this.state.usersStore.loggedUser.role == 1) {
      adminCol = <td>
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="small" onClick={this.handleEdit.bind(this, this.props.resource.id)}>
            <FontAwesome name="pencil" />
          </Button>
          <Button bsStyle="danger" bsSize="small" onClick={this.handleDelete.bind(this, this.props.resource.id)}>
            <FontAwesome name="trash-o" />
          </Button>
        </ButtonToolbar>
      </td>
    }
    return (<tr>
      <td>{this.props.resource.type}</td>
      <td style={styles.textCenter}>{this.props.resource.available}</td>
      <td style={styles.textCenter}>{this.props.resource.using}</td>
      <td style={styles.textCenter}>{this.props.resource.damaged}</td>
      {adminCol}
    </tr>);
  },

  handleDelete(id) {
    const message = '¿Está seguro de que desea eliminar este recurso?';

    Alertify.defaults.glossary.title = 'Precaucion';
    Alertify.defaults.glossary.ok = 'SI';
    Alertify.defaults.glossary.cancel = 'NO';

    Alertify
      .confirm(message)
      .set('onok', (closeEvent) => {

        ResourcesActions
          .delete
          .triggerPromise(id)
          .then((response) => {
            window.toastr.success('Recurso ha sido eliminado');
          });
      })
  }
});

let styles = {
  textCenter: {
    textAlign: 'center'
  }
};


export default Radium(ResourcesTableRow);