import React from 'react';
import ResourcesActions from '../../../../../actions/ResourcesActions';
import FontAwesome from 'react-fontawesome';
import {Button, ButtonToolbar} from 'react-bootstrap'; 
import {Navigation} from 'react-router';
import Radium from 'radium';
import Alertify from 'alertifyjs';

let ResourcesTableRow = React.createClass({
  mixins: [Navigation],

  handleEdit(id) {
    let route = 'resources/' + id + '/edit';

    this.transitionTo(route);
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
  },

  render() {
    return (<tr>
      <td>{this.props.resource.type}</td>
      <td style={styles.textCenter}>{this.props.resource.available}</td>
      <td style={styles.textCenter}>{this.props.resource.using}</td>
      <td style={styles.textCenter}>{this.props.resource.damaged}</td>
      <td>
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="small" onClick={this.handleEdit.bind(this, this.props.resource.id)}>
            <FontAwesome name="pencil" />
          </Button>
          <Button bsStyle="danger" bsSize="small" onClick={this.handleDelete.bind(this, this.props.resource.id)}>
            <FontAwesome name="trash-o" />
          </Button>
        </ButtonToolbar>
      </td>
    </tr>);
  }
});

let styles = {
  textCenter: {
    textAlign: 'center'
  }
};


export default Radium(ResourcesTableRow);