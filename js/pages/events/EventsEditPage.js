import React from 'react/addons';
import EventsStore from '../../stores/EventsStore';
import EventsActions from '../../actions/EventsActions';
import MembersActions from '../../actions/MembersActions';
import MembersStore from '../../stores/MembersStore';
import {Input, ButtonInput, ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

let EventsEditPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {};
  },

  componentDidMount() {
    this.loadEventData();
  },

  loadEventData() {
    EventsActions
      .find
      .triggerPromise(this.props.params.id)
      .then((event) => {
        this.setState(event);
        this.loadSelectableMembers();
      })
      .catch((err) => {
        console.log(err);
      })

  },

  loadSelectableMembers() {
    MembersActions
      .getList
      .triggerPromise()
      .then((members) => {
        this.setState({selectableMembers: members});
      })
  },

  handleAddMember(id) {
    EventsActions
      .removeMember
      .triggerPromise(id)
      .then((response) => {
        this.loadEventData();
      })
      .catch((response) => {
        this.loadEventData();
      })
  },

  handleRemoveMember(id) {
    EventsActions
      .removeMember
      .triggerPromise(id)
      .then((response) => {
        this.loadEventData();
      })
      .catch((response) => {
        this.loadEventData();
      })
  },

  render() {
    let eventMembers = [];
    let selectableMembers = [];

    if (this.state.members) {
      eventMembers = this.state.members.map((member) => {
        return <tr>
          <td>{member.first_name}</td>
          <td>{member.ci}</td>
          <td>{member.phone}</td>
          <td>
            <ButtonToolbar>
              <Button bsStyle="warning" onClick={this.handleRemoveMember.bind(this, member.id)}>
                <FontAwesome name="minus" />
              </Button>
            </ButtonToolbar>
          </td>
        </tr>
      });
    }

    if (this.state.selectableMembers) {
      selectableMembers = this.state.members.map((member) => {
        return <tr>
          <td>{member.first_name}</td>
          <td>{member.ci}</td>
          <td>{member.phone}</td>
          <td>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.handleAddMember.bind(this, member.id)}>
                <FontAwesome name="plus" />
              </Button>
            </ButtonToolbar>
          </td>
        </tr>
      });
    }


    return <div>
      <div className="eventInfo">
        <form onSubmit={this.handleSubmit}>
          <Input valueLink={this.linkState('title')} type="text" label="Titulo" placeholder="Titulo"/>
          <Input valueLink={this.linkState('description')} type="textarea" label="Descripcion" placeholder="Descripcion"/>
          <input type="date" className="form-control" valueLink={this.linkState('date')} />
          <Input valueLink={this.linkState('sector')} type="text" label="Sector" placeholder="Sector" />
          <label>Lugar</label>
          <select className="form-control"valueLink={this.linkState('location')} >
            <option value='Local'>Local</option>
            <option value='Cancha'>Cancha</option>
          </select>
          <ButtonInput type="submit" value="Agregar Recurso"/>
        </form>
      </div>

      <div className="members">
        <table className="table bordered condensed">
          <tr> 
            <th>Nombre</th>
            <th>Cedula</th>
            <th>Telefono</th>
            <th>Add</th>
          </tr>

          <tbody>
            {selectableMembers}
          </tbody>
        </table>

        <table className="table bordered condensed">
          <tr> 
            <th>Nombre</th>
            <th>Cedula</th>
            <th>Telefono</th>
            <th>Add</th>
          </tr>

          <tbody>
            {eventMembers}
          </tbody>
        </table>
      </div>
    </div>
  }
});

export default EventsEditPage;