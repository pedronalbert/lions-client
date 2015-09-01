import React from 'react';
import Reflux from 'reflux';
import EventsActions from '../../actions/EventsActions';
import EventsStore from '../../stores/EventsStore';
import {Table, ButtonToolbar, Button} from 'react-bootstrap';
import {Navigation} from 'react-router';
import FontAwesome from 'react-fontawesome';

let EventsListPage = React.createClass({
  mixins: [Reflux.connect(EventsStore, 'events'), Navigation],

  componentDidMount() {
    EventsActions.getList();
  },

  handleEdit(id) {
    let route = 'events/' + id + '/edit';

    this.transitionTo(route);
  },

  handleDelete(id) {
    let confirm = window.confirm('¿Está seguro de que desea eliminar este miembro?');

    if(confirm) {
      EventsActions.delete(id);
    }
  },

  render() {
    if (this.state.events) {
      let events = this.state.events.map((event) => {
        return <tr>
          <td>{event.title}</td>
          <td>{event.date}</td>
          <td>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.handleEdit.bind(this, event.id)}>
                <FontAwesome name="pencil" />
              </Button>
              <Button bsStyle="danger" onClick={this.handleDelete.bind(this, event.id)}>
                <FontAwesome name="trash-o" />
              </Button>
            </ButtonToolbar>
          </td>
        </tr>
      });

      return <Table bordered condensed>
        <tr>
          <th>Titulo</th>
          <th>Fecha</th>
          <th>Administrar</th>
        </tr>

        <tbody>
          {events}
        </tbody>
      </Table>
      
    } else {
      return <div>
        No hay Eventos
      </div>
    }

  }
});

export default EventsListPage;