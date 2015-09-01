import React from 'react/addons';
import Reflux from 'reflux';
import MembersActions from '../../actions/MembersActions';
import MembersStore from '../../stores/MembersStore';
import {Table, ButtonToolbar, Button, Input} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {Navigation} from 'react-router';
import _ from 'lodash';

let MembersListPage = React.createClass({
  mixins: [
    Reflux.connect(MembersStore, 'members'), 
    React.addons.LinkedStateMixin,
    Navigation
  ],

  getInitialState() {
    return {members: []};
  },

  componentDidMount() {
    MembersActions.getList();
  },

  handleEdit(id) {
    let route = 'members/' + id + '/edit';

    this.transitionTo(route);
  },

  handleSearch(e) {
    console.log(e)
  },

  handleDelete(id) {
    let confirm = window.confirm('¿Está seguro de que desea eliminar este miembro?');

    if(confirm) {
      MembersActions.delete(id);
    }
  },

  filterMembers(filter = '') {
    let members;
    let reg = new RegExp(filter);

    if (filter === '') {
      members = this.state.members;
    } else {
      members = _.filter(this.state.members, (member) => {
        if (reg.test(member.ci) || reg.test(member.first_name) || reg.test(member.last_name)) {
          return true;
        }
      })
    }

    return members
  },

  render() {
    let members = this.filterMembers(this.state.wordToFilter);

    let membersList =  members.map((member) => {
      return (<tr>
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
      </tr>);
    });

    return (<div>
      <Input type="text" valueLink={this.linkState('wordToFilter')} />
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
    </div>);

  }
});

export default MembersListPage;